<?php
// Lee el numero del formulario. Si no hay, usa 8 por defecto.
$n = isset($_POST["n"]) ? (int)$_POST["n"] : 8;
if ($n < 1) $n = 1;
if ($n > 20) $n = 20; // tope para que el factorial siga siendo exacto

// Fibonacci paso a paso: variables que cambian dentro de un bucle.
$fib = [];
$pasosFib = [];
for ($i = 0; $i < $n; $i++) {
    if ($i == 0) {
        $fib[] = 0;
        $pasosFib[] = "Paso 1: empezamos en 0";
    } else if ($i == 1) {
        $fib[] = 1;
        $pasosFib[] = "Paso 2: empezamos en 1";
    } else {
        $suma = $fib[$i - 2] + $fib[$i - 1];
        $fib[] = $suma;
        $pasosFib[] = "Paso " . ($i + 1) . ": " . $fib[$i - 2] . " + " . $fib[$i - 1] . " = " . $suma;
    }
}

// Factorial paso a paso: un producto que se va acumulando.
$factorial = 1;
$pasosFact = [];
for ($i = 1; $i <= $n; $i++) {
    $factorial = $factorial * $i;
    $pasosFact[] = "Paso $i: multiplicar por $i → producto = " . number_format($factorial, 0, ".", ",");
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Imperativo en PHP: Fibonacci y Factorial</title>
  <style>
    :root { --mar: #117a8b; --mar-claro: #2a9db5; --atardecer: #ff7a59; --arena: #fbf3e7; --texto: #2b2b2b; }
    body { font-family: Arial, sans-serif; max-width: 680px; margin: 0 auto 40px auto; background: var(--arena); color: var(--texto); }
    header { background: linear-gradient(120deg, var(--atardecer), #ffb347 45%, var(--mar-claro)); color: #fff; padding: 26px 22px; border-radius: 0 0 14px 14px; margin-bottom: 22px; }
    header h1 { font-size: 23px; margin: 0 0 6px 0; }
    header p { margin: 0; font-size: 14px; opacity: 0.95; }
    main { padding: 0 22px; }
    form { margin-bottom: 8px; }
    label { font-weight: bold; color: var(--mar); }
    input[type=number] { padding: 8px; border: 1px solid #d8cdba; border-radius: 6px; width: 90px; font-size: 15px; }
    button { padding: 9px 20px; font-size: 15px; cursor: pointer; color: #fff; background: var(--atardecer); border: none; border-radius: 8px; font-weight: bold; }
    button:hover { background: #ef6645; }
    h2 { color: var(--mar); font-size: 19px; margin-top: 28px; }
    .secuencia { margin: 10px 0; }
    .chip { display: inline-block; background: var(--mar-claro); color: #fff; font-weight: bold; padding: 6px 11px; border-radius: 8px; margin: 3px; }
    .resultado { font-size: 18px; font-weight: bold; color: var(--mar); margin: 10px 0; }
    .pasos { background: #fff; border-left: 6px solid var(--atardecer); border-radius: 8px; padding: 10px 16px; box-shadow: 0 1px 4px rgba(0,0,0,0.08); }
    .pasos ol { margin: 6px 0; padding-left: 22px; }
    .pasos li { margin-bottom: 3px; color: #5b5346; font-size: 14px; }
  </style>
</head>
<body>
  <header>
    <h1>Fibonacci y Factorial — Paso a Paso 🔢</h1>
    <p>Estilo imperativo: variables que cambian, bucles y condicionales. Escoge un número y mira cómo se construye cada resultado.</p>
  </header>

  <main>
    <form method="post">
      <label for="n">Número (1 a 20):</label>
      <input type="number" id="n" name="n" min="1" max="20" value="<?= $n ?>">
      <button type="submit">Calcular</button>
    </form>

    <h2>Fibonacci: primeros <?= $n ?> números</h2>
    <div class="secuencia">
      <?php foreach ($fib as $numero): ?>
        <span class="chip"><?= $numero ?></span>
      <?php endforeach; ?>
    </div>
    <div class="pasos">
      <strong>Cómo se construyó:</strong>
      <ol>
        <?php foreach ($pasosFib as $paso): ?>
          <li><?= htmlspecialchars($paso) ?></li>
        <?php endforeach; ?>
      </ol>
    </div>

    <h2>Factorial de <?= $n ?></h2>
    <div class="resultado"><?= $n ?>! = <?= number_format($factorial, 0, ".", ",") ?></div>
    <div class="pasos">
      <strong>Cómo se construyó:</strong>
      <ol>
        <?php foreach ($pasosFact as $paso): ?>
          <li><?= htmlspecialchars($paso) ?></li>
        <?php endforeach; ?>
      </ol>
    </div>
  </main>
</body>
</html>
