/* ============================================================================
   Landing — lógica de la página.
   ▼▼▼  LO ÚNICO QUE DEBE EDITAR ESTÁ EN ESTE BLOQUE  ▼▼▼
   ============================================================================ */
var CONFIG = {
  marca:     'TecnoRestart MEAL',
  marcaGlifo:'TR',                    // las 2 letras del cuadradito azul

  // Número de WhatsApp en formato internacional, SOLO DÍGITOS (sin +, sin espacios).
  whatsapp:  '584121680381',
  // Cómo se muestra el número en pantalla.
  whatsappVisible: '+58 412 168 0381',
  // Mensaje con el que se abre el chat.
  whatsappMensaje: 'Buen día, vi el sitio de TecnoRestart MEAL y quisiera agendar una demostración.',

  // Usuario de Instagram, sin la arroba.
  instagram: 'tecnorestart',

  // Correo de contacto.
  correo:    'gustavoeadelgado@gmail.com',
  correoAsunto: 'Consulta sobre TecnoRestart MEAL',

  // ── Tarjeta de presentación (sección "Quién está detrás") ───────────
  autorNombre:  'Gustavo Delgado',
  autorIniciales: 'GD',
  autorTitulo:  'Ingeniero en Computación · Oficial MEAL',
  autorBio:     'Ingeniero en Computación por la Universidad Rafael Belloso Chacín. Más de ' +
                '12 años trabajando con hardware, software y bases de datos, y desde 2023 como ' +
                'Oficial MEAL en ONG nacionales e internacionales. Desarrollé esta plataforma ' +
                'resolviendo el problema desde adentro: haciendo yo mismo los reportes 5W, las ' +
                'matrices IPTT y los cierres de mes que ahora automatiza.',
  autorAnios:   '12+',

  // ── Datos legales (salen en la página de privacidad) ─────────────────
  razonSocial: 'Gustavo Delgado',   // razón social, o el nombre completo si factura como persona
  ciudad:      'Maracaibo',
  pais:        'Venezuela',
  correoPrivacidad: '',      // si se deja vacío se usa el correo de arriba
  privacidadDesde:  '19 de septiembre de 2026',     // fecha de última actualización

  // ── Precios ──────────────────────────────────────────────────────────
  precioBasicoAntes:  'US$ 120',
  precioBasico:       'US$ 80',
  ahorroBasico:       'Ahorra US$ 40 por mes',

  precioPremiumAntes: 'US$ 250',
  precioPremium:      'US$ 125',
  // Cupos del precio de lanzamiento. Bájelo a medida que los tome;
  // en 0 el aviso cambia solo a "cupos agotados".
  cuposTotales:       5,
  cuposDisponibles:   5
};

/* ── Medición ──────────────────────────────────────────────────────────
   Deje los tres campos vacíos y no se carga nada: ni scripts, ni cookies.
   Complételos cuando encienda Google Ads (ver docs/google-ads.md, sección 7).
   ───────────────────────────────────────────────────────────────────── */
var MEDICION = {
  ga4:       '',            // 'G-XXXXXXXXXX'  — Google Analytics 4
  googleAds: '',            // 'AW-XXXXXXXXX'  — ID de conversión de Google Ads
  // Etiqueta de cada acción de conversión, tal como la da Google Ads.
  etiquetas: {
    contacto_whatsapp: '',  // 'AbC-D_efGhIjKlMnOp'
    solicitud_demo:    '',
    contacto_correo:   '',
    guia_abierta:      '',
    guia_pdf:          ''
  }
};
/* ▲▲▲  FIN DEL BLOQUE EDITABLE  ▲▲▲ */

