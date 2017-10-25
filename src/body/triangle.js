function TriangleBody(p) {
  this.draw = function() {
    p.push();
    p.fill(0);
    p.noStroke();
    p.triangle(0, -6, -5, 4, 5, 4);
    p.pop();
  }
}

module.exports = TriangleBody;
