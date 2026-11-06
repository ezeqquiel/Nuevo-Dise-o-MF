/* ==========================================================================
   Obras de la galería (#obras). Una carpeta de fotos = una obra = una tarjeta.
   Originales en assets/obras MF/<carpeta>/ · optimizadas en assets/obras/<slug>/
   numeradas en el mismo orden (01.jpg, 02.jpg, ...).
   Las descripciones dicen solo lo que se ve en las fotos o lo que dice el
   texto del posteo de Instagram.

   Campos:
   - titulo, descripcion
   - categoria: hogares | comercios | obras | interiorismo | led
                (los filtros sin obras se ocultan solos)
   - portada:   foto de la tarjeta (la más representativa)
   - fotos:     todas las fotos de la obra, en orden: es el álbum del lightbox
   - destacado: true → tarjeta más grande en desktop (ideal: una sola)
   - hero: true      → la obra pasa en el carrusel del inicio con su portada
                       (o con heroFoto, si se indica). La primera obra con
                       hero es la que carga primero: elegí la mejor.
   ========================================================================== */
const OBRAS = [
  {
    id: 1,
    titulo: "Proyecto Entre Ríos",
    categoria: "obras",
    descripcion: "Iluminación lineal en todo el ambiente, luz indirecta bajo el mueble y parlantes embutidos.",
    portada: "assets/obras/proyecto-entre-rios/01.jpg",
    fotos: [
      "assets/obras/proyecto-entre-rios/01.jpg",
      "assets/obras/proyecto-entre-rios/02.jpg",
      "assets/obras/proyecto-entre-rios/03.jpg",
      "assets/obras/proyecto-entre-rios/04.jpg"
    ],
    destacado: true,
    hero: true
  },
  {
    id: 2,
    titulo: "Armado de circuito y colocación de tiras LED",
    categoria: "led",
    descripcion: "Armado de circuito y colocación de tiras LED en el mueble del living y en los estantes.",
    portada: "assets/obras/armado-circuito-tiras-led/01.jpg",
    fotos: [
      "assets/obras/armado-circuito-tiras-led/01.jpg",
      "assets/obras/armado-circuito-tiras-led/02.jpg",
      "assets/obras/armado-circuito-tiras-led/03.jpg",
      "assets/obras/armado-circuito-tiras-led/04.jpg",
      "assets/obras/armado-circuito-tiras-led/05.jpg",
      "assets/obras/armado-circuito-tiras-led/06.jpg"
    ],
    hero: true,
    heroFoto: "assets/obras/armado-circuito-tiras-led/03.jpg" // la 01 recortada a lo ancho queda solo pared
  },
  {
    id: 3,
    titulo: "Instalaciones residenciales y comerciales",
    categoria: "interiorismo",
    descripcion: "Riel de luz en el techo y LED en el mueble del living.",
    portada: "assets/obras/instalaciones-residenciales-comerciales/03.jpg",
    fotos: [
      "assets/obras/instalaciones-residenciales-comerciales/01.jpg",
      "assets/obras/instalaciones-residenciales-comerciales/02.jpg",
      "assets/obras/instalaciones-residenciales-comerciales/03.jpg"
    ],
    hero: true
  },
  {
    id: 4,
    titulo: "Instalación de nuevas luminarias",
    categoria: "led",
    descripcion: "Instalación de nuevas luminarias en distintos sectores del edificio. También trabajamos sobre los puntos e instalaciones eléctricas.",
    portada: "assets/obras/instalacion-nuevas-luminarias/05.jpg",
    fotos: [
      "assets/obras/instalacion-nuevas-luminarias/01.jpg",
      "assets/obras/instalacion-nuevas-luminarias/02.jpg",
      "assets/obras/instalacion-nuevas-luminarias/03.jpg",
      "assets/obras/instalacion-nuevas-luminarias/04.jpg",
      "assets/obras/instalacion-nuevas-luminarias/05.jpg"
    ],
    hero: true
  },
  {
    id: 5,
    titulo: "¿Te mudaste y no tenés servicio eléctrico?",
    categoria: "hogares",
    descripcion: "Hacemos la conexión provisoria para que tengas electricidad mientras esperás a la EPE. Dejamos todo listo y funcionando hasta la habilitación definitiva.",
    portada: "assets/obras/te-mudaste-sin-servicio-electrico/01.jpg",
    fotos: [
      "assets/obras/te-mudaste-sin-servicio-electrico/01.jpg",
      "assets/obras/te-mudaste-sin-servicio-electrico/02.jpg"
    ]
  },
  {
    id: 6,
    titulo: "Precisión en cada detalle",
    categoria: "obras",
    descripcion: "Marcado con nivel láser antes de colocar las cajas.",
    portada: "assets/obras/precision-en-cada-detalle/01.jpg",
    fotos: [
      "assets/obras/precision-en-cada-detalle/01.jpg",
      "assets/obras/precision-en-cada-detalle/02.jpg"
    ]
  }
];
