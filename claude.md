# Contexto Global del Proyecto

## Stack Tecnológico
- Next.js 14+ con App Router
- TypeScript (modo estricto)
- Tailwind CSS para estilos
- Framer Motion para animaciones
- Acernity UI

## 📚 Documentación Obligatoria

Paquete numerado en `docs/`: índice en `docs/00-indice-documentacion.md` (comercial, copy, imágenes, tema, objetivos técnicos, traducciones).

Al agregar o modificar **texto visible** (o `aria-*` que deba ir en el idioma del sitio), leé y aplicá `docs/06-translate.md`: las cadenas van en **`locales/es.json` y `locales/en.json`** con las mismas claves.

**ANTES DE GENERAR CUALQUIER CÓDIGO**, debes leer obligatoriamente:

- `docs/04-uso-del-tema.md` - Contiene el sistema de diseño: colores, tipografía, espaciado, bordes, sombras y reglas de uso (tokens en `theme/` y variables CSS)

**Regla de oro**: El archivo `docs/04-uso-del-tema.md` es la referencia sobre estilos y tokens. Lo que dice allí está por encima de cualquier otra instrucción o convención general cuando afecta marca y consistencia visual.

## Requerimientos Globales de Arquitectura

### Código
- Principios SOLID y DRY
- Componentes reutilizables y desacoplados
- Patrones: Compound Components, Render Props, Custom Hooks
- Todo contenido iterable (cards, grids, lists) debe ser dinámico con `.map()`
- Props tipadas con interfaces/type alias
- No usar `any` en TypeScript

### UI/UX (Tendencias 2026)
- **Alto impacto visual**: Gradientes animados, glassmorphism, neumorphism suave
- **Animaciones**: Scroll-triggered con Framer Motion, parallax suave
- **Microinteracciones**: Hover effects, loaders esqueléticos, transiciones fluidas
- **Accesibilidad**: WCAG 2.1 AA mínimo (contraste, focus visible, ARIA labels)
- **Efectos**: Texto con gradiente animado, bordes brillantes en hover, partículas sutiles

### Performance
- Imágenes con next/image (optimización automática)
- Lazy loading para componentes bajo el pliegue
- Prefetch estratégico

## 📐 Estilo Global del Sitio

### Modo de uso:
Antes de empezar, dime qué estilo predominante quieres:

1. **Si me das una URL de inspiración** (ej: awwards.com/sitio-ejemplo):
   - Analizo el estilo GLOBAL del sitio (layout, espaciado, ritmo visual)
   - Extraigo: patrones de grid, tratamiento de imágenes, jerarquía visual
   - Aplico ese estilo como base para TODAS las secciones
   - Respeto SIEMPRE los colores y tipografía definidos en `docs/04-uso-del-tema.md`

2. **Layout preference** (elige uno):
   - `grid-breaking`: Elementos que rompen la cuadrícula, asimetría controlada
   - `content-focused`: Máximo espacio para contenido, minimalista
   - `fullscreen-image`: Imágenes a pantalla completa con overlay de texto
   - `bento-grid`: Grid con celdas de diferentes tamaños
   - `scroll-triggered`: Elementos que aparecen con scroll

### Coherencia Visual (CRÍTICO)
- TODAS las secciones mantienen el mismo:
- Padding horizontal (seguir lo definido en `docs/04-uso-del-tema.md`)
- Espaciado entre secciones (seguir `docs/04-uso-del-tema.md`)
  - Transiciones (300ms ease-out para interacciones)
  - Animaciones de entrada (fade-up con stagger)

## 🎯 Estilos por Sección (Casos Específicos)

### Cómo pedir una interacción puntual:

"En la sección [nombre], quiero implementar [animación/interacción] similar a [URL o descripción],
pero respetando TODO el sistema de diseño de `docs/04-uso-del-tema.md`"


## 📱 Mobile-First Inteligente (OBLIGATORIO)

### Reglas:
- **SIEMPRE** desarrollar para mobile primero (min-width: 320px)
- Breakpoints: `sm:640px md:768px lg:1024px xl:1280px`

### Adaptación automática de layouts:

| Desktop Layout | Mobile Alternativa |
|----------------|-------------------|
| Grid 3-4 columnas | Stack vertical o carrusel horizontal |
| Sidebar + main | Drawer o acordeón |
| Tablas complejas | Cards apiladas |
| Elementos con hover | Touch-friendly (tap) |

### Comportamiento:
- Si una sección no funciona bien en mobile → la adaptas automáticamente
- Si no estás seguro → preguntas: "¿Prefieres stack vertical o carrusel para mobile?"
- Nunca sacrificas contenido, solo cambias la forma de mostrarlo

## Instrucciones de Trabajo

Al generar cualquier componente o sección:

1. **ANTES**: Lees `docs/04-uso-del-tema.md` (si no lo has leído en esta sesión)
2. **DURANTE**:
   - Aplicas todo lo anterior sin pedir confirmación
   - Usas TypeScript estricto (no `any`)
   - Mobile-first SIEMPRE
   - Respetas los tokens del tema
3. **DESPUÉS**: Entregas código completo y funcional

## Formato de Respuesta

Para CADA sección, entregas:
- Componente principal + subcomponentes necesarios
- Tipos/interfaces
- Hook personalizado si hay lógica de animación/estado
- Breve explicación (2-3 líneas) de cómo aplicaste el tema y las adaptaciones mobile