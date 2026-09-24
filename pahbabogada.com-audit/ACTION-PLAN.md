# Plan de mejora SEO — pahbabogada.com

Ordenado por impacto y esfuerzo. Los detalles de cada hallazgo están en `FULL-AUDIT-REPORT.md`.

> **Contexto confirmado:** la firma atiende en **Medellín**. Ya existe un perfil de Google Business, pero hoy no se tiene acceso.
> **Pendiente:** la dirección exacta tal como aparece en ese perfil. El nombre, la dirección y el teléfono (NAP) del sitio deben coincidir letra por letra con los del perfil.

---

## Fase 1 — Correcciones críticas (semana 1)

### 1.1 Crear `.htaccess` en la raíz (Hostinger lo respeta)
```apache
RewriteEngine On
# www -> dominio raíz
RewriteCond %{HTTP_HOST} ^www\.pahbabogada\.com$ [NC]
RewriteRule ^(.*)$ https://pahbabogada.com/$1 [R=301,L]
# /index.html -> /
RewriteCond %{THE_REQUEST} \s/index\.html [NC]
RewriteRule ^index\.html$ / [R=301,L]
# URLs de la versión anterior
Redirect 301 /asesoria.html /#asesoria
Redirect 301 /servicios.html /#servicios

ErrorDocument 404 /404.html

<IfModule mod_headers.c>
  Header always set Strict-Transport-Security "max-age=31536000"
  Header set X-Content-Type-Options "nosniff"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType video/mp4 "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>
```
Cuando existan páginas propias por servicio (Fase 2), cambiar esas redirecciones para que apunten a ellas.

### 1.2 Eliminar el duplicado de GitHub Pages
En el repo `sanmarianito/PAHB`, desactivar GitHub Pages (Settings → Pages → None) o reemplazar sus HTML por uno con
`<meta name="robots" content="noindex">` + `<link rel="canonical" href="https://pahbabogada.com/">` + `<meta http-equiv="refresh" content="0; url=https://pahbabogada.com/">`.

### 1.3 `robots.txt` y `sitemap.xml`
```
User-agent: *
Allow: /
Sitemap: https://pahbabogada.com/sitemap.xml
```
Hacer un sitemap con la home ahora y ampliarlo con cada página nueva.

### 1.4 Google Search Console y Bing Webmaster
Verificar el dominio (propiedad de tipo *Dominio*), enviar el sitemap y pedir indexación de la home para que Google cambie el title viejo que muestra de www.

### 1.5 Dominio con el nombre de la abogada
En el DNS de `paulahernandezabogada.com` (Google Domains/Squarespace), configurar reenvío 301 a `https://pahbabogada.com/`. **No tocar los registros MX**, que sostienen el correo.

### 1.6 Arreglos en `index.html` (15 min)
- LinkedIn: cambiar `href="#"` por la URL real, o quitar el ícono.
- Schema: `"image": "https://pahbabogada.com/img/thumbnail.png"`.
- `hero__logo`: poner `height` real (o quitarlo junto con `width` y dejar solo CSS).
- Quitar `<meta name="keywords">`.

### 1.7 Política de tratamiento de datos (Ley 1581 de 2012)
Crear `/politica-de-privacidad.html` y agregar al formulario un checkbox obligatorio de autorización con enlace a esa política. Enlazarla también desde el footer.

---

## Fase 2 — Mejoras de alto impacto (semanas 2–3)

### 2.1 Rendimiento (objetivo: LCP < 2,5 s en móvil)
1. **Hero sin opacidad inicial:** quitar `animation: fadeUp` de `.hero__title` y `.hero__subtitle`, o animar solo `transform` (no `opacity`) para que el H1 cuente como LCP desde el primer render.
2. **Fuentes:** quitar el `@import` de `styles.css` y en el `<head>` poner `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap">`, con solo los pesos que se usan. Mejor aún: autoalojar el woff2 y hacer `preload`.
3. **Separador:** no precargar los 100 frames en `DOMContentLoaded`. Empezar la carga cuando el `IntersectionObserver` detecte que la sección está a unos 1000 px; convertir los frames a WebP a 960 px de ancho (≈ −70 % de peso) o reducirlos a 50.
4. **Video de escritorio:** recomprimir `intro__desktop.mp4` (8,7 MB) a ≤ 2 MB con H.264 CRF 28 a 1280 px, o servir WebM/AV1. Añadir `preload="none"` o `metadata`.
5. Añadir `apple-touch-icon` de 180×180 y un favicon de 48×48 o más.

