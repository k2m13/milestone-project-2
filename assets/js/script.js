/* jshint esversion: 8, browser: true */

// ==============================
// MindGame JavaScript
//
// Table of Contents
//
// 1. Navigation System
// 2. Game State Variables
// 3. Local Storage
// 4. DOM References
// 5. Sound Effects
// 6. Background Music
// 7. Computer Move Logic
// 8. Round Winner Logic
// 9. Play Round Flow
// 10. Move Button Events
// 11. Keyboard Controls
// 12. Score and Match Updates
// 13. Round Controls
// 14. Round History
// 15. Theme Settings
// ==============================

// ====================
// 1. Navigation System
// ====================

const navLinks = document.querySelectorAll(".nav-link");
const screens = document.querySelectorAll(".screen");

const menuToggle = document.querySelector(".menu-toggle");
const mainNavigation = document.getElementById("main-navigation");

/**
 * Closes the mobile navigation menu and resets its ARIA attributes.
 *
 * @returns {void}
 */
function closeMobileMenu() {
  if (!menuToggle || !mainNavigation) {
    return;
  }

  mainNavigation.classList.remove("nav-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
}

if (menuToggle && mainNavigation) {
  menuToggle.addEventListener("click", function () {
    const isOpen = mainNavigation.classList.toggle("nav-open");

    menuToggle.setAttribute("aria-expanded", isOpen.toString());
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu",
    );
  });
}

/**
 * Displays the selected application screen and updates the active navigation link.
 *
 * @param {string} screenId - The hash ID of the screen to display.
 * @param {boolean} [playFeedback=true] - Whether to play navigation feedback sound.
 * @returns {void}
 */
function showScreen(screenId, playFeedback = true) {
  const targetScreen = document.querySelector(screenId);

  if (!targetScreen) {
    return;
  }

  screens.forEach(function (screen) {
    screen.classList.remove("active-screen");
  });

  targetScreen.classList.add("active-screen");

  navLinks.forEach(function (navLink) {
    navLink.classList.remove("nav-link--active");

    if (navLink.getAttribute("href") === screenId) {
      navLink.classList.add("nav-link--active");
    }
  });

  if (
    playFeedback &&
    typeof playSound === "function" &&
    typeof sounds !== "undefined"
  ) {
    playSound(sounds.moveSelected);
  }
}

navLinks.forEach(function (link) {
  link.addEventListener("click", function (event) {
    event.preventDefault();

    const screenId = link.getAttribute("href");

    showScreen(screenId);
    closeMobileMenu();
    history.pushState(null, "", screenId);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  });
});

const startingScreen = window.location.hash || "#play-screen";
showScreen(startingScreen, false);

const brandHomeLink = document.querySelector(".brand-home-link");

if (brandHomeLink) {
  brandHomeLink.addEventListener("click", function (event) {
    event.preventDefault();

    showScreen("#play-screen");
    closeMobileMenu();
    history.pushState(null, "", "#play-screen");

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  });
}

// =======================
// 2. Game State Variables
// =======================

let playerMove = "";
let computerMove = "";

let roundNumber = 1;
let roundPlayed = false;

const winningScore = 8;
const maxRounds = 15;
let matchOver = false;

let playerScore = 0;
let computerScore = 0;

let totalRounds = 0;
let currentStreak = 0;

let roundHistory = [];

let gameMode = "casual";

const moveFrequency = {
  rock: 0,
  paper: 0,
  scissors: 0,
  lizard: 0,
  spock: 0,
};

let matchesWon = 0;
let matchesLost = 0;
let highestStreak = 0;
let highScores = [];

const moveList = ["rock", "paper", "scissors", "lizard", "spock"];

function isValidMove(move) {
  return moveList.includes(move);
}

const winningMoves = {
  rock: ["scissors", "lizard"],
  paper: ["rock", "spock"],
  scissors: ["paper", "lizard"],
  lizard: ["paper", "spock"],
  spock: ["rock", "scissors"],
};

