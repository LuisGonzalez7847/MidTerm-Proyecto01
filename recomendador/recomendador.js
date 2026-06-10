// Recomendador turistico del oeste usando Tau Prolog.
// El JS arma la consulta segun los menus; Prolog decide cuales lugares cumplen.

let session = null;

// Reglas de Prolog (hechos + regla). Van aqui dentro para no depender de un .pl aparte.
// lugar(Nombre, Tipo, Presupuesto, Momento, Pueblo).
const reglas = `
lugar(crashboat, playa, gratis, dia, aguadilla).
lugar(jobos, playa, gratis, dia, isabela).
lugar(montones, playa, gratis, dia, isabela).
lugar(shacks, playa, gratis, dia, isabela).
lugar(cara_del_indio, cultura, gratis, dia, isabela).
lugar(paseo_lineal, naturaleza, gratis, dia, isabela).
lugar(sandybeach, playa, gratis, dia, rincon).
lugar(faro_rincon, mirador, gratis, atardecer, rincon).
lugar(restaurantes_rincon, comida, pago, atardecer, rincon).
lugar(mirador_mayaguez, mirador, gratis, atardecer, mayaguez).
lugar(panaderias_mayaguez, comida, pago, dia, mayaguez).
lugar(boqueron, playa, gratis, dia, cabo_rojo).
lugar(playa_sucia, playa, gratis, dia, cabo_rojo).
lugar(buye, playa, gratis, dia, cabo_rojo).
lugar(combate, playa, gratis, dia, cabo_rojo).
lugar(faro_cabo_rojo, mirador, gratis, atardecer, cabo_rojo).
lugar(salinas_cabo_rojo, naturaleza, gratis, dia, cabo_rojo).
lugar(kioscos_boqueron, comida, pago, dia, cabo_rojo).
lugar(biobahia_parguera, naturaleza, pago, noche, lajas).
lugar(cayos_parguera, naturaleza, pago, dia, lajas).
lugar(malecon_parguera, comida, pago, dia, lajas).
lugar(porta_coeli, cultura, pago, dia, san_german).
lugar(iglesia_auxerre, cultura, gratis, dia, san_german).
lugar(plaza_quinones, cultura, gratis, dia, san_german).
lugar(lupitos, comida, pago, dia, san_german).
lugar(gozalandia, naturaleza, pago, dia, san_sebastian).
lugar(murales_san_sebastian, cultura, gratis, dia, san_sebastian).

recomendar(Tipo, Presupuesto, Momento, Pueblo, Nombre) :-
    lugar(Nombre, Tipo, Presupuesto, Momento, Pueblo).
`;

// Nombres bonitos para mostrar (las reglas usan atomos cortos).
const nombres = {
  crashboat: "Crash Boat", jobos: "Playa Jobos", montones: "Playa Montones",
  shacks: "Playa Shacks", cara_del_indio: "La Cara del Indio (Monumento a Mabodamaca)",
  paseo_lineal: "Paseo Lineal de Isabela", sandybeach: "Sandy Beach",
  faro_rincon: "Faro de Rincón (Punta Higüero)", restaurantes_rincon: "Restaurantes frente al mar",
  mirador_mayaguez: "Mirador de Mayagüez", panaderias_mayaguez: "Panaderías de Plaza Colón",
  boqueron: "Boquerón", playa_sucia: "Playa Sucia (Playuela)", buye: "Playa Buyé",
  combate: "Playa El Combate", faro_cabo_rojo: "Faro de Cabo Rojo (Los Morrillos)",
  salinas_cabo_rojo: "Salinas de Cabo Rojo", kioscos_boqueron: "Kioscos de Boquerón",
  biobahia_parguera: "Bahía bioluminiscente de La Parguera", cayos_parguera: "Los Cayos de La Parguera",
  malecon_parguera: "El Malecón de La Parguera", porta_coeli: "Museo Porta Coeli",
  iglesia_auxerre: "Iglesia San Germán de Auxerre", plaza_quinones: "Plaza Francisco Mariano Quiñones",
  lupitos: "Lupito's", gozalandia: "Cascadas de Gozalandia",
  murales_san_sebastian: "Murales y Plaza de San Sebastián"
};

