# 03 — Imágenes reales en lugar de placeholders (`next/image`)

**Índice del paquete de docs:** [`00-indice-documentacion.md`](./00-indice-documentacion.md)

Guía para sustituir los bloques **`MediaPlaceholder`** por fotos reales usando **`next/image`** en **`sv-landing`**.

## Dónde están los placeholders hoy

El componente está en:

- `sv-landing/components/aceternity/media-placeholder.tsx`

Se usa en estas secciones (el `label` suele venir de i18n `placeholders.*` en `locales/es.json` y `locales/en.json`):

| Sección | Archivo | Clave i18n del texto del placeholder |
|---------|---------|--------------------------------------|
| Hero | `components/sections/hero.tsx` | `placeholders.hero` |
| Nosotros | `components/sections/about.tsx` | `placeholders.about` |
| Donación (columna imagen) | `components/sections/donation.tsx` | `placeholders.donation` |
| Construcción / actividades | `components/sections/construccion-infraestructura.tsx` | `placeholders.construccion` |
| Social (varias fotos) | `components/sections/social-section.tsx` | `escuelaFutbol`, `voleyJuegos`, `peques`, `preadolescentes` |

Reemplazás el JSX `<MediaPlaceholder … />` por tu bloque con `Image` (o un componente propio que lo envuelva).

## Dónde guardar los archivos

### Convención en `sv-landing` (rutas reales)

Todas las imágenes de la landing van bajo:

**`sv-landing/public/assets/`**

Ahí no se tiran los archivos sueltos en la raíz de `assets/`, sino en **subcarpetas por bloque del sitio** (numeración / nombre de sección) y, dentro, **otra carpeta por tema** cuando aplique.

**Ejemplo — sección Social, fútbol:**

| En disco (desde la raíz del repo) | En el navegador / `next/image` (`src`) |
|-----------------------------------|----------------------------------------|
| `sv-landing/public/assets/3-social/a-futbol/<archivo>.webp` | **`/assets/3-social/a-futbol/<archivo>.webp`** |

La regla de Next sigue siendo: **todo lo que está en `public/` se sirve desde `/`**. La carpeta `public` **no** va en la URL.

Ejemplo concreto si el archivo se llama `equipo.webp`:

- Ruta en disco: `sv-landing/public/assets/3-social/a-futbol/equipo.webp`
- En código: `src="/assets/3-social/a-futbol/equipo.webp"`

Otras fotos (hero, nosotros, donación, etc.) seguirán el **mismo esquema**: `public/assets/<carpeta-de-bloque>/<subcarpeta-opcional>/archivo.ext` → `src="/assets/<carpeta-de-bloque>/.../archivo.ext"`. Los nombres `3-social`, `a-futbol`, etc. son los que definiste para ordenar el material; mantené la misma convención al agregar más carpetas (por ejemplo más subcarpetas bajo `3-social/` para vóley, peques, etc.).

### Relación con `asociacion-app`

En **`asociacion-app`** los gráficos viven en **`asociacion-app/src/assets/`** (imports). En **`sv-landing`** el equivalente servido por URL es **`public/assets/`** con esa estructura de subcarpetas; **no** es la misma ruta en disco que en la app, solo la misma idea de tener una raíz `assets` y orden por carpetas.

### Otras opciones en Next

1. Cualquier otra ruta bajo `public/` sigue la regla `public/x/y.png` → **`/x/y.png`**.
2. **Import estático** desde el código de `sv-landing` sigue siendo posible, pero para esta landing la convención acordada es **`public/assets/...`** como arriba.

## Uso de `next/image`

```tsx
import Image from "next/image";

<Image
  src="/assets/3-social/a-futbol/equipo.webp"
  alt={t("images.socialFutbolAlt")}
  width={1200}
  height={675}
  className="rounded-xl object-cover shadow-xl"
  sizes="(max-width: 1024px) 100vw, 50vw"
  priority={false}
/>
```

Puntos importantes:

