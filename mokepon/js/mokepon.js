const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque");
const sectionBotonReiniciar = document.getElementById("boton-reiniciar");
const botonMascotaJugador = document.getElementById("boton-mascota");
const botonFuego = document.getElementById("boton-fuego");
const botonAgua = document.getElementById("boton-agua");
const botonTierra = document.getElementById("boton-tierra");
const botonReiniciar = document.getElementById("boton-reiniciar");

const sectionSeleccionarMascota = document.getElementById(
  "Seleccionar-mascota"
);

const spanMascotaJugador = document.getElementById("mascota-jugador");

const spanMascotaEnemigo = document.getElementById("mascota-enemigo");

const spanVidasJugador = document.getElementById("vidas-jugador");
const spanVidasEnemigo = document.getElementById("vidas-enemigo");

const sectionMensaje = document.getElementById("resultado");
const ataquesDelJugador = document.getElementById("ataques-del-jugador");
const ataquesDelEnemigo = document.getElementById("ataques-del-enemigo");
const contenedorTarjetas = document.getElementById("contenedorTarjetas");

let mokepones = [];
let ataqueJugador;
let ataqueEnemigo;
let opcionDeMokepones;
let inputHipodogue;
let inputCapipepo;
let inputRatigueya;
let vidasJugador = 3;
let vidasEnemigo = 3;

class Mokepon {
  constructor(nombre, foto, vida) {
    this.nombre = nombre;
    this.foto = foto;
    this.vida = vida;
    this.ataques = [];
  }
}

let hipodogue = new Mokepon("Hipodogue", "img/hipodogue.png", 5);
let capipepo = new Mokepon("Capipepo", "img/capipepo.png", 5);
let ratigueya = new Mokepon("Ratigueya", "img/ratigueya.png", 5);

hipodogue.ataques.push(
  { nombre: "💧", id: "boton-agua" },
  { nombre: "💧", id: "boton-agua" },
  { nombre: "💧", id: "boton-agua" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "🌱", id: "boton-tierra" }
);

capipepo.ataques.push(
  { nombre: "🌱", id: "boton-tierra" },
  { nombre: "🌱", id: "boton-tierra" },
  { nombre: "🌱", id: "boton-tierra" },
  { nombre: "💧", id: "boton-agua" },
  { nombre: "🔥", id: "boton-fuego" }
);

ratigueya.ataques.push(
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "🌱", id: "boton-tierra" },
  { nombre: "💧", id: "boton-agua" }
);

mokepones.push(hipodogue, capipepo, ratigueya);