// Winning rule messages displayed after each round

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
// 3. Local Storage
// ====================

/**
 * Saves rank-related player statistics to local storage.
 *
 * @returns {void}
 */
function saveRankStats() {
  localStorage.setItem("matchesWon", matchesWon);
  localStorage.setItem("matchesLost", matchesLost);
  localStorage.setItem("highestStreak", highestStreak);
}

/**
 * Loads rank-related statistics from local storage and updates the Rank screen.
 *
 * @returns {void}
 */
function loadRankStats() {
  matchesWon = Number(localStorage.getItem("matchesWon")) || 0;

  matchesLost = Number(localStorage.getItem("matchesLost")) || 0;

  highestStreak = Number(localStorage.getItem("highestStreak")) || 0;

  matchesWonDisplay.textContent = matchesWon;
  matchesLostDisplay.textContent = matchesLost;

  highestStreakDisplay.textContent = highestStreak;
  rankHighestStreakDisplay.textContent = highestStreak;

  updateAchievement();
}

/**
 * Updates the achievement title, rank badge and rank description based on matches won.
 *
 * @returns {void}
 */
function updateAchievement() {
  let achievement = "Beginner";
  let rankIcon = "rank-beginner.svg";
  let rankDescription = "Starting rank. Win matches to begin your progress.";

  if (matchesWon >= 50) {
    achievement = "Mind Master";
    rankIcon = "rank-mind-master.svg";
    rankDescription = "Elite rank unlocked after 50 match wins.";
  } else if (matchesWon >= 25) {
    achievement = "Grand Strategist";
    rankIcon = "rank-grand-strategist.svg";
    rankDescription = "Advanced rank unlocked after 25 match wins.";
  } else if (matchesWon >= 10) {
    achievement = "Veteran";
    rankIcon = "rank-veteran.svg";
    rankDescription = "Experienced rank unlocked after 10 match wins.";
  } else if (matchesWon >= 5) {
    achievement = "Competitor";
    rankIcon = "rank-competitor.svg";
    rankDescription = "First achievement rank unlocked after 5 match wins.";
  }

  achievementTitleDisplay.textContent = achievement;

  const rankBadgeIcon = document.getElementById("rank-badge-icon");
  const rankDescriptionDisplay = document.getElementById("rank-description");

  if (rankBadgeIcon) {
    rankBadgeIcon.src = `assets/images/icons/ranks/${rankIcon}`;
  }

  if (rankDescriptionDisplay) {
    rankDescriptionDisplay.textContent = rankDescription;
  }
}

/**
 * Saves the high score list to local storage.
 *
 * @returns {void}
 */
function saveHighScores() {
  localStorage.setItem("highScores", JSON.stringify(highScores));
}

/**
 * Loads high scores from local storage and displays them on the Rank screen.
 *
 * @returns {void}
 */
function loadHighScores() {
  try {
    const savedScores = JSON.parse(localStorage.getItem("highScores"));

    highScores = Array.isArray(savedScores) ? savedScores : [];
  } catch (error) {
    highScores = [];
  }

  displayHighScores();
}

/**
 * Adds a new high score entry, sorts the leaderboard and saves the result.
 *
 * @param {number} finalScore - The player's final score.
 * @param {number} finalRounds - The number of rounds played.
 * @returns {void}
 */
function addHighScore(finalScore, finalRounds) {
  const playerNameInput = prompt("New high score! Enter your name:");
  const playerName =
    playerNameInput && playerNameInput.trim()
      ? playerNameInput.trim().slice(0, 20)
      : "Anonymous";

  if (!playerName) {
    return;
  }

  const scoreData = {
    name: playerName,
    wins: finalScore,
    rounds: finalRounds,
    winRate: `${Math.round((finalScore / finalRounds) * 100)}%`,
  };

  highScores.push(scoreData);

  highScores.sort(function (a, b) {
    return b.wins - a.wins || a.rounds - b.rounds;
  });

  highScores = highScores.slice(0, 10);
  saveHighScores();
  displayHighScores();
}

