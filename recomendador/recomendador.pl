% Reglas del recomendador turistico del oeste de Puerto Rico.
% Copia legible de referencia. Lo que de verdad corre esta dentro de recomendador.js.

% Hechos: cada lugar con sus atributos.
% lugar(Nombre, Tipo, Presupuesto, Momento, Pueblo).
lugar(crashboat, playa, gratis, dia, aguadilla).
lugar(jobos, playa, gratis, dia, isabela).
lugar(montones, playa, gratis, dia, isabela).
lugar(shacks, playa, gratis, dia, isabela).
lugar(cara_del_indio, cultura, gratis, dia, isabela).
lugar(paseo_lineal, naturaleza, gratis, dia, isabela).
lugar(sandybeach, playa, gratis, dia, rincon).
lugar(faro_rincon, mirador, gratis, atardecer, rincon).
lugar(restaurantes_rincon, comida, pago, atardecer, rincon).
lugar(mirador_mayaguez, mirador, gratis, atardecer, mayaguez).
lugar(panaderias_mayaguez, comida, pago, dia, mayaguez).
lugar(boqueron, playa, gratis, dia, cabo_rojo).
lugar(playa_sucia, playa, gratis, dia, cabo_rojo).
lugar(buye, playa, gratis, dia, cabo_rojo).
lugar(combate, playa, gratis, dia, cabo_rojo).
lugar(faro_cabo_rojo, mirador, gratis, atardecer, cabo_rojo).
lugar(salinas_cabo_rojo, naturaleza, gratis, dia, cabo_rojo).
lugar(kioscos_boqueron, comida, pago, dia, cabo_rojo).
lugar(biobahia_parguera, naturaleza, pago, noche, lajas).
lugar(cayos_parguera, naturaleza, pago, dia, lajas).
lugar(malecon_parguera, comida, pago, dia, lajas).
lugar(porta_coeli, cultura, pago, dia, san_german).
lugar(iglesia_auxerre, cultura, gratis, dia, san_german).
lugar(plaza_quinones, cultura, gratis, dia, san_german).
lugar(lupitos, comida, pago, dia, san_german).
lugar(gozalandia, naturaleza, pago, dia, san_sebastian).
lugar(murales_san_sebastian, cultura, gratis, dia, san_sebastian).

% Regla: un lugar se recomienda si cumple con todo lo pedido.
recomendar(Tipo, Presupuesto, Momento, Pueblo, Nombre) :-
    lugar(Nombre, Tipo, Presupuesto, Momento, Pueblo).
