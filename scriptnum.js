// DECLARACION DE VARIABLES
let contadorTarjetas = 0;
let destaparTarjeta1 = null;
let destaparTarjeta2 = null;
let valorTarjeta1 = null;
let valorTarjeta2 = null;
let movimientos = 0;
let aciertos = 0;
let tiempoTotal = 20; // TIEMPO RESTANTE EN SEGUNDOS
let estadoTemporizador = false; 
let TimeoutMensajeAcierto = null;
let intervaloTemporizador = null; // METODO SETINTERVAL QUE MANEJA EL TEMPORIZADOR

// NODOS HTML
const mostrarAciertos = document.querySelector("#juegoAciertos"); // ACIERTOS EN PANTALLA
const mostrarTiempo = document.querySelector("#juegoTiempoRestante"); // TIEMPO RESTANTE EN PANTALLA
const mostrarMovimientos = document.querySelector("#juegoMovimientos"); // MOVIMIENTOS EN PANTALLA
const mostrarMensaje = document.querySelector(".juegoMensaje"); // MENSAJE SUPERIOR
const botonReset = document.createElement("p").innerHTML = `<p onclick="location.reload()" class="reiniciarJuego">Reiniciar juego</p>` // COLOCA EL BOTON PARA REINICIAR EL JUEGO
const sonido = document.querySelector("#sonido");

// SONIDOS

let sonidoGanar = new Audio('https://dl.dropbox.com/s/yqu9rzxsbm5y6rt/gamewin.wav?dl=0');
let sonidoPerder = new Audio('https://dl.dropbox.com/s/0naowdqcklbypp4/gamelose.wav?dl=0');
let sonidoEquivocarse = new Audio('https://dl.dropbox.com/s/9l1gvpcaz3ijwni/gamewrong.wav?dl=0');
let sonidoAcierto = new Audio('https://dl.dropbox.com/s/51klgysy2vbw79l/gameright.wav?dl=0');
let sonidoClick = new Audio('https://dl.dropbox.com/s/b9hta69ubpn7aql/gameclick.wav?dl=0');


// ARREGLO ALEATORIO
let arregloNum = [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8]
arregloNum = arregloNum.sort(()=>{return Math.random()-0.5})
console.log(arregloNum);

//FUNCIONES

//FUNCION BOTON DESACTIVAR/ACTIVAR SONIDO
function botonSonido() {
  sonido.classList.toggle("sonidoDesactivado")
  if (sonido.classList.contains('sonidoDesactivado')) {
    sonidoGanar.muted = true;
    sonidoPerder.muted = true;
    sonidoEquivocarse.muted = true;
    sonidoAcierto.muted = true;
    sonidoClick.muted = true;
  } else {
    sonidoGanar.muted = false;
    sonidoPerder.muted = false;
    sonidoEquivocarse.muted = false;
    sonidoAcierto.muted = false;
    sonidoClick.muted = false;
  }
}

//FUNCION MOSTRAR TARJETAS (COMIENZO DEL JUEGO)
bloquearTarjetas();
mostrarTiempo.innerHTML = `Tiempo restante: ${tiempoTotal}`
setTimeout(()=> {
  desbloquearTarjetas()
  //MENSAJE POR DEFECTO
  mostrarMensaje.innerHTML = mostrarMensaje.innerHTML = 'Encuentra las parejas'
}, 2000);

//FUNCION DESBLOQUEAR TODAS LAS TARJETAS (INICIO DEL JUEGO)
function desbloquearTarjetas() {
    for (let i = 0; i <= 15; i++) {
      const desbloquearTarjeta = document.getElementById(`juegoBoton${i}`);
      desbloquearTarjeta.disabled = false;
      desbloquearTarjeta.innerHTML = '';
    }
}
  
//FUNCION TEMPORIZADOR TIEMPO RESTANTE
function iniciarTemporizador() {
  if (estadoTemporizador === false) {
    intervaloTemporizador = setInterval(()=>{
    tiempoTotal--;
    mostrarTiempo.innerHTML = `Tiempo restante: ${tiempoTotal}`
  if (tiempoTotal === 0) {
    clearInterval(intervaloTemporizador);
    clearTimeout(TimeoutMensajeAcierto);
    bloquearTarjetas();
    sonidoPerder.play();
  }
  },1000)
  estadoTemporizador = true;
  }
}

//FUNCION BLOQUEAR TODAS LAS TARJETAS 
function bloquearTarjetas() {
  // CORRIGIENDO BUG AL BLOQUEAR TODAS LAS TARJETAS
  const intervalBloquearTarjetas = setInterval(()=> {
  for (let i = 0; i <= 15; i++) {
    const bloquearTarjeta = document.getElementById(`juegoBoton${i}`);
    bloquearTarjeta.innerHTML = arregloNum[i];
    bloquearTarjeta.disabled = true;
  }
  if (aciertos === 8) { 
    // MENSAJE AL GANAR EL JUEGO
    mostrarMensaje.innerHTML = `Felicidades!, has conseguido ganar en ${20 - tiempoTotal} segundos. ${botonReset}`
   // MENSAJE AL PERDER Y HACER 0 ACIERTOS
  } else if (aciertos === 0 && tiempoTotal === 0) {
    mostrarMensaje.innerHTML = `Has perdido :( ${botonReset}`
  } else if (aciertos === 0) {
     // MENSAJE INICIAL
    mostrarMensaje.innerHTML = `Memoriza!`
  } else {
    // MENSAJE AL PERDER EL JUEGO
    mostrarMensaje.innerHTML = `Has perdido :( ${botonReset}`
    mostrarTiempo.innerHTML = `Se agoto el tiempo`;
  }
  }, 5)
  //DETENIENDO EL INTERVAL QUE CORRIJE EL BUG PARA DESESTRESAR EL CPU
  setTimeout(()=>clearInterval(intervalBloquearTarjetas), 800)
}


