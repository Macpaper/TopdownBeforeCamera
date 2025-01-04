// import Vec2 from "./Vec2.js";
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

    this.position.x -= this.width / 2;
    this.position.y -= this.height / 2;

    this.mass = 10;

    this.color = "rgba(0, 250, 250, 1)";
    this.screenX = 0;
    this.screenY = 0;
    this.damage = 1;

    this.penetrate = 1;
  }

  update() {
    if (this.penetrate <= 0) {
      this.deleted = true;
    }
    // console.log(this.position);
    this.position.add(this.velocity);

    // this.velocity.add(this.acceleration);
  }

  getDamage() {
    return this.damage;
  }

  getDirection() {
    return this.direction;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    this.screenX = this.position.x - this.game.camera.position.x;
    this.screenY = this.position.y - this.game.camera.position.y;
    ctx.fillRect(this.screenX, this.screenY, this.width, this.height);
  }
}