### 2.2 Arquitectura: una página por área de práctica
Pasar de una sola página a un sitio multipágina. Estructura propuesta:

| URL | Keyword principal | Contenido mínimo |
|---|---|---|
| `/` | abogada inmobiliaria Medellín | Resumen, áreas con enlace a cada una, bio corta, CTA |
| `/derecho-inmobiliario/` | abogado derecho inmobiliario Medellín | Estructuración de proyectos, fiducia, estudios de títulos, compraventas; FAQ |
| `/derecho-urbanistico/` | abogado urbanístico Medellín / licencias de construcción Medellín | Curadurías urbanas de Medellín, Departamento Administrativo de Planeación, POT (Acuerdo 48 de 2014), sanciones urbanísticas |
| `/contratos-de-construccion/` | abogado contratos de construcción Medellín | Obra civil, suministro, pólizas, reclamaciones |
| `/propiedad-horizontal/` | abogado propiedad horizontal Medellín | Reglamentos, Ley 675 de 2001, coeficientes, asambleas, cartera |
| `/derecho-societario-comercial/` | abogado societario Medellín / contratos comerciales | Constitución, reformas, fusiones, actas (Cámara de Comercio de Medellín) |
| `/reorganizacion-empresarial/` | reorganización empresarial Ley 1116 Medellín | Insolvencia, liquidación, negociación de deudas (Supersociedades, Intendencia Medellín) |
| `/litigio-y-cobro-de-cartera/` | cobro de cartera empresas Medellín | Proceso, honorarios por éxito, ejecución de garantías |

Usar "Medellín" en la keyword principal sin forzarla en cada párrafo. Mencionar el Valle de Aburrá (Envigado, Sabaneta, Itagüí, Bello, Rionegro) solo si de verdad atienden allí.

**Home — title y H1 propuestos:**
- Title: `Abogada Inmobiliaria en Medellín | Derecho Urbanístico y de Negocios | PAHB` (~70 caracteres; si se prefiere ≤60: `Abogada Inmobiliaria en Medellín | PAHB`)
- Meta description: `Asesoría jurídica inmobiliaria, urbanística y empresarial en Medellín: contratos, propiedad horizontal, licencias y reorganización. Agende su consulta.`
- H1: `Abogada inmobiliaria y de los negocios en Medellín`
| `/paula-hernandez/` | Paula Hernández abogada | Bio, formación, T.P., trayectoria, foto profesional |
| `/honorarios/` o sección FAQ | cuánto cobra un abogado inmobiliario | Las 5 modalidades explicadas |
| `/contacto/` | — | Formulario, mapa, horario, WhatsApp |

Cada página debe tener su title y description propios, un H1 con la keyword, 600–1.200 palabras, 3–5 preguntas frecuentes, un CTA, enlaces a los servicios relacionados y schema `Service` + `BreadcrumbList`.

### 2.3 Schema ampliado (en la home)
Grafo JSON-LD con `@id`:
- `LegalService` con `address`, `geo`, `openingHoursSpecification`, `logo`, `image` absoluta, `founder` → Person, `hasOfferCatalog` con los 6 servicios y `sameAs` (Instagram, LinkedIn, Google Business).
- `Person` para Paula Hernández: `jobTitle`, `alumniOf`, `knowsAbout`, `sameAs` LinkedIn.
- `WebSite` con `name` y `url`.

### 2.4 SEO local (Medellín)

**Recuperar el acceso al perfil de Google Business (prioridad; puede tardar días):**
1. Buscar el correo que lo creó: probar a entrar en business.google.com con `gerenciajuridica@paulahernandezabogada.com` (Google Workspace), con el Gmail personal de Paula y con el de quien haya hecho el sitio o la agencia anterior.
2. Si no aparece: en Google Maps, abrir el perfil → "¿Eres el propietario de esta empresa?" → **Solicitar acceso**. Google avisa al propietario actual; si no responde en 3–7 días, se habilita la verificación (llamada, video o correo postal).
3. Una vez dentro, agregar un **segundo propietario** para no volver a quedar sin acceso.

