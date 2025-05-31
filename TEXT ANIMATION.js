let font;
let points;
const fontSize = 100;
const amplitude = 15;
const circleSize = 8;

function preload() {
  font = loadFont('SourceSansPro-Regular.otf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(font);
  textSize(fontSize);
  textAlign(LEFT, BASELINE); // Align left to measure text bounds correctly

  calculatePoints();
}

function draw() {
  background(30);

  const time = millis() / 1000;

  noStroke();
  for (let i = 0; i < points.length; i++) {
    const pt = points[i];
    // Offset from center for wave direction
    const angle = atan2(pt.y - height / 2, pt.x - width / 2);
    const offset = sin(time * 3 + i * 0.1) * amplitude;

    const waveX = pt.x + cos(angle) * offset;
    const waveY = pt.y + sin(angle) * offset;

    // Hue cycling through colors
    const hue = (time * 90 + i * 5) % 360;
    fill(color(`hsl(${hue}, 80%, 60%)`));

    ellipse(waveX, waveY, circleSize, circleSize);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  calculatePoints();
}

function calculatePoints() {
  // Get bounding box for the text at 0,0
  const bounds = font.textBounds('BATH SPA UNIVERSITY', 0, 0, fontSize);

  // Calculate X, Y so text is centered perfectly
  // textAlign LEFT, BASELINE means x,y is top-left corner + baseline offset
  const x = width / 2 - bounds.w / 2 - bounds.x; 
  const y = height / 2 - bounds.h / 2 - bounds.y;

  points = font.textToPoints('BATH SPA UNIVERSITY', x, y, fontSize, {
    sampleFactor: 0.15,
    simplifyThreshold: 0
  });
}
