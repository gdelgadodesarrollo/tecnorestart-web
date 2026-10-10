/* ============================================================================
   Videos de la portada: el bucle del hero, el reproductor con lista y los
   botones "Ver el video" repartidos por la página. También la luz que sigue
   al puntero en las tarjetas ([data-luz]).
   Los videos se generan con herramientas/video (ver su LEEME.md).
   ============================================================================ */
(function () {
  'use strict';

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var T = function (t) { return window.I18N ? window.I18N.t(t) : t; };
  var evento = function (n, d) { if (window.MEAL_EVENTO) window.MEAL_EVENTO(n, d); };
  var idioma = (window.I18N && window.I18N.idioma) || 'es';
  var reducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var ahorro = !!(navigator.connection && navigator.connection.saveData);
  var RUTA = 'assets/video/';

  /* ── 1. Bucle del hero: mudo, solo cuando se ve y si el visitante no
        pidió menos movimiento ni ahorro de datos. ───────────────────────── */
  var hero = $('#videoHero');
  if (hero && !reducido && !ahorro && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { hero.play().catch(function () {}); }
        else { hero.pause(); }
      });
    }, { threshold: 0.25 }).observe(hero);
  }

  /* ── 2. Reproductor con lista ───────────────────────────────────────── */
  var video = $('#videoCine');
  var portada = $('#cinePortada');
  var tituloPortada = $('#cineTitulo');
  var items = $$('.f-item[data-video]');
  var actual = '345w';
  var vistos = {};

  function pistas(nombre) {
    $$('track', video).forEach(function (t) { t.remove(); });
    [['es', 'Español'], ['en', 'English']].forEach(function (p) {
      var t = document.createElement('track');
      t.kind = 'subtitles';
      t.srclang = p[0];
      t.label = p[1];
      t.src = RUTA + nombre + '.' + p[0] + '.vtt';
      if (p[0] === idioma || (idioma !== 'en' && p[0] === 'es')) t.default = true;
      video.appendChild(t);
    });
  }

  function mostrarPistaDelIdioma() {
    var lista = video.textTracks || [];
    for (var i = 0; i < lista.length; i++) {
      lista[i].mode = (lista[i].language === (idioma === 'en' ? 'en' : 'es')) ? 'showing' : 'hidden';
    }
  }

  function cargar(nombre) {
    if (!video) return;
    actual = nombre;
    video.pause();
    video.poster = RUTA + nombre + '.jpg';
    var fuente = $('source', video);
    fuente.src = RUTA + nombre + '.mp4';
    pistas(nombre);
    video.load();
    items.forEach(function (b) {
      var es = b.getAttribute('data-video') === nombre;
      b.classList.toggle('activo', es);
      b.setAttribute('aria-current', es ? 'true' : 'false');
      if (es && tituloPortada) tituloPortada.textContent = T(b.getAttribute('data-titulo'));
    });
  }

  function reproducir() {
    if (!video) return;
    if (portada) portada.hidden = true;
    var p = video.play();
    if (p && p.catch) p.catch(function () { if (portada) portada.hidden = false; });
  }

  if (video) {
    video.addEventListener('loadedmetadata', mostrarPistaDelIdioma);
    video.addEventListener('play', function () {
      if (portada) portada.hidden = true;
      if (hero) hero.pause();
      if (!vistos[actual]) { vistos[actual] = true; evento('video_reproducido', { video: actual }); }
    });
    video.addEventListener('ended', function () { evento('video_completo', { video: actual }); });
    if (portada) portada.addEventListener('click', reproducir);
    items.forEach(function (b) {
      b.addEventListener('click', function () {
        cargar(b.getAttribute('data-video'));
        reproducir();
      });
    });
    // El título de la portada en el idioma activo.
    document.addEventListener('i18n:aplicado', function () {
      var activo = items.filter(function (b) { return b.classList.contains('activo'); })[0];
      if (activo && tituloPortada) tituloPortada.textContent = T(activo.getAttribute('data-titulo'));
    });
  }

  // Botones "Ver el video" de toda la página: llevan al reproductor y lo arrancan.
  $$('[data-ver-video]').forEach(function (b) {
    b.addEventListener('click', function () {
      var nombre = b.getAttribute('data-ver-video');
      var cine = $('#cine');
      if (cine) cine.scrollIntoView({ behavior: reducido ? 'auto' : 'smooth', block: 'center' });
      if (nombre !== actual) cargar(nombre);
      reproducir();
    });
  });

  /* ── 3. Luz que sigue al puntero ────────────────────────────────────── */
  if (!reducido && window.matchMedia('(pointer: fine)').matches) {
    var pendiente = null, ultimo = null;
    document.addEventListener('pointermove', function (e) {
      ultimo = e;
      if (pendiente) return;
      pendiente = requestAnimationFrame(function () {
        pendiente = null;
        var el = ultimo.target.closest && ultimo.target.closest('[data-luz]');
        if (!el) return;
        var r = el.getBoundingClientRect();
        el.style.setProperty('--mx', (ultimo.clientX - r.left) + 'px');
        el.style.setProperty('--my', (ultimo.clientY - r.top) + 'px');
      });
    }, { passive: true });
  }
})();
