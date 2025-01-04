// import Vec2 from "./Vec2.js";
export default class Map {
  constructor(game) {
    this.game = game;
    this.tileSize = 64 * this.game.scale;
    this.tiles = [];
    this.image = new Image();
    this.image.src = "assets/cityMap1.png";

    this.tilesHorizontal = 50;
    this.tilesVertical = 50;
    this.width = this.tilesHorizontal * this.tileSize;
    this.height = this.tilesVertical * this.tileSize;
    let count = 0;
    for (let col = 0; col < this.tilesHorizontal; col++) {
      for (let row = 0; row < this.tilesVertical; row++) {
        this.tiles.push({
          x: col * this.tileSize,
          y: row * this.tileSize,
          row: row,
          col: col,
          width: this.tileSize,
          height: this.tileSize,
          count: count
        });
      }
    }

    //just used to calculate position of "map"
    this.leftEdge = this.tiles[0].x;
    this.topEdge = this.tiles[0].y;
    // not sure if need these.
    this.rightEdge = this.tiles[this.tiles.length - 1].x + this.tileSize;
    this.bottomEdge = this.tiles[this.tiles.length - 1].y + this.tileSize;

    this.position = new Vec2(this.leftEdge, this.topEdge);

    this.screenX = 0;
    this.screenY = 0;
  }
  update() {
    // console.log(this.leftEdge);
    this.tiles.forEach(t => {
      t.x = t.col * this.tileSize + this.position.x;
      t.y = t.row * this.tileSize + this.position.y;
    });
    // this.position.set(this.leftEdge, this.topEdge);
    // this.leftEdge = this.tiles[0].x;
    // this.rightEdge = this.tiles[this.tiles.length - 1].x + this.tileSize;
    // this.topEdge = this.tiles[0].y;
    // this.bottomEdge = this.tiles[this.tiles.length - 1].y + this.tileSize;



    // this.position.set(this.screenX, this.screenY);
    // console.log(this.position);
  }
  draw(ctx) {
    ctx.fillStyle = "black";
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
    this.screenX = this.position.x - this.game.camera.position.x;
    this.screenY = this.position.y - this.game.camera.position.y;
    this.tiles.forEach(t => {
      ctx.beginPath();
      ctx.rect(t.x + this.screenX, t.y + this.screenY, t.width, t.height);
      ctx.stroke();
    });

    ctx.drawImage(this.image, this.screenX, this.screenY, 1500, 1500);
  }
}