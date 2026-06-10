// Estadisticas de una lista de numeros, estilo funcional.
// Todo se hace con funciones puras y map / filter / reduce: sin bucles ni mutar datos.

// Convierte el texto en una lista de numeros limpia (separa, quita vacios y lo no-numerico).
const parsear = (texto) =>
  texto.split(/[\s,]+/).filter((t) => t !== "").map(Number).filter((n) => !isNaN(n));

// Funciones puras: reciben la lista y devuelven un valor.
const sumar = (nums) => nums.reduce((a, b) => a + b, 0);
const promedio = (nums) => sumar(nums) / nums.length;
const maximo = (nums) => nums.reduce((a, b) => (a > b ? a : b));
const minimo = (nums) => nums.reduce((a, b) => (a < b ? a : b));

// Mediana: ordena una copia (no toca el original) y toma el del medio.
const mediana = (nums) => {
  const ordenada = [...nums].sort((a, b) => a - b);
  const medio = Math.floor(ordenada.length / 2);
  return ordenada.length % 2 === 0
    ? (ordenada[medio - 1] + ordenada[medio]) / 2
    : ordenada[medio];
};

// Filtros: devuelven una lista nueva.
const mayoresQue = (nums, limite) => nums.filter((x) => x > limite);
const pares = (nums) => nums.filter((x) => x % 2 === 0);

// Redondea a 2 decimales para mostrar.
const redondear = (n) => Math.round(n * 100) / 100;

// Convierte una lista en texto, o avisa si esta vacia.
const mostrarLista = (lista) => (lista.length === 0 ? "(ninguno)" : lista.join(", "));

// Lee la caja, calcula y muestra los resultados.
function calcular() {
  const nums = parsear(document.getElementById("entrada").value);
  const cont = document.getElementById("resultados");

  if (nums.length === 0) {
    cont.innerHTML = "<p>Escribe al menos un número válido (separados por comas o espacios).</p>";
    return;
  }

  const prom = promedio(nums);
  const filas = [
    ["Cantidad", nums.length],
    ["Suma", sumar(nums)],
    ["Promedio", redondear(prom)],
    ["Máximo", maximo(nums)],
    ["Mínimo", minimo(nums)],
    ["Mediana", mediana(nums)]
  ];

  // Arma las filas de la tabla con map (sin bucles).
  const tabla = filas
    .map((f) => "<tr><td>" + f[0] + "</td><td>" + f[1] + "</td></tr>")
    .join("");

  cont.innerHTML =
    "<table>" + tabla + "</table>" +
    "<p><strong>Mayores que el promedio (" + redondear(prom) + "):</strong> " + mostrarLista(mayoresQue(nums, prom)) + "</p>" +
    "<p><strong>Pares:</strong> " + mostrarLista(pares(nums)) + "</p>";
}
