const SERVER="http://192.168.0.5:8080"

const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque");
const sectionBotonReiniciar = document.getElementById("boton-reiniciar");
const botonMascotaJugador = document.getElementById("boton-mascota");
const botonReiniciar = document.getElementById("boton-reiniciar");

const sectionVerMapa = document.getElementById("ver-mapa");
const mapa = document.getElementById("mapa");

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

const contenedorAtaques = document.getElementById("contenedor-ataques");

let jugadorId = null;
let enemigoId = null;
let mokepones = [];
let mokeponesEnemigos = [];
let ataqueJugador = [];
let ataqueEnemigo = [];
let opcionDeMokepones;
let inputHipodogue;
let inputCapipepo;
let inputRatigueya;
let inputNess;
let inputYeti;
let inputFenix;
let ataquesMokepon;
let ataquesMokeponEnemigo;
let botonFuego;
let botonAgua;
let botonTierra;
let botones = [];
let ataque;
let indexAtaqueJugador;
let indexAtaqueEnemigo;
let mascotaJugador;
let mascotaJugadorObjeto;
let mascotaAleatoria;
let victoriasJugador = 0;
let victoriasEnemigo = 0;
let vidasJugador = 3;
let vidasEnemigo = 3;
let lienzo = mapa.getContext("2d");
let intervalo;
let mapaBackground = new Image();
mapaBackground.src = "img/mokeMap.png";
let alturaQueBuscamos;
let anchoDelMapa = window.innerWidth - 20;

const anchoMaximoDelMapa = 350;
if (anchoDelMapa > anchoMaximoDelMapa) {
  anchoDelMapa = anchoMaximoDelMapa - 20;
}

alturaQueBuscamos = (anchoDelMapa * 600) / 800;

mapa.width = anchoDelMapa;
mapa.height = alturaQueBuscamos;

class Mokepon {
  constructor(nombre, foto, vida, avatar, id = null) {
    this.id = id;
    this.nombre = nombre;
    this.foto = foto;
    this.vida = vida;
    this.ataques = [];
    this.ancho = 40;
    this.alto = 40;
    this.x = aleatorio(0, mapa.width - this.ancho);
    this.y = aleatorio(0, mapa.height - this.alto);
    this.avatar = new Image();
    this.avatar.src = avatar;
    this.velocidadX = 0;
    this.velocidadY = 0;
  }
  pintarMokepon() {
    lienzo.drawImage(this.avatar, this.x, this.y, this.ancho, this.alto);
  }
}

let hipodogue = new Mokepon(
  "Hipodogue",
  "img/hipodogue.png",
  5,
  "img/hipodogueCara.png"
);
let capipepo = new Mokepon(
  "Capipepo",
  "img/capipepo.png",
  5,
  "img/capipepoCara.png"
);
let ratigueya = new Mokepon(
  "Ratigueya",
  "img/ratigueya.png",
  5,
  "img/ratigueyaCara.png"
);
let ness = new Mokepon("Ness", "img/Ness.png", 5, "img/Ness.png");
let yeti = new Mokepon("Yeti", "img/Yeti.png", 5, "img/Yeti.png");
let fenix = new Mokepon("Fenix", "img/fenix2.png", 5, "img/fenix2.png");

const HIPODOGUE_ATAQUES = [
  { nombre: "💧", id: "boton-agua" },
  { nombre: "💧", id: "boton-agua" },
  { nombre: "💧", id: "boton-agua" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "🌱", id: "boton-tierra" },
];

hipodogue.ataques.push(...HIPODOGUE_ATAQUES);

const CAPIPEPO_ATAQUES = [
  { nombre: "🌱", id: "boton-tierra" },
  { nombre: "🌱", id: "boton-tierra" },
  { nombre: "🌱", id: "boton-tierra" },
  { nombre: "💧", id: "boton-agua" },
  { nombre: "🔥", id: "boton-fuego" },
];

capipepo.ataques.push(...CAPIPEPO_ATAQUES);

const RATIGUEYA_ATAQUES = [
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "🌱", id: "boton-tierra" },
  { nombre: "💧", id: "boton-agua" },
];

ratigueya.ataques.push(...RATIGUEYA_ATAQUES);

const NESS_ATAQUES = [
  { nombre: "💧", id: "boton-agua" },
  { nombre: "💧", id: "boton-agua" },
  { nombre: "💧", id: "boton-agua" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "🌱", id: "boton-tierra" },
];

ness.ataques.push(...NESS_ATAQUES);

