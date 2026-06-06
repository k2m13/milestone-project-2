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

const winningScore = 8;
let matchOver = false;

let playerScore = 0;
let computerScore = 0;

let totalRounds = 0;
let currentStreak = 0;

let roundHistory = [];

const moveFrequency = {
  rock: 0,
  paper: 0,
  scissors: 0,
  lizard: 0,
  spock: 0
};

let matchesWon = 0;
let matchesLost = 0;
let highestStreak = 0;

const moveList = ["rock", "paper", "scissors", "lizard", "spock"];

const winningMoves = {
  rock: ["scissors", "lizard"],
  paper: ["rock", "spock"],
  scissors: ["paper", "lizard"],
  lizard: ["paper", "spock"],
  spock: ["rock", "scissors"],
};

// Winning Rules Object

const winningRules = {
  rock: {
    scissors: "Rock crushes Scissors",
    lizard: "Rock crushes Lizard",
  },

  paper: {
    rock: "Paper covers Rock",
    spock: "Paper disproves Spock",
  },

  scissors: {
    paper: "Scissors cut Paper",
    lizard: "Scissors decapitate Lizard",
  },

  lizard: {
    paper: "Lizard eats Paper",
    spock: "Lizard poisons Spock",
  },

  spock: {
    rock: "Spock vaporises Rock",
    scissors: "Spock smashes Scissors",
  },
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

const highestStreakDisplay = document.getElementById("highest-streak");

const rankHighestStreakDisplay = document.getElementById("rank-highest-streak");

const matchesWonDisplay = document.getElementById("matches-won");
const matchesLostDisplay = document.getElementById("matches-lost");

const favouriteMoveDisplay = document.getElementById("favourite-move");

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
  if (matchOver) {
    return;
  }

  playerMove = selectedMove;
  computerMove = getComputerMove();

  const result = determineWinner(playerMove, computerMove);

  updateScores(result);
  updateStats(result);
  displayResult(result);
  updateFavouriteMove();
  addRoundToHistory(result);

  playerChoiceDisplay.textContent = playerMove;
  computerChoiceDisplay.textContent = computerMove;

  checkMatchWinner();
  disableMoveButtons();

  roundPlayed = true;

  if (!matchOver) {
    nextRoundButton.disabled = false;
  }

  console.log(playerMove);
  console.log(computerMove);
  console.log(result);
}

function resetBattlePanel() {
  if (matchOver) {
    return;
  }

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

function startNewGame() {
  playerScore = 0;
  computerScore = 0;

  totalRounds = 0;
  currentStreak = 0;

  roundNumber = 1;

  matchOver = false;
  roundPlayed = false;

  playerMove = "";
  computerMove = "";

  roundHistory = [];

  playerScoreDisplay.textContent = 0;
  computerScoreDisplay.textContent = 0;

  totalRoundsDisplay.textContent = 0;
  winRateDisplay.textContent = "0%";
  currentStreakDisplay.textContent = 0;

  roundNumberDisplay.textContent = 1;

  playerChoiceDisplay.textContent = "?";
  computerChoiceDisplay.textContent = "?";

  resultMessage.textContent = "Choose your move!";
  resultRule.textContent = "";

  historyList.innerHTML = "";

  nextRoundButton.textContent = "Next Round";
  nextRoundButton.disabled = true;

  enableMoveButtons();
}

nextRoundButton.addEventListener("click", function () {
  if (matchOver) {
    startNewGame();
    return;
  }

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
    resultRule.textContent = `Both selected ${playerMove}`;

    return;
  }

  if (result === "player") {
    resultMessage.textContent = "You Win!";

    resultRule.textContent = winningRules[playerMove][computerMove];

    return;
  }

  resultMessage.textContent = "Computer Wins!";

  resultRule.textContent = winningRules[computerMove][playerMove];
}

matchesWonDisplay.textContent = matchesWon;
matchesLostDisplay.textContent = matchesLost;

function checkMatchWinner() {
  if (playerScore >= winningScore) {
  resultMessage.textContent = "You Win The Match!";
  resultRule.textContent = "Final result: you reached 8 wins first.";
  matchesWon++;
  matchOver = true;
} else if (computerScore >= winningScore) {
  resultMessage.textContent = "Computer Wins The Match!";
  resultRule.textContent = "Final result: the computer reached 8 wins first.";
  matchesLost++;
  matchOver = true;
} else if (roundNumber >= 15) {
  if (playerScore > computerScore) {
    resultMessage.textContent = "You Win The Match!";
    resultRule.textContent = `Final score: ${playerScore} - ${computerScore}.`;
    matchesWon++;
  } else if (computerScore > playerScore) {
    resultMessage.textContent = "Computer Wins The Match!";
    resultRule.textContent = `Final score: ${playerScore} - ${computerScore}.`;
    matchesLost++;
  } else {
    resultMessage.textContent = "Match Draw!";
    resultRule.textContent = `Final score: ${playerScore} - ${computerScore}.`;
  }

  matchOver = true;
}

  if (matchOver) {
    disableMoveButtons();
    nextRoundButton.disabled = true;

    nextRoundButton.disabled = false;
    nextRoundButton.textContent = "New Game";
  }
}

function updateStats(result) {
  totalRounds++;

  if (result === "player") {
    currentStreak++;
  } else {
    currentStreak = 0;
  }

  if (currentStreak > highestStreak) {
    highestStreak = currentStreak;
  }

  const winRate = Math.round((playerScore / totalRounds) * 100);

  totalRoundsDisplay.textContent = totalRounds;
  winRateDisplay.textContent = `${winRate}%`;
  currentStreakDisplay.textContent = currentStreak;
  highestStreakDisplay.textContent = highestStreak;
  rankHighestStreakDisplay.textContent = highestStreak;
}

function updateFavouriteMove() {
  moveFrequency[playerMove]++;

  let favouriteMove = "";
  let highestCount = 0;

  moveList.forEach(function (move) {
    if (moveFrequency[move] > highestCount) {
      highestCount = moveFrequency[move];
      favouriteMove = move;
    }
  });

  favouriteMoveDisplay.textContent = favouriteMove;
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
    result: result,
  };

  roundHistory.push(roundData);

  const historyItem = document.createElement("p");

  historyItem.textContent = `Round ${roundData.round}: ${roundData.player} vs ${roundData.computer} - ${roundData.result}`;

  historyList.prepend(historyItem);
}