/**
 * Displays saved high scores in the high score list.
 *
 * @returns {void}
 */
function displayHighScores() {
  highScoreList.innerHTML = "";

  if (highScores.length === 0) {
    highScoreList.innerHTML = "<li>No high scores yet.</li>";
    return;
  }

  highScores.forEach(function (score) {
    const listItem = document.createElement("li");

    listItem.textContent = `${score.name} — ${score.wins} wins in ${score.rounds} rounds (${score.winRate})`;

    highScoreList.appendChild(listItem);
  });
}

// ===================
// 4. DOM References
// ===================

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

const highScoreList = document.getElementById("high-score-list");

const achievementTitleDisplay = document.getElementById("achievement-title");

const gameModeInputs = document.querySelectorAll('input[name="game-mode"]');

const playerChoiceIcon = document.getElementById("player-choice-icon");

const computerChoiceIcon = document.getElementById("computer-choice-icon");

const playerChoiceToken = playerChoiceDisplay.parentElement;

const computerChoiceToken = computerChoiceDisplay.parentElement;

const resultBox = document.querySelector(".result-box");

const themeInputs = document.querySelectorAll('input[name="theme-mode"]');

const soundToggle = document.getElementById("sound-toggle");
const musicToggle = document.getElementById("music-toggle");

// ==================
// 5. Sound Effects
// ==================

let soundEnabled = true;

const sounds = {
  moveSelected: new Audio("assets/audio/move-selected.mp3"),
  cpuReveal: new Audio("assets/audio/cpu-reveal.mp3"),
  roundWin: new Audio("assets/audio/round-win.mp3"),
  roundLoss: new Audio("assets/audio/round-loss.mp3"),
  roundDraw: new Audio("assets/audio/round-draw.mp3"),
  matchWin: new Audio("assets/audio/match-win.mp3"),
  matchLoss: new Audio("assets/audio/match-loss.mp3"),
  matchDraw: new Audio("assets/audio/match-draw.mp3"),
  newGame: new Audio("assets/audio/new-game.mp3"),
};

const feedbackSounds = [
  sounds.moveSelected,
  sounds.cpuReveal,
  sounds.roundWin,
  sounds.roundLoss,
  sounds.roundDraw,
  sounds.matchWin,
  sounds.matchLoss,
  sounds.matchDraw,
  sounds.newGame,
];

/**
 * Stops all short feedback sounds so that game effects do not overlap.
 *
 * @returns {void}
 */
function stopFeedbackSounds() {
  feedbackSounds.forEach(function (sound) {
    sound.pause();
    sound.currentTime = 0;
  });
}

/**
 * Sets the volume levels for all short game sound effects.
 *
 * @returns {void}
 */
function setSoundVolumes() {
  sounds.moveSelected.volume = 0.2;
  sounds.cpuReveal.volume = 0.2;

  sounds.roundWin.volume = 0.25;
  sounds.roundLoss.volume = 0.25;
  sounds.roundDraw.volume = 0.25;

  sounds.matchWin.volume = 0.35;
  sounds.matchLoss.volume = 0.35;
  sounds.matchDraw.volume = 0.35;

  sounds.newGame.volume = 0.2;
}

/**
 * Plays a short sound effect if sound is enabled.
 *
 * @param {HTMLAudioElement} sound - The sound effect to play.
 * @param {boolean} [stopOtherSounds=true] - Whether to stop other feedback sounds first.
 * @returns {void}
 */
function playSound(sound, stopOtherSounds = true) {
  if (!soundEnabled || !sound) {
    return;
  }

  if (stopOtherSounds) {
    stopFeedbackSounds();
  }

  sound.currentTime = 0;

  sound.play().catch(function () {
    // Browser may block sound until the user interacts with the page.
  });
}

/**
 * Toggles sound effects on or off and saves the setting.
 *
 * @returns {void}
 */
