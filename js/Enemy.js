import Vec2 from "./Vec2.js";
import Utils from "./Utils.js";
export default class Enemy {
  constructor(game, x = 0, y = 0, width = 33, height = 33) {
    this.game = game;
    this.deleted = false;

    this.position = new Vec2(x, y);

    this.width = width;
    this.height = height;

    // let dx = Math.random() * 10 - 5;
    // let dy = Math.random() * 10 - 5;
    let dx = 0;
    let dy = 0;
    this.velocity = new Vec2(dx, dy);
    this.acceleration = new Vec2(0, 0);

    this.color = "orange";
  }
  update() {

    this.handleBounds();

    this.game.playerProjectiles.forEach(p => {
      if (Utils.rectCircleCollision(this.position.x, this.position.y, this.width, this.height, p.position.x, p.position.y, p.width, p.height)) {
        this.deleted = true;
      }
    });

    this.position.add(this.velocity);
    // this.x += this.dx;
    // this.y += this.dy;
    // this.dx += this.ax;
    // this.dy += this.ay;
  }
  draw(ctx) {
    ctx.fillStyle = this.color;
    let diffX = this.game.camera.position.x - this.position.x;
    let diffY = this.game.camera.position.y - this.position.y;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  handleBounds() {
    if (this.position.x < 0) {
      this.position.set(0, this.position.y);
      this.velocity.x = -this.velocity.x;
    }
    if (this.position.x + this.width > this.game.gameWidth) {
      this.position.set(this.game.gameWidth - this.width, this.position.y);
      this.velocity.x = -this.velocity.x;
    }
    if (this.position.y < 0) {
      this.position.set(this.position.x, 0);
      this.velocity.y = -this.velocity.y;
    }

    if (this.position.y + this.height > this.game.gameHeight) {
      this.position.set(this.position.x, this.game.gameHeight - this.height);
      this.velocity.y = -this.velocity.y;
    }
  }
}