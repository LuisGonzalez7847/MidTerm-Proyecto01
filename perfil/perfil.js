// Generador de tarjeta de perfil.
// Salida: un enlace con los datos dentro del URL. Entrada: leer ese URL y dibujar la tarjeta.
// Las dos cosas usan URLSearchParams.

const colores = { mar: "#117a8b", atardecer: "#ff7a59", verde: "#4c9a6b", morado: "#8a6fb0" };

const escapar = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

// Al cargar: si el URL ya trae datos, dibuja la tarjeta.
function iniciar() {
  const params = new URLSearchParams(window.location.search);
  if (params.has("nombre")) mostrarTarjeta(params);
}

function generar() {
  const nombre = document.getElementById("f-nombre").value.trim();
  if (!nombre) { alert("Escribe al menos un nombre."); return; }

  const params = new URLSearchParams();
  params.set("nombre", nombre);
  agregarSiHay(params, "rol", "f-rol");
  agregarSiHay(params, "lugar", "f-lugar");
  agregarSiHay(params, "lema", "f-lema");
  params.set("color", document.getElementById("f-color").value);

  const enlace = window.location.origin + window.location.pathname + "?" + params.toString();
  document.getElementById("f-enlace").value = enlace;
  document.getElementById("f-abrir").href = enlace;
  document.getElementById("salida").style.display = "block";

  mostrarTarjeta(params);
}

// Pone el parametro solo si el campo no esta vacio.
function agregarSiHay(params, clave, idCampo) {
  const valor = document.getElementById(idCampo).value.trim();
  if (valor) params.set(clave, valor);
}

function copiar() {
  const enlace = document.getElementById("f-enlace").value;
  navigator.clipboard.writeText(enlace).then(
    () => alert("Enlace copiado."),
    () => alert("No se pudo copiar; selecciona el texto y cópialo a mano.")
  );
}

function mostrarTarjeta(params) {
  const nombre = params.get("nombre") || "Sin nombre";
  const rol = params.get("rol");
  const lugar = params.get("lugar");
  const lema = params.get("lema");
  const color = colores[params.get("color")] || colores.mar;
  const inicial = escapar(nombre.charAt(0).toUpperCase());

  let html = "<div class='tarjeta-perfil' style='border-top-color:" + color + "'>";
  html += "<div class='avatar' style='background:" + color + "'>" + inicial + "</div>";
  html += "<h2>" + escapar(nombre) + "</h2>";
  if (rol) html += "<div class='rol'>" + escapar(rol) + "</div>";
  if (lugar) html += "<div class='lugar'>📍 " + escapar(lugar) + "</div>";
  if (lema) html += "<p class='lema'>“" + escapar(lema) + "”</p>";
  html += "</div>";

  document.getElementById("tarjeta").innerHTML = html;
}

iniciar();
