/* ==================================================================
   EDITA AQUÍ TUS TEXTOS  (solo cambia lo que está entre comillas)
================================================================== */
const CONFIG = {
  pestana:  'Flores amarillas',
  fecha:    '21 de septiembre, Día de las Flores Amarillas',
  titulo:   'Para Brenda',
  intro:    'Hoy quería regalarte un jardín entero, aunque sea de los que se ven en pantalla.',
  firma:    'Con cariño, Jefferson',
  boton:    'Otra flor',
  pista:    'Toca el jardín para plantar más flores.',

  // Cada vez que se planta una flor cambia al siguiente mensaje.
  // Agrega, borra o cambia los que quieras (cada uno entre comillas y con coma al final).
  mensajes: [
  'Para ti la chica que me hace sentir malito, pero la amo con todo mi ser',
  'Desde que llegaste a mi vida, entendí que hay personas que simplemente hacen que todo tenga más sentido.',
  'No necesito un día especial para recordarte cuánto te amo; cualquier día contigo ya es especial.',
  'Si mi corazón pudiera hablar, seguramente repetiría tu nombre todo el tiempo.',
  'Me encanta saber que, entre tantas personas en el mundo, tuve la suerte de encontrarte a ti.',
  'No sé qué hice para merecerte, pero todos los días agradezco tenerte en mi vida.',
  'Tu sonrisa tiene esa extraña capacidad de hacer que cualquier día malo termine siendo un buen día.',
  'Quiero seguir coleccionando momentos contigo, de esos que algún día recordaremos con una sonrisa.',
  'No prometo que todos los días serán perfectos, pero sí prometo estar a tu lado en cada uno de ellos.',
  'Eres ese pensamiento bonito que aparece en mi mente incluso cuando estoy ocupado con mil cosas.',
  'A tu lado descubrí que el amor también puede sentirse como paz, confianza y hogar.',
  'Si pudiera guardar un momento para siempre, elegiría cualquiera en el que estés sonriendo a mi lado.',
  'Me haces querer ser una mejor persona, no porque me lo pidas, sino porque quiero darte lo mejor de mí.',
  'Qué bonito es saber que mi persona favorita también es la persona con la que quiero compartir mi futuro.',
  'No importa cuántos lugares conozca, mi lugar favorito siempre será donde estés tú.',
  'Te quiero en mis días buenos, en mis días difíciles y en todos los días que todavía nos quedan por vivir.',
  'A veces te miro y todavía me parece increíble que alguien como tú sea parte de mi vida.',
  'Si el amor tuviera un nombre para mí, tendría el tuyo.',
  'Quiero que nunca dudes de algo: entre todas las cosas bonitas que me ha dado la vida, tú eres mi favorita.',
  'Gracias por existir, por llegar a mi vida y por hacerla mucho más bonita simplemente siendo tú.',
  'No sé qué nos tenga preparado el futuro, pero sé que quiero descubrirlo contigo.',
  'Te elegiría incluso en otra vida, en otro lugar y en cualquier versión de nuestra historia.',
  'Mi felicidad tiene muchos momentos, pero la mayoría de mis momentos favoritos tienen tu nombre.',
  'Ojalá pudiera explicarte con palabras todo lo que siento por ti, pero creo que tendría que inventar un idioma nuevo.',
  'Quiero seguir siendo esa persona que te abraza cuando lo necesitas y que celebra contigo cada pequeña victoria.',
  'Te amo por lo que eres, por cómo me haces sentir y por todo lo bonito que construimos juntos.',
  'No quiero una historia perfecta; quiero una historia real, contigo, llena de momentos que sean solo nuestros.',
  'Cada día encuentro una nueva razón para enamorarme un poquito más de ti.',
  'Eres mi casualidad favorita, mi decisión más bonita y la persona que quiero seguir eligiendo.',
  'Si algún día olvidas cuánto significas para mí, ven y abrázame; yo me encargaré de recordártelo.',
  'Te amo, Brenda. Y si pudiera volver al día en que te conocí, volvería a elegirte sin pensarlo.'
]
};
/* ================================================================== */

const $ = (id) => document.getElementById(id);
const garden = $('garden');
const rand = (a, b) => a + Math.random() * (b - a);
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

// [pétalos claros, pétalos de atrás]
const colores = [
  ['#ffd21f', '#ffb800'],
  ['#ffe14d', '#ffc400'],
  ['#ffcb05', '#f29f05'],
  ['#fff07a', '#ffd21f'],
];

