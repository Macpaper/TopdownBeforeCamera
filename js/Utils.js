class Utils {
  static rectRectCollision(rx1, ry1, rw1, rh1, rx2, ry2, rw2, rh2) {
    let collidingX = false;
    let collidingY = false;
    
    if (rx1 + rw1 > rx2 && rx1 < rx2 + rw2) {
      collidingX = true;
    }

    if (ry1 + rh1 > ry2 && ry1 < ry2 + rh2) {
      collidingY = true;
    }

    return collidingX && collidingY;
  }

  static entityAngle(e1, e2) {
    let x1 = e1.position.x + e1.width / 2;
    let x2 = e2.position.x + e2.width / 2;
    let y1 = e1.position.y + e1.height / 2;
    let y2 = e2.position.y + e2.height / 2;
    return Utils.angleFrom(x1, y1, x2, y2);
  }

  static angleFrom(x1, y1, x2, y2) {
    let diffX = x1 - x2;
    let diffY = y1 - y2;
    let angle = Math.atan2(diffY, diffX) + Math.PI;
    return angle * 180 / Math.PI;
  }

  static rectCircleCollision(rx, ry, rw, rh, cx, cy, cr) {
    let colliding = false;

    let testX = cx;
    let testY = cy;

    if (cx < rx) {
      testX = rx;
    } else if (cx > rx + rw) {
      testX = rx + rw;
    }

    if (cy < ry) {
      testY = ry;
    } else if (cy > ry + rh) {
      testY = ry + rh;
    }

    let diffX = testX - cx;
    let diffY = testY - cy;

    let dist = Math.sqrt(diffX * diffX + diffY * diffY);
    
    if (dist < cr) {
      colliding = true;
    }

    return colliding;
  }

  static randomNumber(num1, num2) {
    return Math.random() * (num2 - num1) + num1;
  }
  
  static canvas_arrow(context, fromx, fromy, tox, toy) {
    var headlen = 10; // length of head in pixels
    var dx = tox - fromx;
    var dy = toy - fromy;
    var angle = Math.atan2(dy, dx);
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
    context.moveTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
  }
  static drawVector(ctx, startX, startY, endVec, scale = 1, color = "black") {
    ctx.strokeStyle = color;
    ctx.beginPath();
    Utils.canvas_arrow(ctx, startX, startY, startX + endVec.x * scale, startY + endVec.y * scale);
    ctx.stroke();
  }

  static entityDist(e1, e2) {
    let x1 = e1.position.x;
    let y1 = e1.position.y;
    let x2 = e2.position.x;
    let y2 = e2.position.y;
    return Utils.dist(x1, x2, y1, y2);
  }

  static dist(x1, x2, y1, y2) {
    let dx = x1 - x2;
    let dy = y1 - y2;
    return Math.sqrt(dx * dx + dy * dy);
  }

  static randomProperty(obj) {
    let keys = Object.keys(obj);
    return obj[keys[ keys.length * Math.random() << 0]];
  }
}