import Vec2 from "./Vec2.js";
export default class Map {
  constructor(game) {
    this.game = game;
    this.tileSize = 200;
    this.tiles = [];
    this.tilesHorizontal = 10;
    this.tilesVertical = 10;
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

    
    // console.log(this.position);
  }
  draw(ctx) {
    ctx.fillStyle = "black";
    ctx.strokeStyle = "black";
    this.tiles.forEach(t => {
      ctx.beginPath();
      ctx.rect(t.x, t.y, t.width, t.height);
      ctx.stroke();
    });
  }
}