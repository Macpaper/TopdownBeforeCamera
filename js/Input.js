export default class Input {
  constructor(game) {
    this.game = game;

    this.leftKey = false;
    this.rightKey = false;
    this.upKey = false;
    this.downKey = false;

    this.mouseDown = false;

    this.mouseX = 0;
    this.mouseY = 0;

    this.circle = {
      x: this.mouseX,
      y: this.mouseY,
      r: 150
    }

    this.rect = {
      x: this.mouseX,
      y: this.mouseY,
      w: 100,
      h: 100
    }
  }

  update() {
    this.circle.x = this.mouseX;
    this.circle.y = this.mouseY;
    this.rect.x = this.mouseX;
    this.rect.y = this.mouseY;
  }
  draw(ctx) {
    ctx.fillStyle = "white";
    // ctx.beginPath();
    // ctx.arc(this.circle.x, this.circle.y, this.circle.r, 0, Math.PI * 2, false);
    // ctx.fill();
    // ctx.fillRect(this.rect.x, this.rect.y, this.rect.w, this.rect.h);
  }

  initInput() {
    document.addEventListener("keydown", e => {
      this.handleKeys(e.key, true);
    });

    document.addEventListener("keyup", e => {
      this.handleKeys(e.key, false);
    });

    document.addEventListener("mousedown", e => {
      this.mouseDown = true;
    });

    document.addEventListener("mouseup", e => {
      this.mouseDown = false;
    });

    document.addEventListener("mousemove", e => {
      this.mouseX = e.offsetX;
      this.mouseY = e.offsetY;
    });

  }
  handleKeys(key, isPressed) {
    if (key.toLowerCase() == "w") {
      this.upKey = isPressed;
    }
    if (key.toLowerCase() == "a") {
      this.leftKey = isPressed;
    }
    if (key.toLowerCase() == "s") {
      this.downKey = isPressed;
    }
    if (key.toLowerCase() == "d") {
      this.rightKey = isPressed;
    }
  }

}