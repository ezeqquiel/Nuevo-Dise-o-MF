# NOTAS v1 — MF - Soluciones Eléctricas

Fecha: 2026-11-05 · Basado en `assets/BRIEF-MF-Soluciones-Electricas.md`.

## Reseñas de Google (2026-11-06)

- **Sección nueva en `#opiniones`** (reemplaza los 3 testimonios [[PENDIENTE]] y el link a Instagram): título "Lo que dicen nuestros clientes", bajada "Reseñas reales de clientes en Google.", resumen (5,0 + 5 estrellas + "8 reseñas en Google" + pin "Google" en tipografía neutra, no el logo oficial), 6 tarjetas y CTAs "Ver todas las reseñas en Google" y "¿Ya trabajamos juntos? Dejanos tu reseña".
- **Datos en `js/resenas.js`**, copiados tal cual del pedido: 6 reseñas reales, textos sin corregir, puntaje 5 y cantidad 8 (2 son solo estrellas). **Se actualizan a mano**: revisar el perfil cada 1–2 meses (ver README).
- **Tarjetas:** avatar con silueta de hombre o de mujer según el campo `avatar` de cada reseña (lo definió Ezequiel, no se deduce del nombre; "Arroyito Querido", que es una cuenta, va con hombre; sin el campo va un ícono genérico), sobre 3 colores de la paleta alternados; nombre, fecha, estrellas, texto y "Publicada en Google". Texto recortado a 5 líneas con "Leer más" / "Leer menos" (`aria-expanded`, `aria-controls`); el botón aparece solo si el texto realmente se corta, y se recalcula al cambiar el ancho. Hoy se corta solo en mobile (la de Javier R.). Las de hasta 40 caracteres ("Excelentes profesionales", "Los mejores de Rosario") van como cita destacada; las comillas son decorativas (CSS), el texto no cambia.
- **Layout:** carrusel con scroll-snap hasta 899 px (85 % de ancho en mobile, 46 % en tablet: asoma la siguiente), enfocable con teclado; grilla 3 × 2 con alturas parejas desde 900 px. Aparición al scrollear sobre el bloque entero (no por tarjeta, para que las del carrusel no queden invisibles al deslizar).
- **Bug encontrado y resuelto:** los `.sr-only` de las estrellas (absolutos) se escapaban del recorte del carrusel y en mobile ensanchaban la página a 1440 px. El carrusel lleva `position: relative`. Los tests ahora miden el desborde también después de recorrer la página, no solo al cargar.
- **Hero:** badge "★ 5,0 en Google · 8 reseñas" debajo del botón de WhatsApp, lleva a `#opiniones`. Fondo azul semitransparente con blur para leerse sobre cualquier foto.
- **Mapa:** ya es el del **perfil real** de MF ("Electricista Matriculado Rosario MF", con el pin), responsive: 4/3 en mobile y 16/10 en desktop, sin borde, radio de las tarjetas, `title` accesible y el filtro suave en modo oscuro. Abajo, "Ver en Google Maps" → perfil.
- **Schema:** perfil de Google sumado a `sameAs`. **Sin** `aggregateRating` ni `review` (a propósito: Google no muestra estrellas autopublicadas y puede tomarlo como markup engañoso).
- **Pendiente:** el link directo para dejar reseña (`g.page/r/.../review`). Hoy "Dejanos tu reseña" abre el perfil (comentario PENDIENTE en `resenas.js`).
- **Verificado:** `test13` (49 chequeos): 6 tarjetas con el texto exacto, resumen 5,0 y 8 reseñas sin números escritos a mano en el HTML, "Leer más" con clic y teclado (con una reseña larga de prueba inyectada), carrusel con scroll-snap y swipe táctil, links al perfil con `noopener`, badge → `#opiniones`, schema, mapa del perfil con proporciones y filtro, sin desborde en 360/768/1440 en claro y oscuro, consola sin errores. `test11` (72, incluye contraste AA en ambos temas) y `test12` (56) siguen en verde; `html-validate` sin errores.

## Datos completados con Ezequiel (2026-11-05)

