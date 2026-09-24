# Auditoría técnica SEO — pahbabogada.com (post Fase 1)

**Fecha:** 24 de septiembre de 2026 · sitio en vivo, idéntico al repo local.
**Puntaje técnico: 73 / 100** (antes de la Fase 1: ~55)

| Categoría | Estado | Puntaje |
|---|---|---|
| Rastreabilidad | pass | 90 |
| Indexabilidad | warn | 70 |
| Seguridad | pass | 85 |
| Estructura de URLs | pass | 85 |
| Móvil | warn | 80 |
| Core Web Vitals (lab) | fail | 40 |
| Datos estructurados | warn | 70 |
| Renderizado JS | pass | 100 |
| IndexNow | fail | 30 |

## Verificado en vivo ✅
- `http://`, `https://www`, `/index.html` → 301 a `https://pahbabogada.com/`.
- `/asesoria.html` y `/servicios.html` → 301 a `/#asesoria` y `/#servicios` (el `#` sin codificar).
- `robots.txt` 200 (text/plain); `sitemap.xml` 200, urlset válido y declarado en robots.txt.
- URL inexistente → **404 real** con página propia en español y `noindex`.
- `.htaccess` no es accesible públicamente (403).
- Cabeceras: HSTS (1 año), `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `CSP: upgrade-insecure-requests`.
- Caché de 1 año aplicada a `.mp4` y `.jpg`.
- TLS Let's Encrypt válido hasta el 6 de noviembre de 2026 (renovación automática de Hostinger).
- Sin contenido mixto y sin `pushState`/`replaceState` (sin riesgo de back-button hijacking).
- Todo el contenido, el canonical, el título y el JSON-LD están en el HTML inicial, sin depender de JS.
- Agent-UX: 100/100 (botones y enlaces reales, formularios con label).

## Crítico
1. **El espejo de GitHub Pages sigue vivo**: `https://sanmarianito.github.io/PAHB/` → 200, indexable y sin canonical. Es el único problema de indexación grave que queda. Solución: repo `sanmarianito/PAHB` → Settings → Pages → Source: None.

## Alto
2. **LCP 9,3 s / FCP 3,7 s en móvil** (Lighthouse 12, lab; Performance 64). El elemento LCP sigue siendo el ícono de WhatsApp porque:
   - `.hero__title`, `.hero__subtitle`, `.hero__intro` y `.hero__logo` empiezan con `opacity:0` (animaciones `fadeUp`/`fadeDown` con 0,3–1 s de retraso);
   - Google Fonts se carga con `@import` en `styles.css` y bloquea el render (2,25 s estimados).
   Es la tarea principal de la Fase 2.1.
3. **`paulahernandezabogada.com` sin redirección** (no tiene registro A). Hay que configurar el reenvío 301 en su DNS sin tocar los MX.

## Medio
4. **`http://www` hace 2 saltos** (`http://www` → `https://www` → `https://`). El primero lo hace el CDN de Hostinger antes de leer `.htaccess`. No es grave, pero se puede dejar en un salto desactivando "Forzar HTTPS" en hPanel, porque el `.htaccess` ya lo cubre.
5. **Contraste insuficiente** en `.footer__bottom p`: #666 sobre #0c0f0f da 3,35:1 (mínimo 4,5:1). Cambiar a `var(--outline)` (#9b9078) o a un tono #8a8a8a o más claro.
6. **Caché corta en `.webp`, `.svg`, CSS y JS** (7 días). El CDN de Hostinger sigue devolviendo `max-age=604800` para webp y svg pese al `.htaccess`, probablemente por su propia caché. Con el CSS versionado (`?v=`) conviene subir CSS y JS a 1 año.
7. **Servicios dentro de acordeones cerrados**: Google indexa el contenido oculto, pero le da menos peso y no lo usa para enlaces "Leer más". Se resuelve con las páginas por servicio de la Fase 2.2.
8. **Datos estructurados incompletos**: falta `streetAddress`, `geo`, horario y `sameAs` de Google Maps y LinkedIn (datos pendientes del cliente).

## Bajo
9. **IndexNow no implementado**: sirve para Bing, Yandex y Naver, y Bing alimenta Copilot y ChatGPT Search. Registrar el sitio en Bing Webmaster Tools (importar desde Search Console) y opcionalmente publicar una clave IndexNow.
10. Falta `X-Frame-Options: SAMEORIGIN` (o `frame-ancestors` en CSP).
11. `llms.txt` ausente (opcional; Google no lo usa).
12. Imágenes: 35 KiB de ahorro posible (Lighthouse `image-delivery-insight`); favicon de 20×20 (Google pide un mínimo de 48×48).
