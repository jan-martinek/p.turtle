const Printer = require('./printer');

function Turtle(p, posX, posY) {
  const pos = p.createVector(fallback(posX, 'x'), fallback(posY, 'y'));
  const dir = p.createVector(0, -1);

  this.penDown = true;
  this.color = 'black';
  this.path = [];

  this.pin = (motion, size, refPin) => {
    this.path.push(Object.assign(
      {
        pos: pos.copy(),
        dir: dir.copy(),
        penDown: this.penDown,
        color: this.color
      },
      refPin || {},
      { move: { motion, size } },
    ));
  };

  this.pin();

  this.forward = (px) => {
    pos.add(dir.copy().setMag(px));
    this.pin('TRANSLATE', px);
  };

  this.back = (px) => {
    pos.sub(dir.copy().setMag(px));
    this.pin('TRANSLATE', px);
  };

  this.right = (deg) => {
    dir.rotate(deg);
    this.pin('ROTATE', deg);
  };

  this.left = (deg) => {
    dir.rotate(-deg);
    this.pin('ROTATE', -deg);
  };

  this.getX = () => pos.x;

  this.getY = () => pos.y;

  this.getRun = name => new Printer(p, this, name);

  function fallback(amount, axis) {
    if (amount % 1 === 0) return amount;
    return Math.floor(p[axis === 'x' ? 'width' : 'height'] / 2);
  }
}

module.exports = Turtle;