- **`alt`**: obligatorio por accesibilidad. Conviene añadir claves en **`locales/*.json`** (por ejemplo `images.heroAlt`) y usar `t("images.heroAlt")` como hacés con el resto del copy.
- **`width` y `height`**: ayudan al layout y al ratio; evitan saltos de CLS. Si no conocés el tamaño exacto, podés usar **`fill`** (ver más abajo).
- **`sizes`**: indica al navegador qué ancho aproximado tendrá la imagen en cada viewport; mejora la elección de resolución cuando activás optimización de imágenes de Next.
- **`priority`**: solo en imágenes **above the fold** (p. ej. hero) para marcarlas como prioritarias en la carga (LCP).

### Patrón `fill` + contenedor (hero / cards responsive)

Cuando la imagen debe ocupar todo un contenedor con altura definida por CSS:

```tsx
<div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-xl">
  <Image
    src="/assets/3-social/a-futbol/equipo.webp"
    alt={t("images.socialFutbolAlt")}
    fill
    className="object-cover"
    sizes="(max-width: 1024px) 100vw, 52vw"
    priority={false}
  />
</div>
```

El padre necesita **`position: relative`** (Tailwind: `relative`) y normalmente **`overflow-hidden`** + **`aspect-*`** o **`min-h-[…]`** como ya usan los placeholders.

## Config actual del proyecto (`next.config.mjs`)

Hoy está:

```js
images: {
  unoptimized: true,
},
```

- Con **`unoptimized: true`**, Next **no** pasa las imágenes por el optimizador integrado (sirve el archivo tal cual). Sigue valiendo usar **`Image`** por la API unificada, `alt`, `sizes` y preparación para más adelante.
- Cuando quieras **optimización automática** (WebP/AVIF, `srcset`), podés quitar `unoptimized` o ponerlo en `false` y revisar que el **deploy** soporte el optimizador (por ejemplo Vercel lo hace por defecto).

## Imágenes remotas (CDN, bucket, otro dominio)

Si `src` es una URL absoluta (`https://…`), Next exige declarar el host en **`next.config.mjs`**:

```js
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "ejemplo.com",
      pathname: "/ruta/**",
    },
  ],
},
```

Sin eso, el build o runtime puede fallar al validar la URL.

## Opción recomendada: un componente `SectionImage`

Para no repetir `fill`, `sizes` y clases en cada sección, podés crear algo como `components/media/section-image.tsx` que reciba `src`, `alt`, `className`, `priority`, `sizes` y por dentro renderice `Image` con el mismo contenedor que hoy tiene el placeholder (`rounded-xl`, `object-cover`, etc.). Así migrás sección por sección cambiando solo props y rutas.

## Checklist por imagen

1. Copiar el archivo a la ruta acordada, p. ej. **`sv-landing/public/assets/3-social/a-futbol/<archivo>.webp`** (u otra carpeta bajo `public/assets/` según el bloque).
2. Añadir **`alt`** en ES y EN en los JSON de locales.
3. En el `.tsx` de la sección: importar **`Image`** de **`next/image`**, quitar **`MediaPlaceholder`** (y el import si ya no se usa).
4. Elegir **`width`/`height`** o **`fill`** según el layout.
5. Ajustar **`sizes`** al ancho real en mobile vs desktop.
6. Hero: considerar **`priority`**; el resto: sin `priority` (lazy por defecto).
7. Probar **Lighthouse** (CLS, LCP) después del cambio.

## Referencia rápida de props de `Image`

| Prop | Uso |
|------|-----|
| `src` | Ruta `/...` o import o URL remota (con `remotePatterns`) |
| `alt` | Texto descriptivo; nunca dejar vacío para contenido informativo |
| `width` / `height` | Layout fijo o ratio conocido |
| `fill` | Imagen que llena el padre `relative` |
| `className` | `object-cover`, `rounded-xl`, etc. |
| `sizes` | Ayuda al navegador a elegir densidad |
| `priority` | Solo LCP / primera pantalla |

Documentación oficial: [Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images).
