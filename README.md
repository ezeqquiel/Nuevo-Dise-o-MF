# MF - Soluciones Eléctricas · Sitio web v1.1

One-page para MF - Soluciones Eléctricas (Emanuel y Pablo, electricistas en Rosario y Gran Rosario). HTML + CSS + JavaScript vanilla, sin frameworks ni build. Hecho por ZZ Digital.

## Cómo verlo

- **Rápido:** abrí `index.html` con doble clic en el navegador.
- **Como en producción** (recomendado para probar el mapa y compartir en redes), levantá un servidor local en la carpeta:
  ```
  npx serve .
  ```
  o `python -m http.server 8080` y entrá a `http://localhost:8080`.
- **Publicar:** subí la carpeta tal cual a cualquier hosting estático (Netlify, Vercel, Hostinger, GitHub Pages). No incluyas `_version-anterior/`, `assets/img/`, `assets/obras MF/` ni `assets/BRIEF-*.md`.

## Estructura

```
index.html
css/styles.css          estilos (mobile-first, paleta en :root)
js/config.js            DATOS DEL NEGOCIO (socios + WhatsApp, IG, horario, zona, email)
js/obras.js             obras de la galería (una por carpeta, con su álbum) y carrusel del hero
js/resenas.js           reseñas de Google: puntaje, cantidad, textos y links al perfil
js/main.js              menú, galería, filtros, álbum (lightbox), reseñas, formulario, animaciones
assets/logo/            logo: logo-mf.png (fondo claro) y logo-mf-claro.png (fondo oscuro, el que usa la web)
assets/estudios/        logos de Dika, M. y Malawi Studio
assets/obras/<slug>/    fotos optimizadas de cada obra: 01.jpg, 02.jpg, ... (las que usa la web)
assets/equipo/          foto de Emanuel y Pablo (Nosotros) y avatar de cada uno (Contacto y selector)
assets/obras MF/        originales que pasó el cliente (no se publican)
assets/og-image.jpg     imagen al compartir el link (foto de Ema y Pablo)
assets/favicon.png      favicon (lamparita del logo) + apple-touch-icon.png
NOTAS-V1.md             decisiones y pendientes
```

## Qué reemplazar antes de publicar

1. **Números de Emanuel y Pablo** → ya están cargados. Para cambiarlos, solo en `js/config.js`, en la lista `socios`:
   ```js
   socios: [
     { nombre: "Emanuel", whatsapp: "5493415551234", telefonoVisible: "+54 341 555 1234" },
     { nombre: "Pablo",   whatsapp: "5493415556789", telefonoVisible: "+54 341 555 6789" }
   ],
   ```
   - `whatsapp`: formato internacional sin `+` ni espacios: `549` + característica sin el 0 + número sin el 15.
   - `telefonoVisible`: como se lee en la web.
   - No hay que tocar nada más: todos los botones de WhatsApp (header, hero, servicios, obras, contacto, footer, flotante y formulario) abren el selector "¿Con quién querés hablar?" con estos números, las tarjetas de Contacto muestran cada teléfono, y el Schema.org para Google toma el de Emanuel (el primero de la lista) como `telephone`.
   - `foto`: avatar cuadrado (ej. `assets/equipo/emanuel.jpg`; hoy los dos están vacíos). Si queda vacío, se muestra la inicial.
2. **Email** (opcional) → `js/config.js` `email`. Si queda vacío, no se muestra.
3. **Logo** → ya está (la lamparita, en header, footer y favicon). Si llega en mejor calidad, reemplazar los PNG de `assets/logo/` y `assets/favicon.png` con los mismos nombres.
4. **Fotos de obras** → ya están las del cliente (ver "Cómo agregar una obra nueva", abajo).
5. **Fotos del carrusel del inicio** → en `js/obras.js`, agregar `hero: true` a las obras que tienen que pasar de fondo en el hero (ideal 4–6). De cada obra pasa **una** foto: su `portada`, o la que se indique en `heroFoto` (conviene una que se entienda recortada a lo ancho). Si ninguna obra tiene `hero`, se usan las `destacado: true`. La **primera** obra con `hero: true` es la que carga primero: para que cargue lo más rápido posible, poner esa misma ruta en el `<img class="hero__slide is-active" src="...">` de `index.html` (si no coinciden, igual funciona: el JS la cambia).
6. **Avatar de cada socio** → hoy se muestran las iniciales ("E" / "P"), a pedido. Para usar una foto: guardarla cuadrada en `assets/equipo/` y poner la ruta en el `foto` del socio en `js/config.js`.
7. **Foto de Emanuel y Pablo** → ya está (`assets/equipo/ema-y-pablo.jpg`, sección `#nosotros`). Para cambiarla, reemplazar el `src` del `<img>` en `.about__photo`.
8. **Textos pendientes** → buscar `[[` en `index.html`: hoy no queda ninguno. Al tener el dato, borrar también la clase `pendiente` (es la que los marca con borde punteado amarillo).
9. **Dominio** → completar `og:url` y `url` del Schema cuando esté definido; cambiar las rutas de `og:image` a URL absoluta (`https://dominio/assets/og-image.jpg`), que es lo que piden Facebook/WhatsApp.