function toggleSoundEffects() {
  const newSetting = soundEnabled ? "off" : "on";

  if (newSetting === "off") {
    playSound(sounds.moveSelected);
    applySoundSetting(newSetting);
    return;
  }

  applySoundSetting(newSetting);
  playSound(sounds.moveSelected);
}

/**
 * Toggles background music on or off and saves the setting.
 *
 * @returns {void}
 */
function toggleBackgroundMusic() {
  const newSetting = musicEnabled ? "off" : "on";

  playSound(sounds.moveSelected);
  applyMusicSetting(newSetting);
}

/**
 * Applies the selected sound effects setting and updates the sound switch.
 *
 * @param {string} setting - The saved sound setting, either "on" or "off".
 * @returns {void}
 */
function applySoundSetting(setting) {
  soundEnabled = setting === "on";
  localStorage.setItem("soundSetting", setting);

  if (soundToggle) {
    soundToggle.checked = soundEnabled;
    soundToggle.setAttribute("aria-checked", soundEnabled);
  }
}

if (soundToggle) {
  soundToggle.addEventListener("change", function () {
    toggleSoundEffects();
  });
}

setSoundVolumes();

// ====================
// 6. Background Music
// ====================

let musicEnabled = false;

const backgroundMusic = new Audio("assets/audio/background-music.mp3");

// Starfall fades down near the end, so restart before the quiet gap.
const musicLoopPoint = 136;

backgroundMusic.volume = 0.08;
backgroundMusic.loop = false;
backgroundMusic.preload = "auto";

/**
 * Plays the background music when music is enabled.
 *
 * @returns {void}
 */
function playBackgroundMusic() {
  if (!musicEnabled) {
    return;
  }

  backgroundMusic.play().catch(function () {
    // Browser may block music until the user interacts with the page.
  });
}

/**
 * Pauses the background music.
 *
 * @returns {void}
 */
function pauseBackgroundMusic() {
  backgroundMusic.pause();
}

/**
 * Applies the selected music setting, updates the music switch and starts or stops music.
 *
 * @param {string} setting - The saved music setting, either "on" or "off".
 * @returns {void}
 */
function applyMusicSetting(setting) {
  musicEnabled = setting === "on";
  localStorage.setItem("musicSetting", setting);

  if (musicToggle) {
    musicToggle.checked = musicEnabled;
    musicToggle.setAttribute("aria-checked", musicEnabled);
  }

  if (musicEnabled) {
    playBackgroundMusic();
  } else {
    pauseBackgroundMusic();
  }
}

backgroundMusic.addEventListener("timeupdate", function () {
  if (backgroundMusic.currentTime >= musicLoopPoint) {
    backgroundMusic.currentTime = 0;
    playBackgroundMusic();
  }
});

if (musicToggle) {
  musicToggle.addEventListener("change", function () {
    toggleBackgroundMusic();
  });
}

/**
 * Attempts to start background music after a user interaction.
 *
 * @returns {void}
 */
function startMusicAfterUserInteraction() {
  if (musicEnabled && backgroundMusic.paused) {
    playBackgroundMusic();
  }
}

document.addEventListener("click", startMusicAfterUserInteraction);
document.addEventListener("keydown", startMusicAfterUserInteraction);

// ======================
// 7. Computer Move Logic
// ======================

/**
 * Selects a random move for the computer.
 *
 * @returns {string} A randomly selected move.
 */
function getComputerMove() {
  const randomIndex = Math.floor(Math.random() * moveList.length);
  return moveList[randomIndex];
}

// Hard Mode
/**
 * Selects a strategic computer move based on the player's most frequent move.
 *
 * @returns {string} A move that can beat the player's favourite move, or a random move if no pattern exists.
 */