function iniciarJuego() {
  /* console.log("iniciando el juego"); */

  sectionSeleccionarAtaque.style.display = "none";

  mokepones.forEach((mokepon) => {
    opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre} />
        <label class="tarjeta-mokepon" for=${mokepon.nombre}>
          <p>${mokepon.nombre}</p>
          <img src=${mokepon.foto} alt=${mokepon.nombre} /></label>`;

    contenedorTarjetas.innerHTML += opcionDeMokepones;

    inputHipodogue = document.getElementById("Hipodogue");
    inputCapipepo = document.getElementById("Capipepo");
    inputRatigueya = document.getElementById("Ratigueya");
  });

  sectionBotonReiniciar.style.display = "none";

  botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador);

  botonFuego.addEventListener("click", ataqueFuego);
  botonAgua.addEventListener("click", ataqueAgua);
  botonTierra.addEventListener("click", ataqueTierra);

  botonReiniciar.addEventListener("click", reiniciar);
}

function seleccionarMascotaJugador() {
  sectionSeleccionarMascota.style.display = "none";

  sectionSeleccionarAtaque.style.display = "flex";

  if (inputHipodogue.checked) {
    spanMascotaJugador.innerHTML = inputHipodogue.id;
  } else if (inputCapipepo.checked) {
    spanMascotaJugador.innerHTML = inputCapipepo.id;
  } else if (inputRatigueya.checked) {
    spanMascotaJugador.innerHTML = inputRatigueya.id;
  } else {
    alert("Selecciona una mascota");
  }

  seleccionarMascotaEnemigo();
}

function seleccionarMascotaEnemigo() {
  let mascotaAleatoria = aleatorio(0, mokepones.length - 1);

  spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatoria].nombre;
}

function ataqueFuego() {
  console.log("atacando con fuego");
  ataqueJugador = "FUEGO";
  ataqueAleatorioEnemigo();
}
function ataqueAgua() {
  ataqueJugador = "AGUA";
  ataqueAleatorioEnemigo();
}
function ataqueTierra() {
  ataqueJugador = "TIERRA";
  ataqueAleatorioEnemigo();
}

function ataqueAleatorioEnemigo() {
  let ataqueAleatorio = aleatorio(1, 3);

  if (ataqueAleatorio == 1) {
    ataqueEnemigo = "FUEGO";
  } else if (ataqueAleatorio == 2) {
    ataqueEnemigo = "AGUA";
  } else {
    ataqueEnemigo = "TIERRA";
  }

  combate();
}

function combate() {
  if (ataqueEnemigo == ataqueJugador) {
    crearMensaje("EMPATE");
  } else if (ataqueJugador == "FUEGO" && ataqueEnemigo == "TIERRA") {
    crearMensaje("GANASTE");
    vidasEnemigo--;
    spanVidasEnemigo.innerHTML = vidasEnemigo;
  } else if (ataqueJugador == "AGUA" && ataqueEnemigo == "FUEGO") {
    crearMensaje("GANASTE");
    vidasEnemigo--;
    spanVidasEnemigo.innerHTML = vidasEnemigo;
  } else if (ataqueJugador == "TIERRA" && ataqueEnemigo == "AGUA") {
    crearMensaje("GANASTE");
    vidasEnemigo--;
    spanVidasEnemigo.innerHTML = vidasEnemigo;
  } else {
    crearMensaje("PERDISTE");
    vidasJugador--;
    spanVidasJugador.innerHTML = vidasJugador;
  }

  revisarVidas();
}

function revisarVidas() {
  if (vidasEnemigo == 0) {
    crearMensajeFinal("Felicitaciones ganaste");
    //toggleBotones(true);
  } else if (vidasJugador == 0) {
    crearMensajeFinal("Lo siento, perdiste");
    //toggleBotones(true);
  }
}

/* Code Gonza

function toggleBotones(estado) {
  let botonFuego = document.getElementById("boton-fuego");
  let botonAgua = document.getElementById("boton-agua");
  let botonTierra = document.getElementById("boton-tierra");

  botonFuego.disabled = estado;
  botonAgua.disabled = estado;
  botonTierra.disabled = estado;
}

/*function reiniciar() {
  console.log("reiniciando");
  vidasEnemigo = 3;
  vidasJugador = 3;

  let spanVidasJugador = document.getElementById("vidas-jugador");
  let spanVidasEnemigo = document.getElementById("vidas-enemigo");

  spanVidasEnemigo.innerHTML = vidasEnemigo;
  spanVidasJugador.innerHTML = vidasJugador;

  toggleBotones(false);

  vaciarMensaje();
}*/

function crearMensaje(resultado) {
  let nuevoAtaqueJugador = document.createElement("p");
  let nuevoAtaqueEnemigo = document.createElement("p");

  sectionMensaje.innerHTML = resultado;
  nuevoAtaqueJugador.innerHTML = ataqueJugador;
  nuevoAtaqueEnemigo.innerHTML = ataqueEnemigo;

  ataquesDelJugador.appendChild(nuevoAtaqueJugador);
  ataquesDelEnemigo.appendChild(nuevoAtaqueEnemigo);
}

function crearMensajeFinal(resultadoFinal) {
  sectionMensaje.innerHTML = resultadoFinal;

  botonFuego.disabled = true;
  botonAgua.disabled = true;
  botonTierra.disabled = true;

  sectionBotonReiniciar.style.display = "block";
}

/* Code Gonza

function vaciarMensaje() {
  console.log("eliminando msj");
  let sectionMensaje = document.getElementById("mensajes");
  sectionMensaje.innerHTML = " ";
}*/

function reiniciar() {
  location.reload();
}

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener("load", iniciarJuego);
