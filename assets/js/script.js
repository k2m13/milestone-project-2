// ====================
// Navigation System  |
// ====================

const navLinks = document.querySelectorAll(".nav-link");
const screens = document.querySelectorAll(".screen");

console.log(navLinks);
console.log(screens);

// Log nav links and screen id's to the console
navLinks.forEach(function (link) {
  link.addEventListener("click", function (event) {
    event.preventDefault();

    console.log(link.textContent);

    const screenId = link.getAttribute("href");
    console.log(screenId);
    screens.forEach(function (screen) {
      screen.classList.remove("active-screen");
    });
    const targetScreen = document.querySelector(screenId);
    targetScreen.classList.add("active-screen");

    navLinks.forEach(function (navLink) {
      navLink.classList.remove("nav-link--active");
    });
    link.classList.add("nav-link--active");
  });
});

// =====================
// Game State Variables|
// =====================

let playerMove = "";
let computerMove = "";

let roundNumber = 1;
let roundPlayed = false;

let playerScore = 0;
let computerScore = 0;

let totalRounds = 0;
let currentStreak = 0;

let roundHistory = [];

const moveList = ["rock", "paper", "scissors", "lizard", "spock"];

const winningMoves = {
  rock: ["scissors", "lizard"],
  paper: ["rock", "spock"],
  scissors: ["paper", "lizard"],
  lizard: ["paper", "spock"],
  spock: ["rock", "scissors"]
};

// Winning Rules Object

const winningRules = {

  rock: {
    scissors: "Rock crushes Scissors",
    lizard: "Rock crushes Lizard"
  },

  paper: {
    rock: "Paper covers Rock",
    spock: "Paper disproves Spock"
  },

  scissors: {
    paper: "Scissors cut Paper",
    lizard: "Scissors decapitate Lizard"
  },

  lizard: {
    paper: "Lizard eats Paper",
    spock: "Lizard poisons Spock"
  },

  spock: {
    rock: "Spock vaporises Rock",
    scissors: "Spock smashes Scissors"
  }

};

// ====================
// DOM References      |
// ====================

const moveButtons = document.querySelectorAll(".move-card");

const playerChoiceDisplay = document.getElementById("player-choice");
const computerChoiceDisplay = document.getElementById("computer-choice");

const resultMessage = document.getElementById("result-message");
const resultRule = document.getElementById("result-rule");

const playerScoreDisplay = document.getElementById("player-score");
const computerScoreDisplay = document.getElementById("computer-score");

const totalRoundsDisplay = document.getElementById("total-rounds");
const winRateDisplay = document.getElementById("win-rate");
const currentStreakDisplay = document.getElementById("current-streak");

const roundNumberDisplay = document.getElementById("round-number");

const nextRoundButton = document.getElementById("next-round-button");

nextRoundButton.disabled = true;

const historyList = document.getElementById("history-list");

// ====================
// Computer Move       |
// ====================

function getComputerMove() {
  const randomIndex = Math.floor(Math.random() * moveList.length);
  return moveList[randomIndex];
}

console.log(getComputerMove());

// ====================
// Determine Winner    |
// ====================

function determineWinner(playerMove, computerMove) {
  if (playerMove === computerMove) {
    return "draw";
  }

  if (winningMoves[playerMove].includes(computerMove)) {
    return "player";
  }

  return "computer";
}

// ====================
// Play Round          |
// ====================

function playRound(selectedMove) {
  playerMove = selectedMove;
  computerMove = getComputerMove();

  const result = determineWinner(playerMove, computerMove);

  updateScores(result);
  updateStats(result);
  displayResult(result);
  addRoundToHistory(result);
  disableMoveButtons();

  roundPlayed = true;
  nextRoundButton.disabled = false;

  playerChoiceDisplay.textContent = playerMove;
  computerChoiceDisplay.textContent = computerMove;

  console.log(playerMove);
  console.log(computerMove);
  console.log(result);
}

function resetBattlePanel() {
  roundNumber++;

  roundNumberDisplay.textContent = roundNumber;

  playerChoiceDisplay.textContent = "?";
  computerChoiceDisplay.textContent = "?";

  resultMessage.textContent = "Choose your move!";
  resultRule.textContent = "";

  playerMove = "";
  computerMove = "";

  enableMoveButtons();
}

nextRoundButton.addEventListener("click", function () {
  if (!roundPlayed) {
    return;
  }

  resetBattlePanel();

  roundPlayed = false;
  nextRoundButton.disabled = true;
});

// ====================
// Move Button Events  |
// ====================

moveButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const selectedMove = button.dataset.choice;
    playRound(selectedMove);
  });
});

// ====================
// Update Scores       |
// ====================

function updateScores(result) {

  if (result === "player") {
    playerScore++;
  }

  if (result === "computer") {
    computerScore++;
  }

  playerScoreDisplay.textContent = playerScore;
  computerScoreDisplay.textContent = computerScore;
}

function displayResult(result) {

  if (result === "draw") {

    resultMessage.textContent = "Draw!";
    resultRule.textContent =
      `Both selected ${playerMove}`;

    return;
  }

  if (result === "player") {

    resultMessage.textContent = "You Win!";

    resultRule.textContent =
      winningRules[playerMove][computerMove];

    return;
  }

  resultMessage.textContent = "Computer Wins!";

  resultRule.textContent =
    winningRules[computerMove][playerMove];

}

function updateStats(result) {
  totalRounds++;

  if (result === "player") {
    currentStreak++;
  } else {
    currentStreak = 0;
  }

  const winRate = Math.round((playerScore / totalRounds) * 100);

  totalRoundsDisplay.textContent = totalRounds;
  winRateDisplay.textContent = `${winRate}%`;
  currentStreakDisplay.textContent = currentStreak;
}

// ====================
// Round Controls      |
// ====================

function disableMoveButtons() {
  moveButtons.forEach(function (button) {
    button.disabled = true;
  });
}

function enableMoveButtons() {
  moveButtons.forEach(function (button) {
    button.disabled = false;
  });
}

// ====================
// Round History       |
// ====================

function addRoundToHistory(result) {
  const roundData = {
    round: roundNumber,
    player: playerMove,
    computer: computerMove,
    result: result
  };

  roundHistory.push(roundData);

  const historyItem = document.createElement("p");

  historyItem.textContent =
    `Round ${roundData.round}: ${roundData.player} vs ${roundData.computer} - ${roundData.result}`;

  historyList.prepend(historyItem);
}