function getHardComputerMove() {
  let favouriteMove = "";
  let highestCount = 0;

  moveList.forEach(function (move) {
    if (moveFrequency[move] > highestCount) {
      highestCount = moveFrequency[move];
      favouriteMove = move;
    }
  });

  if (highestCount === 0) {
    return getComputerMove();
  }

  const counterMoves = [];

  moveList.forEach(function (move) {
    if (winningMoves[move].includes(favouriteMove)) {
      counterMoves.push(move);
    }
  });

  const randomIndex = Math.floor(Math.random() * counterMoves.length);
  return counterMoves[randomIndex];
}

/**
 * Chooses the computer move according to the selected game mode.
 *
 * @returns {string} The computer's selected move.
 */
function chooseComputerMove() {
  if (gameMode === "hard") {
    return getHardComputerMove();
  }

  return getComputerMove();
}

// ======================
// 8. Round Winner Logic
// ======================

/**
 * Determines the winner of a single round.
 *
 * @param {string} playerMove - The move selected by the player.
 * @param {string} computerMove - The move selected by the computer.
 * @returns {"player" | "computer" | "draw"} The round result.
 */
function determineWinner(playerMove, computerMove) {
  if (!isValidMove(playerMove) || !isValidMove(computerMove)) {
    return "invalid";
  }

  if (playerMove === computerMove) {
    return "draw";
  }

  if (winningMoves[playerMove].includes(computerMove)) {
    return "player";
  }

  return "computer";
}

/**
 * Formats a move name with an initial capital letter for display text.
 *
 * @param {string} move - The move name to format.
 * @returns {string} The formatted move name.
 */
function formatMoveName(move) {
  return move.charAt(0).toUpperCase() + move.slice(1);
}

// ===================
// 9. Play Round Flow
// ===================

/**
 * Creates a delay used for short gameplay pauses.
 *
 * @param {number} milliseconds - The delay duration in milliseconds.
 * @returns {Promise<void>} A promise that resolves after the delay.
 */
function wait(milliseconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, milliseconds);
  });
}

/**
 * Plays one full round: records the player move, chooses the computer move,
 * updates the UI, updates scores and checks whether the match has ended.
 *
 * @param {string} selectedMove - The move selected by the player.
 * @returns {Promise<void>}
 */
async function playRound(selectedMove) {
  if (matchOver) {
    return;
  }

  if (!isValidMove(selectedMove)) {
    resultMessage.textContent = "Please choose a valid move.";
    resultRule.textContent = "";
    return;
  }

  disableMoveButtons();
  playSound(sounds.moveSelected);

  playerMove = selectedMove;
  computerMove = chooseComputerMove();

  playerChoiceDisplay.textContent = playerMove;
  playerChoiceIcon.src = `assets/images/icons/${playerMove}.svg`;

  computerChoiceDisplay.textContent = "";
  computerChoiceIcon.src = "assets/images/icons/question.svg";

  resultMessage.textContent = "CPU is thinking...";
  resultRule.textContent = "";

  await wait(550);

  computerChoiceDisplay.textContent = computerMove;
  computerChoiceIcon.src = `assets/images/icons/${computerMove}.svg`;
  playSound(sounds.cpuReveal);

  const result = determineWinner(playerMove, computerMove);

  updateScores(result);
  updateStats(result);
  displayResult(result);
  updateFavouriteMove();
  addRoundToHistory(result);
  updateResultBox(result);
  updateChoiceTokenColour(playerChoiceToken, playerMove);
  updateChoiceTokenColour(computerChoiceToken, computerMove);

  checkMatchWinner();

  if (!matchOver) {
    if (result === "player") {
      playSound(sounds.roundWin);
    } else if (result === "computer") {
      playSound(sounds.roundLoss);
    } else {
      playSound(sounds.roundDraw);
    }
  }

  roundPlayed = true;

  if (!matchOver) {
    nextRoundButton.disabled = false;
  }
}

/**
 * Updates a choice token with the colour class for the selected move.
 *
 * @param {HTMLElement} choiceToken - The choice token element to update.
 * @param {string} move - The move used to set the colour class.
 * @returns {void}
 */