const YETI_ATAQUES = [
  { nombre: "🌱", id: "boton-tierra" },
  { nombre: "🌱", id: "boton-tierra" },
  { nombre: "🌱", id: "boton-tierra" },
  { nombre: "💧", id: "boton-agua" },
  { nombre: "🔥", id: "boton-fuego" },
];

yeti.ataques.push(...YETI_ATAQUES);

const FENIX_ATAQUES = [
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "🌱", id: "boton-tierra" },
  { nombre: "💧", id: "boton-agua" },
];

fenix.ataques.push(...FENIX_ATAQUES);

mokepones.push(hipodogue, capipepo, ratigueya, ness, yeti, fenix);

function iniciarJuego() {
  sectionSeleccionarAtaque.style.display = "none";
  sectionVerMapa.style.display = "none";

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
    inputNess = document.getElementById("Ness");
    inputYeti = document.getElementById("Yeti");
    inputFenix = document.getElementById("Fenix");
  });

  sectionBotonReiniciar.style.display = "none";

  botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador);

  botonReiniciar.addEventListener("click", reiniciar);

  unirseAlJuego();
}

function unirseAlJuego() {
  fetch(`${SERVER}/unirse`).then(function (res) {
    if (res.ok) {
      res.text().then(function (respuesta) {
        console.log("respuesta: ", respuesta);
        jugadorId = respuesta;
      });
    }
  });
}

function seleccionarMascotaJugador() {
  sectionSeleccionarMascota.style.display = "none";

  sectionVerMapa.style.display = "flex";

  if (inputHipodogue.checked) {
    spanMascotaJugador.innerHTML = inputHipodogue.id;
    mascotaJugador = inputHipodogue.id;
  } else if (inputCapipepo.checked) {
    spanMascotaJugador.innerHTML = inputCapipepo.id;
    mascotaJugador = inputCapipepo.id;
  } else if (inputRatigueya.checked) {
    spanMascotaJugador.innerHTML = inputRatigueya.id;
    mascotaJugador = inputRatigueya.id;
  } else if (inputNess.checked) {
    spanMascotaJugador.innerHTML = inputNess.id;
    mascotaJugador = inputNess.id;
  } else if (inputYeti.checked) {
    spanMascotaJugador.innerHTML = inputYeti.id;
    mascotaJugador = inputYeti.id;
  } else if (inputFenix.checked) {
    spanMascotaJugador.innerHTML = inputFenix.id;
    mascotaJugador = inputFenix.id;
  } else {
    alert("Selecciona una mascota");
  }

  seleccionarMokepon(mascotaJugador);

  extraerAtaques(mascotaJugador);
  sectionVerMapa.style.display = "flex";
  iniciarMapa();
}

function seleccionarMokepon(mascotaJugador) {
  fetch(`${SERVER}/mokepon/${jugadorId}`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      mokepon: mascotaJugador,
    }),
  });
}

function seleccionarMascotaEnemigo(enemigo) {
  mascotaAleatoria = aleatorio(0, mokepones.length - 1);

  spanMascotaEnemigo.innerHTML = enemigo.nombre;
  ataquesMokeponEnemigo = enemigo.ataques;

  secuenciaAtaque();
}

function extraerAtaques(mascotaJugador) {
  let ataques;
  for (let i = 0; i < mokepones.length; i++) {
    if (mascotaJugador === mokepones[i].nombre) {
      ataques = mokepones[i].ataques;
    }
  }
  mostrarAtaques(ataques);
}

function mostrarAtaques(ataques) {
  ataques.forEach((ataque) => {
    ataquesMokepon = `<button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>`;

    contenedorAtaques.innerHTML += ataquesMokepon;
  });

  botonFuego = document.getElementById("boton-fuego");
  botonAgua = document.getElementById("boton-agua");
  botonTierra = document.getElementById("boton-tierra");
  botones = document.querySelectorAll(".BAtaque");
}

function secuenciaAtaque() {
  botones.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      if (e.target.textContent === "🔥") {
        ataqueJugador.push("FUEGO");
        console.log(ataqueJugador);
        boton.style.background = "#112f58";
        boton.disabled = true;
      } else if (e.target.textContent === "💧") {
        ataqueJugador.push("AGUA");
        console.log(ataqueJugador);
        boton.style.background = "#112f58";
        boton.disabled = true;
      } else {
        ataqueJugador.push("TIERRA");
        console.log(ataqueJugador);
        boton.style.background = "#112f58";
        boton.disabled = true;
      }
      //ataqueAleatorioEnemigo();
      if (ataqueJugador.length === 5) {
        enviarAtaques();
      }
    });
  });
}

