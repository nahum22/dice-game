window.onload = function () {
  initizlizaScore();
  rollDice();
};

function startFireworks() {
  const container = document.querySelector("#game-message");
  const fireworks = new Fireworks.default(container);
  fireworks.start();
}

function initizlizaScore() {
  player1Score.textContent = "0";
  player2Score.textContent = "0";
  player1Current.textContent =
    parseInt(cube1Image.src.slice(-5, -4)) +
    parseInt(cube2Image.src.slice(-5, -4));
  player2Current.textContent = "0";
}

let endGameMessage = document.getElementById("game-message");

function hideMessage() {
  endGameMessage.style.display = "none";
}

function showMessage() {
  endGameMessage.style.display = "block";
}

function switchPlayeers() {
  if (playerTurn == 1) {
    playerTurn = 2;
  } else {
    playerTurn = 1;
  }
}

function endGame() {
  initizlizaScore();
  showMessage();
  startFireworks();
}

function checkEndGame() {
  score1 = parseInt(player1Score.textContent);
  score2 = parseInt(player2Score.textContent);

  if (score1 >= parseInt(targetScore) || score2 >= parseInt(targetScore)) {
    endGame();
    startNewGame();
  }
}

function playDiceSound() {
  var audioContext;
  try {
    audioContext = new webkitAudioContext();
  } catch (e) {
    audioContext = new AudioContext();
  }

  if (!audioContext) {
    console.error("AudioContext is not defined.");
    return;
  }

  fetch("dice-142528.mp3")
    .then((response) => response.arrayBuffer())
    .then((arrayBuffer) => audioContext.decodeAudioData(arrayBuffer))
    .then((audioBuffer) => {
      source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      source.start(0);
    })
    .catch((error) => console.error("Error loading audio:", error));
}

const rollBotton = document.querySelector(".roll_dice");
const moveAction = document.querySelector(".move_game");
const newGame = document.querySelector(".new_game");

const cube1Image = document.querySelector(".image_dice1");
const cube2Image = document.querySelector(".image_dice2");
const player1Score = document.querySelector(".player1score");
const player2Score = document.querySelector(".player2score");
const player1Current = document.querySelector(".current_Player1");
const player2Current = document.querySelector(".current_Player2");

let targetScore = 100;
let playerTurn = 1;

function rollDice() {
  playDiceSound();
  const cube1 = Math.round(Math.random() * 5 + 1);
  const cube2 = Math.round(Math.random() * 5 + 1);
  displayCubes(cube1, cube2);
  addScoreToCurrent();
}
function displayCubes(cube1, cube2) {
  cube1Image.src = "/images/dice" + "-" + cube1 + ".png";
  cube2Image.src = "/images/dice" + "-" + cube2 + ".png";
}

document.getElementById("set-score-btn").addEventListener("click", function () {
  targetScore = document.querySelector("#targetScore").value;
  document.querySelector(".instructions-window").style.display = "none";
  hideMessage();
});

rollBotton.addEventListener("click", rollDice);
moveAction.addEventListener("click", gameMove);
newGame.addEventListener("click", startNewGame);
function gameMove() {
  addScoreToPlayer();
  switchPlayeers();
  checkEndGame();
}

function addScoreToPlayer() {
  const player = getActivePlayerScore();
  const score1 = parseInt(cube1Image.src.slice(-5, -4));
  const score2 = parseInt(cube2Image.src.slice(-5, -4));
  if (!((score1 === 6) & (score2 === 6))) {
    player.textContent = parseInt(player.textContent) + (score1 + score2);
  }
}

function addScoreToCurrent() {
  const player = getActivePlayerScore();
  const playerCurrent = getCurrentPlayerScore();
  const score1 = parseInt(cube1Image.src.slice(-5, -4));
  const score2 = parseInt(cube2Image.src.slice(-5, -4));
  playerCurrent.textContent = score1 + score2 + parseInt(player.textContent);
}

function getCurrentPlayerScore() {
  if (playerTurn === 1) {
    return player1Current;
  }
  return player2Current;
}

function getActivePlayerScore() {
  if (playerTurn == 1) {
    return player1Score;
  }
  return player2Score;
}

function startNewGame() {
  initizlizaScore();
  document.querySelector(".instructions-window").style.display = "block";
  playerTurn = 1;
}
