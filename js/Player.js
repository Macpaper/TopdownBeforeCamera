import PlayerProjectile from "./PlayerProjectile.js";
import Vec2 from "./Vec2.js";

export default class Player {

  constructor(game) {
    this.game = game;
    this.input = game.input;
    this.initPhysics();
    this.shootTimer = Date.now();
    this.shootDelay = 200;
    this.direction = 0;
  }

  update() {
    this.handleMouseInput();
    this.handleShooting();
    this.handlePhysics();
    this.moveRelativeToPlayer();
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  moveRelativeToPlayer() {
    
  }

  handleMouseInput() {
    let diffX = this.position.x + this.width / 2 - this.input.mouseX;
    let diffY = this.position.y + this.height / 2 - this.input.mouseY;

    let angle = Math.atan2(diffY, diffX) + Math.PI;

    this.direction = angle * 180 / Math.PI;
  }

  handleShooting() {
    if (this.input.mouseDown) {
      if (Date.now() - this.shootTimer > this.shootDelay) {
        let bullet = new PlayerProjectile(this.game, this.direction,
            this.position.x + this.width / 2, this.position.y + this.height / 2);

        this.game.playerProjectiles.push(bullet);
        this.shootTimer = Date.now();
      }
    }
  }

  handlePhysics() {
    //friction
    this.acceleration.scale(0.88);

    if (this.input.leftKey) {
      this.velocity.set(-12, this.velocity.y);
    } 
    if (this.input.rightKey) {
      this.velocity.set(12, this.velocity.y);
    }
    if (this.input.upKey) {
      this.velocity.set(this.velocity.x, -12);
    }
    if (this.input.downKey) {
      this.velocity.set(this.velocity.x, 12);
    } 

    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);

    this.velocity.set(0, 0);
  }

  initPhysics() {
    this.width = 50 * this.game.scale;
    this.height = 50 * this.game.scale;

    let x = this.game.gameWidth / 2 - this.width / 2;
    let y = this.game.gameHeight / 2 - this.height / 2;

    this.position = new Vec2(x, y);
    this.velocity = new Vec2(0, 0);
    this.acceleration = new Vec2(0, 0);

    this.speed = 12 * this.game.scale;

    this.color = this.getColor();
  }

  getColor() {
    this.r = 0;
    this.g = 150;
    this.b = 250;
    this.opacity = 1;

    return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.opacity})`;
  }
}