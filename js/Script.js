import Game from "./Game.js";

const canv = document.querySelector("canvas");
const ctx = canv.getContext("2d");

// different ones later?
canv.width = window.innerWidth;
canv.height = window.innerHeight;
// let WIDTH = 1920;
// let HEIGHT = 1080;
let WIDTH = canv.width;
let HEIGHT = canv.height;

let game1 = new Game(WIDTH, HEIGHT);

window.addEventListener("resize", e => {
  canv.width = window.innerWidth;
  canv.height = window.innerHeight;
  game1.gameWidth = canv.width;
  game1.gameHeight = canv.height;
});

function gameLoop() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  ctx.fillStyle = "rgb(50, 50, 50)";
  ctx.fillRect(0, 0, canv.width, canv.height);

  game1.update();
  game1.draw(ctx);
}

setInterval(gameLoop, 17);