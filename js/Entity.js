class Entity {
  constructor(game, x = 0, y = 0, width = 10, height = 10) {
    this.game = game;
    this.map = this.game.map;
    this.deleted = false;

    this.position = new Vec2(x, y);
    this.velocity = new Vec2(0, 0);
    this.acceleration = new Vec2(0, 0);
    this.speed = 1;
    this.direction = 0;

    this.width = width;
    this.height = height;
    this.mass = 1;

    this.color = "black";
    this.color2 = "black";
    this.screenX = 0;
    this.screenY = 0;

    this.gotHit = false;
    this.hitTimer = Date.now();
    this.hitDelay = 100;

    this.health = 1;
    this.armor = 1;

    this.sx = 0;
    this.sy = 0;
    this.sw = 0;
    this.sh = 0;

    this.friction = 0.7;

    this.knockedback = false;
    this.knockbackVelocity = new Vec2(0, 0);
    this.kbTimer = Date.now();

  }

  update() {
    this.checkDead();
    this.handleHit();
    this.handleBounds();
    if (this.knockedBack) {
      this.position.add(this.knockbackVelocity);
      this.knockbackVelocity.set(this.knockbackVelocity.x * 0.8, this.knockbackVelocity.y * 0.8);
      let speedVel = this.velocity.clone();
      speedVel.scale(this.speed);
      this.position.add(speedVel);
      if (this.knockbackVelocity.length() < 1) {
        this.knockedBack = false;
      }
    } else {
      let speedVel = this.velocity.clone();
      speedVel.scale(this.speed);
      this.position.add(speedVel);
      this.velocity.add(this.acceleration);
      // this.acceleration.set(this.acceleration.x * this.friction, this.acceleration.y * this.friction);  
      this.direction = this.velocity.direction() / 180 * Math.PI + Math.PI / 2;
    }
    // let speedVel = this.velocity.clone();
    // speedVel.scale(this.speed);
    // this.position.add(speedVel);
    // this.velocity.add(this.acceleration);
    // this.acceleration.set(this.acceleration.x * this.friction, this.acceleration.y * this.friction);  
    // this.direction = this.velocity.direction() / 180 * Math.PI + Math.PI / 2;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    this.screenX = this.position.x - this.game.camera.position.x;
    this.screenY = this.position.y - this.game.camera.position.y;
  }

  applyMomentum(m2, v2) {
    this.acceleration.set((v2.x * m2) / this.mass, (v2.y * m2) / this.mass);
  }

  knockback(m2, v2) {
    this.knockedBack = true;
    this.kbTimer = Date.now();
    this.knockbackVelocity.set((v2.x * m2) / this.mass, (v2.y * m2) / this.mass);
  }

  getColor() {
    return this.color;
  }

  getColor2() {
    return this.color2;
  }

  handleHit() {
    if (this.gotHit) {
      this.color = "red";
      let diffTimer = Date.now() - this.hitTimer;
      if (diffTimer > this.hitDelay) {
        this.gotHit = false;
        this.color = this.color2;
      }
    }
  }

  checkDead() {
    if (this.health <= 0) {
      this.deleted = true;
    }
  }

  damageEntity(dmg) {
    this.gotHit = true;
    this.hitTimer = Date.now();
    this.health -= dmg;
  }
  
  handleBounds() {
    if (this.position.x < this.map.position.x) {
      this.position.set(this.map.position.x, this.position.y);
      this.velocity.x = -this.velocity.x;
    }
    if (this.position.x + this.width > this.map.position.x + this.map.width) {
      this.position.set(this.map.position.x + this.map.width - this.width, this.position.y);
      this.velocity.x = -this.velocity.x;
    }
    if (this.position.y < this.map.position.y) {
      this.position.set(this.position.x, this.map.position.y);
      this.velocity.y = -this.velocity.y;
    }

    if (this.position.y + this.height > this.map.position.y + this.map.height) {
      this.position.set(this.position.x, this.map.position.y + this.map.height - this.height);
      this.velocity.y = -this.velocity.y;
    }
  }
  drawImageRot(ctx, img, sx, sy, sw, sh, dx, dy, dw, dh, deg) {
    ctx.save();
    ctx.translate(dx + dw / 2, dy + dh / 2);
    ctx.rotate(deg);
    ctx.drawImage(img, sx, sy, sw, sh, -1 * dw / 2, -1 * dh / 2, dw, dh);
    ctx.restore();
  }

  // MX = middle x, MY = middle y
  getMX() {
    return this.position.x + this.width / 2;
  }

  getMY() {
    return this.position.y + this.height / 2;
  }
}