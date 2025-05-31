let song;
let fft;
let playButton;

function preload() {
  song = loadSound('Rauf Faik - вечера (Official video).mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  fft = new p5.FFT();
  fft.setInput(song);

  playButton = createButton('Play / Pause');
  playButton.position(20, 20);
  playButton.mousePressed(togglePlay);

  noFill();
  strokeWeight(2);
}

function draw() {
  background(30);
  translate(width / 2, height / 2);

  if (song.isPlaying()) {
	let spectrum = fft.analyze();

	stroke(0, 255, 150);
	beginShape();
	for (let i = 0; i < 360; i += 3) {
  	let index = floor(map(i, 0, 360, 0, spectrum.length - 1));
  	let r = map(spectrum[index], 0, 255, 100, 300);
  	let x = r * cos(i);
  	let y = r * sin(i);
  	vertex(x, y);
	}
	endShape(CLOSE);

	// Pulsating center circle with bass
	let bass = fft.getEnergy("bass");
	fill(0, 255, 150, 150);
	noStroke();
	ellipse(0, 0, bass * 2, bass * 2);
  }

  // Instructions
  noStroke();
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(16);
  text('Click Play to start music visualization', 0, height / 2 - 40);
}

function togglePlay() {
  if (song.isPlaying()) {
	song.pause();
  } else {
	song.loop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
