const bodies = require('./body/all');

function Printer(p, turtle, bodyName) {
  let position;
  let direction;
  let pinPassed = 0;
  let step = 0;
  let stepCount = null;
  const body = chooseBody(bodyName);

  this.animate = (speed) => {
    updatePosition(speed);
    printPath(pinPassed);
    printSegment(
      turtle.path[pinPassed],
      Object.assign({}, turtle.path[pinPassed + 1], { pos: position })
    );
    printBody(position, direction);
  };

  this.print = (drawBody) => {
    const index = turtle.path.length - 1;
    printPath(index);
    if (drawBody) printBody(turtle.path[index].pos, turtle.path[index].dir);
  };

  function printPath(upToPin) {
    let i = 0;
    while (i < upToPin && turtle.path[i]) {
      printSegment(turtle.path[i], turtle.path[i + 1]);
      i += 1;
    }
  }

  function printSegment(pin, nextPin) {
    if (nextPin && nextPin.penDown && nextPin.move.motion === 'TRANSLATE') {
      p.stroke(nextPin.color);
      p.line(pin.pos.x, pin.pos.y, nextPin.pos.x, nextPin.pos.y);
    }
  }

  function printBody(pos, dir) {
    if (!pos || !dir) return;
    p.push();
    p.translate(pos.x, pos.y);
    p.rotate(dir.heading());
    p.rotate(90);
    body.draw();
    p.pop();
  }

  function updatePosition(speed) {
    const pin1 = turtle.path[pinPassed];
    const pin2 = turtle.path[pinPassed + 1];

    if (!pin2) {
      pinPassed = 0;
      step = 0;
    } else if (step > stepCount) {
      pinPassed += 1;
      stepCount = null;
      step = 0;
      updatePosition(speed);
    } else {
      if (pin2.move.motion === 'TRANSLATE') {
        if (stepCount === null) {
          stepCount = Math.floor(Math.abs(pin2.move.size) / speed);
        }

        if (stepCount > 0) {
          position = pin1.pos.copy().lerp(pin2.pos, step / stepCount);
        } else {
          position = pin2.pos.copy();
        }

        direction = pin1.dir.copy();
      } else if (pin2.move.motion === 'ROTATE') {
        if (stepCount == null) {
          stepCount = Math.floor(Math.abs(pin2.move.size) / speed / 2);
        }
        if (stepCount > 0) {
          direction = pin1.dir.copy().rotate((pin2.move.size / stepCount) * step);
        }
      }
      step += 1;
    }
  }

  function chooseBody(name) {
    return new bodies[name || 'animal'](p);
  }
}

module.exports = Printer;