- **WhatsApp:** Emanuel +54 341 545-0692 (`5493415450692`) y Pablo +54 341 662-5755 (`5493416625755`), en `js/config.js`. Se sacó la nota de pendiente de Contacto.
- **Nosotros:** "15+ años de experiencia" y "500+ trabajos realizados" (el "+" queda fuera del contador animado). El texto suma "con más de 15 años en el rubro".
- **Respuesta:** se suavizó a "te respondemos lo antes posible".
- **Garantía:** nueva tarjeta en Nosotros, "Garantía en nuestros trabajos", sin plazo (así lo pidieron).
- **Matrícula:** confirmado que los dos están matriculados. Queda solo en el SEO, sin número de matrícula (pedido explícito).
- **Logo:** la lamparita de colores **es** el logo real. Se usa en header y footer (`assets/logo/logo-mf-claro.png`, con las líneas de la base en blanco para el fondo oscuro) y como favicon (`assets/favicon.png`) y apple-touch-icon. Fuente: `assets/img/navbar-logo.png` (250 px). Se borraron `favicon.svg` y `logo-placeholder.svg`.
- **Avatares:** salen de las fotos de perfil de WhatsApp (`assets/obras MF/Ema y Pablo/`, versiones 400×400). Los recortes se veían muy zoomeados (y en la de Pablo la bebé ocupa la mitad derecha), así que por decisión de Ezequiel los dos van con la **inicial ("E" / "P")**: `foto: ""` en `CONFIG.socios`. El soporte de foto queda listo por si más adelante pasan fotos nuevas.
- **Se queda como estaba, a pedido:** testimonios (pendientes), formulario solo por WhatsApp, Google: tienen perfil pero sin reseñas, así que por ahora no se pone link.
- **Sin dato todavía:** email y dominio.

## Galería v1.2 — una carpeta = una obra

- **Modelo:** cada subcarpeta de `assets/obras MF/` es un objeto de `OBRAS` con `portada` y `fotos` (álbum). Las fotos optimizadas están en `assets/obras/<slug>/01.jpg…`, en el mismo orden que los originales (orden numérico de 1.jpeg, 2.jpeg, ...). Entran **las 22 fotos** de las 6 obras, incluidas las que en la primera pasada había dejado afuera (vista al río, luminarias 1 y casi duplicadas): dentro del álbum de su obra tienen sentido.
- **Obras:** Proyecto Entre Ríos (Obras, 4) · Armado de circuito y colocación de tiras LED (LED e iluminación, 6) · Instalaciones residenciales y comerciales (Interiorismo, 3) · Instalación de nuevas luminarias (LED e iluminación, 5) · ¿Te mudaste y no tenés servicio eléctrico? (Hogares, 2) · Precisión en cada detalle (Obras, 2).
- **Títulos:** el nombre de la carpeta, prolijo. En "Armado de circuito y colocación **de** tiras LED" se agregó el "de"; a "Obra 1 - Proyecto Entre Rios" se le sacó "Obra 1 -"; "te mudaste y no tenes servicio electrico" quedó como pregunta, igual que en el posteo.
- **Una categoría y una descripción por obra:** antes, fotos de una misma carpeta caían en categorías distintas. Quedó una por obra, la que ya tenía la mayoría de sus fotos (residenciales → Interiorismo, como su foto principal). Las descripciones son las que ya estaban, unidas cuando la carpeta tenía varias. No se agregaron datos.
- **Portadas:** Entre Ríos 01, tiras LED 01, residenciales 03 (living terminado), luminarias 05 (pasillo limpio, sin texto), te mudaste 01, precisión 01.
- **"Ema y Pablo" no es una obra:** es la foto del equipo. Quedó solo en Nosotros, movida a `assets/equipo/ema-y-pablo.jpg`, sin tarjeta. Por eso la galería tiene 6 tarjetas para 7 carpetas.
- **Grilla:** una tarjeta por obra con portada, categoría, título e indicador "N fotos" (ícono nuevo `#i-images`). 1 columna en mobile, 2 en tablet y 3 en desktop. La destacada (Entre Ríos) ocupa 2×2 en desktop, así que 6 obras arman un 3×3 sin huecos. Se sacó el campo `formato`, que ya no hace falta.
- **Álbum (lightbox):** foto grande, categoría, título, descripción, contador "2 / 5", flechas (botones, ← → del teclado y swipe en mobile, con vuelta circular) y una tira de miniaturas para saltar a cualquier foto (scroll horizontal en mobile, centrada en desktop; la activa lleva borde amarillo y `aria-current`). Con una sola foto no se muestran flechas ni miniaturas. En mobile las flechas van al lado del título para no tapar la foto. Accesibilidad igual que antes: trap de foco, Escape, click afuera y el foco vuelve a la tarjeta.
- **Hero:** una foto por cada obra con `hero: true` (su `portada`, o `heroFoto`). Hoy son 4: Entre Ríos 01 (la primera, en el HTML con prioridad de carga), tiras LED 03 (`heroFoto`, porque la 01 recortada a lo ancho mostraba solo pared), residenciales 03 y luminarias 05. La foto de Ema y Pablo salió del hero porque no es una obra.
- **Antes/después:** se quitó el comparador (JS y CSS): no hay pares reales y el álbum lo reemplaza. Si algún día traen un antes/después, se carga como un álbum de dos fotos.
- **Recortes:** se mantienen los 4 recortes del texto de IG (te mudaste 01 y 02, luminarias 02 y 04). Luminarias 01 tiene el texto en el medio de la foto y quedó como está (no es portada).
- **Verificado:** `test12` (56 chequeos). Cubre: una tarjeta por carpeta de obra; cada álbum coincide con los archivos de su carpeta, en orden; las 22 fotos originales están en algún álbum; badge "N fotos"; filtros por obra y "Comercios" oculto; el álbum recorre todas las fotos con → y ←, con miniaturas y botones; trap de Tab; Escape y foco de vuelta; swipe a izquierda y derecha; tira de miniaturas con scroll propio en 360 px sin salirse de la pantalla; hero con una foto por obra; sin scroll horizontal en 360/768/1440, en claro y oscuro; consola sin errores ni 404. Además `test11` (72 chequeos de v1.1) sigue en verde y `html-validate` da 0 errores.