function enviarAtaques() {
  fetch(`${SERVER}/mokepon/${jugadorId}/ataques`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ataques: ataqueJugador,
    }),
  });

  intervalo = setInterval(obtenerAtaques, 50);
}

function obtenerAtaques() {
  fetch(`${SERVER}/mokepon/${enemigoId}/ataques`).then(function (
    res
  ) {
    if (res.ok) {
      res.json().then(function ({ ataques }) {
        if (ataques.length === 5) {
          ataqueEnemigo = ataques;
          combate();
        }
      });
    }
  });
}

function ataqueAleatorioEnemigo() {
  /* Ejemplo de ataque enemigo eligiendo a Hipodogue:
    ataquesMokeponEnemigo = [
      { nombre: "💧", id: "boton-agua" },
      { nombre: "💧", id: "boton-agua" },
      { nombre: "💧", id: "boton-agua" },
      { nombre: "🔥", id: "boton-fuego" },
      { nombre: "🌱", id: "boton-tierra" }
    ]
  */

  const indice = aleatorio(0, ataquesMokeponEnemigo.length - 1);
  const ataqueAleatorio = ataquesMokeponEnemigo[indice];
  ataquesMokeponEnemigo.splice(indice, 1);

  let ataque = "";
  if (ataqueAleatorio.nombre === "💧") {
    ataque = "AGUA";
  } else if (ataqueAleatorio.nombre === "🔥") {
    ataque = "FUEGO";
  } else {
    ataque = "TIERRA";
  }

  ataqueEnemigo.push(ataque);

  console.log(ataqueEnemigo);
  iniciarPelea();
}

function iniciarPelea() {
  if (ataqueJugador.length === 5) {
    combate();
  }
}

function indexAmbosOponentes(jugador, enemigo) {
  indexAtaqueJugador = ataqueJugador[jugador];
  indexAtaqueEnemigo = ataqueEnemigo[enemigo];
}

function combate() {
  clearInterval(intervalo);

  for (let index = 0; index < ataqueJugador.length; index++) {
    if (ataqueJugador[index] === ataqueEnemigo[index]) {
      indexAmbosOponentes(index, index);
      crearMensaje("EMPATE");
      spanVidasJugador.innerHTML = victoriasJugador;
    } else if (
      ataqueJugador[index] === "FUEGO" &&
      ataqueEnemigo[index] === "TIERRA"
    ) {
      indexAmbosOponentes(index, index);
      crearMensaje("GANASTE");
      victoriasJugador++;
      spanVidasJugador.innerHTML = victoriasJugador;
    } else if (
      ataqueJugador[index] === "AGUA" &&
      ataqueEnemigo[index] === "FUEGO"
    ) {
      indexAmbosOponentes(index, index);
      crearMensaje("GANASTE");
      victoriasJugador++;
      spanVidasJugador.innerHTML = victoriasJugador;
    } else if (
      ataqueJugador[index] === "TIERRA" &&
      ataqueEnemigo[index] === "AGUA"
    ) {
      indexAmbosOponentes(index, index);
      crearMensaje("GANASTE");
      victoriasJugador++;
      spanVidasJugador.innerHTML = victoriasJugador;
    } else {
      indexAmbosOponentes(index, index);
      crearMensaje("PERDISTE");
      victoriasEnemigo++;
      spanVidasEnemigo.innerHTML = victoriasEnemigo;
    }
  }

  revisarVidas();
}

