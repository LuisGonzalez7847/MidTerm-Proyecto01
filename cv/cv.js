// Maneja el CV: carga los datos, los guarda en localStorage,
// dibuja el resume en HTML, permite prender/apagar entradas y descargar el PDF.

let datos = null;

// Carga inicial: usa lo guardado en localStorage; si no hay nada, lee cv.json.
async function iniciar() {
  const guardado = localStorage.getItem("cv");
  if (guardado) {
    datos = JSON.parse(guardado);
  } else {
    try {
      const resp = await fetch("cv.json");
      datos = await resp.json();
      guardar(); // copia el JSON a localStorage la primera vez
    } catch (e) {
      alert("No se pudo leer cv.json. Abre la página desde un servidor local (XAMPP / localhost), no haciendo doble clic al archivo.");
      return;
    }
  }
  dibujarEditor();
  dibujarResume();
}

// Guarda el estado actual en localStorage bajo la llave "cv".
function guardar() {
  localStorage.setItem("cv", JSON.stringify(datos));
}

// Arma el resume en HTML usando solo las entradas marcadas para incluir.
function dibujarResume() {
  const cont = document.getElementById("resume");
  let html = "<h1>" + datos.nombre + "</h1>";

  datos.categorias.forEach(cat => {
    const visibles = cat.entradas.filter(e => e.incluir);
    if (visibles.length === 0) return; // categoría vacía no se muestra

    html += "<section><h2>" + cat.titulo + "</h2>";
    visibles.forEach(e => {
      html += "<div class='entrada'>";
      if (e.titulo) html += "<span class='titulo'>" + e.titulo + "</span>";
      if (e.fecha) html += "<span class='fecha'>" + e.fecha + "</span>";
      if (e.subtitulo) html += "<div class='subtitulo'>" + e.subtitulo + "</div>";
      if (e.detalle) html += "<div class='detalle'>" + e.detalle + "</div>";
      html += "</div>";
    });
    html += "</section>";
  });

  cont.innerHTML = html;
}

// Lista cada entrada con un checkbox para incluirla y un botón para borrarla.
function dibujarEditor() {
  const cont = document.getElementById("editor");
  let html = "";

  datos.categorias.forEach((cat, ci) => {
    html += "<div class='cat-edit'><h3>" + cat.titulo + "</h3>";
    cat.entradas.forEach((e, ei) => {
      const nombre = e.titulo || e.detalle || "(entrada)";
      html += "<label class='fila'>";
      html += "<input type='checkbox' " + (e.incluir ? "checked" : "") +
              " onchange='alternar(" + ci + "," + ei + ")'>";
      html += "<span>" + nombre + "</span>";
      html += "<button onclick='borrar(" + ci + "," + ei + ")'>Borrar</button>";
      html += "</label>";
    });
    html += "</div>";
  });

  cont.innerHTML = html;
  llenarSelect();
}

// Prende o apaga si una entrada va en el resume.
function alternar(ci, ei) {
  datos.categorias[ci].entradas[ei].incluir = !datos.categorias[ci].entradas[ei].incluir;
  guardar();
  dibujarResume();
}

// Borra una entrada del CV.
function borrar(ci, ei) {
  datos.categorias[ci].entradas.splice(ei, 1);
  guardar();
  dibujarEditor();
  dibujarResume();
}

// Llena el menú del formulario con las categorías existentes.
function llenarSelect() {
  const sel = document.getElementById("f-categoria");
  sel.innerHTML = "";
  datos.categorias.forEach((cat, i) => {
    sel.innerHTML += "<option value='" + i + "'>" + cat.titulo + "</option>";
  });
}

// Agrega una entrada nueva a la categoría escogida en el formulario.
function agregar() {
  const ci = parseInt(document.getElementById("f-categoria").value);
  const nueva = {
    incluir: true,
    titulo: document.getElementById("f-titulo").value,
    subtitulo: document.getElementById("f-subtitulo").value,
    fecha: document.getElementById("f-fecha").value,
    detalle: document.getElementById("f-detalle").value
  };
  if (!nueva.titulo && !nueva.detalle) {
    alert("Escribe al menos un título o un detalle.");
    return;
  }
  datos.categorias[ci].entradas.push(nueva);
  guardar();
  dibujarEditor();
  dibujarResume();
  // limpia el formulario
  ["f-titulo", "f-subtitulo", "f-fecha", "f-detalle"].forEach(id => {
    document.getElementById(id).value = "";
  });
}

// Vuelve a cargar los datos originales desde cv.json.
async function restaurar() {
  if (!confirm("Esto borra tus cambios y vuelve al CV original. ¿Seguir?")) return;
  localStorage.removeItem("cv");
  await iniciar();
}

// Genera y descarga el PDF con jsPDF a partir de las entradas incluidas.
function descargarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const margen = 15;
  const anchoTexto = 180;
  let y = 20;

  // Salta de página si nos acercamos al final.
  function revisarEspacio() {
    if (y > 275) { doc.addPage(); y = 20; }
  }

  doc.setFontSize(18);
  doc.text(datos.nombre, margen, y);
  y += 10;

  datos.categorias.forEach(cat => {
    const visibles = cat.entradas.filter(e => e.incluir);
    if (visibles.length === 0) return;

    revisarEspacio();
    doc.setFontSize(13);
    doc.setFont(undefined, "bold");
    doc.text(cat.titulo, margen, y);
    y += 7;

    visibles.forEach(e => {
      doc.setFontSize(11);
      if (e.titulo) {
        doc.setFont(undefined, "bold");
        doc.text(e.titulo, margen, y);
        if (e.fecha) doc.text(e.fecha, 195, y, { align: "right" });
        y += 6;
      }
      if (e.subtitulo) {
        doc.setFont(undefined, "italic");
        doc.text(e.subtitulo, margen, y);
        y += 6;
      }
      if (e.detalle) {
        doc.setFont(undefined, "normal");
        const lineas = doc.splitTextToSize(e.detalle, anchoTexto);
        doc.text(lineas, margen, y);
        y += lineas.length * 5;
      }
      y += 2;
      revisarEspacio();
    });
    y += 3;
  });

  doc.save("CV_Luis_Gonzalez.pdf");
}

iniciar();