## Fotos reales (v1.2, primera pasada: una ficha por foto; reemplazada por la sección de arriba)

- **Origen:** carpeta `assets/obras MF/` que pasó el cliente (originales intactos). Se optimizaron 17 fotos a JPG progresivo (35–115 KB c/u) en `assets/obras/` con nombres sin espacios ni tildes. Se borraron los 13 placeholders SVG.
- **Galería (`js/obras.js`):** 17 trabajos. Títulos tomados del nombre de cada carpeta; descripciones solo con lo que se ve en la foto o lo que dice el texto del posteo de Instagram (no se inventaron datos de obra). Categorías: LED e iluminación (tiras LED, luminarias), Obras (Proyecto Entre Ríos, Precisión en cada detalle, puntos en edificio), Hogares (conexión provisoria, instalación residencial), Interiorismo (listones con LED, living de diseño).
- **Filtro "Comercios":** no hay fotos de comercios, así que el JS oculta solo cualquier filtro sin trabajos. Vuelve a aparecer cuando se cargue una obra con `categoria: "comercios"`.
- **Recortes:** 4 fotos tenían el texto del posteo de IG impreso (conexión provisoria ×2, luminarias ×2) y se pisaba con el título de la ficha. Se recortó esa franja; el texto quedó en la descripción.
- **No usadas:** la vista al río (carpeta tiras LED, foto 6: no muestra trabajo), la foto 1 de luminarias (movida) y duplicados casi iguales (LED 4, luminarias 3, residencial 2, Entre Ríos 4). Están en `assets/obras MF/` por si las quieren sumar.
- **Hero:** 4 fotos con `hero: true` → Ema y Pablo trabajando (primera, con prioridad de carga), living con tiras LED, Proyecto Entre Ríos y living de diseño. Las fotos miden ~850 px: en pantallas grandes se ven algo suaves (el overlay oscuro lo disimula). Con originales en más resolución mejora.
- **Nosotros:** la foto de Emanuel y Pablo trabajando reemplaza el placeholder.
- **og-image:** `assets/og-image.jpg` regenerada en 1200×630 a partir de la foto de Ema y Pablo.
- **Antes/después:** se sacó la ficha de ejemplo (no hay pares reales). El comparador sigue funcionando si se carga un par.
- **Verificado:** 72 chequeos automáticos OK (todas las fotos cargan, primer slide del HTML = primera obra hero, filtro vacío oculto, lightbox navega dentro del filtro).

