import PlayerProjectile from "./PlayerProjectile.js";
// import Vec2 from "./Vec2.js";

export default class Player {
  constructor(game) {
    this.image = new Image();
    this.image.src = "/assets/player.png";
    this.game = game;
    this.map = this.game.map;
    this.input = game.input;
    this.initPhysics();
    this.shootTimer = Date.now();
    this.shootDelay = 20;
    this.direction = 0;
    this.screenX = 0;
    this.screenY = 0;
    this.sx = 0;
    this.sy = 0;
    this.sw = 23;
    this.sh = 37;

    this.knockedback = false;
    this.knockbackVelocity = new Vec2(0, 0);
    this.kbTimer = Date.now();

    this.cameraKnob = {
      position: new Vec2(this.position.x, this.position.y),
      velocity: new Vec2(0, 0),
    };
  }

  update() {
    this.handleMouseInput();
    this.handleShooting();
    this.handleKnockback();
    this.handlePhysics();
    this.handleKeyboardInput();
    this.cameraKnob.position.x += (this.position.x + this.width / 2 - this.cameraKnob.position.x);
    this.cameraKnob.position.y += (this.position.y + this.height / 2 - this.cameraKnob.position.y);
    this.cameraKnob.velocity.set(this.cameraKnob.velocity.x * 0.5, this.cameraKnob.velocity.y * 0.5);
    // console.log(this.cameraKnob.velocity)
    this.cameraKnob.position.add(this.cameraKnob.velocity);
    // console.log(this.cameraKnob.position.x, this.cameraKnob.position.y)
  }

  handleKnockback() {
    if (this.knockedBack) {
      this.position.add(this.knockbackVelocity);
      this.knockbackVelocity.set(this.knockbackVelocity.x * 0.8, this.knockbackVelocity.y * 0.8);
      if (this.knockbackVelocity.length() < 1) {
        this.knockedBack = false;
      }
    }
  }

  knockback(m2, v2) {
    this.knockedBack = true;
    this.kbTimer = Date.now();
    this.knockbackVelocity.set((v2.x * m2) / this.mass, (v2.y * m2) / this.mass);
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    this.screenX = this.position.x - this.game.camera.position.x;
    this.screenY = this.position.y - this.game.camera.position.y;

    let realAngle = this.direction * Math.PI / 180 + Math.PI / 2;
    this.drawImageRot(ctx, this.image, this.sx, this.sy, this.sw, this.sh, this.screenX, this.screenY, this.width, this.height, realAngle);
    Utils.drawVector(ctx, this.screenX + this.width / 2, this.screenY + this.height / 2, this.cameraKnob.velocity, 2, "green");
    // console.log(this.screenX, this.screenY);
    // ctx.fillRect(this.screenX, this.screenY, this.width, this.height);
    // simple camera - draw in middle of screen always.
    // ctx.fillRect(this.game.gameWidth / 2 - this.width / 2, this.game.gameHeight / 2 - this.height / 2, this.width, this.height);
  }

  handleMouseInput() {
    // let diffX = this.screenX + this.width / 2 - this.input.mouseX;
    // let diffY = this.screenY + this.height / 2 - this.input.mouseY;

    // let angle = Math.atan2(diffY, diffX) + Math.PI;
    let angle = Utils.angleFrom(this.screenX + this.width / 2, this.screenY + this.height / 2, this.input.mouseX, this.input.mouseY);
    this.direction = angle;
  }



  handleShooting() {
    if (this.input.mouseDown) {
      if (Date.now() - this.shootTimer > this.shootDelay) {
        let bullet = new PlayerProjectile(this.game, this.direction + Utils.randomNumber(-5, 5),
            this.position.x + this.width / 2, this.position.y + this.height / 2);
        let backwdVel = bullet.velocity.clone();
        this.knockback(bullet.mass, backwdVel.scale(-1));
        // camera shake?
        this.cameraKnob.velocity.set(this.cameraKnob.velocity.x + Utils.randomNumber(-100, 100), this.cameraKnob.velocity.y + Utils.randomNumber(-100, 100));
        // this.cameraKnob.position.set(this.cameraKnob.position.x + Utils.randomNumber(-100, 100), this.cameraKnob.position.y + Utils.randomNumber(-100, 100));
        
        this.game.playerProjectiles.push(bullet);
        this.shootTimer = Date.now();
      }
    }
  }

  handleKeyboardInput() {
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
  }

  handlePhysics() {
    //friction
    this.acceleration.scale(0.88);
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);

    this.velocity.set(0, 0);

    if (this.position.x < this.map.position.x) {
      this.position.x = this.map.position.x;
    }
    if (this.position.x + this.width > this.map.position.x + this.map.width) {
      this.position.x = this.map.position.x + this.map.width - this.width;
    }

    if (this.position.y < this.map.position.y) {
      this.position.y = this.map.position.y;
    }
    if (this.position.y + this.height > this.map.position.y + this.map.height) {
      this.position.y = this.map.position.y + this.map.height - this.height;
    }

  }

  initPhysics() {
    this.width = 32 * this.game.scale;
    this.height = 45 * this.game.scale;
    this.mass = 100;

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

  drawImageRot(ctx, img, sx, sy, sw, sh, dx, dy, dw, dh, deg) {
    ctx.save();
    ctx.translate(dx + dw / 2, dy + dh / 2);
    ctx.rotate(deg);
    ctx.drawImage(img, sx, sy, sw, sh, -1 * dw / 2, -1 * dh / 2, dw, dh);
    ctx.restore();
  }
}