<?php
date_default_timezone_set("America/Puerto_Rico");

$archivo = "mensajes.json";

// Lee los mensajes guardados; si no hay archivo, devuelve lista vacia.
function leerMensajes($archivo) {
    if (!file_exists($archivo)) return [];
    $datos = json_decode(file_get_contents($archivo), true);
    return is_array($datos) ? $datos : [];
}

// Si llega el formulario, guarda el mensaje y redirige (asi recargar no lo reenvia).
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $nombre = trim($_POST["nombre"] ?? "");
    $mensaje = trim($_POST["mensaje"] ?? "");

    if ($nombre !== "" && $mensaje !== "") {
        $mensajes = leerMensajes($archivo);
        $mensajes[] = [
            "nombre" => $nombre,
            "mensaje" => $mensaje,
            "fecha" => date("d/m/Y g:i A")
        ];
        file_put_contents($archivo, json_encode($mensajes, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    }
    header("Location: index.php");
    exit;
}

$mensajes = array_reverse(leerMensajes($archivo)); // mas reciente primero
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Libro de Visitas (PHP)</title>
  <style>
    :root { --mar: #117a8b; --mar-claro: #2a9db5; --atardecer: #ff7a59; --arena: #fbf3e7; --texto: #2b2b2b; }
    body { font-family: Arial, sans-serif; max-width: 680px; margin: 0 auto 40px auto; background: var(--arena); color: var(--texto); }
    header { background: linear-gradient(120deg, var(--atardecer), #ffb347 45%, var(--mar-claro)); color: #fff; padding: 26px 22px; border-radius: 0 0 14px 14px; margin-bottom: 22px; }
    header h1 { font-size: 23px; margin: 0 0 6px 0; }
    header p { margin: 0; font-size: 14px; opacity: 0.95; }
    main { padding: 0 22px; }
    label { display: block; font-size: 13px; font-weight: bold; margin: 12px 0 4px 0; color: var(--mar); }
    input[type=text], textarea { width: 100%; padding: 8px; border: 1px solid #d8cdba; border-radius: 6px; background: #fff; font-size: 14px; box-sizing: border-box; }
    textarea { height: 70px; }
    button { margin-top: 14px; padding: 11px 22px; font-size: 15px; cursor: pointer; color: #fff; background: var(--atardecer); border: none; border-radius: 8px; font-weight: bold; }
    button:hover { background: #ef6645; }
    h2 { color: var(--mar); font-size: 18px; margin-top: 28px; }
    .mensaje { background: #fff; border-left: 6px solid var(--mar-claro); border-radius: 8px; padding: 12px 16px; margin-bottom: 12px; box-shadow: 0 1px 4px rgba(0,0,0,0.08); }
    .cabeza { display: flex; justify-content: space-between; align-items: baseline; }
    .autor { font-weight: bold; color: var(--mar); }
    .fecha { font-size: 12px; color: #998f7d; }
    .texto { margin-top: 6px; color: #4a443a; white-space: pre-wrap; }
    .vacio { color: #7a6f5f; }
  </style>
</head>
<body>
  <header>
    <h1>Libro de Visitas 📖</h1>
    <p>Deja un mensaje. Se guarda en el servidor (en un archivo) y queda para los próximos visitantes.</p>
  </header>

  <main>
    <form method="post">
      <label for="nombre">Tu nombre</label>
      <input type="text" id="nombre" name="nombre" maxlength="50" placeholder="Tu nombre" required>

      <label for="mensaje">Tu mensaje</label>
      <textarea id="mensaje" name="mensaje" maxlength="500" placeholder="Escribe algo..." required></textarea>

      <button type="submit">Firmar</button>
    </form>

    <h2><?= count($mensajes) ?> mensaje(s)</h2>

    <?php if (count($mensajes) === 0): ?>
      <p class="vacio">Todavía no hay mensajes. ¡Sé el primero en firmar!</p>
    <?php else: ?>
      <?php foreach ($mensajes as $m): ?>
        <div class="mensaje">
          <div class="cabeza">
            <span class="autor"><?= htmlspecialchars($m["nombre"]) ?></span>
            <span class="fecha"><?= htmlspecialchars($m["fecha"]) ?></span>
          </div>
          <div class="texto"><?= htmlspecialchars($m["mensaje"]) ?></div>
        </div>
      <?php endforeach; ?>
    <?php endif; ?>
  </main>
</body>
</html>