## Cambios v1.1

### Qué cambió
- **Hero con carrusel de obras de fondo:** pasa cada 2 s con fundido cruzado de 700 ms y un zoom leve (5 %). Tiene overlay azul oscuro (más denso a la izquierda en desktop, parejo en mobile) e indicador de rayitas. Se sacó la ilustración de circuitos. Las fotos salen de `OBRAS` con `hero: true` (si no hay, las `destacado: true`). La primera se carga con `fetchpriority="high"` y el resto se precarga de a una (entra a la rotación cuando ya está lista). El carrusel se pausa con la pestaña oculta. Con `prefers-reduced-motion` queda la primera foto fija. Las fotos son decorativas (`alt=""`, `aria-hidden`).
- **Hero más limpio:** un único CTA ("Escribinos por WhatsApp", más grande). Se sacaron "Pedí tu presupuesto" y "Trabajamos con estudios de arquitectura". La franja de confianza queda: zona · horario.
- **Todo empuja a WhatsApp:** se agregó "¿Querés algo así? Escribinos" en Obras. En Contacto, WhatsApp va primero (tarjetas de Emanuel y Pablo + urgencia) y el formulario pasa a ser "¿Preferís dejarnos los datos?". El título de la sección ahora es "Escribinos por WhatsApp".
- **Selector Emanuel / Pablo:** todos los `data-wa` (header, hero, urgencias, servicios, obras, contacto, footer, flotante) y el envío del formulario abren "¿Con quién querés hablar?". En mobile es un bottom sheet y en desktop un modal chico. Cada opción abre `wa.me` del socio con el mensaje del contexto (`data-wa-mensaje`: urgencia, servicio, obra o datos del formulario). La lógica está en una sola función (`initSelectorWhatsApp` → `abrir(mensaje, desde)`). Las tarjetas de Contacto llevan un botón directo por socio, sin selector.
- **Datos:** `CONFIG.socios` reemplaza a `whatsappNumero`/`telefonoVisible`. Emanuel (el primero) es el número por defecto.
- **Horario:** "Lunes a Sábados · 09 a 16 hs" en hero, contacto, footer y `config.js`. `openingHours` sigue `Mo-Sa 09:00-16:00`.
- **Modo oscuro / claro automático** (`prefers-color-scheme`), con variables semánticas (`--bg`, `--bg-alt`, `--surface`, `--text`, `--text-muted`, `--border`, `--input-bg`, `--header-bg`, ...). En oscuro todo va en azules (secciones 900/800 alternadas y secciones "oscuras" en un azul aún más profundo, `#071226`, para mantener el ritmo), tarjetas `#152E57` y amarillo para acentos. Se agregaron `color-scheme` y dos `theme-color`.
- **SEO "matriculados":** en title, meta description, OG/Twitter y `description` del JSON-LD. No aparece en el contenido visible.
- **JSON-LD:** `telephone` (Emanuel) y `employee` (Emanuel y Pablo) se completan desde `config.js` al cargar la página. Google ejecuta JS para leer datos estructurados.

