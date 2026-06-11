<?php
// Clase Cuenta: modela una cuenta de banco. El balance es privado y solo
// se cambia con los metodos (encapsulacion).
class Cuenta {
    private $titular;
    private $balance;
    private $historial;

    public function __construct($titular, $balanceInicial = 0) {
        $this->titular = $titular;
        $this->balance = $balanceInicial;
        $this->historial = [];
        $this->anotar("Cuenta creada con $" . number_format($balanceInicial, 2));
    }

    public function depositar($monto) {
        if ($monto <= 0) {
            $this->anotar("Depósito inválido");
            return false;
        }
        $this->balance += $monto;
        $this->anotar("Depósito de $" . number_format($monto, 2));
        return true;
    }

    public function retirar($monto) {
        if ($monto <= 0) {
            $this->anotar("Retiro inválido");
            return false;
        }
        if ($monto > $this->balance) {
            $this->anotar("Retiro de $" . number_format($monto, 2) . " rechazado: fondos insuficientes");
            return false;
        }
        $this->balance -= $monto;
        $this->anotar("Retiro de $" . number_format($monto, 2));
        return true;
    }

    public function getTitular() { return $this->titular; }
    public function getBalance() { return $this->balance; }
    public function getHistorial() { return $this->historial; }

    public function tipo() { return "Cuenta regular"; }

    protected function anotar($texto) {
        $this->historial[] = $texto;
    }
}

// CuentaAhorro hereda de Cuenta y añade interés.
class CuentaAhorro extends Cuenta {
    private $tasa;

    public function __construct($titular, $balanceInicial, $tasa) {
        parent::__construct($titular, $balanceInicial);
        $this->tasa = $tasa;
    }

    public function aplicarInteres() {
        $interes = $this->getBalance() * $this->tasa;
        $this->depositar($interes);
        $this->anotar("Interés del " . ($this->tasa * 100) . "% aplicado");
    }

    public function tipo() {
        return "Cuenta de ahorro (" . ($this->tasa * 100) . "% interés)";
    }
}
?>
