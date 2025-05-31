function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
  noStroke();
  generatePattern();
}

function draw() {
  // Empty — we only draw on demand
}

function generatePattern() {
  background("#F0F0F0");

  const cols = 12;
  const rows = 12;
  const cellW = width / cols;
  const cellH = height / rows;

  for (let col = 0; col < cols; col++) {
    for (let row = 0; row < rows; row++) {
      const centerX = col * cellW + cellW / 2;
      const centerY = row * cellH + cellH / 2;

      push();
      translate(centerX, centerY);

      if ((col + row) % 2 === 0) {
        fill(random(100, 255), random(100, 200), random(100, 255), 180);
        const radius = min(cellW, cellH) * 0.4 * random(0.5, 1);
        ellipse(0, 0, radius, radius);
      } else {
        fill(random(100, 255), random(100, 255), random(100, 200), 180);
        rotate(radians(random(360)));
        const size = min(cellW, cellH) * 0.5 * random(0.5, 1);
        rectMode(CENTER);
        rect(0, 0, size, size);
      }

      pop();
    }
  }
}

function mousePressed() {
  generatePattern();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  generatePattern();
}

