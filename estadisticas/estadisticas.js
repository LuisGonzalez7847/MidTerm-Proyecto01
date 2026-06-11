// Estadisticas de una lista de numeros, estilo funcional:
// funciones puras + map / filter / reduce, sin bucles ni mutar datos.

// Texto -> lista de numeros limpia.
const parsear = (texto) =>
  texto.split(/[\s,]+/).filter((t) => t !== "").map(Number).filter((n) => !isNaN(n));

const sumar = (nums) => nums.reduce((a, b) => a + b, 0);
const promedio = (nums) => sumar(nums) / nums.length;
const maximo = (nums) => nums.reduce((a, b) => (a > b ? a : b));
const minimo = (nums) => nums.reduce((a, b) => (a < b ? a : b));
const rango = (nums) => maximo(nums) - minimo(nums);

const mediana = (nums) => {
  const ordenada = [...nums].sort((a, b) => a - b);
  const medio = Math.floor(ordenada.length / 2);
  return ordenada.length % 2 === 0 ? (ordenada[medio - 1] + ordenada[medio]) / 2 : ordenada[medio];
};

const frecuencias = (nums) => nums.reduce((acc, n) => ({ ...acc, [n]: (acc[n] || 0) + 1 }), {});

// Moda: el/los valor(es) que mas se repiten; vacio si nadie se repite.
const moda = (nums) => {
  const f = frecuencias(nums);
  const maxFrec = Math.max(...Object.values(f));
  return maxFrec === 1 ? [] : Object.keys(f).filter((k) => f[k] === maxFrec).map(Number);
};

const desviacion = (nums) => {
  const m = promedio(nums);
  return Math.sqrt(promedio(nums.map((x) => (x - m) ** 2)));
};

const mayoresQue = (nums, limite) => nums.filter((x) => x > limite);
const pares = (nums) => nums.filter((x) => x % 2 === 0);

const redondear = (n) => Math.round(n * 100) / 100;
const mostrarLista = (lista) => (lista.length === 0 ? "(ninguno)" : lista.join(", "));

function calcular() {
  const nums = parsear(document.getElementById("entrada").value);
  const cont = document.getElementById("resultados");

  if (nums.length === 0) {
    cont.innerHTML = "<p class='vacio'>Escribe al menos un número válido (separados por comas o espacios).</p>";
    return;
  }

  const prom = promedio(nums);
  const stats = [
    ["Cantidad", nums.length],
    ["Suma", sumar(nums)],
    ["Promedio", redondear(prom)],
    ["Mediana", mediana(nums)],
    ["Moda", mostrarLista(moda(nums))],
    ["Máximo", maximo(nums)],
    ["Mínimo", minimo(nums)],
    ["Rango", rango(nums)],
    ["Desv. estándar", redondear(desviacion(nums))]
  ];

  const tarjetas = stats
    .map((s) => "<div class='stat'><div class='valor'>" + s[1] + "</div><div class='etiqueta'>" + s[0] + "</div></div>")
    .join("");

  cont.innerHTML =
    "<div class='grid'>" + tarjetas + "</div>" +
    "<div class='filtros'>" +
      "<p><strong>Mayores que el promedio (" + redondear(prom) + "):</strong> " + mostrarLista(mayoresQue(nums, prom)) + "</p>" +
      "<p><strong>Pares:</strong> " + mostrarLista(pares(nums)) + "</p>" +
    "</div>";
}