### Decisiones
- **Un único lugar para los números vs. "sin JS apunta a Emanuel":** se priorizó que `config.js` sea el único lugar a tocar. Los `href` de WhatsApp se completan con JS apuntando a Emanuel (sirve para clic del medio, "copiar enlace", etc.). Sin JS, el HTML no tiene números y los botones llevan a `#contacto`. Para que funcionara sin JS habría que repetir el número en el HTML (8 veces), que es justo lo que se quería evitar.
- **Selector con `<dialog>` nativo:** abierto con `showModal()`, el navegador ya lo expone como `role="dialog"` + `aria-modal="true"` (escribirlos a mano da error de validación por redundantes). Tiene `aria-labelledby` al título, foco en la primera opción, trap de Tab explícito, Escape, click afuera y ✕, y el foco vuelve al botón que lo abrió. El mismo trap de Tab se sumó al lightbox.
- **Avatar:** inicial del nombre en un círculo con borde amarillo hasta tener fotos.
- **Frase del selector:** "Si uno está en una obra, probá con el otro. Joya." En todo el sitio quedan 2 "Joya" y 1 "Genial".
- **Hero en mobile:** el texto ocupa todo el ancho, por eso el overlay es parejo (84 % + degradé abajo) en vez de izquierda→derecha. En desktop es 94 % → 40 %.
- **Logos de estudios:** en claro se ven en gris oscuro sobre blanco y en oscuro en blanco sobre el azul de la tarjeta (filtros CSS + `mix-blend-mode`). Ya no pasan a color en hover, porque el brief v1.1 define blanco/gris por tema.
- **Lightbox:** queda oscuro en ambos temas (es un visor de fotos). El selector toma los colores del tema.
- **Mapa:** en oscuro, `brightness(.85) contrast(1.1)`.
- **Botón para elegir tema a mano:** no se hizo. Queda como posible mejora (con guardar la elección en `localStorage`).

### Verificado (v1.1, Chrome headless, 69 chequeos)
- Carrusel: avanza a los 2 s, fundido de 700 ms, se pausa con la pestaña oculta y queda fijo con reduced-motion. Primera foto con prioridad y sin lazy.
- Los 8 disparadores `data-wa` abren el selector con foco en Emanuel y el mensaje correcto. Escape devuelve el foco. ✕, click afuera y trap de Tab funcionan. En 360 px sale como bottom sheet y en 1440 como modal centrado de 420 px. Con números de prueba distintos, elegir Pablo abre el chat de Pablo.
- Formulario: inválido no abre nada; válido abre el selector con los datos en las dos opciones.
- Sin "Lu a Sá", sin "presupuesto" y sin precios. "Matriculados" solo en el SEO. Contraste AA de todo el texto en claro y oscuro (360 y 1440). Sin scroll horizontal en 360, 768, 1024 y 1440 en ambos temas. Consola limpia y `html-validate` sin errores.

## Decisiones tomadas

