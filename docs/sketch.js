var s = function(p) {
  var turtle, run, run2;

  p.setup = function() {
    p.createCanvas(400, 400);
    p.angleMode(p.DEGREES);
    p.strokeWeight(1);

    turtle = new Turtle(p);
    turtle.penDown = false;
    turtle.right(90);
    turtle.back(100);
    turtle.penDown = true;

    for (var i = 0; i <= 50; i++) {
      turtle.color = 'rgba(0, 0, 0, .2)';
      turtle.forward(90);
      turtle.right(91);
      turtle.color = 'rgba(255, 0, 0, .3)';
      turtle.forward(90);
      turtle.right(91);
    }
    run = turtle.getRun();
    run2 = turtle.getRun();
  };

  p.draw = function() {
    p.background(200);

    // title text
    p.textSize(20);
    p.text('p5 turtle', 250, 100);

    p.push();

    p.translate(-50, -150);
    run.print(); // completely printed run

    p.translate(0, 200);
    run.animate(5); // slowly printed run

    p.translate(200, 0);
    run2.animate(20); // quickly printed run

    p.pop();
  };
};

var myp5 = new p5(s, 'sketch');