function revisarVidas() {
  if (victoriasJugador === victoriasEnemigo) {
    crearMensajeFinal("Esto fue un empate");
  } else if (victoriasJugador > victoriasEnemigo) {
    crearMensajeFinal("Felicitaciones, ganaste");
  } else {
    crearMensajeFinal("Lo siento, perdiste");
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
  nuevoAtaqueJugador.innerHTML = indexAtaqueJugador;
  nuevoAtaqueEnemigo.innerHTML = indexAtaqueEnemigo;

  ataquesDelJugador.appendChild(nuevoAtaqueJugador);
  ataquesDelEnemigo.appendChild(nuevoAtaqueEnemigo);
}

function crearMensajeFinal(resultadoFinal) {
  sectionMensaje.innerHTML = resultadoFinal;

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

function pintarCanvas() {
  mascotaJugadorObjeto.x =
    mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX;
  mascotaJugadorObjeto.y =
    mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY;

  lienzo.clearRect(0, 0, mapa.width, mapa.height);
  lienzo.drawImage(mapaBackground, 0, 0, mapa.width, mapa.height);
  mascotaJugadorObjeto.pintarMokepon();

  enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y);

  mokeponesEnemigos.forEach(function (mokepon) {
    mokepon.pintarMokepon();
    revisarColision(mokepon);
  });
}

function enviarPosicion(x, y) {
  console.log("jugadorId: ", jugadorId);
  fetch(`${SERVER}/mokepon/${jugadorId}/posicion`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      x,
      y,
    }),
  }).then(function (res) {
    if (res.ok) {
      res.json().then(function ({ enemigos }) {
        mokeponesEnemigos = enemigos
        .filter((enemigo) => enemigo.mokepon)
        .map(function (enemigo) {
          let mokeponEnemigo = null;
          const mokeponNombre = enemigo.mokepon.nombre || "";
          if (mokeponNombre === "Hipodogue") {
            mokeponEnemigo = new Mokepon(
              "Hipodogue",
              "img/hipodogue.png",
              5,
              "img/hipodogueCara.png",
              enemigo.id
            );
          } else if (mokeponNombre === "Capipepo") {
            mokeponEnemigo = new Mokepon(
              "Capipepo",
              "img/capipepo.png",
              5,
              "img/capipepoCara.png",
              enemigo.id
            );
          } else if (mokeponNombre === "Ratigueya") {
            mokeponEnemigo = new Mokepon(
              "Ratigueya",
              "img/ratigueya.png",
              5,
              "img/ratigueyaCara.png",
              enemigo.id
            );
          } else if (mokeponNombre === "Ness") {
            mokeponEnemigo = new Mokepon(
              "Ness",
              "img/Ness.png",
              5,
              "img/Ness.png",
              enemigo.id
            );
          } else if (mokeponNombre === "Yeti") {
            mokeponEnemigo = new Mokepon(
              "Yeti",
              "img/Yeti.png",
              5,
              "img/Yeti.png",
              enemigo.id
            );
          } else if (mokeponNombre === "Fenix") {
            mokeponEnemigo = new Mokepon(
              "Fenix",
              "img/fenix2.png",
              5,
              "img/fenix2.png",
              enemigo.id
            );
          }

          mokeponEnemigo.x = enemigo.x;
          mokeponEnemigo.y = enemigo.y;

          return mokeponEnemigo;
        });
      });
    }
  });
}

function moverDerecha() {
  mascotaJugadorObjeto.velocidadX = 5;
}

function moverIzquierda() {
  mascotaJugadorObjeto.velocidadX = -5;
}

function moverAbajo() {
  mascotaJugadorObjeto.velocidadY = 5;
}

function moverArriba() {
  mascotaJugadorObjeto.velocidadY = -5;
}

function detenerMovimiento() {
  mascotaJugadorObjeto.velocidadX = 0;
  mascotaJugadorObjeto.velocidadY = 0;
}

function sePresionoUnaTecla(event) {
  switch (event.key) {
    case "ArrowUp":
      moverArriba();
      break;
    case "ArrowDown":
      moverAbajo();
      break;
    case "ArrowLeft":
      moverIzquierda();
      break;
    case "ArrowRight":
      moverDerecha();
      break;
    default:
      break;
  }
}

function iniciarMapa() {
  mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador);
  intervalo = setInterval(pintarCanvas, 50);

  window.addEventListener("keydown", sePresionoUnaTecla);

  window.addEventListener("keyup", detenerMovimiento);
}

function obtenerObjetoMascota() {
  for (let i = 0; i < mokepones.length; i++) {
    if (mascotaJugador === mokepones[i].nombre) {
      return mokepones[i];
    }
  }
}

function revisarColision(enemigo) {
  const arribaEnemigo = enemigo.y;
  const abajoEnemigo = enemigo.y + enemigo.alto;
  const derechaEnemigo = enemigo.x + enemigo.ancho;
  const izquierdaEnemigo = enemigo.x;

  const arribaMascota = mascotaJugadorObjeto.y;
  const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto;
  const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho;
  const izquierdaMascota = mascotaJugadorObjeto.x;

  if (
    abajoMascota < arribaEnemigo ||
    arribaMascota > abajoEnemigo ||
    derechaMascota < izquierdaEnemigo ||
    izquierdaMascota > derechaEnemigo
  ) {
    return;
  }

  detenerMovimiento();
  clearInterval(intervalo);

  enemigoId = enemigo.id;

  sectionSeleccionarAtaque.style.display = "flex";
  sectionVerMapa.style.display = "none";
  seleccionarMascotaEnemigo(enemigo);
}

window.addEventListener("load", iniciarJuego);