function updateChoiceTokenColour(choiceToken, move) {
  choiceToken.classList.remove(
    "choice-token--rock",
    "choice-token--paper",
    "choice-token--scissors",
    "choice-token--lizard",
    "choice-token--spock",
  );

  choiceToken.classList.add(`choice-token--${move}`);
}

/**
 * Resets the battle panel ready for the next round.
 *
 * @returns {void}
 */
function resetBattlePanel() {
  if (matchOver) {
    return;
  }

  roundNumber++;

  roundNumberDisplay.textContent = roundNumber;

  playerChoiceDisplay.textContent = "";
  computerChoiceDisplay.textContent = "";

  playerChoiceIcon.src = "assets/images/icons/question.svg";
  computerChoiceIcon.src = "assets/images/icons/question.svg";

  resultMessage.textContent = "Choose your move!";
  resultRule.textContent = "";

  playerMove = "";
  computerMove = "";

  resultBox.classList.remove("result-win", "result-loss", "result-draw");

  playerChoiceToken.classList.remove(
    "choice-token--rock",
    "choice-token--paper",
    "choice-token--scissors",
    "choice-token--lizard",
    "choice-token--spock",
  );

  computerChoiceToken.classList.remove(
    "choice-token--rock",
    "choice-token--paper",
    "choice-token--scissors",
    "choice-token--lizard",
    "choice-token--spock",
  );

  enableMoveButtons();
}

/**
 * Updates the result box styling according to the round result.
 *
 * @param {"player" | "computer" | "draw"} result - The round result.
 * @returns {void}
 */
function updateResultBox(result) {
  resultBox.classList.remove("result-win", "result-loss", "result-draw");

  if (result === "player") {
    resultBox.classList.add("result-win");
  } else if (result === "computer") {
    resultBox.classList.add("result-loss");
  } else {
    resultBox.classList.add("result-draw");
  }
}

/**
 * Resets the match state, scoreboard, statistics, history and battle display.
 *
 * @returns {void}
 */
function startNewGame() {
  playSound(sounds.newGame);
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
  moveFrequency.rock = 0;
  moveFrequency.paper = 0;
  moveFrequency.scissors = 0;
  moveFrequency.lizard = 0;
  moveFrequency.spock = 0;

  favouriteMoveDisplay.textContent = "N/A";

  playerScoreDisplay.textContent = 0;
  computerScoreDisplay.textContent = 0;

  totalRoundsDisplay.textContent = 0;
  winRateDisplay.textContent = "0%";
  currentStreakDisplay.textContent = 0;

  roundNumberDisplay.textContent = 1;

  playerChoiceDisplay.textContent = "";
  computerChoiceDisplay.textContent = "";
  updateAchievement();

  playerChoiceIcon.src = "assets/images/icons/question.svg";
  computerChoiceIcon.src = "assets/images/icons/question.svg";

  resultMessage.textContent = "Choose your move!";
  resultRule.textContent = "";

  historyList.innerHTML = "";

  nextRoundButton.textContent = "Next Round";
  nextRoundButton.disabled = true;

  playerChoiceToken.classList.remove(
    "choice-token--rock",
    "choice-token--paper",
    "choice-token--scissors",
    "choice-token--lizard",
    "choice-token--spock",
  );

  computerChoiceToken.classList.remove(
    "choice-token--rock",
    "choice-token--paper",
    "choice-token--scissors",
    "choice-token--lizard",
    "choice-token--spock",
  );

  resultBox.classList.remove("result-win", "result-loss", "result-draw");

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

gameModeInputs.forEach(function (input) {
  input.addEventListener("change", function () {
    gameMode = input.value;
    playSound(sounds.moveSelected);
  });
});

// =======================
// 10. Move Button Events
// =======================

moveButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const selectedMove = button.dataset.choice;
    playRound(selectedMove);
  });
});

// ======================
// 11. Keyboard Controls
// ======================

/**
 * Selects a move using a keyboard shortcut if the move is available.
 *
 * @param {string} move - The move linked to the keyboard shortcut.
 * @returns {void}
 */
