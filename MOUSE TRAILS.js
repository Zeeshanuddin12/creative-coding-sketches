let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  rectMode(CENTER);
  colorMode(HSB, 360, 100, 100, 255); // Use HSB for fiery color control
}

function draw() {
  drawVerticalGradient(0, 0, width, height, color(290, 60, 30), color(30, 100, 90));

  // Only add new particles if mouse is pressed
  if (mouseIsPressed) {
    particles.push(new Particle(mouseX, mouseY));
  }

  // Update and display particles (loop backwards to remove faded ones)
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();

    if (particles[i].isFinished()) {
      particles.splice(i, 1);
    }
  }
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = random(-1.5, 1.5);
    this.vy = random(-1.5, 1.5);
    this.alpha = 255;
    this.size = random(15, 40);
    this.hue = random(20, 40); // orange range
    this.saturation = random(80, 100);
    this.brightness = random(70, 90);
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 4; // fade out over time
  }

  isFinished() {
    return this.alpha <= 0;
  }

  display() {
    fill(this.hue, this.saturation, this.brightness, this.alpha);
    rect(this.x, this.y, this.size, this.size);
  }
}

function drawVerticalGradient(x, y, w, h, c1, c2) {
  for (let i = y; i <= y + h; i++) {
    let inter = map(i, y, y + h, 0, 1);
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    line(x, i, x + w, i);
  }
}
