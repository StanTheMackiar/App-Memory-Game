const sonidos = {
    ganar: new Audio("./src/assets/sounds/gamewin.wav"),
    perder: new Audio("./src/assets/sounds/gamelose.wav"),
    equivocarse: new Audio("./src/assets/sounds/gamewrong.wav"),
    acierto: new Audio("./src/assets/sounds/gameright.wav"),
    click: new Audio("./src/assets/sounds/gameclick.wav"),
  };
  
  export const botonSonido = () => {
    sonido.classList.toggle("sonidoDesactivado");
    if (sonido.classList.contains("sonidoDesactivado")) {
      acierto.muted = true;
      perder.muted = true;
      equivocarse.muted = true;
      ganar.muted = true;
      click.muted = true;
    } else {
      ganar.muted = false;
      perder.muted = false;
      equivocarse.muted = false;
      acierto.muted = false;
      click.muted = false;
    }
  };

  export const { acierto, click, equivocarse, ganar, perder } = sonidos;