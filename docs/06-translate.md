# 06 — Traducciones (i18n)

**Índice del paquete de docs:** [`00-indice-documentacion.md`](./00-indice-documentacion.md)

La landing usa **texto externo a los componentes**: todo lo que ve el usuario (títulos, párrafos, botones, `aria-label`, textos de placeholder, etc.) debe vivir en archivos JSON por idioma y resolverse con la función **`t()`** de **react-i18next**.

El inventario narrativo de negocio sigue en [`02-contenido-web.md`](./02-contenido-web.md); este documento describe **cómo está cableado en código** y la regla operativa al agregar o cambiar textos.

---

## Cómo está hecho

| Pieza | Ubicación | Rol |
|-------|-----------|-----|
| Diccionarios | `sv-landing/locales/es.json`, `sv-landing/locales/en.json` | Contenido por idioma (misma estructura de claves) |
| Inicialización | `sv-landing/lib/i18n/client.ts` | Importa ambos JSON, registra el namespace `translation`, idioma por defecto **español** |
| Proveedor React | `sv-landing/components/providers/i18n-provider.tsx` | Envuelve la app; restaura idioma desde `localStorage`, actualiza `document.documentElement.lang`, persiste al cambiar |
| Layout | `sv-landing/app/layout.tsx` | Renderiza `<I18nProvider>{children}</I18nProvider>` |
| Uso en UI | Componentes con `"use client"` y `useTranslation()` de `react-i18next` | Obtienen `t` y llaman `t("clave.anidada")` |
| Cambio de idioma | `sv-landing/components/language-toggle.tsx` | `i18n.changeLanguage("es" \| "en")` |

Dependencias: **`i18next`** y **`react-i18next`** (ver `package.json`).

Los JSON se **importan en build time** en `lib/i18n/client.ts`; no hay carga lazy por HTTP de traducciones. Cualquier clave nueva debe existir en **ambos** archivos para que el bundle sea coherente.

---

## Cómo funciona (flujo resumido)

1. Al arrancar el cliente, **i18next** ya tiene cargados los recursos `es` y `en` bajo el namespace único **`translation`**.
2. **`lng`** por defecto es **`es`**; **`fallbackLng`** también es **`es`** (si falta una clave en EN, i18next puede mostrar la de fallback según configuración).
3. **`I18nProvider`** en un `useEffect` lee **`localStorage`** con la clave **`sv-landing-locale`**: si guardó `es` o `en`, aplica ese idioma con `i18n.changeLanguage`.
4. Al cambiar idioma, se dispara **`languageChanged`**: se persiste de nuevo en `localStorage` y se pone **`lang`** en el `<html>` (`es` o `en`).
5. En cada componente, **`const { t } = useTranslation()`** y en JSX **`{t("nav.home")}`** (ejemplo).

Las claves usan **notación por puntos** que refleja el objeto JSON anidado, por ejemplo `nav.home`, `hero.titleLine1`, `placeholders.hero`.

---

## Regla obligatoria al agregar o cambiar texto

**Cada string visible o audible para el usuario (y textos de accesibilidad que dependan del idioma) debe:**

1. **Definirse en `locales/es.json`** con la clave y el texto en español.
2. **Definirse en `locales/en.json`** con **la misma jerarquía de claves** y el texto en inglés.

No alcanza con poner el texto solo en un componente ni solo en un JSON: **los dos idiomas deben mantenerse alineados**. Si agregás una clave en un archivo y no en el otro, en runtime podés ver la clave cruda, string vacío o comportamiento inconsistente según el idioma activo y el fallback.

**Buenas prácticas:**

- Reutilizá la misma estructura de objetos en ES y EN (mismos nombres de propiedades).
- Para textos nuevos de una sección, agrupá bajo un objeto coherente (p. ej. `sections.miNuevaCard`) en lugar de claves sueltas al nivel raíz, salvo que el proyecto ya use otro patrón en esa pantalla.
- Si añadís **`alt`** de imágenes traducibles, también van en ambos JSON (como indica [`03-manejo-imagenes-next.md`](./03-manejo-imagenes-next.md)).

**Interpolación:** en `client.ts` está `interpolation: { escapeValue: false }` (típico en React). Si más adelante usás variables en cadenas (`t("clave", { nombre: "..." })`), documentá el contrato en ambos idiomas.

---

## Referencia rápida en código

```tsx
"use client";

import { useTranslation } from "react-i18next";

export function Ejemplo() {
  const { t } = useTranslation();
  return <h1>{t("hero.titleLine1")}</h1>;
}
```

Cambiar idioma programáticamente (poco habitual fuera del toggle):

```tsx
import { useTranslation } from "react-i18next";

const { i18n } = useTranslation();
void i18n.changeLanguage("en");
```

---

## Idiomas soportados hoy

Solo **`es`** y **`en`**, tipados como `AppLocale` en `lib/i18n/client.ts`. Agregar un tercer idioma implicaría: nuevo JSON, ampliar `AppLocale`, `getStoredLocale` / `persistLocale`, recursos en `i18n.init` y UI del selector.

---

## Relación con otros docs

- Copy de referencia / revisión editorial: [`02-contenido-web.md`](./02-contenido-web.md).
- Imágenes con `alt` traducido: [`03-manejo-imagenes-next.md`](./03-manejo-imagenes-next.md).
