// Recomendador turistico del oeste usando Tau Prolog.
// El JS arma la consulta segun los menus; Prolog decide cuales lugares cumplen.

let session = null;

// Reglas de Prolog (hechos + regla). Van aqui dentro para que el navegador
// no tenga que pedir un archivo .pl aparte (XAMPP no lo entrega bien).
const reglas = `
lugar(crashboat, playa, gratis, dia, aguadilla).
lugar(boqueron, playa, gratis, dia, cabo_rojo).
lugar(sandybeach, playa, gratis, dia, rincon).
lugar(faro_cabo_rojo, atardecer, gratis, atardecer, cabo_rojo).
lugar(mirador_mayaguez, atardecer, gratis, atardecer, mayaguez).
lugar(sandybeach, atardecer, gratis, atardecer, rincon).
lugar(kioscos_boqueron, comida, pago, dia, cabo_rojo).
lugar(panaderias_mayaguez, comida, pago, dia, mayaguez).
lugar(restaurantes_rincon, comida, pago, atardecer, rincon).

recomendar(Tipo, Presupuesto, Momento, Pueblo, Nombre) :-
    lugar(Nombre, Tipo, Presupuesto, Momento, Pueblo).
`;

// Nombres bonitos para mostrar (las reglas usan atomos cortos).
const nombres = {
  crashboat: "Crash Boat (Aguadilla)",
  boqueron: "Boquerón (Cabo Rojo)",
  sandybeach: "Sandy Beach (Rincón)",
  faro_cabo_rojo: "Faro de Cabo Rojo / Los Morrillos (Cabo Rojo)",
  mirador_mayaguez: "Mirador de Mayagüez (Mayagüez)",
  kioscos_boqueron: "Kioscos de Boquerón (Cabo Rojo)",
  panaderias_mayaguez: "Panaderías de Plaza Colón (Mayagüez)",
  restaurantes_rincon: "Restaurantes frente al mar (Rincón)"
};

// Carga inicial: crea la sesion y carga las reglas.
function iniciar() {
  session = pl.create(1000);
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

  // "_" es la variable anonima de Prolog: acepta cualquier pueblo.
  const puebloConsulta = (pueblo === "cualquiera") ? "_" : pueblo;
  const consulta = "recomendar(" + tipo + ", " + presupuesto + ", " + momento + ", " + puebloConsulta + ", Lugar).";

  document.getElementById("consulta").textContent = consulta;
  correrConsulta(consulta);
}

// Corre la consulta en Prolog.
function correrConsulta(consulta) {
  const encontrados = [];
  session.query(consulta, {
    success: function () { pedirSiguiente(encontrados); },
    error: function () { mostrar([], "Error en la consulta."); }
  });
}

// Pide respuestas una por una hasta que no haya mas.
function pedirSiguiente(encontrados) {
  session.answer({
    success: function (answer) {
      encontrados.push(answer.links.Lugar.toString());
      pedirSiguiente(encontrados);
    },
    fail: function () { mostrar(encontrados); },
    error: function () { mostrar(encontrados); },
    limit: function () { mostrar(encontrados); }
  });
}

// Pinta los resultados en la pagina.
function mostrar(lista, error) {
  const cont = document.getElementById("resultados");
  if (error) { cont.innerHTML = "<p>" + error + "</p>"; return; }
  if (lista.length === 0) {
    cont.innerHTML = "<p>No encontré ningún lugar con esas preferencias. Prueba otra combinación.</p>";
    return;
  }
  let html = "<ul>";
  lista.forEach(function (atomo) {
    html += "<li>" + (nombres[atomo] || atomo) + "</li>";
  });
  html += "</ul>";
  cont.innerHTML = html;
}

iniciar();
