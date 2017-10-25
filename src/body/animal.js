let step = 0;

function AnimalBody(p) {
  // legs
  // FL1 FR3
  // BL7 BR5
  const drawPhase = [
    (leg) => {
      p.push();
      if (leg < 4) p.rotate(-10);
      else p.rotate(10);
      p.ellipse(-9, 0, 9, 5);
      p.pop();
    },
    () => {
      p.ellipse(-9, 0, 9, 5);
    },
    (leg) => {
      p.push();
      if (leg < 4) p.rotate(10);
      else p.rotate(-10);
      p.ellipse(-9, 0, 9, 5);
      p.pop();
    },
    () => {
      p.ellipse(-9, 0, 9, 5);
    },
  ];

  this.draw = () => {
    step += 1;
    p.push();
    p.fill(120);
    p.stroke(200);
    p.ellipseMode(p.CENTER);
    for (let i = 0; i < 8; i += 1) {
      if (i % 2 === 1) {
        drawPhase[Math.floor(step / 10) % 4](i);
      } else if (i === 2) {
        p.ellipse(-9, 0, 5, 5);
      } else if (i === 6) {
        p.ellipse(-7, 0, 10, 3);
      }
      p.rotate(360 / 8);
    }
    p.fill(60);
    p.ellipse(0, 0, 15, 17);
    p.pop();
  };
}

module.exports = AnimalBody;