## Cómo agregar una obra nueva

Cada obra es una carpeta de fotos y una tarjeta en la galería; al tocarla se abre su álbum.

1. **Carpeta:** guardar los originales en `assets/obras MF/<Nombre de la obra>/` (1.jpeg, 2.jpeg, ... en el orden en que se tienen que ver) y crear `assets/obras/<slug>/`, con el slug en minúsculas, sin tildes ni espacios (ej.: `local-centro`).
2. **Optimizar:** exportar cada foto como `01.jpg`, `02.jpg`, ... en `assets/obras/<slug>/`, en el mismo orden: JPG calidad ~80, idealmente ≤ 300 KB y ~1600 px de lado mayor. Sirve cualquier herramienta (Squoosh.app, "Exportar para web" de Photoshop, etc.). Si una foto trae texto de Instagram impreso abajo, conviene recortarlo.
3. **Sumar el objeto** en `js/obras.js` (el orden del listado es el orden de las tarjetas):
   ```js
   {
     id: 7,
     titulo: "Local en el centro",
     categoria: "comercios",            // hogares | comercios | obras | interiorismo | led
     descripcion: "Qué se hizo, en una o dos líneas.",
     portada: "assets/obras/local-centro/02.jpg",   // la foto de la tarjeta
     fotos: [
       "assets/obras/local-centro/01.jpg",
       "assets/obras/local-centro/02.jpg",
       "assets/obras/local-centro/03.jpg"
     ],
     hero: true                         // opcional; heroFoto: "..." elige otra foto para el hero
   }
   ```
   - El contador "3 fotos" de la tarjeta, las flechas y las miniaturas del álbum salen solos de `fotos`.
   - `destacado: true` agranda la tarjeta en desktop. La grilla está pensada para **una** destacada (con 6 obras arma un 3×3 justo).
   - Si es la primera obra de una categoría que no tenía ninguna (hoy "Comercios"), su filtro aparece solo.

## Reseñas de Google

Todo sale de `js/resenas.js`: la sección "Lo que dicen nuestros clientes", el badge "★ 5,0 en Google · 8 reseñas" del hero y los links "Ver todas las reseñas", "Dejanos tu reseña" y "Ver en Google Maps". Nada de eso está escrito a mano en el HTML.

Las reseñas **no se actualizan solas**: conviene revisar el perfil de Google cada 1–2 meses y copiar los cambios a mano.

- **Puntaje y cantidad:** `puntaje` (ej. `4.9` se muestra "4,9") y `cantidad` (el total de Google, incluidas las que son solo estrellas).
- **Reseña nueva:** sumar un objeto a `resenas`, con el texto **tal cual** está en Google (sin corregir nada):
  ```js
  { nombre: "Laura P.", avatar: "mujer", estrellas: 5, fecha: "Dic. 2026", texto: "Copiado tal cual de Google." }
  ```
  - `nombre`: nombre + inicial del apellido; si es una cuenta que no es una persona, el nombre completo.
  - `avatar`: `"hombre"` o `"mujer"` (ícono de la tarjeta). Lo eligen ustedes, no se adivina por el nombre; si no se pone, va un ícono de persona genérico.
  - `fecha`: mes y año, nunca "hace un mes".
  - El orden del array es el de las tarjetas: arriba, las más completas. La grilla de desktop es de 3 columnas: con 6 o 9 reseñas queda pareja.
  - Las de hasta 40 caracteres se muestran como cita destacada; las largas se cortan a 5 líneas con "Leer más".
- **Link para dejar reseña:** cuando tengan el link directo de "Pedir reseñas" (Perfil de Google → Pedir reseñas, tipo `g.page/r/.../review`), ponerlo en `dejarResenaUrl`. Hoy apunta al perfil.
- **Schema:** el perfil está en `sameAs` del JSON-LD de `index.html` (si cambia el link, cambiarlo también ahí). A propósito **no** hay `aggregateRating` ni `review`: Google no muestra estrellas de reseñas que el negocio publica en su propia web y puede tomarlo como markup engañoso.

## Formulario

No hay backend: al enviar, valida y abre el selector Emanuel / Pablo con la consulta armada. Para que llegue por mail, en `js/main.js` cambiar el cuerpo de `enviarConsulta()` por `enviarPorFormspree(datos)` (está escrito y comentado justo debajo).

## Modo oscuro / claro

El sitio sigue la configuración del sistema del visitante (`prefers-color-scheme`). Para probarlo: DevTools → menú ⋮ → More tools → Rendering → "Emulate CSS media feature prefers-color-scheme". Los colores están en `css/styles.css`, al principio: la paleta de marca y, debajo, las variables de cada tema (`--bg`, `--surface`, `--text`, ...).
