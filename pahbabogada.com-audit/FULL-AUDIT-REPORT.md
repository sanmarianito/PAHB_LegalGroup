# Auditoría SEO — pahbabogada.com

**Fecha:** 24 de septiembre de 2026
**Alcance:** sitio en vivo (https://pahbabogada.com/) + repositorio local. El HTML en vivo es idéntico al del repo (commit `33b66bc`).
**Tipo de negocio detectado:** servicio profesional local (firma de abogados B2B: derecho inmobiliario, urbanístico y de los negocios, Colombia).

## Puntuación de salud SEO: **50 / 100**

| Categoría | Peso | Puntaje | Resumen |
|---|---|---|---|
| SEO técnico | 22% | 55 | Sin robots.txt ni sitemap; www y un espejo en GitHub Pages sirven contenido duplicado; URLs antiguas en 404 |
| Calidad de contenido / E-E-A-T | 23% | 40 | Una sola página; no hay bio de la abogada, credenciales, ciudad ni casos; sin blog ni FAQ |
| On-page | 20% | 60 | Title y description correctos; H1 sin palabra clave de intención ni ubicación; enlace de LinkedIn roto |
| Schema / datos estructurados | 10% | 45 | Existe `LegalService`, pero sin dirección, logo ni `Person`, y con imagen relativa |
| Rendimiento (CWV) | 10% | 55 | Lighthouse móvil 63: LCP 9,3 s, FCP 3,8 s, CLS 0, TBT 0 ms |
| Preparación para búsqueda con IA | 10% | 35 | Sin llms.txt, sin FAQ, sin datos citables ni autoría |
| Imágenes | 5% | 70 | Alt text correcto; OG 700×700 (se espera 1200×630); 100 JPG del separador cargados de golpe |

Lighthouse local (móvil, emulado): **Performance 63 · Accesibilidad 96 · Buenas prácticas 100 · SEO 100.**
El 100 de SEO en Lighthouse solo mide lo básico (title, meta, rastreabilidad). Los problemas de fondo están en arquitectura, contenido y duplicados.

---

## 1. SEO técnico

### Crítico / Alto

| # | Hallazgo | Evidencia | Impacto |
|---|---|---|---|
| T1 | **Espejo duplicado indexable en GitHub Pages** | `https://sanmarianito.github.io/PAHB/` y `/PAHB/asesoria.html` responden 200, con `robots: index, follow` y sin canonical. Tiene la meta description vieja y rota ("Somos un equipo jurídico experto a.") | Google puede indexar la versión vieja y repartir señales entre dos dominios |
| T2 | **www no redirige** | `https://www.pahbabogada.com/` → 200 (debería ser 301). `http://www` redirige a `https://www`, no al dominio raíz. Google ya muestra `www.pahbabogada.com` con el title antiguo "PAHB \| Abogada Inmobiliaria y de los negocios" | Host duplicado. El canonical ayuda pero no sustituye al 301 |
| T3 | **No existe robots.txt** | `/robots.txt` → 404 (página de Hostinger) | Sin indicaciones para rastreadores ni ruta al sitemap |
| T4 | **No existe sitemap.xml** | `/sitemap.xml` → 404 | Descubrimiento más lento; nada que enviar a Search Console |
| T5 | **URLs antiguas en 404** | `/asesoria.html` y `/servicios.html` (estructura anterior) → 404 | Se pierde el valor de enlaces y marcadores hacia esas URLs |
| T6 | **`index.html` duplica la home** | `/index.html` → 200 | Duplicado menor (el canonical lo mitiga) |

### Medio / Bajo
- **Página 404 genérica de Hostinger** (en inglés, sin marca ni enlaces de regreso).
- **Cabeceras de seguridad mínimas:** solo `CSP: upgrade-insecure-requests`. Faltan HSTS, `X-Content-Type-Options`, `Referrer-Policy` y `Permissions-Policy`.
- **Los videos `.mp4` no llevan `Cache-Control`**; CSS, JS e imágenes tienen solo 7 días (Lighthouse: "112 recursos con caché corta").
- `<meta name="keywords">` no aporta nada (Google lo ignora); solo revela a la competencia las palabras clave objetivo.
- Lo que funciona: HTTPS con 301 desde http, HTTP/2 y HTTP/3, Brotli en CSS/JS/SVG, `lang="es"`, viewport y canonical definidos.

## 2. Contenido y E-E-A-T

Para un despacho jurídico, Google aplica criterios YMYL: en temas legales la experiencia y la autoridad visibles pesan mucho.

| # | Hallazgo | Detalle |
|---|---|---|
| C1 | **Todo el sitio es una sola URL** | Seis áreas de práctica (inmobiliario, construcción, propiedad horizontal, societario, litigio, reorganización/insolvencia) compiten en una página. No hay forma de posicionar "abogado propiedad horizontal", "reorganización empresarial Ley 1116" o "estudio de títulos" con una sección de acordeón de 4 viñetas |
| C2 | **No se identifica a la abogada** | No hay bio, foto, universidad, especializaciones, años de experiencia, tarjeta profesional ni número de T.P. "Paula Hernández" solo aparece en el footer y en el schema. La búsqueda de marca "Paula Hernández abogada inmobiliaria" devuelve otras personas con ese nombre |
| C3 | **Sin ubicación geográfica** | No se menciona ciudad, dirección ni zona de servicio más allá de "Colombia". Toda la competencia posiciona con ciudad ("abogados inmobiliarios Medellín / Bogotá") |
| C4 | **Sin prueba social** | No hay casos, clientes, sectores atendidos, cifras (proyectos estructurados, copropiedades asesoradas), testimonios ni reseñas de Google |
| C5 | **Sin contenido informativo** | No hay blog, guías ni FAQ. Competidores como urbanlaw.com.co, affirmalegal.com y paezmora.co captan tráfico informativo ("Ley 675", "licencia urbanística", "conflictos con constructoras") |
| C6 | **Falta la política de tratamiento de datos (Ley 1581 de 2012)** | El formulario recoge nombre, email y teléfono sin aviso de privacidad ni autorización. Es un problema legal y de confianza, y más visible en un sitio de abogados |
| C7 | Contenido redundante | "Acompañamos integralmente a las empresas a tomar decisiones estratégicas…" aparece en el hero, en Nosotros, en la OG description y en el schema |

## 3. On-page

- **Title** (51 caracteres): "Abogada Inmobiliaria y Derecho de Negocios | PAHB". Correcto; falta ciudad.
- **Meta description** (147 caracteres): buena; falta ciudad y llamada a la acción.
- **H1:** "Derecho de los Negocios / Derecho Inmobiliario y Urbanístico". Describe áreas, no el servicio que se busca ("abogada inmobiliaria en [ciudad]"). Además los `<br>` sin espacio hacen que el `textContent` quede "…NegociosDerecho…".
- **Jerarquía de encabezados:** en general coherente (H1 → H2 por sección → H3 → H4). Los títulos de servicio están en `<span>` dentro de botones de acordeón, no en encabezados, así que pierden peso semántico.
- **Enlace roto:** LinkedIn en el footer apunta a `href="#"`.
- **Marca dispersa:** PAHB, "Paula Hernández Abogada", @paulahernandezabogada y el correo en `@paulahernandezabogada.com`. El dominio `paulahernandezabogada.com` (registrado desde 2019, correo en Google Workspace) **no tiene sitio web ni redirección**: se pierde a quien teclea el nombre.
- **Enlaces internos:** solo anclas (#). No hay enlaces a páginas propias porque no existen (ver C1).

## 4. Schema / datos estructurados

Actual: un bloque `LegalService` con nombre, teléfono, email, `areaServed: Colombia`, `serviceType` y `sameAs` (Instagram).

Problemas:
- `"image": "img/thumbnail.png"` es **relativa**; debe ser URL absoluta.
- Faltan `address` (PostalAddress), `geo`, `openingHoursSpecification` y `logo`, que son las señales clave para búsqueda local.
- No hay entidad `Person` (Paula Hernández, `jobTitle`, `alumniOf`, `knowsAbout`) vinculada con `founder`/`employee`.
- No hay `WebSite` ni `Organization` con `@id` para consolidar la entidad.
- `sameAs` solo incluye Instagram (faltan LinkedIn y el perfil de Google Business).
- No hay `FAQPage`. Google ya no muestra el rich result de FAQ para la mayoría de sitios, pero ayuda a los motores de IA.
- `hasOfferCatalog` con los 6 servicios podría detallar mejor las áreas de práctica.

## 5. Rendimiento (Lighthouse móvil, local)

| Métrica | Valor | Umbral "bueno" |
|---|---|---|
| FCP | 3,8 s | ≤ 1,8 s |
| **LCP** | **9,3 s** | ≤ 2,5 s |
| CLS | 0 | ≤ 0,1 ✅ |
| TBT | 0 ms | ✅ |
| Speed Index | 6,0 s | ≤ 3,4 s |
| Peso total | 2,9 MB / 121 peticiones | — |

Causas raíz:
1. **El hero entra con animación desde `opacity:0`** (logo, H1, subtítulo y CTA con `fadeUp/fadeDown` y retrasos de 0,3–1 s). Chrome no cuenta como LCP un elemento invisible, así que el LCP terminó siendo **el ícono de WhatsApp** a los 9,3 s.
2. **Google Fonts se carga con `@import` dentro de `styles.css`**: cadena HTML → CSS → CSS de fuentes → woff2 que bloquea el render (Lighthouse estima 2,26 s de ahorro).
3. **Separador de 100 JPG (1280×720, ~190 KB c/u, ~19 MB en total)** que `main.js` precarga todos en `DOMContentLoaded`, aunque el usuario nunca llegue a esa sección. Es muy costoso en datos móviles.
4. **Video de escritorio de 8,7 MB** sin cabeceras de caché.
5. `hero__logo` con `height=""` (vacío); Lighthouse lo marca como imagen sin dimensiones.

## 6. Imágenes

- Alt text correcto en logos; íconos decorativos con `alt=""` y `aria-hidden`. ✅
- **OG/Twitter image de 700×700** con `summary_large_image`: se recorta mal. Recomendado 1200×630.
- Favicon de 20×20 PNG: falta `apple-touch-icon` (180×180) y un 32/48 px para los resultados de Google (mínimo 48×48).
- Archivos sin uso en el repo: `hero2.webp`, `separador.mp4`, `PAHB_logo*.svg` y `PaulAbog_logo*.svg`. No afectan el SEO, pero ocupan espacio en el servidor.

## 7. Preparación para búsqueda con IA (GEO)

- Sin `llms.txt` (opcional; Google no lo usa, pero es barato).
- Sin respuestas directas a preguntas ("¿Cuánto cuesta…?", "¿Qué es un estudio de títulos?"). Los motores de IA citan pasajes autocontenidos de 40–80 palabras.
- Sin autoría ni credenciales, que son señales fuertes para citar fuentes en temas legales.
- Las modalidades de cobro (mensual, por hora, % de cartera) son buen material citable; conviene expandirlas en una página de honorarios o FAQ.
- robots.txt no existe, así que los crawlers de IA no están bloqueados. ✅

## 8. Accesibilidad con impacto SEO

- Un `<p>` falla el contraste de color (Lighthouse).
- El resto está bien: roles ARIA, `aria-expanded` en acordeones y labels en el formulario.

---

## Top 5 problemas críticos
1. Espejo duplicado indexable en `sanmarianito.github.io/PAHB/`.
2. `www` sin redirección 301 (Google ya indexa la versión www con el title viejo).
3. Sitio de una sola página: no puede posicionar ninguna de las 6 áreas de práctica.
4. Cero señales E-E-A-T y locales: ni bio, ni credenciales, ni ciudad, ni Google Business Profile vinculado.
5. LCP de 9,3 s en móvil por la animación del hero, las fuentes bloqueantes y la precarga de ~19 MB de frames.

## Top 5 quick wins (menos de 1 hora cada uno)
1. `.htaccess` con 301 de www a raíz, de `/index.html` a `/` y de las URLs antiguas a sus anclas.
2. Subir `robots.txt` y `sitemap.xml`.
3. Redirigir `paulahernandezabogada.com` a `pahbabogada.com` desde Google Domains/Squarespace DNS.
4. Arreglar LinkedIn `href="#"`, la imagen relativa del schema y `height=""` del logo.
5. Quitar la animación de opacidad del H1 y el subtítulo y cargar la fuente con `<link>` en el `<head>` en vez de `@import`.

---

**Fuentes externas consultadas:** búsqueda de marca y del sector (competidores: [urbanlaw.com.co](https://www.urbanlaw.com.co/), [paezmora.co](https://paezmora.co/), [affirmalegal.com](https://www.affirmalegal.com/blog/abogados-inmobiliarios-o-urbanisticos-en-colombia/), [lacco.co](https://lacco.co/abogados-inmobiliarios-medellin/), [pgplegal.com](https://www.pgplegal.com/servicios/urbanisticos-e-inmobiliarios)); resultado indexado [www.pahbabogada.com](https://www.pahbabogada.com/).
**Limitaciones:** la API de PageSpeed agotó su cuota, así que las métricas son de Lighthouse local (laboratorio), no datos de campo CrUX. Sin acceso a Search Console ni a datos de backlinks.
