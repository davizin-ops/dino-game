const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const scoreEl = document.getElementById("score");
const restartBtn = document.getElementById("restart");

const jumpSound = document.getElementById("jumpSound");
const hitSound = document.getElementById("hitSound");

let score = 0;
let speed = 2;
let isAlive = true;

// pular
document.addEventListener("keydown", function(event) {
  if (event.code === "Space") jump();
});

function jump() {
  if (!dino.classList.contains("jump")) {
    dino.classList.add("jump");
    jumpSound.play();

    setTimeout(() => {
      dino.classList.remove("jump");
    }, 500);
  }
}

// movimento do cactus (manual para controlar velocidade)
let cactusPos = -30;

function moveCactus() {
  if (!isAlive) return;

  cactusPos += speed;
  cactus.style.right = cactusPos + "px";

  if (cactusPos > 600) {
    cactusPos = -30;
    score++;
    scoreEl.innerText = score;

    // aumenta dificuldade
    if (score % 5 === 0) {
      speed += 0.5;
    }
  }

  requestAnimationFrame(moveCactus);
}

// colisão
function checkCollision() {
  let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("bottom"));
  let cactusRight = cactusPos;

  if (cactusRight > 520 && cactusRight < 580 && dinoTop < 40) {
    gameOver();
  }
}

function gameOver() {
  isAlive = false;
  hitSound.play();
  restartBtn.style.display = "block";
}

// loop principal
function gameLoop() {
  if (!isAlive) return;

  checkCollision();
  requestAnimationFrame(gameLoop);
}

// restart
restartBtn.addEventListener("click", () => {
  location.reload();
});

// iniciar
moveCactus();
gameLoop();
