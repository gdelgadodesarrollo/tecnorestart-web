/* ============================================================================
   Réplicas de las pantallas de la aplicación.
   Todos los datos de este archivo son ficticios y sirven solo de demostración.
   ============================================================================ */
(function () {
  'use strict';

  var rail = function (activo) {
    var grupos = [
      ['Trabajo del mes', [
        ['Panel del mes', 'panel'],
        ['Cargar formularios', 'carga'],
        ['Registro móvil', 'movil'],
        ['Actividades de terreno', 'terreno']
      ]],
      ['Calidad del dato', [
        ['Auditar datos', 'auditoria', '12'],
        ['Cargas y rechazos', 'lotes'],
        ['Personas', 'personas']
      ]],
      ['Resultados', [
        ['Indicadores IPTT', 'iptt'],
        ['Reporte de atenciones', 'alcance'],
        ['Reportes 345W', 'reportes'],
        ['Informe al donante', 'informe'],
        ['Power BI', 'powerbi']
      ]]
    ];
    var h = '<aside class="app-rail">' +
      '<div class="app-rail-logo"><b>MEAL</b><span>Proyecto Norte 2026</span><em>Organización Demo</em></div>' +
      '<nav class="app-nav">';
    grupos.forEach(function (g) {
      h += '<div class="app-nav-grupo">' + g[0] + '</div>';
      g[1].forEach(function (it) {
        h += '<a href="#pantallas" class="' + (it[1] === activo ? 'activo' : '') + '">' +
          '<span class="punto"></span>' + it[0] +
          (it[2] ? '<span class="cuenta">' + it[2] + '</span>' : '') + '</a>';
      });
    });
    return h + '</nav></aside>';
  };

  var tope = function () {
    return '<div class="app-tope">' +
      '<div class="app-periodo"><i>&#8249;</i><b>Septiembre 2026</b><i>&#8250;</i></div>' +
      '<span class="app-chip">Proyecto Norte 2026</span>' +
      '<span class="app-chip">Todos los lugares</span>' +
      '<span class="app-avatar">GD</span>' +
      '</div>';
  };

  var marco = function (activo, cuerpo) {
    return '<div class="app">' + rail(activo) +
      '<div class="app-cuerpo">' + tope() +
      '<div class="app-lienzo">' + cuerpo + '</div></div></div>';
  };

  var barra = function (pct, color) {
    return '<div class="app-prog"><i class="' + (color || '') + '" data-w="' + pct + '" style="width:0"></i></div>';
  };

  /* ── Panel del mes ──────────────────────────────────────────────────── */
  var PANEL = marco('panel',
    '<div class="app-h">' +
      '<div><h4>Panel del mes</h4><p>Septiembre 2026 · cierre en 11 días · última carga hace 2 horas</p></div>' +
      '<div style="display:flex;gap:.35rem"><span class="app-btn">Exportar</span><span class="app-btn pri">Cerrar periodo</span></div>' +
    '</div>' +

    '<div class="app-pasos">' +
      '<div class="app-paso hecho"><b>PASO 1</b><span>Cargar formularios</span><em>37 archivos · completo</em></div>' +
      '<div class="app-paso activo"><b>PASO 2</b><span>Auditar datos</span><em>12 hallazgos abiertos</em></div>' +
      '<div class="app-paso alerta"><b>PASO 3</b><span>Resolver rechazos</span><em>9 esperan decisión</em></div>' +
      '<div class="app-paso"><b>PASO 4</b><span>Informe al donante</span><em>pendiente</em></div>' +
    '</div>' +

    '<div class="app-kpis">' +
      '<div class="app-kpi"><b>1.842</b><span>Personas alcanzadas</span><em>+214 respecto de agosto</em></div>' +
      '<div class="app-kpi verde"><b>4.061</b><span>Atenciones registradas</span><em>2,2 por persona</em></div>' +
      '<div class="app-kpi morado"><b>128</b><span>Actividades de terreno</span><em>en 23 lugares</em></div>' +
      '<div class="app-kpi ambar"><b>12</b><span>Hallazgos de auditoría</span><em>revisar antes del cierre</em></div>' +
    '</div>' +

    '<div class="app-2col">' +
      '<div class="app-tarjeta">' +
        '<div class="app-tarjeta-h"><h5>Avance por indicador</h5><span>meta del trimestre</span></div>' +
        '<div class="app-tarjeta-b plano"><table class="app-tabla">' +
          '<thead><tr><th>Indicador</th><th class="num">Meta</th><th class="num">Avance</th><th style="width:88px">%</th></tr></thead>' +
          '<tbody>' +
            '<tr><td>Personas alcanzadas con servicios</td><td class="num">2.000</td><td class="num">1.842</td><td>' + barra(92, 'verde') + '</td></tr>' +
            '<tr><td>Talleres comunitarios realizados</td><td class="num">160</td><td class="num">128</td><td>' + barra(78) + '</td></tr>' +
            '<tr><td>Derivaciones efectivas a servicios</td><td class="num">420</td><td class="num">257</td><td>' + barra(61, 'ambar') + '</td></tr>' +
            '<tr><td>Kits de apoyo entregados</td><td class="num">900</td><td class="num">306</td><td>' + barra(34, 'rojo') + '</td></tr>' +
            '<tr><td>Agentes comunitarios formados</td><td class="num">75</td><td class="num">71</td><td>' + barra(95, 'verde') + '</td></tr>' +
          '</tbody>' +
        '</table></div>' +
      '</div>' +
      '<div style="display:grid;gap:.8rem;align-content:start">' +
        '<div class="app-tarjeta">' +
          '<div class="app-tarjeta-h"><h5>Personas por edad y sexo</h5><span>n = 1.842</span></div>' +
          '<div class="app-tarjeta-b">' +
            '<div class="app-piramide">' +
              '<div class="app-pir-fila"><small>60+</small><div style="flex:1;display:flex;justify-content:flex-end"><span class="app-pir-m" data-w="34" style="width:0"></span></div><div style="flex:1"><span class="app-pir-h" data-w="26" style="width:0;display:block"></span></div><span class="app-pir-n">219</span></div>' +
              '<div class="app-pir-fila"><small>30-59</small><div style="flex:1;display:flex;justify-content:flex-end"><span class="app-pir-m" data-w="88" style="width:0"></span></div><div style="flex:1"><span class="app-pir-h" data-w="54" style="width:0;display:block"></span></div><span class="app-pir-n">704</span></div>' +
              '<div class="app-pir-fila"><small>18-29</small><div style="flex:1;display:flex;justify-content:flex-end"><span class="app-pir-m" data-w="66" style="width:0"></span></div><div style="flex:1"><span class="app-pir-h" data-w="48" style="width:0;display:block"></span></div><span class="app-pir-n">512</span></div>' +
              '<div class="app-pir-fila"><small>6-17</small><div style="flex:1;display:flex;justify-content:flex-end"><span class="app-pir-m" data-w="41" style="width:0"></span></div><div style="flex:1"><span class="app-pir-h" data-w="44" style="width:0;display:block"></span></div><span class="app-pir-n">328</span></div>' +
              '<div class="app-pir-fila"><small>0-5</small><div style="flex:1;display:flex;justify-content:flex-end"><span class="app-pir-m" data-w="12" style="width:0"></span></div><div style="flex:1"><span class="app-pir-h" data-w="14" style="width:0;display:block"></span></div><span class="app-pir-n">79</span></div>' +
            '</div>' +
            '<div class="app-leyenda"><span><i style="background:var(--azul)"></i> Mujeres 58%</span><span><i style="background:#7dd3fc"></i> Hombres 42%</span></div>' +
          '</div>' +
        '</div>' +
        '<div class="app-tarjeta">' +
          '<div class="app-tarjeta-h"><h5>Requiere tu atención</h5><span>bandeja única</span></div>' +
          '<div class="app-tarjeta-b" style="display:grid;gap:.4rem">' +
            '<div class="app-mensaje ambar"><b>9 rechazos</b> del lote del 15/09 esperan corrección.</div>' +
            '<div class="app-mensaje rojo"><b>3 posibles duplicados</b> detectados entre proyectos.</div>' +
            '<div class="app-mensaje azul"><b>2 lugares nuevos</b> propuestos por la agenda de terreno.</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>'
  );

  /* ── Cargar formularios ─────────────────────────────────────────────── */
  var CARGA = marco('carga',
    '<div class="app-h">' +
      '<div><h4>Cargar formularios</h4><p>Arrastrá el archivo del periodo. El motor valida antes de guardar nada.</p></div>' +
      '<div style="display:flex;gap:.35rem"><span class="app-btn">Ver plantillas</span><span class="app-btn pri">Nueva carga</span></div>' +
    '</div>' +

    '<div class="app-suelta" style="margin-bottom:.9rem">' +
      '<div class="icono">&#8681;</div>' +
      '<b>Soltá aquí el Excel o el formulario del mes</b>' +
      '<span>.xlsx, .csv o foto de la planilla · hasta 20 MB</span>' +
    '</div>' +

    '<div class="app-2col">' +
      '<div class="app-tarjeta">' +
        '<div class="app-tarjeta-h"><h5>Resultado del último lote</h5><span>asistencias_taller_septiembre.xlsx</span></div>' +
        '<div class="app-tarjeta-b plano"><table class="app-tabla">' +
          '<thead><tr><th>Fila</th><th>Participante</th><th>Lugar</th><th>Estado</th></tr></thead>' +
          '<tbody>' +
            '<tr><td class="mono">018</td><td>M. Rojas Cabral</td><td>Comunidad Norte</td><td><span class="badge verde">Aceptado</span></td></tr>' +
            '<tr><td class="mono">019</td><td>J. Benítez</td><td>Comunidad Norte</td><td><span class="badge verde">Aceptado</span></td></tr>' +
            '<tr><td class="mono">020</td><td>A. Duarte Mora</td><td>Barrio San Blas</td><td><span class="badge azul">Persona ya conocida</span></td></tr>' +
            '<tr><td class="mono">021</td><td>C. Ayala</td><td>Barrio San Blas</td><td><span class="badge ambar">Falta la edad</span></td></tr>' +
            '<tr><td class="mono">022</td><td>L. Vera</td><td>Comunidad Este</td><td><span class="badge verde">Aceptado</span></td></tr>' +
            '<tr><td class="mono">023</td><td>R. Giménez</td><td>(vacío)</td><td><span class="badge rojo">Lugar no reconocido</span></td></tr>' +
            '<tr><td class="mono">024</td><td>S. Ocampos</td><td>Comunidad Este</td><td><span class="badge morado">Posible duplicado</span></td></tr>' +
          '</tbody>' +
        '</table></div>' +
      '</div>' +
      '<div style="display:grid;gap:.8rem;align-content:start">' +
        '<div class="app-tarjeta">' +
          '<div class="app-tarjeta-h"><h5>Resumen de la carga</h5></div>' +
          '<div class="app-tarjeta-b" style="display:grid;gap:.5rem">' +
            '<div style="display:flex;justify-content:space-between;font-size:.74rem"><span>Filas leídas</span><b>214</b></div>' +
            '<div style="display:flex;justify-content:space-between;font-size:.74rem"><span style="color:var(--verde)">Aceptadas</span><b style="color:var(--verde)">205</b></div>' +
            '<div style="display:flex;justify-content:space-between;font-size:.74rem"><span style="color:var(--ambar)">Con observación</span><b style="color:var(--ambar)">6</b></div>' +
            '<div style="display:flex;justify-content:space-between;font-size:.74rem"><span style="color:var(--rojo)">Rechazadas</span><b style="color:var(--rojo)">3</b></div>' +
            '<div style="margin-top:.2rem">' + barra(96, 'verde') + '</div>' +
            '<div class="app-mensaje verde" style="margin-top:.2rem">96% del archivo entró limpio. Lo demás queda en la bandeja de revisión, no se pierde.</div>' +
          '</div>' +
        '</div>' +
        '<div class="app-tarjeta">' +
          '<div class="app-tarjeta-h"><h5>Historial de cargas</h5></div>' +
          '<div class="app-tarjeta-b plano"><table class="app-tabla"><tbody>' +
            '<tr><td class="mono">18/09</td><td>asistencias_taller</td><td class="num"><span class="badge verde">205</span></td></tr>' +
            '<tr><td class="mono">15/09</td><td>entrega_kits</td><td class="num"><span class="badge ambar">9 pend.</span></td></tr>' +
            '<tr><td class="mono">11/09</td><td>visitas_domiciliarias</td><td class="num"><span class="badge verde">142</span></td></tr>' +
            '<tr><td class="mono">04/09</td><td>registro_derivaciones</td><td class="num"><span class="badge verde">87</span></td></tr>' +
          '</tbody></table></div>' +
        '</div>' +
      '</div>' +
    '</div>'
  );

  /* ── Auditar datos ──────────────────────────────────────────────────── */
  var AUDITORIA = marco('auditoria',
    '<div class="app-h">' +
      '<div><h4>Auditar datos</h4><p>12 hallazgos en 4.061 atenciones del periodo · última revisión hace 20 minutos</p></div>' +
      '<div style="display:flex;gap:.35rem"><span class="app-btn">Exportar hallazgos</span><span class="app-btn pri">Volver a auditar</span></div>' +
    '</div>' +

    '<div class="app-kpis" style="grid-template-columns:repeat(4,1fr)">' +
      '<div class="app-kpi verde"><b>4.049</b><span>Registros sin observación</span><em>99,7% del periodo</em></div>' +
      '<div class="app-kpi morado"><b>5</b><span>Posibles duplicados</span><em>misma persona, distinto proyecto</em></div>' +
      '<div class="app-kpi ambar"><b>4</b><span>Campos obligatorios vacíos</span><em>edad y sexo</em></div>' +
      '<div class="app-kpi rojo"><b>3</b><span>Inconsistencias graves</span><em>bloquean el cierre</em></div>' +
    '</div>' +

    '<div class="app-tarjeta">' +
      '<div class="app-tarjeta-h"><h5>Hallazgos abiertos</h5><span>ordenados por riesgo</span></div>' +
      '<div class="app-tarjeta-b plano"><table class="app-tabla">' +
        '<thead><tr><th>Riesgo</th><th>Hallazgo</th><th>Registro</th><th>Origen</th><th>Acción sugerida</th></tr></thead>' +
        '<tbody>' +
          '<tr><td><span class="badge rojo">Alto</span></td><td>Total declarado no coincide con la lista de asistencia</td><td class="mono">ACT-2026-0418</td><td>Taller · 12/09</td><td>Revisar la planilla original</td></tr>' +
          '<tr><td><span class="badge rojo">Alto</span></td><td>Actividad sin lugar asignado</td><td class="mono">ACT-2026-0431</td><td>Visita · 15/09</td><td>Asignar lugar del catálogo</td></tr>' +
          '<tr><td><span class="badge rojo">Alto</span></td><td>Fecha de atención posterior al cierre del periodo</td><td class="mono">ATN-2026-3877</td><td>Carga manual</td><td>Corregir fecha o mover de periodo</td></tr>' +
          '<tr><td><span class="badge morado">Medio</span></td><td>Misma persona registrada en dos proyectos el mismo día</td><td class="mono">PER-0091 / PER-1204</td><td>Cruce automático</td><td>Unificar identidad</td></tr>' +
          '<tr><td><span class="badge morado">Medio</span></td><td>Nombre con 92% de similitud a persona existente</td><td class="mono">PER-1337</td><td>Cruce automático</td><td>Confirmar si es la misma</td></tr>' +
          '<tr><td><span class="badge ambar">Bajo</span></td><td>Edad vacía en registro de asistencia</td><td class="mono">ATN-2026-3910</td><td>Carga 18/09</td><td>Completar desde ficha de persona</td></tr>' +
          '<tr><td><span class="badge ambar">Bajo</span></td><td>Sexo sin especificar</td><td class="mono">ATN-2026-3912</td><td>Carga 18/09</td><td>Completar</td></tr>' +
          '<tr><td><span class="badge ambar">Bajo</span></td><td>Lugar escrito distinto al del catálogo ("Comunidad Nte.")</td><td class="mono">ACT-2026-0440</td><td>Agenda de terreno</td><td>Aceptar sugerencia: Comunidad Norte</td></tr>' +
        '</tbody>' +
      '</table></div>' +
    '</div>' +
    '<div class="app-mensaje azul" style="margin-top:.8rem">La auditoría corre sola cada vez que entra un lote. Los hallazgos de riesgo alto impiden cerrar el periodo hasta que alguien los resuelva o los justifique por escrito.</div>'
  );

  /* ── IPTT ───────────────────────────────────────────────────────────── */
  var IPTT = marco('iptt',
    '<div class="app-h">' +
      '<div><h4>Indicadores IPTT</h4><p>Proyecto Norte 2026 · trimestre 3 · desagregado por sexo y edad</p></div>' +
      '<div style="display:flex;gap:.35rem"><span class="app-btn">Cambiar marco lógico</span><span class="app-btn pri">Exportar IPTT</span></div>' +
    '</div>' +

    '<div class="app-tarjeta" style="margin-bottom:.8rem">' +
      '<div class="app-tarjeta-h"><h5>Matriz de seguimiento de indicadores</h5><span>meta acumulada vs. avance real</span></div>' +
      '<div class="app-tarjeta-b plano"><table class="app-tabla">' +
        '<thead><tr><th>Cód.</th><th>Indicador</th><th class="num">Meta</th><th class="num">Avance</th><th class="num">Mujeres</th><th class="num">Hombres</th><th style="width:90px">Cumplimiento</th><th>Estado</th></tr></thead>' +
        '<tbody>' +
          '<tr><td class="mono">R1.1</td><td>Personas alcanzadas con servicios directos</td><td class="num">2.000</td><td class="num">1.842</td><td class="num">1.068</td><td class="num">774</td><td>' + barra(92, 'verde') + '</td><td><span class="badge verde">En meta</span></td></tr>' +
          '<tr><td class="mono">R1.2</td><td>Agentes comunitarios formados y certificados</td><td class="num">75</td><td class="num">71</td><td class="num">49</td><td class="num">22</td><td>' + barra(95, 'verde') + '</td><td><span class="badge verde">En meta</span></td></tr>' +
          '<tr><td class="mono">R2.1</td><td>Talleres comunitarios realizados</td><td class="num">160</td><td class="num">128</td><td class="num">—</td><td class="num">—</td><td>' + barra(78) + '</td><td><span class="badge azul">Avanzando</span></td></tr>' +
          '<tr><td class="mono">R2.2</td><td>Derivaciones efectivas a servicios de salud</td><td class="num">420</td><td class="num">257</td><td class="num">171</td><td class="num">86</td><td>' + barra(61, 'ambar') + '</td><td><span class="badge ambar">Atrasado</span></td></tr>' +
          '<tr><td class="mono">R3.1</td><td>Kits de apoyo entregados a hogares</td><td class="num">900</td><td class="num">306</td><td class="num">—</td><td class="num">—</td><td>' + barra(34, 'rojo') + '</td><td><span class="badge rojo">En riesgo</span></td></tr>' +
          '<tr><td class="mono">R3.2</td><td>Hogares con plan de acompañamiento activo</td><td class="num">300</td><td class="num">268</td><td class="num">—</td><td class="num">—</td><td>' + barra(89, 'verde') + '</td><td><span class="badge verde">En meta</span></td></tr>' +
        '</tbody>' +
      '</table></div>' +
    '</div>' +

    '<div class="app-2col">' +
      '<div class="app-tarjeta">' +
        '<div class="app-tarjeta-h"><h5>Evolución mensual · R1.1</h5><span>personas alcanzadas</span></div>' +
        '<div class="app-tarjeta-b">' +
          '<div class="app-grafico">' +
            '<div class="app-barra"><i data-h="34"></i><small>Abr</small></div>' +
            '<div class="app-barra"><i data-h="46"></i><small>May</small></div>' +
            '<div class="app-barra"><i data-h="41"></i><small>Jun</small></div>' +
            '<div class="app-barra"><i data-h="62"></i><small>Jul</small></div>' +
            '<div class="app-barra"><i data-h="71"></i><small>Ago</small></div>' +
            '<div class="app-barra"><i data-h="88" class="alt"></i><small>Sep</small></div>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="app-tarjeta">' +
        '<div class="app-tarjeta-h"><h5>Lectura del periodo</h5></div>' +
        '<div class="app-tarjeta-b" style="display:grid;gap:.4rem">' +
          '<div class="app-mensaje verde">4 de 6 indicadores en meta o por encima.</div>' +
          '<div class="app-mensaje ambar">R2.2 lleva dos meses por debajo del ritmo necesario.</div>' +
          '<div class="app-mensaje rojo">R3.1 no llega a la meta anual si se mantiene este ritmo. Requiere decisión ahora.</div>' +
        '</div>' +
      '</div>' +
    '</div>'
  );

  /* ── Reportes 345W ──────────────────────────────────────────────────── */
  var REPORTES = marco('reportes',
    '<div class="app-h">' +
      '<div><h4>Reportes y exportaciones</h4><p>Todo sale del mismo dato ya auditado · periodo Septiembre 2026</p></div>' +
      '<div style="display:flex;gap:.35rem"><span class="app-btn">Programar envío</span><span class="app-btn pri">Generar 345W</span></div>' +
    '</div>' +

    '<div class="app-kpis" style="margin-bottom:.9rem">' +
      '<div class="app-kpi"><b>412</b><span>Filas en la matriz 345W</span><em>con coordenadas</em></div>' +
      '<div class="app-kpi verde"><b>23</b><span>Lugares reportados</span><em>georreferenciados</em></div>' +
      '<div class="app-kpi morado"><b>6</b><span>Sectores de intervención</span><em>según clúster</em></div>' +
      '<div class="app-kpi"><b>0</b><span>Ajustes manuales</span><em>nada se recalcula a mano</em></div>' +
    '</div>' +

    '<div class="app-tarjeta" style="margin-bottom:.8rem">' +
      '<div class="app-tarjeta-h"><h5>Vista previa de la matriz 345W</h5><span>quién, qué, dónde, cuándo, para quién</span></div>' +
      '<div class="app-tarjeta-b plano"><table class="app-tabla">' +
        '<thead><tr><th>Organización</th><th>Sector</th><th>Actividad</th><th>Lugar</th><th class="mono">Lat</th><th class="mono">Long</th><th class="num">Personas</th><th>Mes</th></tr></thead>' +
        '<tbody>' +
          '<tr><td>Org. Demo</td><td>Protección</td><td>Taller comunitario</td><td>Comunidad Norte</td><td class="mono">-25.2841</td><td class="mono">-57.6312</td><td class="num">86</td><td>2026-09</td></tr>' +
          '<tr><td>Org. Demo</td><td>Salud</td><td>Derivación a servicio</td><td>Barrio San Blas</td><td class="mono">-25.3107</td><td class="mono">-57.5988</td><td class="num">41</td><td>2026-09</td></tr>' +
          '<tr><td>Org. Demo</td><td>Protección</td><td>Visita domiciliaria</td><td>Comunidad Este</td><td class="mono">-25.2519</td><td class="mono">-57.5741</td><td class="num">124</td><td>2026-09</td></tr>' +
          '<tr><td>Org. Demo</td><td>Medios de vida</td><td>Entrega de kits</td><td>Asentamiento Sur</td><td class="mono">-25.3492</td><td class="mono">-57.6104</td><td class="num">57</td><td>2026-09</td></tr>' +
          '<tr><td>Org. Demo</td><td>Educación</td><td>Refuerzo escolar</td><td>Comunidad Norte</td><td class="mono">-25.2841</td><td class="mono">-57.6312</td><td class="num">63</td><td>2026-09</td></tr>' +
          '<tr><td>Org. Demo</td><td>Agua y saneamiento</td><td>Sensibilización</td><td>Barrio Ribera</td><td class="mono">-25.2988</td><td class="mono">-57.6455</td><td class="num">41</td><td>2026-09</td></tr>' +
        '</tbody>' +
      '</table></div>' +
    '</div>' +

    '<div class="app-2col">' +
      '<div class="app-tarjeta">' +
        '<div class="app-tarjeta-h"><h5>Personas alcanzadas por sector</h5><span>dataset anónimo para Power BI</span></div>' +
        '<div class="app-tarjeta-b">' +
          '<div class="app-grafico">' +
            '<div class="app-barra"><i data-h="92"></i><small>Prot.</small></div>' +
            '<div class="app-barra"><i data-h="64"></i><small>Salud</small></div>' +
            '<div class="app-barra"><i data-h="48"></i><small>Educ.</small></div>' +
            '<div class="app-barra"><i data-h="71" class="alt"></i><small>M. vida</small></div>' +
            '<div class="app-barra"><i data-h="36"></i><small>WASH</small></div>' +
            '<div class="app-barra"><i data-h="27"></i><small>Otros</small></div>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="app-tarjeta">' +
        '<div class="app-tarjeta-h"><h5>Entregables listos</h5></div>' +
        '<div class="app-tarjeta-b plano"><table class="app-tabla"><tbody>' +
          '<tr><td>Matriz 345W</td><td class="num"><span class="badge verde">.xlsx</span></td></tr>' +
          '<tr><td>Reporte de atenciones</td><td class="num"><span class="badge verde">.xlsx</span></td></tr>' +
          '<tr><td>Reporte de trabajo con coordenadas</td><td class="num"><span class="badge verde">.xlsx</span></td></tr>' +
          '<tr><td>Dataset anónimo Power BI</td><td class="num"><span class="badge morado">.csv</span></td></tr>' +
          '<tr><td>Informe narrativo (borrador)</td><td class="num"><span class="badge azul">.docx</span></td></tr>' +
        '</tbody></table></div>' +
      '</div>' +
    '</div>'
  );

  /* ── Registro móvil ─────────────────────────────────────────────────── */
  var personas = [
    ['M. Rojas Cabral', 'PER-0421 · 34 · F', true],
    ['J. Benítez Ortiz', 'PER-0088 · 19 · M', true],
    ['A. Duarte Mora', 'PER-1204 · 41 · F', true],
    ['L. Vera Acosta', 'PER-0917 · 8 · M', false],
    ['C. Ayala Ramírez', 'PER-1338 · 27 · F', true],
    ['S. Ocampos Núñez', 'PER-0655 · 52 · F', false],
    ['R. Giménez Paredes', 'PER-1102 · 15 · M', true]
  ];

  var filasMovil = personas.map(function (p) {
    var ini = p[0].split(' ').slice(0, 2).map(function (x) { return x[0]; }).join('');
    return '<div class="fila-persona">' +
      '<span class="ini">' + ini + '</span>' +
      '<span class="dat"><b>' + p[0] + '</b><span>' + p[1] + '</span></span>' +
      '<span class="tic' + (p[2] ? ' on' : '') + '">&#10003;</span>' +
      '</div>';
  }).join('');

  var MOVIL =
    '<div class="fono-muesca"></div>' +
    '<div class="fono-estado"><span>09:42</span><span class="sin-senal">&#9888; Sin señal · 5 en cola</span></div>' +
    '<div class="fono-tope"><b>Taller comunitario 04</b><span>Comunidad Norte · 18/09/2026</span></div>' +
    '<div class="fono-cuerpo">' +
      '<div style="display:flex;justify-content:space-between;align-items:center;font-size:.66rem;color:var(--texto-45);padding:0 .1rem">' +
        '<span>Lista precargada · 7 personas</span><b style="color:var(--verde)">5 presentes</b>' +
      '</div>' +
      filasMovil +
      '<div style="border:1px dashed var(--azul-borde);background:var(--azul-tenue);border-radius:6px;padding:.45rem;text-align:center;font-size:.68rem;color:var(--azul-oscuro);font-weight:600">+ Agregar participante nuevo</div>' +
      '<div style="margin-top:auto;font-size:.62rem;color:var(--texto-25);text-align:center;line-height:1.5">Lugar y coordenada tomados<br>automáticamente del dispositivo</div>' +
    '</div>' +
    '<div class="fono-pie">' +
      '<span class="fono-btn sec">Guardar</span>' +
      '<span class="fono-btn">Finalizar registro</span>' +
    '</div>';

  window.PANTALLAS = {
    panel: PANEL,
    carga: CARGA,
    auditoria: AUDITORIA,
    iptt: IPTT,
    reportes: REPORTES,
    movil: MOVIL
  };
})();