**Qué hacer con el perfil una vez recuperado:**
- Categoría principal "Abogado"; secundarias "Abogado de bienes raíces", "Abogado comercial" y "Abogado de empresas".
- Nombre, dirección y teléfono idénticos a los del sitio (el teléfono `310 444 2859`).
- Sitio web: `https://pahbabogada.com/` (con UTM `?utm_source=gbp&utm_medium=organic` para medirlo en Analytics).
- Servicios: los 6 de la web, cada uno con su descripción.
- Fotos reales: oficina, Paula, equipo. Una publicación cada 2 semanas (puede reutilizar los artículos del blog).
- Reseñas: pedirlas por WhatsApp con el enlace directo (meta: 10 en 60 días) y responder todas.

**Mientras tanto, sin acceso al perfil:**
- Poner "Medellín" en title, H1, footer, schema (`addressLocality: Medellín`, `addressRegion: Antioquia`, `addressCountry: CO`) y en la página de contacto con un mapa de Google embebido.
- Copiar la **URL pública del perfil** de Maps (se ve sin acceso) y agregarla al `sameAs` del schema y como enlace "Ver en Google Maps" en el footer.
- Citaciones locales con el mismo NAP: Páginas Amarillas Colombia, Cylex, directorios de abogados, Cámara de Comercio de Medellín para Antioquia, Colegio de Abogados de Medellín (si hay membresía), Apple Business Connect y Bing Places (este último se puede importar desde Google cuando haya acceso).

### 2.5 Social y OG
- Imagen OG de 1200×630 con logo y lema.
- Completar el perfil de LinkedIn de la firma y el personal, y enlazarlos.

---

## Fase 3 — Contenido y autoridad (mes 2 en adelante)

### 3.1 Blog o centro de recursos (2 artículos al mes)
Temas con demanda y relación directa con los servicios:
1. ¿Qué es un estudio de títulos y cuándo lo necesita?
2. Cómo reformar el reglamento de propiedad horizontal (Ley 675 de 2001).
3. Reorganización empresarial (Ley 1116): requisitos y pasos.
4. Fiducia inmobiliaria en preventas: qué debe revisar el comprador y el constructor.
5. Licencia de construcción ante curaduría: trámite y errores comunes.
6. Cobro de cartera en copropiedades: pasos prejurídicos y jurídicos.
7. Cláusulas clave en un contrato de obra civil.
8. Derecho del consumidor frente a constructoras: garantías y reclamaciones.
9. Curadurías urbanas en Medellín: cuál le corresponde y cómo radicar una licencia.
10. Qué cambia el POT de Medellín para un proyecto inmobiliario (usos del suelo, cargas y obligaciones urbanísticas).
11. Plusvalía y contribución de valorización en Medellín: cuándo aplican a un proyecto.

Cada artículo debe llevar autora con enlace a su bio, fecha de actualización, enlace a la página de servicio relacionada y una respuesta directa de 40–60 palabras al inicio (citable por IA).

### 3.2 Señales de confianza
- Casos o proyectos (anonimizados si hace falta): tipo de proyecto, reto y resultado.
- Sectores atendidos y logos de clientes, si lo autorizan.
- Testimonios con nombre y cargo.

### 3.3 Enlaces entrantes
- Artículos invitados en medios del sector (Camacol regional, gremios de propiedad horizontal, revistas de construcción).
- Perfiles en directorios jurídicos.
- Charlas o capacitaciones (ya ofrecen "capacitación en temas jurídicos") publicadas con enlace al sitio.

### 3.4 IA / GEO
- `llms.txt` con resumen de servicios y URLs.
- Sección FAQ con respuestas autocontenidas en cada página de servicio.

---

## Fase 4 — Monitoreo (continuo)
- Search Console: revisión mensual de consultas, páginas indexadas y Core Web Vitals.
- PageSpeed Insights y CrUX después de cada cambio en el hero o en los medios.
- Seguimiento de la posición en 10–15 keywords objetivo (con ciudad).
- Revisión trimestral del perfil de Google Business: fotos, publicaciones, respuestas a reseñas.

---

## Resumen de esfuerzo

| Fase | Esfuerzo estimado | Impacto esperado |
|---|---|---|
| 1 — Críticos | 3–4 h | Elimina duplicados, habilita la indexación correcta y cumple la Ley 1581 |
| 2 — Alto impacto | 3–5 días | LCP en verde, 8–10 páginas posicionables y presencia en el map pack local |
| 3 — Contenido | 4–8 h al mes | Tráfico informativo, autoridad y citas en IA |
| 4 — Monitoreo | 1 h al mes | Detección temprana de regresiones |
