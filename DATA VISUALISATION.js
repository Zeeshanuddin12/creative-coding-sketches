let countries = ["India", "USA", "Germany", "Brazil", "South Africa", "Japan", "Australia", "France", "Mexico", "Canada"];
let womenIndex = [65, 78, 85, 70, 68, 74, 80, 77, 69, 83];  // Example scores out of 100
let barColors = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  generateColors();
  textFont('Arial');
}

function draw() {
  background('#f9f9f9');

  // Title
  fill(50);
  textSize(28);
  textAlign(CENTER, TOP);
  text("Women’s Index by Country", width / 2, 30);

  // Draw bars
  let marginTop = 80;
  let marginLeft = 150;
  let barHeight = 30;
  let maxBarWidth = width - marginLeft - 100;

  textSize(16);

  for (let i = 0; i < countries.length; i++) {
    let yPosition = marginTop + i * (barHeight + 20);

    // Draw country name
    fill(30);
    textAlign(RIGHT, CENTER);
    text(countries[i], marginLeft - 20, yPosition + barHeight / 2);

    // Bar width proportional to womenIndex
    let barWidth = map(womenIndex[i], 0, 100, 0, maxBarWidth);

    // Draw bar background
    fill('#ddd');
    rect(marginLeft, yPosition, maxBarWidth, barHeight, 10);

    // Draw colored bar
    fill(barColors[i]);
    rect(marginLeft, yPosition, barWidth, barHeight, 10);

    // Decide where to place percentage text
    textAlign(LEFT, CENTER);
    if (barWidth > 60) {
      // Draw inside the bar, right-aligned in white
      fill(255);
      textAlign(RIGHT, CENTER);
      text(womenIndex[i] + "%", marginLeft + barWidth - 10, yPosition + barHeight / 2);
    } else {
      // Draw outside the bar in black
      fill(0);
      textAlign(LEFT, CENTER);
      text(womenIndex[i] + "%", marginLeft + barWidth + 10, yPosition + barHeight / 2);
    }
  }
}

function generateColors() {
  for (let i = 0; i < countries.length; i++) {
    let r = map(womenIndex[i], 50, 100, 150, 255);
    let g = map(womenIndex[i], 50, 100, 100, 220);
    let b = map(womenIndex[i], 50, 100, 180, 240);
    barColors.push(color(r, g, b));
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
