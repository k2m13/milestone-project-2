const moveList = ["rock", "paper", "scissors", "lizard", "spock"];

const winningMoves = {
  rock: ["scissors", "lizard"],
  paper: ["rock", "spock"],
  scissors: ["paper", "lizard"],
  lizard: ["paper", "spock"],
  spock: ["rock", "scissors"],
};

function getComputerMove() {
  const randomIndex = Math.floor(Math.random() * moveList.length);
  return moveList[randomIndex];
}

function determineWinner(playerMove, computerMove) {
  if (playerMove === computerMove) {
    return "draw";
  }

  if (winningMoves[playerMove].includes(computerMove)) {
    return "player";
  }

  return "computer";
}

module.exports = {
  moveList,
  winningMoves,
  getComputerMove,
  determineWinner,
};