import Vec2 from "./Vec2.js";
export default class PlayerProjectile {
  constructor(game, direction, x = 0, y = 0) {
    this.game = game;
    this.direction = direction;
    this.deleted = false;

    this.width = 20;
    this.height = 20;

    this.speed = 40 * this.game.scale;
    let dx = Math.cos(direction / 180 * Math.PI) * this.speed;
    let dy = Math.sin(direction / 180 * Math.PI) * this.speed;

    this.position = new Vec2(x, y);
    this.velocity = new Vec2(dx, dy);
    this.acceleration = new Vec2(0, 0);


    this.color = "rgba(0, 250, 250, 1)";
  }

  update() {
    // console.log(this.position);
    this.position.add(this.velocity);

    // this.velocity.add(this.acceleration);
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}