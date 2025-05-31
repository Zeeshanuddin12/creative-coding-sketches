let player;
let obstacles = [];
let gravity = 0.8;
let jumpForce = -15;
let points = 0;
let gameOver = false;
let spawnInterval = 1500; // milliseconds
let lastSpawnTime = 0;

function setup() {
  createCanvas(600, 400);
  player = new Player();
  textSize(24);
  textAlign(LEFT, TOP);
}

function draw() {
  background('#87CEEB'); // sky blue

  // Ground
  fill('#228B22'); // green ground
  rect(0, height - 20, width, 20);

  if (!gameOver) {
    points += deltaTime / 1000; // points based on survival time

    player.update();
    player.show();

    // Handle obstacles
    if (millis() - lastSpawnTime > spawnInterval) {
      obstacles.push(new Obstacle());
      lastSpawnTime = millis();
    }

    for (let i = obstacles.length - 1; i >= 0; i--) {
      obstacles[i].update();
      obstacles[i].show();

      if (obstacles[i].hits(player)) {
        gameOver = true;
      }

      if (obstacles[i].offscreen()) {
        obstacles.splice(i, 1);
      }
    }

    fill(0);
    text("Points: " + floor(points), 10, 10);
  } else {
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(32);
    text("Game Over!\nPress 'R' to Restart", width / 2, height / 2);
    textAlign(LEFT, TOP);
  }
}

function keyPressed() {
  if ((key === ' ' || key === 'ArrowUp') && !gameOver) {
    player.jump();
  }
  if (key === 'r' || key === 'R') {
    resetGame();
  }
}

function resetGame() {
  points = 0;
  obstacles = [];
  player = new Player();
  gameOver = false;
  lastSpawnTime = 0;
}

class Player {
  constructor() {
    this.x = 50;
    this.y = height - 70;
    this.size = 50;
    this.velocity = 0;
    this.onGround = false;
  }

  update() {
    this.velocity += gravity;
    this.y += this.velocity;

    // Check if on ground
    if (this.y >= height - this.size - 20) {
      this.y = height - this.size - 20;
      this.velocity = 0;
      this.onGround = true;
    } else {
      this.onGround = false;
    }
  }

  jump() {
    if (this.onGround) {
      this.velocity = jumpForce;
    }
  }

  show() {
    fill('#FF6347'); // tomato color
    rect(this.x, this.y, this.size, this.size);
  }
}

class Obstacle {
  constructor() {
    this.size = 40;
    this.x = width;
    this.y = height - this.size - 20;
    this.speed = 6;
  }

  update() {
    this.x -= this.speed;
  }

  show() {
    fill('#8B0000'); // dark red
    rect(this.x, this.y, this.size, this.size);
  }

  offscreen() {
    return this.x + this.size < 0;
  }

  hits(player) {
    return (
      player.x < this.x + this.size &&
      player.x + player.size > this.x &&
      player.y < this.y + this.size &&
      player.y + player.size > this.y
    );
  }
}
