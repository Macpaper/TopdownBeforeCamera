export default class Camera {
  constructor(game) {
    this.game = game;
    this.viewWidth = 640;
    this.viewHeight = 480;

    // position of camera relative to world/map
    // this.position = new Vec2(this.game.gameWidth / 2 - this.viewWidth / 2, this.game.gameHeight / 2 - this.viewHeight / 2);
    this.position = new Vec2(0, 0);
  }
  update() {
    // LITERALLY NO CLUE WHY THIS WORKS LOLE
    // https://www.youtube.com/watch?v=2gABYM5M0ww
    // CHECK OUT THIS GUY I GOT IT FROM HIM
    // https://youtu.be/2gABYM5M0ww?si=dQZvobR3EyH8iWNt&t=5666
    this.position.x += (this.game.player.cameraKnob.position.x - (this.game.gameWidth / 2 - this.game.player.width / 2) - this.position.x) / 15;
    this.position.y += (this.game.player.cameraKnob.position.y - (this.game.gameHeight / 2 - this.game.player.height / 2) - this.position.y) / 15;
    // this.position.x += (this.game.player.position.x - (this.game.gameWidth / 2 - this.game.player.width / 2) - this.position.x) / 15;
    // this.position.y += (this.game.player.position.y - (this.game.gameHeight / 2 - this.game.player.height / 2) - this.position.y) / 15;
    // this.position.y += this.game.player.position.y;
    // this.position.y += 1;
    // this.position.set(this.game.player.screenX - this.viewWidth / 2 + this.game.player.width / 2, this.game.player.screenY - this.viewHeight / 2 + this.game.player.height / 2);
    // console.log(this.position);
  }
  draw(ctx) {
    // ctx.strokeStyle = "black";
    // ctx.beginPath();
    // ctx.lineWidth = 1;
    // ctx.strokeRect(this.position.x, this.position.y, this.viewWidth, this.viewHeight);
    // ctx.stroke();
  }
}