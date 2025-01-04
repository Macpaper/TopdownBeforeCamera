export default class Enemy extends Entity {
  constructor(game, x = 0, y = 0, width = 32, height = 32) {
    super(game, x, y, width, height);

    this.image = new Image();
    this.image.src = "/assets/zombie1sheet.png";

    this.color = "orange";
    this.color2 = "orange";

    this.position = new Vec2(x, y);
    this.width = width;
    this.height = height;

    let dx = Utils.randomNumber(-2, 2);
    let dy = Utils.randomNumber(-2, 2);
    // let dx = 0;
    // let dy = 0;
    this.velocity = new Vec2(dx, dy);
    this.mass = 50;

    this.health = Math.round(Utils.randomNumber(5, 10));
    this.armor = 1;

    this.sx = 0;
    this.sy = 0;
    this.sw = 52;
    this.sh = 58;

    let aggro = { name: "aggro" };
    let wandering = { name: "wandering" };
    let scavenging = { name: "scavenging" };
    let eating = { name: "eating" };
    let sleeping = { name: "sleeping" };
    this.states = { aggro, wandering, scavenging, eating, sleeping };
    this.currentState = Utils.randomProperty(this.states);

    this.id = crypto.randomUUID();
  }

  playerAngle() {
    let diffX = this.position.x - this.game.player.position.x;
    let diffY = this.position.y - this.game.player.position.y;

    let rads = Math.atan2(diffY, diffX) + Math.PI;
    let angle = rads * 180 / Math.PI;
    return angle;
  }

  manageState() {
    if (Math.round(Utils.randomNumber(1, 1000)) == 1) {
      this.currentState = Utils.randomProperty(this.states);
      // console.log("switched");
    }
    if (this.currentState.name == "aggro") {
      this.velocity.setDirection(this.playerAngle());
      // console.log(this.velocity);
      this.speed = 4;
    }
    if (this.currentState.name == "wandering") {
      this.speed = 2;
    }
    if (this.currentState.name == "scavenging") {
      this.speed = 3;
    }
    if (this.currentState.name == "eating") {
      this.speed = 0;
    }
    if (this.currentState.name == "sleeping") {
      this.speed = 0;
    }
  }

  handleHit() {
    if (this.gotHit) {
      this.sx = this.sw;
      let diffTimer = Date.now() - this.hitTimer;
      if (diffTimer > this.hitDelay) {
        this.gotHit = false;
        this.sx = 0;
      }
    }
  }

  update() {
    super.update();

    this.game.playerProjectiles.forEach(p => {
      if (Utils.rectCircleCollision(this.position.x, this.position.y, this.width, this.height, p.position.x, p.position.y, p.width, p.height)) {
        p.penetrate -= this.armor;
        this.damageEntity(p.getDamage());
        this.knockback(p.mass, p.velocity);
        // console.log(this.acceleration);
      }
    });

    // this.game.enemies.forEach(e => {
    //   if (e.id != this.id) {
    //     if (Utils.entityDist(this, e) < this.width) {
    //       let angle = Utils.entityAngle(this, e) + 180;
    //       console.log(angle);                
    //       // let dx = Math.cos(angle) + 5;
    //       // let dy = Math.sin(angle) + 5;
    //       // let v = new Vec2(dx, dy);
    //       // this.knockback(3, v);
    //       // this.velocity.set(this.velocity.x + dx, this.velocity.y + dy);
    //     }
    //   }

    // });
    this.manageState();
  }

  draw(ctx) {
    super.draw(ctx);
    
    this.drawImageRot(ctx, this.image, this.sx, this.sy, this.sw, this.sh, this.screenX, this.screenY, this.width, this.height, this.direction);
    
    ctx.fillStyle = "black";
    ctx.font = "24px bold serif";
    ctx.fillText(this.currentState.name, this.screenX + this.width / 2, this.screenY + this.height / 2);

    Utils.drawVector(ctx, this.screenX + this.width / 2, this.screenY + this.height / 2, this.velocity, 20, "blue");
    Utils.drawVector(ctx, this.screenX + this.width / 2, this.screenY + this.height / 2, this.acceleration, 20, "red");
  }
}






// let pX = this.game.player.position.x + this.game.player.width / 2;
// let pY = this.game.player.position.y + this.game.player.height / 2;
// let eX = this.position.x + this.width / 2;
// let eY = this.position.y + this.height / 2;

// let rads = Math.atan2(pY - eY, pX - eX);
// let angleValue = (rads * 180) / Math.PI;

// drawImageRot(
//   context,
//   this.image,
//   this.position.x,
//   this.position.y,
//   this.width,
//   this.height,
//   angleValue + 90
// );

// drawImageRot(ctx, img, x, y, width, height, deg) {
//   context.save();
//   let rad = (deg * Math.PI) / 180;
//   ctx.translate(x + width / 2, y + height / 2);
//   // console.log(rad);
//   ctx.rotate(rad);
//   ctx.drawImage(img, (width / 2) * -1, (height / 2) * -1, width, height);
//   ctx.restore();
// }


    // ctx.save();
    // ctx.translate(this.screenX + this.width / 2, this.screenY + this.height / 2);
    // ctx.rotate(this.direction);
    // ctx.drawImage(this.image, this.sx, this.sy, this.sw, this.sh, -1 * (this.width / 2), -1 * this.height / 2, this.width, this.height);
    // ctx.restore();