export default class Utils {
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
}