- **Sitio anterior archivado.** El CSS/JS del sitio viejo (Barlow, naranja, EmailJS, Font Awesome) se movió a `_version-anterior/` en lugar de borrarlo. El `index.html` viejo ya no estaba en la carpeta cuando empezó la v1. `assets/img/` queda intacto (fotos originales de 4–5 MB); no se usa en la v1.
- **Logos de estudios:** se usaron los archivos que había (`assets/img/DIKA.jpg`, `M..jpg`, `MALAWI.jpg`), copiados a `assets/estudios/`. Son cuadrados de 500 px con fondo propio, así que se muestran como "fichas" en lugar de logos sueltos. En desktop pasan de gris a color con hover; en mobile/táctil se ven siempre a color. Ideal: pedir versiones SVG/PNG transparentes.
- **Logo MF:** la "lamparita de colores" (`navbar-logo.png`, `logo1200x630MF.png`) es un ícono de stock que no coincide con la marca, así que no se usó. El logo es un placeholder de texto ("MF" en recuadro amarillo + "Soluciones Eléctricas"). También hay un SVG en `assets/logo/logo-placeholder.svg`.
- **Fotos de obras:** 12 placeholders SVG generados en la paleta (`assets/obras/`), con el texto "Foto de obra · placeholder". Se usó SVG en lugar de JPG porque es más liviano y nítido. Los títulos y descripciones de `js/obras.js` son de ejemplo; las fotos dejan claro que son placeholders.
- **Antes/después:** 1 ficha de ejemplo ("Recambio de tablero"), con un comparador con slider en el lightbox (funciona con mouse, touch y flechas del teclado).
- **Hero:** se usó el recurso gráfico propio (cable amarillo que termina en un nodo de luz y trazos de circuito) en lugar de una foto, porque todavía no hay fotos de obra. Cuando estén, se puede sumar una foto real con overlay.
- **Recurso de marca:** línea amarilla + nodo ("cable") en los encabezados de sección, una línea que une los 3 pasos de "Cómo trabajamos" y un patrón sutil de circuito en los fondos oscuros.
- **Galería:** grilla irregular con CSS Grid (`dense`): 2 columnas en mobile, 3 en tablet y 4 en desktop. El tamaño de cada ficha sale de `formato` (vertical/horizontal/cuadrado) y `destacado` en `obras.js` (son campos agregados al formato del brief). El lightbox usa `<dialog>` nativo: atrapa el foco, cierra con Escape y el foco vuelve a la foto. Navega solo dentro del filtro activo.
- **Datos de config:** los links y textos se completan con JS desde `js/config.js` (atributos `data-wa`, `data-ig`, `data-config`). El HTML trae los mismos valores como respaldo por si falla JS. Si `email` está vacío, la fila no se muestra.
- **Teléfono:** no se agregó un link `tel:` para no duplicar el número. El teléfono visible abre WhatsApp.
- **Formulario:** valida en el navegador (errores en texto debajo de cada campo, con `aria-invalid`) y abre `wa.me` con el mensaje armado. `enviarConsulta()` es el único punto de envío; la alternativa con Formspree/Web3Forms está escrita y comentada.
- **Botón "Enviar consulta":** no ocupa el ancho completo en mobile, así el botón flotante de WhatsApp nunca lo tapa (verificado en 360 px). El footer tiene espacio extra abajo en mobile por el mismo motivo.
- **Tooltip "¿Hablamos?":** aparece a los 3,5 s, dura 5 s y se muestra una sola vez por sesión.
- **Contadores:** solo anima el "3" (estudios), que es el único dato real. Los otros dos muestran `[[X]]+` marcado como pendiente.
- **Ícono de WhatsApp:** dibujado a mano en estilo línea, para no depender de librerías. Si el cliente prefiere el logo oficial relleno, se reemplaza el `<symbol id="i-whatsapp">`.
- **"Joya" / "Genial":** se usaron dos veces: "Joya" al cierre de "Cómo trabajamos" y "¡Genial!" en la confirmación del formulario.
- **Marcas de pendiente visibles:** todos los `[[PENDIENTE]]` llevan la clase `.pendiente` (fondo amarillo y borde punteado) para que el cliente los vea al revisar. Hay que sacarlas antes de publicar.
- **Mapa:** embed simple de Google Maps de Rosario, sin API key. Puede no cargar si se abre como archivo local sin conexión.

## Verificado

- Sin scroll horizontal en 360 / 768 / 1024 / 1440 px.
- 8 links de WhatsApp toman el número de `config.js`; los de IG, también.
- Menú mobile: `aria-expanded`, cierra al tocar un link, con Escape y tocando afuera.
- Filtros, lightbox con teclado (← →) y swipe, cierre con Escape y vuelta del foco, comparador antes/después.
- Formulario: 5 errores con el formulario vacío y foco en el primero; con datos, abre WhatsApp con la consulta y muestra el mensaje de éxito.
- Sin menciones de precios, cuotas ni costos.
- Consola sin errores. `html-validate` (preset standard) sin errores.
- Pendiente de medir: Lighthouse en un hosting real (desde `file://` no es representativo).

## Pendientes del cliente

- [ ] Foto de Pablo solo, de frente (el avatar actual sale de una foto con su hija y queda muy recortado).
- [ ] Fotos en mayor resolución (las actuales son capturas de ~850 px), idealmente horizontales para el hero.
- [ ] Email, si tienen (opcional).
- [ ] Logo en buena calidad (ideal SVG): el actual es un PNG de 250 px. Con el SVG, también se puede sumar a la og-image.
- [ ] Logos de Dika, M. y Malawi Studio en SVG/PNG transparente (opcional, los actuales funcionan).
- [ ] Fotos de trabajos en comercios (el filtro está oculto hasta que haya) y pares antes/después si tienen.
- [ ] Revisar títulos, categorías y descripciones de cada trabajo en `js/obras.js`.
- [ ] Link directo para dejar reseña en Google (`g.page/r/.../review`) → `dejarResenaUrl` en `js/resenas.js`.
- [ ] Revisar las reseñas de Google cada 1–2 meses y actualizar `js/resenas.js` (puntaje, cantidad, reseñas nuevas).
- [ ] Aprobación de los textos propuestos.
- [ ] Dominio y hosting (después: `og:url`, `url` en Schema y `og:image` con URL absoluta).
