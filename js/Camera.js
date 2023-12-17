import Vec2 from "./Vec2.js";

export default class Camera {
  constructor(game) {
    this.game = game;
    this.viewWidth = 640;
    this.viewHeight = 480;

    // position of camera relative to world/map
    this.position = new Vec2(0, 0);
  }
  update() {
    this.position.setVec2(this.game.player.position);
    // console.log(this.position);
  }
  draw(ctx) {

  }
}