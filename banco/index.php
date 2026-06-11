<?php
require "cuenta.php";

// Crear cuentas y hacer operaciones sobre los objetos.
$cuentas = [];

$luis = new Cuenta("Luis González", 100);
$luis->depositar(50);
$luis->retirar(30);
$luis->retirar(500);
$cuentas[] = $luis;

$ana = new CuentaAhorro("Ana Pérez", 1000, 0.05);
$ana->depositar(200);
$ana->aplicarInteres();
$cuentas[] = $ana;
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Banco (OOP en PHP)</title>
  <style>
    :root { --mar: #117a8b; --mar-claro: #2a9db5; --atardecer: #ff7a59; --arena: #fbf3e7; --texto: #2b2b2b; }
    body { font-family: Arial, sans-serif; max-width: 680px; margin: 0 auto 40px auto; background: var(--arena); color: var(--texto); }
    header { background: linear-gradient(120deg, var(--atardecer), #ffb347 45%, var(--mar-claro)); color: #fff; padding: 26px 22px; border-radius: 0 0 14px 14px; margin-bottom: 22px; }
    header h1 { font-size: 23px; margin: 0 0 6px 0; }
    header p { margin: 0; font-size: 14px; opacity: 0.95; }
    main { padding: 0 22px; }
    .tarjeta { background: #fff; border-left: 6px solid var(--mar); border-radius: 8px; padding: 14px 16px; margin-bottom: 16px; box-shadow: 0 1px 4px rgba(0,0,0,0.08); }
    .nombre { font-size: 17px; font-weight: bold; }
    .badge { display: inline-block; background: var(--mar-claro); color: #fff; font-size: 12px; padding: 2px 9px; border-radius: 12px; margin-top: 4px; }
    .balance { font-size: 16px; font-weight: bold; color: var(--mar); margin: 10px 0; }
    .historial { margin: 0; padding-left: 20px; color: #6b6256; font-size: 13px; }
    .historial li { margin-bottom: 2px; }
  </style>
</head>
<body>
  <header>
    <h1>Banco — Programación Orientada a Objetos 🏦</h1>
    <p>Cada cuenta es un objeto de la clase <code>Cuenta</code>. La de ahorro hereda de ella y añade interés.</p>
  </header>

  <main>
    <?php foreach ($cuentas as $c): ?>
      <div class="tarjeta">
        <div class="nombre"><?= htmlspecialchars($c->getTitular()) ?></div>
        <span class="badge"><?= htmlspecialchars($c->tipo()) ?></span>
        <div class="balance">Balance: $<?= number_format($c->getBalance(), 2) ?></div>
        <ul class="historial">
          <?php foreach ($c->getHistorial() as $linea): ?>
            <li><?= htmlspecialchars($linea) ?></li>
          <?php endforeach; ?>
        </ul>
      </div>
    <?php endforeach; ?>
  </main>
</body>
</html>
