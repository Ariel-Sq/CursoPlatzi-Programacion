function iniciarJuego() {
  let botonMascotaJugador = document.getElementById("boton-mascota");
  botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador);
}

function seleccionarMascotaJugador() {
  let inputHipodogue = document.getElementById("hipodogue");
  let inputCapipepo = document.getElementById("capipepo");
  let inputRatigueya = document.getElementById("ratigueya");

  if (inputHipodogue.checked) {
    alert("Seleccionaste a Hipodogue");
  } else if (inputCapipepo.checked) {
    alert("Seleccionaste Capipepo");
  } else if (inputRatigueya.checked) {
    alert("Seleccionaste Ratigueya");
  } else {
    alert("Selecciona una mascota");
  }
}

window.addEventListener("load", iniciarJuego);
