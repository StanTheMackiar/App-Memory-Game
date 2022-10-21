"use strict";

import { botonIniciarJuego, d, mostrarAciertos, mostrarMensaje, tiempoRestante, botonReset, mostrarMovimientos, seccionJuegoPadre, sonido } from "./modules/htmlElements.js";
import { acierto, botonSonido, click, equivocarse, ganar, perder} from "./modules/sounds.js";


let contadorTarjetas = 0;
let destaparTarjeta1, destaparTarjeta2 ;
let valorTarjeta1, valorTarjeta2;
let movimientos = 0;
let aciertos = 0;
let tiempoTotal = 20; // En segundos
let estadoTemporizador = false;
let juegoIniciado = false;
let temporizadorErrorParejas, temporizador;

let arregloNum = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
arregloNum = arregloNum.sort(() => Math.random() - 0.5);


const iniciarJuego = () => {
  juegoIniciado = true;
  seccionJuegoPadre.removeChild(botonIniciarJuego);
  mostrarTarjetas();
  mostrarMensaje.textContent = `Memoriza!`;
  setTimeout(() => {
    ocultarTarjetas();
    iniciarTemporizador();
    mostrarMensajePorDefecto();
  }, 2000);
};

const mostrarTiempo = () => tiempoRestante.innerHTML = `Tiempo restante: ${tiempoTotal}`;

const mostrarMensajePorDefecto = () =>
  (mostrarMensaje.textContent = "Encuentra las parejas");


const mostrarTarjetas = () => {
  arregloNum.map((num, i) => {
    const mostrarTarjeta = d.getElementById(`juegoBoton${i}`);
    mostrarTarjeta.innerHTML = `<img src="./src/assets/img/${arregloNum[i]}.png" class="imagenesTarjetas">`;
    mostrarTarjeta.disabled = true;
  });
};

const ocultarTarjetas = () => {
  arregloNum.map((num, i) => {
    const ocultarTarjeta = d.getElementById(`juegoBoton${i}`);
    ocultarTarjeta.disabled = false;
    ocultarTarjeta.textContent = "";
  });
};

const finalizarJuego = () => {
  if (aciertos === 8)
    return (mostrarMensaje.innerHTML = `Felicidades!, has conseguido ganar en ${
      20 - tiempoTotal
    } segundos. ${botonReset}`);

  mostrarMensaje.innerHTML = `Has perdido :( ${botonReset}`;
  tiempoRestante.textContent = `Se agotó el tiempo`;
  perder.play();
};


const iniciarTemporizador = () => {
  if (estadoTemporizador === false) {
    temporizador = setInterval(() => {
      tiempoTotal--;
      mostrarTiempo();

      if (tiempoTotal === 0) {
        clearInterval(temporizador);
        clearTimeout(temporizadorErrorParejas);
        mostrarTarjetas();
        finalizarJuego();
      }
    }, 1000);

    estadoTemporizador = true;
  }
};

const aumentarMovimientos = () => {
  movimientos++;
  mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;
};

const comprobarJuego = () => {
  if (aciertos === 8) {
    ganar.play();
    finalizarJuego();
    mostrarTarjetas();
  }
};

const comprobarTarjetas = () => {
  // Aciertos
  if (valorTarjeta1 === valorTarjeta2) {
    acierto.play();
    aciertos++;
    mostrarAciertos.textContent = `Aciertos: ${aciertos}`;
    mostrarMensaje.innerHTML = `<span class="juegoMensajePositivo">Acierto!</span>`;
    setTimeout(mostrarMensajePorDefecto, 1000);
    contadorTarjetas = 0;

    // Equivocaciones
  } else {
    equivocarse.play();
    mostrarMensaje.innerHTML = '<span class="juegoMensajeNegativo">Ups!<span>';
    temporizadorErrorParejas = setTimeout(() => {
      mostrarMensaje.textContent = "Encuentra las parejas";
      // Reactiva las tarjetas
      destaparTarjeta1.disabled = false;
      destaparTarjeta2.disabled = false;
      destaparTarjeta1.innerHTML = "";
      destaparTarjeta2.innerHTML = "";
      // Reinicia el contador
      contadorTarjetas = 0;

      comprobarJuego();
    }, 800);
  }
};


const destaparTarjeta = (id) => {
  if (juegoIniciado === true) {
    contadorTarjetas++;

    //Accion primera tarjeta
    if (contadorTarjetas === 1) {
      click.play();
      destaparTarjeta1 = document.getElementById(`juegoBoton${id}`);
      destaparTarjeta1.innerHTML = `<img src="./src/assets/img/${arregloNum[id]}.png" class="imagenesTarjetas">`;
      valorTarjeta1 = arregloNum[id];
      destaparTarjeta1.disabled = true;

      //Accion segunda tarjeta
    } else if (contadorTarjetas === 2) {
      destaparTarjeta2 = document.getElementById(`juegoBoton${id}`);
      destaparTarjeta2.innerHTML = `<img src="./src/assets/img/${arregloNum[id]}.png" class="imagenesTarjetas">`;
      valorTarjeta2 = arregloNum[id];
      destaparTarjeta2.disabled = true;
      aumentarMovimientos();
      comprobarTarjetas();
    }
  }
};

// Llamados a funciones
mostrarTiempo();

// Eventos
sonido.addEventListener("click", botonSonido);
reload.addEventListener("click", () => location.reload());
botonIniciarJuego.addEventListener("click", iniciarJuego);
juegoBoton0.addEventListener("click", () => destaparTarjeta(0));
juegoBoton1.addEventListener("click", () => destaparTarjeta(1));
juegoBoton2.addEventListener("click", () => destaparTarjeta(2));
juegoBoton3.addEventListener("click", () => destaparTarjeta(3));
juegoBoton4.addEventListener("click", () => destaparTarjeta(4));
juegoBoton5.addEventListener("click", () => destaparTarjeta(5));
juegoBoton6.addEventListener("click", () => destaparTarjeta(6));
juegoBoton7.addEventListener("click", () => destaparTarjeta(7));
juegoBoton8.addEventListener("click", () => destaparTarjeta(8));
juegoBoton9.addEventListener("click", () => destaparTarjeta(9));
juegoBoton10.addEventListener("click", () => destaparTarjeta(10));
juegoBoton11.addEventListener("click", () => destaparTarjeta(11));
juegoBoton12.addEventListener("click", () => destaparTarjeta(12));
juegoBoton13.addEventListener("click", () => destaparTarjeta(13));
juegoBoton14.addEventListener("click", () => destaparTarjeta(14));
juegoBoton15.addEventListener("click", () => destaparTarjeta(15));