/* ==========================================================================
   MF - Soluciones Eléctricas · v1.2
   Menú, datos de config, carrusel del hero, selector de socio para WhatsApp,
   galería de obras + filtros + álbum (lightbox), reseñas de Google, animaciones.
   Depende de js/config.js (CONFIG), js/obras.js (OBRAS) y js/resenas.js (RESENAS_GOOGLE).
   ========================================================================== */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const CATEGORIAS = {
    hogares: "Hogares",
    comercios: "Comercios",
    obras: "Obras",
    interiorismo: "Interiorismo",
    led: "LED e iluminación"
  };

  // Para insertar textos de obras.js en el HTML sin romperlo (comillas, <, &)
  function esc(texto) {
    return String(texto).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  // Mantiene el Tab dentro de un diálogo abierto (el <dialog> nativo deja
  // salir el foco a la barra del navegador).
  function atraparFoco(dialog) {
    dialog.addEventListener("keydown", (e) => {
      if (e.key !== "Tab") return;
      const focusables = Array.from(dialog.querySelectorAll("a[href], button, input, select, textarea, [tabindex]:not([tabindex='-1'])"))
        .filter((el) => !el.disabled && el.getClientRects().length);
      if (!focusables.length) return;
      const primero = focusables[0];
      const ultimo = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === primero) { e.preventDefault(); ultimo.focus(); }
      else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primero.focus(); }
    });
  }

  // Avatar del socio: su foto, o la inicial si no tiene
  function avatarHTML(socio) {
    return socio.foto
      ? '<img src="' + esc(socio.foto) + '" alt="" width="56" height="56">'
      : esc(socio.nombre.charAt(0));
  }

  /* ---------- Config: WhatsApp, IG, horario, socios, schema ---------- */
  function waLink(socio, mensaje) {
    return "https://wa.me/" + socio.whatsapp + "?text=" + encodeURIComponent(mensaje);
  }

  function mensajeDe(el) {
    return el.dataset.waMensaje || CONFIG.whatsappMensaje;
  }

  function aplicarConfig() {
    const principal = CONFIG.socios[0];

    // Todos los disparadores apuntan a Emanuel por defecto (clic del medio,
    // "copiar link", o si el selector no llega a abrirse).
    document.querySelectorAll("[data-wa]").forEach((a) => { a.href = waLink(principal, mensajeDe(a)); });
    document.querySelectorAll("[data-ig]").forEach((a) => { a.href = CONFIG.instagram; });
    document.querySelectorAll("[data-tt]").forEach((a) => { a.href = CONFIG.tiktok; });
    document.querySelectorAll("[data-config]").forEach((el) => {
      const valor = CONFIG[el.dataset.config];
      if (valor) el.textContent = valor;
    });

    // Tarjetas de contacto directo, una por socio (sin selector)
    document.querySelectorAll("[data-socio]").forEach((card) => {
      const socio = CONFIG.socios[Number(card.dataset.socio)];
      if (!socio) { card.hidden = true; return; }
      card.querySelectorAll("[data-socio-nombre]").forEach((el) => { el.textContent = socio.nombre; });
      card.querySelector("[data-socio-tel]").textContent = socio.telefonoVisible;
      card.querySelector(".socio__avatar").innerHTML = avatarHTML(socio);
      card.querySelector("[data-socio-wa]").href = waLink(socio, CONFIG.whatsappMensaje);
    });

    if (CONFIG.email) {
      const row = document.querySelector("[data-email-row]");
      const link = document.querySelector("[data-email]");
      link.href = "mailto:" + CONFIG.email;
      link.textContent = CONFIG.email;
      row.hidden = false;
    }

    // Schema.org: teléfono de Emanuel + los socios como employee
    const schemaEl = document.getElementById("schema-negocio");
    try {
      const schema = JSON.parse(schemaEl.textContent);
      schema.telephone = principal.telefonoVisible;
      schema.employee = CONFIG.socios.map((s) => ({ "@type": "Person", name: s.nombre }));
      schemaEl.textContent = JSON.stringify(schema, null, 2);
    } catch (e) { /* si el JSON-LD se editó mal, no rompemos la página */ }
  }

  /* ---------- Selector de socio para WhatsApp (reutilizable) ---------- */
  function initSelectorWhatsApp() {
    const dialog = document.getElementById("wa-picker");
    const lista = document.getElementById("wa-picker-list");
    let opener = null;

    lista.innerHTML = CONFIG.socios.map((socio, i) => (
      '<li><a class="wa-picker__option" data-socio-index="' + i + '" href="' + waLink(socio, CONFIG.whatsappMensaje) + '" target="_blank" rel="noopener">' +
        '<span class="socio__avatar" aria-hidden="true">' + avatarHTML(socio) + "</span>" +
        '<span class="wa-picker__option-text">' +
          '<span class="wa-picker__option-name">' + esc(socio.nombre) + "</span>" +
          '<span class="wa-picker__option-sub">Escribile por WhatsApp</span>' +
        "</span>" +
        '<svg class="icon" aria-hidden="true"><use href="#i-whatsapp"/></svg>' +
      "</a></li>"
    )).join("");
    const opciones = Array.from(lista.querySelectorAll(".wa-picker__option"));
    atraparFoco(dialog);

    /**
     * Abre el selector. Cada opción lleva el mensaje recibido.
     * @param {string} mensaje  texto prearmado para WhatsApp
     * @param {HTMLElement} [desde]  elemento al que vuelve el foco al cerrar
     */
    function abrir(mensaje, desde) {
      opciones.forEach((a, i) => { a.href = waLink(CONFIG.socios[i], mensaje); });
      opener = desde || null;
      document.documentElement.style.overflow = "hidden";
      dialog.showModal();
      opciones[0].focus();
    }

    dialog.addEventListener("close", () => {
      document.documentElement.style.overflow = "";
      if (opener) opener.focus();
    });

    dialog.addEventListener("click", (e) => {
      // Click en el fondo (fuera de la hoja) o en ✕
      if (e.target === dialog || e.target.closest("[data-picker-close]")) { dialog.close(); return; }
      // Elegir un socio: el link abre WhatsApp en otra pestaña y cerramos
      if (e.target.closest(".wa-picker__option")) setTimeout(() => dialog.close(), 0);
    });

    // Cualquier link/botón con data-wa abre el selector
    document.addEventListener("click", (e) => {
      const trigger = e.target.closest("[data-wa]");
      if (!trigger || e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      abrir(mensajeDe(trigger), trigger);
    });

    return { abrir };
  }

  /* ---------- Header + menú mobile ---------- */
  function initHeader() {
    const header = document.getElementById("header");
    const toggle = header.querySelector(".nav__toggle");
    const menu = document.getElementById("nav-menu");
    const toggleIcon = toggle.querySelector("use");
    const toggleLabel = toggle.querySelector(".sr-only");

    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    function setOpen(open) {
      toggle.setAttribute("aria-expanded", String(open));
      menu.classList.toggle("is-open", open);
      header.classList.toggle("is-open", open);
      toggleIcon.setAttribute("href", open ? "#i-x" : "#i-menu");
      toggleLabel.textContent = open ? "Cerrar menú" : "Abrir menú";
    }

    toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
    menu.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && menu.classList.contains("is-open")) {
        setOpen(false);
        toggle.focus();
      }
    });
    document.addEventListener("click", (e) => {
      if (menu.classList.contains("is-open") && !header.contains(e.target)) setOpen(false);
    });
    window.matchMedia("(min-width: 900px)").addEventListener("change", () => setOpen(false));
  }

  /* ---------- Carrusel del hero (fotos de fondo) ---------- */
  function initHeroCarrusel() {
    const contenedor = document.querySelector(".hero__slides");
    const dots = document.querySelector(".hero__dots");
    const INTERVALO = 2000;

    // Una foto por obra (su portada o heroFoto), así no se repite la misma obra seguida
    let obras = OBRAS.filter((o) => o.hero);
    if (!obras.length) obras = OBRAS.filter((o) => o.destacado);
    if (!obras.length) obras = OBRAS.slice(0, 1);
    const srcs = obras.map((o) => o.heroFoto || o.portada);
    if (!srcs.length) return;

    // La primera viene en el HTML (con fetchpriority="high"); si obras.js
    // eligió otra, la cambiamos.
    const primera = contenedor.querySelector(".hero__slide");
    if (primera.getAttribute("src") !== srcs[0]) primera.src = srcs[0];
    const slides = [primera];

    if (reduceMotion || srcs.length < 2) return; // queda fija la primera foto

    function agregarDot() {
      const d = document.createElement("span");
      if (!dots.children.length) d.className = "is-active";
      dots.appendChild(d);
    }
    agregarDot();

    // Precarga de a una: cada foto entra a la rotación recién cuando está lista
    function precargar(i) {
      if (i >= srcs.length) return;
      const img = new Image();
      img.src = srcs[i];
      const listo = () => {
        img.className = "hero__slide";
        img.alt = "";
        img.decoding = "async";
        contenedor.appendChild(img);
        slides.push(img);
        agregarDot();
        precargar(i + 1);
      };
      (img.decode ? img.decode() : Promise.resolve()).then(listo, () => precargar(i + 1));
    }
    const arrancarPrecarga = () => precargar(1);
    if (primera.complete) arrancarPrecarga();
    else primera.addEventListener("load", arrancarPrecarga, { once: true });

    let actual = 0;
    let timer = null;
    function avanzar() {
      if (slides.length < 2) return;
      slides[actual].classList.remove("is-active");
      dots.children[actual].classList.remove("is-active");
      actual = (actual + 1) % slides.length;
      slides[actual].classList.add("is-active");
      dots.children[actual].classList.add("is-active");
    }
    const play = () => { if (!timer) timer = setInterval(avanzar, INTERVALO); };
    const pause = () => { clearInterval(timer); timer = null; };

    document.addEventListener("visibilitychange", () => (document.hidden ? pause() : play()));
    play();
  }

  /* ---------- Galería de obras ---------- */
  function initGaleria() {
    const gallery = document.getElementById("gallery");
    const status = document.getElementById("obras-status");
    const filtros = document.querySelectorAll(".filter");

    // Una tarjeta por obra: portada + categoría + título + cantidad de fotos
    gallery.innerHTML = OBRAS.map((obra, i) => {
      const clases = ["gallery__item"];
      if (obra.destacado) clases.push("gallery__item--destacado");
      const categoria = esc(CATEGORIAS[obra.categoria] || obra.categoria);
      const titulo = esc(obra.titulo);
      const cantidad = obra.fotos.length + (obra.fotos.length === 1 ? " foto" : " fotos");
      return (
        '<li class="' + clases.join(" ") + '" data-cat="' + esc(obra.categoria) + '">' +
          '<button type="button" class="gallery__btn" data-index="' + i + '" aria-label="Ver álbum: ' + titulo + ", " + cantidad + " (" + categoria + ')">' +
            '<img src="' + esc(obra.portada || obra.fotos[0]) + '" alt="" width="600" height="800" loading="lazy" decoding="async">' +
            '<span class="gallery__badge"><svg class="icon" aria-hidden="true"><use href="#i-images"/></svg>' + cantidad + "</span>" +
            '<span class="gallery__meta"><span class="tag">' + categoria + '</span><span class="gallery__title">' + titulo + "</span></span>" +
          "</button>" +
        "</li>"
      );
    }).join("");

    const items = Array.from(gallery.children);

    // Un filtro sin trabajos cargados no se muestra
    filtros.forEach((btn) => {
      const filtro = btn.dataset.filter;
      if (filtro !== "todos" && !OBRAS.some((o) => o.categoria === filtro)) btn.hidden = true;
    });

    filtros.forEach((btn) => {
      btn.addEventListener("click", () => {
        const filtro = btn.dataset.filter;
        filtros.forEach((b) => {
          const activo = b === btn;
          b.classList.toggle("is-active", activo);
          b.setAttribute("aria-pressed", String(activo));
        });
        let visibles = 0;
        items.forEach((li) => {
          const mostrar = filtro === "todos" || li.dataset.cat === filtro;
          li.hidden = !mostrar;
          if (mostrar) visibles++;
        });
        status.textContent = "Mostrando " + visibles + (visibles === 1 ? " obra" : " obras");
      });
    });

    const lightbox = initLightbox();
    gallery.addEventListener("click", (e) => {
      const btn = e.target.closest(".gallery__btn");
      if (btn) lightbox.open(Number(btn.dataset.index), btn);
    });
  }

  /* ---------- Lightbox: álbum de una obra (dialog nativo: foco atrapado + Escape) ---------- */
  function initLightbox() {
    const dialog = document.getElementById("lightbox");
    const media = document.getElementById("lb-media");
    const tag = document.getElementById("lb-tag");
    const title = document.getElementById("lb-title");
    const desc = document.getElementById("lb-desc");
    const count = document.getElementById("lb-count");
    const navs = dialog.querySelector(".lightbox__navs");
    const thumbs = document.getElementById("lb-thumbs");
    let obra = null;
    let pos = 0;
    let opener = null;
    atraparFoco(dialog);

    function render() {
      const total = obra.fotos.length;
      media.innerHTML = '<img src="' + esc(obra.fotos[pos]) + '" alt="' + esc(obra.titulo) + ", foto " + (pos + 1) + " de " + total + '">';
      count.textContent = (pos + 1) + " / " + total;
      Array.from(thumbs.children).forEach((btn, i) => {
        if (i === pos) btn.setAttribute("aria-current", "true");
        else btn.removeAttribute("aria-current");
      });
      const activa = thumbs.children[pos];
      if (activa) activa.scrollIntoView({ block: "nearest", inline: "nearest", behavior: reduceMotion ? "auto" : "smooth" });

      if (!reduceMotion) {
        dialog.classList.remove("is-entering");
        void dialog.offsetWidth; // reinicia la animación
        dialog.classList.add("is-entering");
      }
    }

    function go(delta) {
      const total = obra.fotos.length;
      if (total < 2) return;
      pos = (pos + delta + total) % total;
      render();
    }

    function open(index, from) {
      obra = OBRAS[index];
      pos = 0;
      opener = from;
      tag.textContent = CATEGORIAS[obra.categoria] || obra.categoria;
      title.textContent = obra.titulo;
      desc.textContent = obra.descripcion;
      // Con una sola foto no hay flechas ni miniaturas
      const varias = obra.fotos.length > 1;
      navs.hidden = !varias;
      thumbs.hidden = !varias;
      thumbs.innerHTML = varias ? obra.fotos.map((src, i) =>
        '<button type="button" class="lightbox__thumb" data-foto="' + i + '" aria-label="Ver foto ' + (i + 1) + " de " + obra.fotos.length + '">' +
          '<img src="' + esc(src) + '" alt="" width="72" height="72" decoding="async">' +
        "</button>"
      ).join("") : "";
      render();
      document.documentElement.style.overflow = "hidden";
      dialog.showModal();
      dialog.querySelector('[data-lb="close"]').focus();
    }

    dialog.addEventListener("close", () => {
      document.documentElement.style.overflow = "";
      media.innerHTML = "";
      thumbs.innerHTML = "";
      if (opener) opener.focus();
    });

    dialog.addEventListener("click", (e) => {
      const thumb = e.target.closest("[data-foto]");
      if (thumb) {
        pos = Number(thumb.dataset.foto);
        render();
        return;
      }
      const accion = e.target.closest("[data-lb]");
      if (accion) {
        const tipo = accion.dataset.lb;
        if (tipo === "close") dialog.close();
        if (tipo === "prev") go(-1);
        if (tipo === "next") go(1);
        return;
      }
      // Click en el fondo (fuera de la foto y los textos) cierra
      if (e.target === dialog || e.target.classList.contains("lightbox__inner")) dialog.close();
    });

    dialog.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
      if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
    });

    // Swipe en mobile
    let startX = null;
    let startY = null;
    media.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    }, { passive: true });
    media.addEventListener("touchend", (e) => {
      if (startX === null) return;
      const dx = e.changedTouches[0].clientX - startX;
      const dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
      startX = null;
    }, { passive: true });

    return { open };
  }

  /* ---------- Reseñas de Google (datos en js/resenas.js) ---------- */
  function estrellasHTML(n) {
    let html = "";
    for (let i = 1; i <= 5; i++) {
      html += '<svg class="star' + (i <= Math.round(n) ? "" : " star--off") + '" aria-hidden="true"><use href="#i-star"/></svg>';
    }
    return html;
  }

  const ICONOS_AVATAR = { hombre: "i-hombre", mujer: "i-mujer" };

  function initResenas() {
    if (typeof RESENAS_GOOGLE === "undefined") return;
    const datos = RESENAS_GOOGLE;
    const puntaje = Number(datos.puntaje).toLocaleString("es-AR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
    const cantidad = datos.cantidad + (datos.cantidad === 1 ? " reseña" : " reseñas");

    document.querySelectorAll('[data-resenas-link="perfil"]').forEach((a) => { a.href = datos.perfilUrl; });
    document.querySelectorAll('[data-resenas-link="dejar"]').forEach((a) => { a.href = datos.dejarResenaUrl; });

    // Badge del hero
    const badge = document.querySelector("[data-resenas-badge]");
    if (badge) {
      badge.innerHTML = '<svg class="star" aria-hidden="true"><use href="#i-star"/></svg>' +
        "<span>" + puntaje + " en Google · " + cantidad + "</span>";
      badge.hidden = false;
    }

    // Resumen
    const resumen = document.getElementById("resenas-resumen");
    resumen.innerHTML =
      '<p class="resenas__nota">' + puntaje + "</p>" +
      '<div class="resenas__detalle">' +
        '<p class="resenas__estrellas">' + estrellasHTML(datos.puntaje) + '<span class="sr-only">' + puntaje + " de 5 estrellas</span></p>" +
        '<p class="resenas__cantidad">' + cantidad + " en Google</p>" +
      "</div>" +
      '<p class="resenas__google"><svg class="icon" aria-hidden="true"><use href="#i-pin"/></svg>Google</p>';
    resumen.hidden = false;

    // Tarjetas: avatar (ícono de hombre/mujer según resenas.js), nombre, fecha, estrellas, texto (tal cual) y fuente
    const lista = document.getElementById("resenas-lista");
    lista.innerHTML = datos.resenas.map((r, i) => {
      const corta = r.texto.length <= 40; // "Excelentes profesionales": va como cita destacada
      return (
        '<li class="card resena' + (corta ? " resena--corta" : "") + '">' +
          '<div class="resena__head">' +
            '<span class="resena__avatar resena__avatar--' + (i % 3) + '" aria-hidden="true"><svg class="icon"><use href="#' + (ICONOS_AVATAR[r.avatar] || "i-user") + '"/></svg></span>' +
            '<div><p class="resena__nombre">' + esc(r.nombre) + '</p><p class="resena__fecha">' + esc(r.fecha) + "</p></div>" +
          "</div>" +
          '<p class="resena__estrellas">' + estrellasHTML(r.estrellas) + '<span class="sr-only">' + r.estrellas + " de 5 estrellas</span></p>" +
          '<blockquote class="resena__texto" id="resena-' + i + '"><p>' + esc(r.texto) + "</p></blockquote>" +
          '<button type="button" class="resena__mas" aria-expanded="false" aria-controls="resena-' + i + '" hidden>Leer más</button>' +
          '<p class="resena__fuente"><svg class="icon" aria-hidden="true"><use href="#i-pin"/></svg>Publicada en Google</p>' +
        "</li>"
      );
    }).join("");

    // "Leer más" solo donde el texto realmente se corta (se recalcula al cambiar el ancho)
    const tarjetas = Array.from(lista.children);
    function revisarCortes() {
      tarjetas.forEach((li) => {
        const texto = li.querySelector(".resena__texto p");
        const boton = li.querySelector(".resena__mas");
        if (boton.getAttribute("aria-expanded") === "true") return;
        boton.hidden = texto.scrollHeight <= texto.clientHeight + 1;
      });
    }
    lista.addEventListener("click", (e) => {
      const boton = e.target.closest(".resena__mas");
      if (!boton) return;
      const abierto = boton.getAttribute("aria-expanded") === "true";
      boton.closest(".resena").classList.toggle("is-expanded", !abierto);
      boton.setAttribute("aria-expanded", String(!abierto));
      boton.textContent = abierto ? "Leer más" : "Leer menos";
      if (abierto) revisarCortes();
    });
    revisarCortes();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(revisarCortes);
    let t = null;
    window.addEventListener("resize", () => { clearTimeout(t); t = setTimeout(revisarCortes, 150); });
  }

  /* ---------- Aparición al scrollear + contadores ---------- */
  function initReveal() {
    const elementos = document.querySelectorAll(".reveal");
    const contadores = document.querySelectorAll("[data-count]");

    if (!("IntersectionObserver" in window)) {
      elementos.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    // Pequeño escalonado entre hermanos (tarjetas de una misma grilla)
    elementos.forEach((el) => {
      const hermanos = Array.from(el.parentElement.children).filter((c) => c.classList.contains("reveal"));
      const i = hermanos.indexOf(el);
      if (i > 0) el.style.transitionDelay = Math.min(i, 5) * 70 + "ms";
    });

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    elementos.forEach((el) => io.observe(el));

    const ioCount = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animarContador(entry.target);
        ioCount.unobserve(entry.target);
      });
    }, { threshold: 0.6 });
    contadores.forEach((el) => ioCount.observe(el));
  }

  function animarContador(el) {
    const fin = Number(el.dataset.count);
    if (reduceMotion || !fin) return;
    const duracion = 1200;
    const inicio = performance.now();
    function paso(t) {
      const p = Math.min((t - inicio) / duracion, 1);
      el.textContent = Math.round(fin * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(paso);
    }
    el.textContent = "0";
    requestAnimationFrame(paso);
  }

  /* ---------- Etiqueta "¿Hablamos?" del botón flotante (una sola vez) ---------- */
  function initTooltipWhatsApp() {
    const boton = document.querySelector(".wa-float");
    let yaMostrado = false;
    try { yaMostrado = sessionStorage.getItem("mf-wa-tip") === "1"; } catch (e) { /* sin storage */ }
    if (yaMostrado) return;

    setTimeout(() => {
      boton.classList.add("show-tip");
      try { sessionStorage.setItem("mf-wa-tip", "1"); } catch (e) { /* sin storage */ }
      setTimeout(() => boton.classList.remove("show-tip"), 5000);
    }, 3500);
  }

  aplicarConfig();
  initSelectorWhatsApp();
  initHeader();
  initHeroCarrusel();
  initGaleria();
  initResenas();
  initReveal();
  initTooltipWhatsApp();
})();