/* ------------------------------------------------------------------
   Crea una flor. x = posición horizontal (px),
   alto = distancia desde el borde inferior hasta el centro de la flor.
------------------------------------------------------------------- */
function crearFlor(x, alto, retraso = 0) {
  const ancho = rand(80, 150);
  const s = ancho / 100;             // px por unidad del SVG
  const H = alto / s + 50;           // el centro de la flor está a 50 unidades del tope
  const [claro, oscuro] = pick(colores);
  const n = Math.round(rand(9, 14)); // cantidad de pétalos
  const largo = rand(17, 22);
  const grosor = rand(6, 8.5);
  const curva = rand(-14, 14);

  // Pétalos: una capa de atrás y otra de adelante, giradas entre sí
  let petalos = '';
  for (let i = 0; i < n; i++) {
    petalos += `<ellipse cx="50" cy="${50 - largo}" rx="${grosor}" ry="${largo}" fill="${oscuro}" transform="rotate(${(i * 360) / n} 50 50)"/>`;
  }
  for (let i = 0; i < n; i++) {
    petalos += `<ellipse cx="50" cy="${50 - largo * 0.85}" rx="${grosor * 0.9}" ry="${largo * 0.85}" fill="${claro}" transform="rotate(${(i * 360) / n + 180 / n} 50 50)"/>`;
  }

  // Semillas del centro
  let semillas = '';
  for (let i = 0; i < 9; i++) {
    const a = (i * 360) / 9;
    semillas += `<circle cx="50" cy="44" r="1.3" fill="#3d2509" transform="rotate(${a} 50 50)"/>`;
  }

  // Hojas
  const y1 = H - (H - 50) * 0.35;
  const y2 = H - (H - 50) * 0.6;

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', `0 0 100 ${H}`);
  svg.setAttribute('width', ancho);
  svg.setAttribute('height', H * s);
  svg.innerHTML = `
    <path d="M50 ${H} C ${50 + curva} ${H * 0.7}, ${50 - curva} ${H * 0.4}, 50 50"
          stroke="#3f9142" stroke-width="3.2" fill="none" stroke-linecap="round"/>
    <path d="M50 ${y1} C 38 ${y1 - 14}, 22 ${y1 - 12}, 14 ${y1 - 26} C 30 ${y1 - 30}, 46 ${y1 - 20}, 50 ${y1}Z" fill="#3f9142"/>
    <path d="M50 ${y2} C 62 ${y2 - 14}, 78 ${y2 - 12}, 86 ${y2 - 26} C 70 ${y2 - 30}, 54 ${y2 - 20}, 50 ${y2}Z" fill="#4aa64d"/>
    ${petalos}
    <circle cx="50" cy="50" r="11.5" fill="#5b3a14"/>
    <circle cx="50" cy="50" r="7.5" fill="#7a4d1a"/>
    ${semillas}
  `;

  const flor = document.createElement('div');
  flor.className = 'flor';
  flor.style.left = `calc(${(x / garden.clientWidth) * 100}% - ${ancho / 2}px)`;

  const brote = document.createElement('div');
  brote.className = 'brote';
  brote.style.setProperty('--ret', `${retraso}s`);

  const mece = document.createElement('div');
  mece.className = 'mece';
  mece.style.setProperty('--t', `${rand(4, 7)}s`);
  mece.style.setProperty('--ret2', `${-rand(0, 5)}s`);

  mece.appendChild(svg);
  brote.appendChild(mece);
  flor.appendChild(brote);
  garden.appendChild(flor);

  // Para que no se llene de más
  while (garden.children.length > 90) garden.firstElementChild.remove();
}

/* ---------- Jardín inicial: brota de izquierda a derecha ---------- */
function jardinInicial() {
  const w = garden.clientWidth;
  const h = garden.clientHeight;
  const n = Math.max(8, Math.min(22, Math.round(w / 85)));
  const maxAlto = Math.min(h * 0.4, 330);

  for (let i = 0; i < n; i++) {
    const x = ((i + 0.5) / n) * w + rand(-28, 28);
    const alto = Math.max(110, maxAlto * rand(0.35, 1));
    const retraso = (x / w) * 1.4 + rand(0, 0.3);
    crearFlor(x, alto, retraso);
  }
}

/* ---------- Plantar donde toques ---------- */
$('stage').addEventListener('click', (e) => {
  if (e.target.closest('.card')) return;
  const base = garden.getBoundingClientRect().bottom;
  const alto = Math.min(Math.max(base - e.clientY, 100), garden.clientHeight - 20);
  crearFlor(e.clientX, alto, 0);
  siguienteMensaje();
});

$('mas').addEventListener('click', () => {
  const w = garden.clientWidth;
  const maxAlto = Math.min(garden.clientHeight * 0.4, 330);
  for (let i = 0; i < 5; i++) {
    crearFlor(rand(40, w - 40), rand(110, maxAlto), i * 0.12);
  }
  siguienteMensaje();
});

/* ---------- Textos y mensajes ---------- */
$('fecha').textContent = CONFIG.fecha;
$('titulo').textContent = CONFIG.titulo;
$('intro').textContent = CONFIG.intro;
$('firma').textContent = CONFIG.firma;
$('mas').textContent = CONFIG.boton;
$('pista').textContent = CONFIG.pista;
document.title = CONFIG.pestana;

const texto = $('dedicatoria');
let actual = 0;

function mostrarMensaje() {
  texto.textContent = CONFIG.mensajes[actual];
  texto.classList.remove('cambia');
  void texto.offsetWidth; // reinicia la animación
  texto.classList.add('cambia');
}

function siguienteMensaje() {
  actual = (actual + 1) % CONFIG.mensajes.length;
  mostrarMensaje();
}

mostrarMensaje();
jardinInicial();
/* ---------- Música de fondo ---------- */
const musica = new Audio('musica.mp3'); // cambia el nombre si tu archivo se llama distinto
musica.loop = true;
musica.volume = 0.5; // de 0 a 1

const btnMusica = document.createElement('button');
btnMusica.textContent = '♪ Música';
btnMusica.setAttribute('aria-label', 'Activar o pausar la música');
btnMusica.style.cssText = 'position:fixed; top:59px; right:14px; z-index:10; padding:.5rem .9rem;';
document.body.appendChild(btnMusica);

function actualizarBoton() {
  btnMusica.textContent = musica.paused ? '♪ Música' : '♪ Pausar';
}
musica.addEventListener('play', actualizarBoton);
musica.addEventListener('pause', actualizarBoton);

// Los navegadores no dejan que suene sola: arranca con el primer toque en la página
function arrancar(e) {
  if (e.target === btnMusica) return;
  musica.play().catch(() => {});
  document.removeEventListener('pointerdown', arrancar);
}
document.addEventListener('pointerdown', arrancar);

btnMusica.addEventListener('click', () => {
  document.removeEventListener('pointerdown', arrancar);
  musica.paused ? musica.play() : musica.pause();
});