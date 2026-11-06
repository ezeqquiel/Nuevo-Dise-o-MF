/* ==========================================================================
   Reseñas de Google (#opiniones, badge del hero y link del mapa)
   Son reseñas REALES copiadas a mano desde el perfil de Google: los textos
   van tal cual (con sus signos y errores). Revisar cada 1–2 meses y
   actualizar puntaje, cantidad y reseñas nuevas.

   - puntaje / cantidad: los del perfil (cantidad incluye las de solo estrellas)
   - resenas: el orden del array es el orden de las tarjetas (primero las
     más completas). Personas: nombre + inicial del apellido; cuentas que
     no son personas, con el nombre completo.
   - fecha: mes y año ("Oct. 2026"), nunca "hace un mes".
   - avatar: "hombre" | "mujer" → ícono de la tarjeta (lo define MF, no se deduce
     del nombre). Si falta, va un ícono de persona genérico.
   ========================================================================== */
const RESENAS_GOOGLE = {
  perfilUrl: "https://maps.app.goo.gl/8yvqtyLmMafLoW5u7",
  dejarResenaUrl: "https://maps.app.goo.gl/8yvqtyLmMafLoW5u7", // PENDIENTE: reemplazar por el link directo de "Pedir reseñas" (g.page/r/.../review) cuando lo pasen.
  puntaje: 5,
  cantidad: 8, // total en Google (2 son solo de estrellas, sin texto)
  resenas: [
    {
      nombre: "Javier R.",
      avatar: "hombre",
      estrellas: 5,
      fecha: "Oct. 2026",
      texto: "Espectacular la onda de los chicos, la prolijidad, atención al detalle y nivel de profesionalismo! La mejor elección y experiencia sin duda!"
    },
    {
      nombre: "Arroyito Querido",
      avatar: "hombre",
      estrellas: 5,
      fecha: "Oct. 2026",
      texto: "Llame por una urgencia lo solucionaron y me explicaron todo! un lujo los chicos! los recomiendo!"
    },
    {
      nombre: "Catriel A.",
      avatar: "hombre",
      estrellas: 5,
      fecha: "Oct. 2026",
      texto: "Necesitaba arreglar varias cosas en casa, los anteriores me habían hecho un desastre. La gente de MF me resolvió todo en poco tiempo. Buen servicios."
    },
    {
      nombre: "Mati S.",
      avatar: "hombre",
      estrellas: 5,
      fecha: "Oct. 2026",
      texto: "Recomendado, trabajan en tiempo y forma, resuelven problemas y acompañan todo el proceso."
    },
    {
      nombre: "Manuel M.",
      avatar: "hombre",
      estrellas: 5,
      fecha: "Oct. 2026",
      texto: "Excelentes profesionales"
    },
    {
      nombre: "Melina F.",
      avatar: "mujer",
      estrellas: 5,
      fecha: "Oct. 2026",
      texto: "Los mejores de Rosario"
    }
  ]
};