(function () {
  'use strict';

  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Traducción. Si js/i18n.js no está cargado, T() devuelve el español tal
     cual y todo sigue funcionando igual que antes. */
  function T(txt, vars) {
    return window.I18N ? window.I18N.t(txt, vars) : txt;
  }
  function numero(n) {
    return window.I18N ? window.I18N.numero(n) : String(n);
  }

  /* ── 1. Contactos y marca ───────────────────────────────────────────── */
  var igURL = 'https://instagram.com/' + CONFIG.instagram;

  // El mensaje del chat y el asunto del correo salen en el idioma activo.
  function pintarContactos() {
    var waURL = 'https://wa.me/' + CONFIG.whatsapp +
                '?text=' + encodeURIComponent(T(CONFIG.whatsappMensaje));
    var mailURL = 'mailto:' + CONFIG.correo +
                  '?subject=' + encodeURIComponent(T(CONFIG.correoAsunto));
    $$('[data-wa-link]').forEach(function (a) { a.href = waURL; });
    $$('[data-mail-link]').forEach(function (a) { a.href = mailURL; });
  }
  pintarContactos();
  document.addEventListener('i18n:aplicado', pintarContactos);

  $$('[data-ig-link]').forEach(function (a) { a.href = igURL; });
  $$('[data-wa-texto]').forEach(function (e) { e.textContent = CONFIG.whatsappVisible; });
  $$('[data-ig-texto]').forEach(function (e) { e.textContent = '@' + CONFIG.instagram; });
  $$('[data-mail-texto]').forEach(function (e) { e.textContent = CONFIG.correo; });
  $$('[data-marca]').forEach(function (e) { e.textContent = CONFIG.marca; });
  $$('[data-anio]').forEach(function (e) { e.textContent = new Date().getFullYear(); });
  var texto = function (sel, valor) { var e = $(sel); if (e) e.textContent = valor; };
  texto('[data-precio-basico-antes]',  CONFIG.precioBasicoAntes);
  texto('[data-precio-basico]',        CONFIG.precioBasico);
  texto('[data-ahorro-basico]',        CONFIG.ahorroBasico);
  texto('[data-precio-premium-antes]', CONFIG.precioPremiumAntes);
  texto('[data-precio-premium]',       CONFIG.precioPremium);

  var textos = function (sel, valor) {
    $$(sel).forEach(function (e) { e.textContent = valor; });
  };
  textos('[data-marca-glifo]',   CONFIG.marcaGlifo);
  textos('[data-autor-nombre]',  CONFIG.autorNombre);
  textos('[data-autor-iniciales]', CONFIG.autorIniciales);
  textos('[data-autor-titulo]',  CONFIG.autorTitulo);
  textos('[data-autor-bio]',     CONFIG.autorBio);
  textos('[data-autor-anios]',   CONFIG.autorAnios);
  textos('[data-razon-social]', CONFIG.razonSocial);
  textos('[data-ciudad]',       CONFIG.ciudad);
  textos('[data-pais]',         CONFIG.pais);
  textos('[data-privacidad-fecha]', CONFIG.privacidadDesde);
  var correoPriv = CONFIG.correoPrivacidad || CONFIG.correo;
  $$('[data-correo-privacidad]').forEach(function (e) {
    e.textContent = correoPriv;
    if (e.tagName === 'A') e.href = 'mailto:' + correoPriv;
  });

  var cupos = $('[data-cupos]');
  function pintarCupos() {
    if (!cupos) return;
    if (CONFIG.cuposDisponibles <= 0) {
      cupos.textContent = T('Los {total} cupos de lanzamiento están tomados · consúltenos por la tarifa vigente',
        { total: CONFIG.cuposTotales });
    } else if (CONFIG.cuposDisponibles === 1) {
      cupos.textContent = T('Precio de lanzamiento · queda 1 cupo de {total}',
        { total: CONFIG.cuposTotales });
    } else {
      cupos.textContent = T('Precio de lanzamiento · quedan {quedan} de {total} cupos',
        { quedan: CONFIG.cuposDisponibles, total: CONFIG.cuposTotales });
    }
  }
  pintarCupos();
  document.addEventListener('i18n:aplicado', pintarCupos);
  if (document.body.dataset.titulo !== 'propio') {
    document.title = document.title.split('TecnoRestart MEAL').join(CONFIG.marca);
  }

  /* ── 2. Pintar las réplicas de pantallas ────────────────────────────── */
  $$('[data-pantalla]').forEach(function (c) {
    var html = (window.PANTALLAS || {})[c.getAttribute('data-pantalla')];
    if (html) { c.innerHTML = html; }
  });

  /* ── 3. Animar barras y gráficos cuando entran en pantalla ──────────── */
  function animarDentro(raiz) {
    $$('[data-w]', raiz).forEach(function (el, i) {
      setTimeout(function () { el.style.width = el.getAttribute('data-w') + '%'; }, reducido ? 0 : 60 + i * 55);
    });
    $$('[data-h]', raiz).forEach(function (el, i) {
      setTimeout(function () { el.style.height = el.getAttribute('data-h') + '%'; }, reducido ? 0 : 60 + i * 70);
    });
  }

  /* ── 4. Revelado al hacer scroll ────────────────────────────────────── */
  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (entradas) {
    entradas.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add('dentro');
      animarDentro(e.target);
      $$('[data-contador]', e.target).forEach(contar);
      io.unobserve(e.target);
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -40px 0px' }) : null;

  if (io) { $$('.revelar').forEach(function (el) { io.observe(el); }); }
  else { $$('.revelar').forEach(function (el) { el.classList.add('dentro'); animarDentro(el); }); }

  /* ── 5. Contadores ──────────────────────────────────────────────────── */
  function contar(el) {
    if (el.dataset.contado) return;
    el.dataset.contado = '1';
    var fijo = el.getAttribute('data-texto');
    var pre = el.getAttribute('data-prefijo') || '';
    var suf = el.getAttribute('data-sufijo') || '';
    if (fijo) { el.innerHTML = pre + T(fijo) + suf; return; }
    var fin = parseInt(el.getAttribute('data-contador'), 10) || 0;
    if (reducido || fin === 0) { el.innerHTML = pre + fin + suf; return; }
    var t0 = null, dur = 1100;
    function paso(t) {
      if (!t0) t0 = t;
      var p = Math.min((t - t0) / dur, 1);
      var v = Math.round(fin * (1 - Math.pow(1 - p, 3)));
      el.innerHTML = pre + numero(v) + suf;
      if (p < 1) requestAnimationFrame(paso);
    }
    requestAnimationFrame(paso);
  }

  /* ── 6. Pestañas de pantallas ───────────────────────────────────────── */
  var pestanas = $$('.pest button');
  pestanas.forEach(function (b) {
    b.addEventListener('click', function () {
      pestanas.forEach(function (o) {
        o.setAttribute('aria-selected', String(o === b));
        var panel = document.getElementById(o.getAttribute('aria-controls'));
        if (panel) panel.hidden = (o !== b);
      });
      var activo = document.getElementById(b.getAttribute('aria-controls'));
      if (activo) {
        $$('[data-w],[data-h]', activo).forEach(function (el) {
          el.style.width = el.hasAttribute('data-w') ? '0' : el.style.width;
          el.style.height = el.hasAttribute('data-h') ? '0' : el.style.height;
        });
        animarDentro(activo);
      }
    });
    b.addEventListener('keydown', function (e) {
      var i = pestanas.indexOf(b);
      if (e.key === 'ArrowRight') { pestanas[(i + 1) % pestanas.length].focus(); }
      if (e.key === 'ArrowLeft')  { pestanas[(i - 1 + pestanas.length) % pestanas.length].focus(); }
    });
  });

  /* ── 7. Reproductor de las demos ────────────────────────────────────── */
  var ROTULOS = {
    papel:   ['Planilla en papel', 'Lectura y validación', 'Resultado de la carga', 'Ya cuenta al indicador'],
    offline: ['Terreno sin cobertura', 'Todo guardado local', 'Vuelve la señal', 'Sincronizado'],
    informe: ['Auditoría del periodo', 'Avance de indicadores', 'Generando entregables', 'Cierre terminado']
  };
  var DURACION = 3000;

  var iconoPlay  = '<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4l13 8-13 8z"/></svg>';
  var iconoPausa = '<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>';

  $$('.demo').forEach(function (demo) {
    var cuadros = $$('[data-cuadro]', demo);
    var pista   = $('[data-pista]', demo);
    var rotulo  = $('[data-rotulo]', demo);
    var play    = $('[data-play]', demo);
    var nombres = ROTULOS[demo.getAttribute('data-demo')] || [];
    var i = 0, temporizador = null, corriendo = false, visible = false;

    cuadros.forEach(function (_, n) {
      var seg = document.createElement('button');
      seg.className = 'demo-seg';
      seg.type = 'button';
      seg.style.setProperty('--dur', DURACION + 'ms');
      seg.setAttribute('aria-label', T('Ir al paso {n}', { n: n + 1 }));
      seg.innerHTML = '<i></i>';
      seg.addEventListener('click', function () { ir(n); arrancar(); });
      pista.appendChild(seg);
    });
    var segmentos = $$('.demo-seg', pista);

    function ir(n) {
      i = n;
      cuadros.forEach(function (c, k) { c.classList.toggle('visible', k === n); });
      segmentos.forEach(function (s, k) {
        s.classList.remove('activo', 'lleno');
        if (k < n) s.classList.add('lleno');
      });
      // reinicia la animación del segmento activo
      var act = segmentos[n];
      act.classList.remove('activo');
      void act.offsetWidth;
      act.classList.add('activo');

      rotulo.textContent = nombres[n] ? T(nombres[n]) : '';

      var vivo = cuadros[n];
      $$('[data-contador]', vivo).forEach(function (el) { delete el.dataset.contado; contar(el); });
      $$('[data-w]', vivo).forEach(function (el, k) {
        el.style.width = '0';
        setTimeout(function () { el.style.width = el.getAttribute('data-w') + '%'; }, 120 + k * 130);
      });
      // relanza las animaciones CSS de entrada del cuadro
      $$('.linea-det', vivo).forEach(function (el) {
        el.style.animation = 'none'; void el.offsetWidth; el.style.animation = '';
      });
    }

    function siguiente() { ir((i + 1) % cuadros.length); }

    function arrancar() {
      if (reducido) { ir(i); return; }
      clearInterval(temporizador);
      corriendo = true;
      demo.classList.remove('pausada');
      play.innerHTML = iconoPausa;
      play.setAttribute('aria-label', T('Pausar'));
      ir(i);
      temporizador = setInterval(siguiente, DURACION);
    }

    function parar() {
      clearInterval(temporizador);
      corriendo = false;
      demo.classList.add('pausada');
      play.innerHTML = iconoPlay;
      play.setAttribute('aria-label', T('Reproducir'));
    }

    play.innerHTML = iconoPlay;
    play.addEventListener('click', function () { corriendo ? parar() : arrancar(); });

    // Arranca solo cuando la demo está a la vista; se pausa al salir.
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          visible = e.isIntersecting;
          if (visible && !corriendo) arrancar();
          else if (!visible && corriendo) parar();
        });
      }, { threshold: 0.35 }).observe(demo);
    } else {
      arrancar();
    }

    document.addEventListener('visibilitychange', function () {
      if (document.hidden && corriendo) parar();
      else if (!document.hidden && visible && !corriendo) arrancar();
    });

    ir(0);
    if (reducido) { cuadros.forEach(function (c) { c.classList.add('visible'); c.style.position = 'relative'; c.style.inset = 'auto'; }); }
  });

  /* ── 8. Navegación ──────────────────────────────────────────────────── */
  var nav = $('#nav'), burger = $('#burger');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('pegada', window.scrollY > 8);
    }, { passive: true });
  }
  if (nav && burger) {
    burger.addEventListener('click', function () {
      var abierta = nav.classList.toggle('abierta');
      burger.setAttribute('aria-expanded', String(abierta));
    });
    $$('#navLinks a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('abierta');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ── 9. Medición (solo si MEDICION está completo) ───────────────────── */
  var M = window.MEDICION || { etiquetas: {} };
  var hayMedicion = !!(M.ga4 || M.googleAds);
  var CLAVE = 'meal_cookies';
  var cargado = false;

  function recordar(v) { try { localStorage.setItem(CLAVE, v); } catch (e) {} }
  function recordado() { try { return localStorage.getItem(CLAVE); } catch (e) { return null; } }

  function cargarMedicion() {
    if (cargado || !hayMedicion) return;
    cargado = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    gtag('js', new Date());
    if (M.ga4) gtag('config', M.ga4);
    if (M.googleAds) gtag('config', M.googleAds);
    var sc = document.createElement('script');
    sc.async = true;
    sc.src = 'https://www.googletagmanager.com/gtag/js?id=' + (M.ga4 || M.googleAds);
    document.head.appendChild(sc);
  }

  function evento(nombre, extra) {
    if (!cargado) return;
    gtag('event', nombre, extra || {});
    var etq = (M.etiquetas || {})[nombre];
    if (M.googleAds && etq) {
      gtag('event', 'conversion', { send_to: M.googleAds + '/' + etq });
    }
  }

  /* Aviso de cookies — solo existe si hay medición configurada. */
  var aviso = null;
  function construirAviso() {
    if (aviso) { aviso.hidden = false; return; }
    aviso = document.createElement('div');
    aviso.className = 'cookies';
    aviso.setAttribute('role', 'dialog');
    aviso.setAttribute('aria-label', 'Aviso de cookies');
    aviso.innerHTML =
      '<div class="cookies-txt">' +
        '<b>Este sitio usa cookies para medir su uso</b>' +
        '<span>Nos sirven para saber qué contenido ayuda y de dónde llegan las visitas. ' +
        'Si prefiere que no, el sitio funciona igual. ' +
        '<a href="privacidad.html">Leer la política de privacidad</a></span>' +
      '</div>' +
      '<div class="cookies-btns">' +
        '<button type="button" class="btn sm" data-cookies="no">Rechazar</button>' +
        '<button type="button" class="btn sm primario" data-cookies="si">Aceptar</button>' +
      '</div>';
    document.body.appendChild(aviso);
    if (window.I18N) window.I18N.aplicar(aviso);
    aviso.addEventListener('click', function (e) {
      var b = e.target.closest('[data-cookies]');
      if (!b) return;
      var v = b.getAttribute('data-cookies');
      recordar(v);
      aviso.hidden = true;
      if (v === 'si') cargarMedicion();
    });
  }

  if (hayMedicion) {
    var elegido = recordado();
    if (elegido === 'si') { cargarMedicion(); }
    else if (elegido !== 'no') { construirAviso(); }
  }

  $$('[data-abrir-cookies]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      if (!hayMedicion) {
        alert(T('Este sitio todavía no usa cookies de medición: no hay nada que configurar.'));
        return;
      }
      construirAviso();
    });
  });

  $$('[data-wa-link]').forEach(function (a) {
    a.addEventListener('click', function () { evento('contacto_whatsapp', { origen: location.pathname }); });
  });
  $$('[data-mail-link]').forEach(function (a) {
    a.addEventListener('click', function () { evento('contacto_correo'); });
  });
  if (/guia-/.test(location.pathname)) {
    evento('guia_abierta', { guia: location.pathname });
    $$('[onclick*="print"]').forEach(function (b) {
      b.addEventListener('click', function () { evento('guia_pdf'); });
    });
  }

  /* ── 10. Formulario → WhatsApp ──────────────────────────────────────── */
  var form = $('#formDemo');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var v = function (k) { return (d.get(k) || '').toString().trim(); };
      if (!v('nombre') || !v('correo')) {
        alert(T('Necesitamos al menos su nombre y su correo.'));
        return;
      }
      var texto =
        T('Buen día, solicito una demostración de {marca}.', { marca: CONFIG.marca }) + '\n\n' +
        T('Nombre') + ': ' + v('nombre') + '\n' +
        T('Organización') + ': ' + (v('org') || '—') + '\n' +
        T('Correo') + ': ' + v('correo') + '\n' +
        T('WhatsApp') + ': ' + (v('tel') || '—') + '\n' +
        T('Personas registrando en terreno') + ': ' + v('tam') + '\n' +
        T('Principal dificultad hoy') + ': ' + (v('mensaje') || '—');
      evento('solicitud_demo', { tam: v('tam') });
      window.open('https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent(texto), '_blank', 'noopener');
    });
  }
})();