function selectMoveByKeyboard(move) {
  const moveButton = document.querySelector(`[data-choice="${move}"]`);

  if (!moveButton || moveButton.disabled || matchOver) {
    return;
  }

  playRound(move);
}

/**
 * Switches application screen using a keyboard number shortcut.
 *
 * @param {number} index - The index of the navigation link to activate.
 * @returns {void}
 */
function switchTabByKeyboard(index) {
  const navLink = navLinks[index];

  if (!navLink) {
    return;
  }

  navLink.click();
}

document.addEventListener("keydown", function (event) {
  const key = event.key.toLowerCase();

  if (key === "r") {
    selectMoveByKeyboard("rock");
  } else if (key === "p") {
    selectMoveByKeyboard("paper");
  } else if (key === "s") {
    selectMoveByKeyboard("scissors");
  } else if (key === "l") {
    selectMoveByKeyboard("lizard");
  } else if (key === "k") {
    selectMoveByKeyboard("spock");
  } else if (key === "n") {
    nextRoundButton.click();
  } else if (key === "1") {
    switchTabByKeyboard(0);
  } else if (key === "2") {
    switchTabByKeyboard(1);
  } else if (key === "3") {
    switchTabByKeyboard(2);
  } else if (key === "4") {
    switchTabByKeyboard(3);
  } else if (key === "h") {
    resetHighScoresButton.click();
  } else if (key === "e") {
    toggleSoundEffects();
  } else if (key === "m") {
    toggleBackgroundMusic();
  } else if (key === "escape") {
    closeMobileMenu();
  }
});

// ===========================
// 12. Score and Match Updates
// ===========================

/**
 * Updates the player or computer score after a round.
 *
 * @param {"player" | "computer" | "draw"} result - The round result.
 * @returns {void}
 */
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

/**
 * Displays the round result message and the rule that explains the outcome.
 *
 * @param {"player" | "computer" | "draw"} result - The round result.
 * @returns {void}
 */
