export const d = document;
export const mostrarAciertos = d.querySelector("#juegoAciertos"); // ACIERTOS EN PANTALLA
export const tiempoRestante = d.querySelector("#juegoTiempoRestante"); // TIEMPO RESTANTE EN PANTALLA
export const mostrarMovimientos = d.querySelector("#juegoMovimientos"); // MOVIMIENTOS EN PANTALLA
export const mostrarMensaje = d.querySelector(".juegoMensaje"); // MENSAJE SUPERIOR
export const botonReset = (d.createElement("p").innerHTML = `<p onclick="location.reload()" class="reiniciarJuego">Reiniciar juego</p>`); // COLOCA EL BOTON PARA REINICIAR EL JUEGO
export const sonido = d.querySelector("#sonido");
export const seccionJuegoPadre = d.querySelector("#seccionJuego"); //ELEMENTO PADRE SECCION JUEGO
export const botonIniciarJuego = d.querySelector("#botonIniciarJuego");
