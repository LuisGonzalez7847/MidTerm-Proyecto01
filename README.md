# MidTerm - Proyecto 01: Nuevos Lenguajes

Autor: Luis A. González Pérez
Curso: COMP - Nuevos Lenguajes
Repositorio: https://github.com/LuisGonzalez7847/MidTerm-Proyecto01

Portafolio con 7 programas que corren en un servidor local. Cubren los cuatro paradigmas (imperativo, funcional, lógico y orientado a objetos) usando JavaScript y PHP.

## Requisitos

- XAMPP con Apache y PHP (probado con PHP 8.2).
- Un navegador moderno.
- Conexión a internet para dos programas que cargan librerías por CDN: el Recomendador (Tau Prolog) y el CV (jsPDF).

## Cómo instalarlo y correrlo (local)

Todo corre en un servidor local con XAMPP. Los programas en PHP solo funcionan a través del servidor, no abriendo el archivo con doble clic.

1. Instala y abre XAMPP. En el panel de control, presiona Start en Apache.
2. Coloca el proyecto dentro de la carpeta htdocs de XAMPP y nómbralo midterm, de modo que quede en C:\xampp\htdocs\midterm\. La forma más fácil es clonarlo ahí: abre una terminal dentro de C:\xampp\htdocs\ y corre `git clone https://github.com/LuisGonzalez7847/MidTerm-Proyecto01 midterm`.
3. Abre el navegador en la página principal: http://localhost/midterm/
4. Desde ahí entra a cada programa por su URL (ver la lista de abajo).

Todas las URLs empiezan con http://localhost/midterm/. No abras los archivos con doble clic, varios necesitan el servidor para funcionar.

## Los 7 programas

1. Recomendador turístico (/recomendador/) - Paradigma lógico, en JavaScript con Tau Prolog. Recomienda lugares del oeste de Puerto Rico según tipo, presupuesto, momento y pueblo. La lógica está escrita en Prolog y corre en el navegador. Necesita internet para cargar la librería.

2. Estadísticas (/estadisticas/) - Paradigma funcional, en JavaScript. Calcula promedio, mediana, moda, rango, desviación estándar y más a partir de una lista de números. Hecho con funciones puras y map / filter / reduce.

3. Generador de perfil (/perfil/) - JavaScript libre, entrada y salida por la barra de URL. Llenas tus datos y genera un enlace con la información dentro del URL; al abrir ese enlace, lee los datos del URL y dibuja la tarjeta.

4. Banco (/banco/) - Paradigma orientado a objetos, en PHP. Una clase Cuenta con balance encapsulado y métodos, y una CuentaAhorro que hereda de ella y añade interés. Requiere PHP (servidor).

5. Fibonacci y Factorial (/imperativo/) - Paradigma imperativo, en PHP. Variables que cambian, bucles y condicionales. Escoge un número y muestra la secuencia y el factorial paso a paso. Requiere PHP (servidor).

6. Libro de visitas (/libro/) - PHP libre. Deja un mensaje que se guarda en el servidor (archivo mensajes.json) y queda para los próximos visitantes. La carpeta libro/ debe tener permiso de escritura, que XAMPP da por defecto. Requiere PHP (servidor).

7. CV / Currículo (/cv/) - En JavaScript. Currículo interactivo: guarda los datos en el navegador (localStorage), permite escoger qué entra en el resumen y descargarlo en PDF. Necesita internet para la descarga en PDF (jsPDF).

## Paradigmas cubiertos

Imperativo: Fibonacci y Factorial (PHP).
Funcional: Estadísticas (JavaScript).
Lógico: Recomendador turístico (Prolog / Tau Prolog).
Orientado a objetos: Banco (PHP).
