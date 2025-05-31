let x = -500; // starting x-position (off-screen to the left)

function setup() {
  createCanvas(500, 300);
}

function draw() {
  background(220);

  // Update bus position
  x += 2;
  if (x > width + 100) {
	x = -500; // reset to start when bus moves off the right edge
  }

  // Draw the bus body
  fill(240, 210, 100); // yellow color
  rect(x + 50, 100, 400, 100, 20); // main rectangle with rounded corners

  // Draw the bus windows
  fill(200); // light gray
  rect(x + 120, 120, 60, 40, 5); // front window
  rect(x + 320, 120, 60, 40, 5); // back window

  // Draw the wheels
  fill(0); // black
  ellipse(x + 150, 220, 60, 60); // front wheel
  ellipse(x + 350, 220, 60, 60); // back wheel

  // Draw the side lights
  fill(255, 255, 150); // pale yellow
  ellipse(x + 50, 150, 20, 20);  // front light
  ellipse(x + 450, 150, 20, 20); // back light
}
