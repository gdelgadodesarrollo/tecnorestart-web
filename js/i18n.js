/* ============================================================================
   Idiomas.

   El español NO se guarda en ningún archivo de traducción: el original es el
   texto que está escrito en el HTML. Los demás idiomas son diccionarios que
   traducen ese texto tal cual, palabra por palabra de origen.

   Consecuencias prácticas:
     · Si el archivo del idioma no carga, la página sigue funcionando en
       español. Nunca se ve una clave rota tipo "hero.titulo".
     · Para agregar un idioma no se toca el HTML: se agrega i18n/<codigo>.js.
     · Al editar un texto en español, la traducción vieja deja de aplicar a esa
       frase y se muestra el español nuevo, hasta que se actualice el
       diccionario. Ver docs/idiomas.md.

   Este archivo va en el <head>, antes que los demás scripts.
   ============================================================================ */
(function () {
  'use strict';

  /* ▼▼▼  IDIOMAS DISPONIBLES  ▼▼▼
     Para sumar uno: agregá la ficha acá y creá el archivo i18n/<codigo>.js.
     'miles' es el separador de miles que usa ese idioma. */
  var ORIGEN = 'es';
  var IDIOMAS = {
    es: { etiqueta: 'ES', nombre: 'Español', htmlLang: 'es', ogLocale: 'es_LA', miles: '.', decimal: ',' },
    en: { etiqueta: 'EN', nombre: 'English', htmlLang: 'en', ogLocale: 'en_US', miles: ',', decimal: '.' }
  };
  /* ▲▲▲  FIN DEL BLOQUE EDITABLE  ▲▲▲ */

  var CLAVE = 'meal_idioma';
  var ATRIBUTOS = ['placeholder', 'title', 'aria-label', 'alt'];
  var METAS = [
    'meta[name="description"]',
    'meta[property="og:title"]',
    'meta[property="og:description"]',
    'meta[property="og:image:alt"]',
    'meta[name="twitter:title"]',
    'meta[name="twitter:description"]'
  ];
  // No se entra a traducir dentro de estas etiquetas.
  var CERRADAS = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1, CODE: 1, TEXTAREA: 1, svg: 1, SVG: 1 };

  var diccionarios = {};
  var vistos = {};                 // catálogo de todo lo traducible que se encontró
  var idioma = ORIGEN;
  var yaAplicado = false;

  /* ── Utilidades ─────────────────────────────────────────────────────── */

  function normalizar(t) { return String(t).replace(/\s+/g, ' ').trim(); }

  function guardar(v) { try { localStorage.setItem(CLAVE, v); } catch (e) {} }
  function guardado()  { try { return localStorage.getItem(CLAVE); } catch (e) { return null; } }

  function parametro(n) {
    var m = new RegExp('[?&]' + n + '=([^&#]*)').exec(location.search);
    return m ? decodeURIComponent(m[1]).toLowerCase() : null;
  }

  // ¿Vale la pena buscar este texto en el diccionario?
  function traducible(k) {
    if (k.length < 2) return false;
    if (!/[a-záéíóúüñ]/i.test(k)) return false;   // sin letras: números, símbolos, guiones
    return true;
  }

  function buscar(k) {
    var d = diccionarios[idioma];
    var v = d && Object.prototype.hasOwnProperty.call(d, k) ? d[k] : null;
    return (typeof v === 'string' && v !== '') ? v : null;
  }

  /* ── Números ────────────────────────────────────────────────────────────
     El sitio escribe los miles con punto (1.842) porque ese es el uso en
     español. En inglés eso se lee como un decimal, así que se convierte. */

  function separadores() {
    var a = IDIOMAS[ORIGEN], b = IDIOMAS[idioma] || a;
    return { deMiles: a.miles, aMiles: b.miles, deDecimal: a.decimal, aDecimal: b.decimal };
  }

  function agrupar(n) {
    var s = String(Math.abs(Math.round(n))), out = '', c = 0;
    var sep = (IDIOMAS[idioma] || IDIOMAS[ORIGEN]).miles;
    for (var i = s.length - 1; i >= 0; i--) {
      out = s.charAt(i) + out;
      if (++c % 3 === 0 && i > 0) out = sep + out;
    }
    return (n < 0 ? '-' : '') + out;
  }

  // Reescribe los números de un texto al formato del idioma activo.
  function renumerar(txt) {
    var s = separadores();
    if (s.deMiles === s.aMiles && s.deDecimal === s.aDecimal) return txt;
    // Los miles se marcan primero y se reemplazan al final: si se pusiera ya
    // el separador definitivo, la pasada de decimales volvería a tocarlo
    // (en español los miles llevan punto y los decimales coma, y en inglés al
    // revés, así que una pasada deshace la otra).
    var MARCA = '\u0000';
    var miles = new RegExp('(\\d{1,3})((?:\\' + s.deMiles + '\\d{3})+)(?!\\d)', 'g');
    txt = txt.replace(miles, function (todo, cabeza, resto) {
      return cabeza + resto.split(s.deMiles).join(MARCA);
    });
    var dec = new RegExp('(\\d)\\' + s.deDecimal + '(\\d)', 'g');
    txt = txt.replace(dec, '$1' + s.aDecimal + '$2');
    return txt.split(MARCA).join(s.aMiles);
  }

  /* ── Recorrido del documento ────────────────────────────────────────── */

  function saltar(el) {
    if (CERRADAS[el.nodeName] || CERRADAS[el.nodeName.toLowerCase()]) return true;
    if (el.hasAttribute && el.hasAttribute('data-i18n-omitir')) return true;
    return false;
  }

  // Los códigos, coordenadas e identificadores van en .mono: no se les tocan
  // los números ni se traducen.
  function esLiteral(el) {
    return !!(el && el.classList && el.classList.contains('mono'));
  }

  function traducirTexto(nodo, literal) {
    var bruto = nodo.nodeValue;
    if (!bruto) return;
    var k = normalizar(bruto);
    if (!k) return;

    if (traducible(k)) {
      vistos[k] = true;
      var v = buscar(k);
      if (v !== null && v !== k) {
        // Se conservan los espacios y saltos de línea de alrededor.
        nodo.nodeValue = /^\s*/.exec(bruto)[0] + v + /\s*$/.exec(bruto)[0];
        return;
      }
    }
    if (!literal) {
      var r = renumerar(bruto);
      if (r !== bruto) nodo.nodeValue = r;
    }
  }

  function traducirAtributos(el) {
    for (var i = 0; i < ATRIBUTOS.length; i++) {
      var a = ATRIBUTOS[i];
      if (!el.hasAttribute(a)) continue;
      var k = normalizar(el.getAttribute(a));
      if (!k || !traducible(k)) continue;
      vistos[k] = true;
      var v = buscar(k);
      if (v !== null && v !== k) el.setAttribute(a, v);
    }
  }

  function recorrer(raiz, literal) {
    var n = raiz.firstChild;
    while (n) {
      var sig = n.nextSibling;
      if (n.nodeType === 3) {
        traducirTexto(n, literal);
      } else if (n.nodeType === 1 && !saltar(n)) {
        traducirAtributos(n);
        recorrer(n, literal || esLiteral(n));
      }
      n = sig;
    }
  }

  function traducirCabecera() {
    var ficha = IDIOMAS[idioma] || IDIOMAS[ORIGEN];
    document.documentElement.lang = ficha.htmlLang;

    var t = normalizar(document.title);
    if (t) {
      vistos[t] = true;
      var vt = buscar(t);
      if (vt) document.title = vt;
    }
    METAS.forEach(function (sel) {
      var m = document.head.querySelector(sel);
      if (!m) return;
      var k = normalizar(m.getAttribute('content') || '');
      if (!k || !traducible(k)) return;
      vistos[k] = true;
      var v = buscar(k);
      if (v) m.setAttribute('content', v);
    });
    var loc = document.head.querySelector('meta[property="og:locale"]');
    if (loc) loc.setAttribute('content', ficha.ogLocale);
  }

  /* ── Selector visible ───────────────────────────────────────────────── */

  function pintarSelector() {
    var montajes = document.querySelectorAll('[data-i18n-selector]');
    if (!montajes.length) return;
    var codigos = Object.keys(IDIOMAS);
    if (codigos.length < 2) return;

    Array.prototype.forEach.call(montajes, function (m) {
      var caja = document.createElement('div');
      caja.className = 'idiomas';
      caja.setAttribute('role', 'group');
      caja.setAttribute('aria-label', buscar('Idioma') || 'Idioma');
      codigos.forEach(function (c) {
        var b = document.createElement('button');
        b.type = 'button';
        b.setAttribute('data-idioma', c);
        b.setAttribute('aria-pressed', String(c === idioma));
        b.setAttribute('lang', IDIOMAS[c].htmlLang);
        b.title = IDIOMAS[c].nombre;
        b.textContent = IDIOMAS[c].etiqueta;
        b.addEventListener('click', function () { cambiar(c); });
        caja.appendChild(b);
      });
      m.innerHTML = '';
      m.appendChild(caja);
    });
  }

  function cambiar(c) {
    if (!IDIOMAS[c] || c === idioma) return;
    guardar(c);
    // Recargar es la forma más segura: los scripts vuelven a pintar todo
    // desde el original en español y el diccionario se aplica una sola vez.
    location.reload();
  }

  /* ── Arranque ───────────────────────────────────────────────────────── */

  function elegir() {
    var url = parametro('idioma') || parametro('lang');
    if (url && IDIOMAS[url]) { guardar(url); return url; }
    var g = guardado();
    if (g && IDIOMAS[g]) return g;
    var nav = (navigator.language || navigator.userLanguage || '').slice(0, 2).toLowerCase();
    return IDIOMAS[nav] ? nav : ORIGEN;
  }

  idioma = elegir();

  // Mientras se traduce, el cuerpo se mantiene oculto para no mostrar un
  // parpadeo de español. Se destapa sí o sí, aunque el diccionario falle.
  var tapado = false;
  if (idioma !== ORIGEN) {
    document.documentElement.className += ' i18n-cargando';
    tapado = true;
    setTimeout(destapar, 1500);
  }
  function destapar() {
    if (!tapado) return;
    tapado = false;
    document.documentElement.className =
      document.documentElement.className.replace(/\bi18n-cargando\b/g, '').trim();
  }

  var dicListo = (idioma === ORIGEN);
  var domListo = false;

  function intentar() {
    if (!dicListo || !domListo || yaAplicado) return;
    yaAplicado = true;
    if (idioma !== ORIGEN) {
      traducirCabecera();
      recorrer(document.body, false);
    }
    pintarSelector();
    destapar();
    document.dispatchEvent(new CustomEvent('i18n:aplicado', { detail: { idioma: idioma } }));
    if (parametro('i18n') === 'catalogo') volcarCatalogo();
  }

  if (idioma !== ORIGEN) {
    var s = document.createElement('script');
    s.src = 'i18n/' + idioma + '.js';
    s.onload  = function () { dicListo = true; intentar(); };
    s.onerror = function () {
      console.warn('[i18n] No se pudo cargar i18n/' + idioma + '.js. La página queda en español.');
      dicListo = true;
      intentar();
    };
    (document.head || document.documentElement).appendChild(s);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { domListo = true; intentar(); });
  } else {
    domListo = true;
    intentar();
  }

  /* ── Modo catálogo ──────────────────────────────────────────────────────
     Abrí cualquier página con ?i18n=catalogo y la consola del navegador
     muestra todos los textos traducibles de ESA página y cuáles le faltan al
     diccionario activo. Es la forma de verificar que no quedó nada suelto. */

  function volcarCatalogo() {
    var claves = Object.keys(vistos).sort();
    var d = diccionarios[idioma] || {};
    var faltan = idioma === ORIGEN ? [] : claves.filter(function (k) { return !d[k]; });
    console.log('[i18n] ' + claves.length + ' textos traducibles en esta página.');
    console.log(JSON.stringify(claves, null, 2));
    if (idioma !== ORIGEN) {
      console.log('[i18n] Sin traducir en "' + idioma + '": ' + faltan.length);
      if (faltan.length) console.log(JSON.stringify(faltan, null, 2));
    }
    return { claves: claves, faltan: faltan };
  }

  /* ── Interfaz pública ───────────────────────────────────────────────── */

  window.I18N = {
    idioma:   idioma,
    origen:   ORIGEN,
    idiomas:  IDIOMAS,
    // Traduce una frase suelta de JavaScript. {n} y similares se sustituyen.
    t: function (txt, vars) {
      var k = normalizar(txt);
      var v = buscar(k);
      var r = v === null ? txt : v;
      if (vars) {
        Object.keys(vars).forEach(function (n) {
          r = r.split('{' + n + '}').join(vars[n]);
        });
      }
      return r;
    },
    // Número con el separador de miles del idioma activo.
    numero: agrupar,
    // Traduce un trozo de DOM recién creado (por ejemplo el aviso de cookies).
    aplicar: function (raiz) {
      if (idioma === ORIGEN || !raiz) return;
      recorrer(raiz, false);
    },
    // La usan los archivos i18n/<codigo>.js.
    registrar: function (codigo, mapa) {
      diccionarios[codigo] = mapa;
    },
    cambiar:  cambiar,
    catalogo: volcarCatalogo
  };
})();
