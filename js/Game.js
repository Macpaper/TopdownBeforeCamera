import Player from "./Player.js";
import Input from "./Input.js";
import Enemy from "./Enemy.js";
import Map from "./Map.js";
import Camera from "./Camera.js";

export default class Game {
  constructor(width, height) {
    this.gameWidth = width;
    this.gameHeight = height;
    this.scale = 1;

    this.input = new Input(this);
    this.input.initInput();

    this.map = new Map(this);
    this.player = new Player(this);

    this.backgroundColor = this.getBackgroundColor();
    this.camera = new Camera(this);

    this.playerProjectiles = [];
    this.enemies = [];

    for (let i = 0; i < 50; i++) {
      let enemy = new Enemy(this);
      enemy.position.x = Math.random() * this.gameWidth;
      enemy.position.y = Math.random() * this.gameHeight;
      this.enemies.push(enemy);
    }
  }

  moveStuffRelativeToCamera() {
    this.camera.update();
    let screenX, screenY;
    screenX = this.map.position.x - this.camera.position.x;
    screenY = this.map.position.y - this.camera.position.y;
    // this.map.position.set(screenX, screenY);
    console.log(screenX, screenY);
  }

  update() {
    this.moveStuffRelativeToCamera();
    this.input.update();
    this.map.update();
    this.player.update();

    this.playerProjectiles = this.playerProjectiles.filter(p => !p.deleted);
    this.playerProjectiles.forEach(p => {
      p.update();
    });
    this.enemies = this.enemies.filter(e => !e.deleted);
    this.enemies.forEach(e => {
      e.update();
    });
  }

  draw(ctx) {
    this.input.draw(ctx);
    this.map.draw(ctx);
    this.playerProjectiles.forEach(p => {
      p.draw(ctx);
    });
    this.enemies.forEach(e => {
      e.draw(ctx);
    });
    this.player.draw(ctx);
  }

  getBackgroundColor() {
    this.r = "222";
    this.g = "033";
    this.b = "011";

    return `rgba(${this.r}, ${this.g}, ${this.b}, 1)`;
  }
}