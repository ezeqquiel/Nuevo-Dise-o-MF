/* ==========================================================================
   Datos del negocio — FUENTE ÚNICA
   Todo lo que diga teléfono, WhatsApp, Instagram, zona u horario en la web
   se completa desde acá (ver main.js → aplicarConfig). Cambiá un valor acá
   y se actualiza en todo el sitio (incluido el Schema.org para Google).
   ========================================================================== */
const CONFIG = {
  nombre: "MF - Soluciones Eléctricas",

  // Socios: cada botón de WhatsApp deja elegir a cuál escribirle.
  // whatsapp: formato internacional sin + ni espacios (549 + característica sin 0 + número sin 15).
  // El primero (Emanuel) es el número por defecto: el que usa Google y el link si algo falla.
  // foto: avatar cuadrado (si se deja vacío, se muestra la inicial del nombre).
  socios: [
    { nombre: "Emanuel", whatsapp: "5493415450692", telefonoVisible: "+54 341 545-0692", foto: "" },
    { nombre: "Pablo",   whatsapp: "5493416625755", telefonoVisible: "+54 341 662-5755", foto: "" }
  ],

  whatsappMensaje: "¡Hola MF! Les escribo desde la web. Quería consultar por un trabajo eléctrico.",
  instagram: "https://instagram.com/mf.electricistas",
  instagramUser: "@mf.electricistas",
  tiktok: "https://www.tiktok.com/@mf.electricistas",
  tiktokUser: "@mf.electricistas",
  zona: "Rosario y Gran Rosario",
  horario: "Lunes a Sábados · 09 a 16 hs",
  email: "" // PENDIENTE: si tienen mail (si queda vacío, no se muestra)
};