//FUNCION PRINCIPAL
function destaparTarjeta(id) {
    contadorTarjetas++;
    iniciarTemporizador();
    console.log(`Contador: ${contadorTarjetas}`);

//ACCION PRIMERA TARJETA
    if (contadorTarjetas === 1) {
        //SONIDO CLICK
        sonidoClick.play();
        destaparTarjeta1 = document.getElementById(`juegoBoton${id}`);
        destaparTarjeta1.innerHTML = arregloNum[id];
        valorTarjeta1 = arregloNum[id];
        console.log(`Valor tarjeta 1: ${valorTarjeta1}`);
        // DESACTIVAR PRIMERA TARJETA
        destaparTarjeta1.disabled = true;
// ACCION SEGUNDA TARJETA
    } else if (contadorTarjetas === 2) {
        destaparTarjeta2 = document.getElementById(`juegoBoton${id}`);
        destaparTarjeta2.innerHTML = arregloNum[id];
        valorTarjeta2 = arregloNum[id];
        console.log(`Valor tarjeta 2: ${valorTarjeta2}`);
        // DESACTIVAR SEGUNDA TARJETA 
        destaparTarjeta2.disabled = true;
        // AUMENTAR MOVIMIENTOS 
        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;
    }
// COMPROBACION DE TARJETAS
  if (contadorTarjetas === 2) {
   
    //ACIERTOS 
   if (valorTarjeta1 === valorTarjeta2) {
    //SONIDO ACIERTO
    sonidoAcierto.play();
      // MENSAJE ACIERTO
      mostrarMensaje.innerHTML = `<span class="juegoMensajePositivo">Acierto!</span>`;
      // MENSAJE POR DEFECTO
      TimeoutMensajeAcierto = setTimeout(()=> mostrarMensaje.innerHTML = 'Encuentra las parejas', 1000);
      aciertos++;
      mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
      // REINICIAR CONTADOR TARJETAS
      contadorTarjetas = 0
      console.log(`Contador: ${contadorTarjetas}`);
    
      // EQUIVOCACIONES 
    } else {
    //SONIDO ACIERTO
    sonidoEquivocarse.play();
      // MENSAJE EQUIVOCACIÓN 
      mostrarMensaje.innerHTML = '<span class="juegoMensajeNegativo">Ups!<span>';
      setTimeout(()=> {
        // DEVUELVE EL MENSAJE POR DEFECTO
        mostrarMensaje.innerHTML = 'Encuentra las parejas'
        // REACTIVAR TARJETAS
        destaparTarjeta1.disabled = false;
        destaparTarjeta2.disabled = false;
        destaparTarjeta1.innerHTML = '';
        destaparTarjeta2.innerHTML = '';
        // REINICIAR CONTADOR TARJETAS
        contadorTarjetas = 0
        console.log('Contador: ' + contadorTarjetas);
      }, 800)
  }
  }
  // COMPROBANDO SI SE GANO EL JUEGO
  if (aciertos === 8) {
    sonidoGanar.play();
    clearTimeout(TimeoutMensajeAcierto);
    clearInterval(intervaloTemporizador);
    bloquearTarjetas();
  }
}


// OBTENIENDO BOTONES
sonido.addEventListener('click', botonSonido);
reload.addEventListener('click', ()=> location.reload());
juegoBoton0.addEventListener('click', () => destaparTarjeta(0));
juegoBoton1.addEventListener('click', () => destaparTarjeta(1));
juegoBoton2.addEventListener('click', () => destaparTarjeta(2));
juegoBoton3.addEventListener('click', () => destaparTarjeta(3));
juegoBoton4.addEventListener('click', () => destaparTarjeta(4));
juegoBoton5.addEventListener('click', () => destaparTarjeta(5));
juegoBoton6.addEventListener('click', () => destaparTarjeta(6));
juegoBoton7.addEventListener('click', () => destaparTarjeta(7));
juegoBoton8.addEventListener('click', () => destaparTarjeta(8));
juegoBoton9.addEventListener('click', () => destaparTarjeta(9));
juegoBoton10.addEventListener('click', () => destaparTarjeta(10));
juegoBoton11.addEventListener('click', () => destaparTarjeta(11));
juegoBoton12.addEventListener('click', () => destaparTarjeta(12));
juegoBoton13.addEventListener('click', () => destaparTarjeta(13));
juegoBoton14.addEventListener('click', () => destaparTarjeta(14));
juegoBoton15.addEventListener('click', () => destaparTarjeta(15));