// Etiquetas y colores para mostrar.
const etiquetaPueblo = { aguadilla: "Aguadilla", isabela: "Isabela", rincon: "Rincón", mayaguez: "Mayagüez", cabo_rojo: "Cabo Rojo", lajas: "Lajas", san_german: "San Germán", san_sebastian: "San Sebastián" };
const etiquetaTipo = { playa: "Playa", mirador: "Atardecer / mirador", comida: "Comida", naturaleza: "Naturaleza", cultura: "Cultura e historia" };
const etiquetaMomento = { dia: "De día", atardecer: "Al atardecer", noche: "De noche" };
const etiquetaPresupuesto = { gratis: "Gratis", pago: "De pago" };
const colorTipo = { playa: "#2a9db5", mirador: "#ff8c42", comida: "#e76f51", naturaleza: "#4c9a6b", cultura: "#8a6fb0" };

// Carga inicial: crea la sesion y carga las reglas.
function iniciar() {
  session = pl.create(2000);
  session.consult(reglas, {
    success: function () {},
    error: function (err) { alert("Error en las reglas de Prolog: " + pl.format_answer(err)); }
  });
}

// Lee los menus, arma la consulta y la corre.
function recomendar() {
  const tipo = document.getElementById("tipo").value;
  const presupuesto = document.getElementById("presupuesto").value;
  const momento = document.getElementById("momento").value;
  const pueblo = document.getElementById("pueblo").value;

  // Si pides "cualquiera", usamos una variable Pueblo para que Prolog nos diga de que pueblo es cada lugar.
  const usarVar = (pueblo === "cualquiera");
  const puebloEnConsulta = usarVar ? "Pueblo" : pueblo;
  const consulta = "recomendar(" + tipo + ", " + presupuesto + ", " + momento + ", " + puebloEnConsulta + ", Lugar).";

  document.getElementById("consulta").textContent = consulta;
  const ctx = { tipo, presupuesto, momento, pueblo, usarVar };
  correrConsulta(consulta, ctx);
}

// Corre la consulta en Prolog.
function correrConsulta(consulta, ctx) {
  const encontrados = [];
  session.query(consulta, {
    success: function () { pedirSiguiente(encontrados, ctx); },
    error: function () { document.getElementById("resultados").innerHTML = "<p>Error en la consulta.</p>"; }
  });
}

// Pide respuestas una por una hasta que no haya mas.
function pedirSiguiente(encontrados, ctx) {
  session.answer({
    success: function (answer) {
      const lugar = answer.links.Lugar.toString();
      const pueblo = ctx.usarVar ? answer.links.Pueblo.toString() : ctx.pueblo;
      encontrados.push({ lugar: lugar, pueblo: pueblo });
      pedirSiguiente(encontrados, ctx);
    },
    fail: function () { mostrar(encontrados, ctx); },
    error: function () { mostrar(encontrados, ctx); },
    limit: function () { mostrar(encontrados, ctx); }
  });
}

// Pinta los resultados como tarjetas.
function mostrar(lista, ctx) {
  const cont = document.getElementById("resultados");
  if (lista.length === 0) {
    cont.innerHTML = "<p class='vacio'>No encontré ningún lugar con esas preferencias. Prueba otra combinación.</p>";
    return;
  }

  const color = colorTipo[ctx.tipo];
  const tarjetas = lista.map(function (r) {
    const nombre = nombres[r.lugar] || r.lugar;
    const meta = etiquetaPueblo[r.pueblo] + " · " + etiquetaMomento[ctx.momento] + " · " + etiquetaPresupuesto[ctx.presupuesto];
    return "<div class='tarjeta' style='border-left-color:" + color + "'>" +
             "<div class='nombre'>" + nombre + "</div>" +
             "<span class='badge' style='background:" + color + "'>" + etiquetaTipo[ctx.tipo] + "</span>" +
             "<div class='meta'>" + meta + "</div>" +
           "</div>";
  }).join("");

  cont.innerHTML = "<p class='conteo'>" + lista.length + " lugar(es) encontrado(s):</p>" + tarjetas;
}

iniciar();