function displayResult(result) {
  if (result === "draw") {
    resultMessage.textContent = "Draw!";
    resultRule.textContent = `Both selected ${formatMoveName(playerMove)}.`;

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

/**
 * Checks whether the match has ended by first-to-8 score or maximum rounds.
 * Updates match results, rank statistics, sounds and new-game controls.
 *
 * @returns {void}
 */
function checkMatchWinner() {
  if (playerScore >= winningScore) {
    resultMessage.textContent = "You Win The Match!";
    resultRule.textContent = "Final result: you reached 8 wins first.";
    matchesWon++;
    saveRankStats();
    updateAchievement();
    addHighScore(playerScore, totalRounds);
    playSound(sounds.matchWin);
    matchOver = true;
  } else if (computerScore >= winningScore) {
    resultMessage.textContent = "Computer Wins The Match!";
    resultRule.textContent = "Final result: the computer reached 8 wins first.";
    matchesLost++;
    saveRankStats();
    updateAchievement();
    playSound(sounds.matchLoss);
    matchOver = true;
  } else if (roundNumber >= maxRounds) {
    if (playerScore > computerScore) {
      resultMessage.textContent = "You Win The Match!";
      resultRule.textContent = `Final score: ${playerScore} - ${computerScore}.`;
      matchesWon++;
      saveRankStats();
      updateAchievement();
      addHighScore(playerScore, totalRounds);
      playSound(sounds.matchWin);
    } else if (computerScore > playerScore) {
      resultMessage.textContent = "Computer Wins The Match!";
      resultRule.textContent = `Final score: ${playerScore} - ${computerScore}.`;
      matchesLost++;
      saveRankStats();
      updateAchievement();
      playSound(sounds.matchLoss);
    } else {
      resultMessage.textContent = "Match Draw!";
      resultRule.textContent = `Final score: ${playerScore} - ${computerScore}.`;
      playSound(sounds.matchDraw);
    }

    matchOver = true;
  }

  if (matchOver) {
    disableMoveButtons();
    nextRoundButton.disabled = false;
    nextRoundButton.textContent = "New Game";
  }
}

/**
 * Updates round count, win rate, current streak and highest streak.
 *
 * @param {"player" | "computer" | "draw"} result - The round result.
 * @returns {void}
 */
function updateStats(result) {
  totalRounds++;

  if (result === "player") {
    currentStreak++;
  } else if (result === "computer") {
    currentStreak = 0;
  }

  if (currentStreak > highestStreak) {
    highestStreak = currentStreak;

    saveRankStats();
  }

  const winRate = Math.round((playerScore / totalRounds) * 100);

  totalRoundsDisplay.textContent = totalRounds;
  winRateDisplay.textContent = `${winRate}%`;
  currentStreakDisplay.textContent = currentStreak;
  highestStreakDisplay.textContent = highestStreak;
  rankHighestStreakDisplay.textContent = highestStreak;
}

/**
 * Updates the player's most frequently selected move.
 *
 * @returns {void}
 */
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

const resetHighScoresButton = document.getElementById(
  "reset-highscores-button",
);

resetHighScoresButton.addEventListener("click", function () {
  if (confirm("Delete all high scores?")) {
    highScores = [];
    saveHighScores();
    displayHighScores();
    alert("High scores deleted.");
  }
});

// ===================
// 13. Round Controls
// ===================

/**
 * Disables all move buttons to prevent multiple selections during a round.
 *
 * @returns {void}
 */
function disableMoveButtons() {
  moveButtons.forEach(function (button) {
    button.disabled = true;
  });
}

/**
 * Enables all move buttons for the next playable round.
 *
 * @returns {void}
 */
function enableMoveButtons() {
  moveButtons.forEach(function (button) {
    button.disabled = false;
  });
}

// ==================
// 14. Round History
// ==================

/**
 * Adds the completed round to the round history display.
 *
 * @param {"player" | "computer" | "draw"} result - The round result.
 * @returns {void}
 */
function addRoundToHistory(result) {
  const roundData = {
    round: roundNumber,
    player: playerMove,
    computer: computerMove,
    result: result,
  };

  roundHistory.push(roundData);

  const historyItem = document.createElement("div");
  historyItem.classList.add("history-entry", `history-${result}`);

  const resultLabel =
    result === "player" ? "W" : result === "computer" ? "L" : "D";

  historyItem.innerHTML = `
    <span class="history-round">#${roundData.round}</span>
    <img src="assets/images/icons/${roundData.player}.svg" alt="${roundData.player}" class="history-icon">
    <span class="history-vs">VS</span>
    <img src="assets/images/icons/${roundData.computer}.svg" alt="${roundData.computer}" class="history-icon">
    <span class="history-result">${resultLabel}</span>
  `;

  historyList.prepend(historyItem);
}

loadRankStats();
updateAchievement();
loadHighScores();

// ====================
// 15. Theme Settings
// ====================

const savedTheme = localStorage.getItem("selectedTheme") || "theme-default";
applyTheme(savedTheme);

/**
 * Applies the selected colour theme and saves the setting to local storage.
 *
 * @param {string} themeName - The theme class name to apply to the body.
 * @returns {void}
 */
function applyTheme(themeName) {
  document.body.classList.remove(
    "theme-default",
    "theme-high-contrast",
    "theme-colourblind",
  );

  document.body.classList.add(themeName);
  localStorage.setItem("selectedTheme", themeName);

  themeInputs.forEach(function (input) {
    input.checked = input.value === themeName;
  });
}

themeInputs.forEach(function (input) {
  input.addEventListener("change", function () {
    applyTheme(input.value);
    playSound(sounds.moveSelected);
  });
});

const savedSoundSetting = localStorage.getItem("soundSetting") || "on";
applySoundSetting(savedSoundSetting);

const savedMusicSetting = localStorage.getItem("musicSetting") || "off";
applyMusicSetting(savedMusicSetting);
