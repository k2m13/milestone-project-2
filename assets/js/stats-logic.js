function calculateWinRate(playerScore, totalRounds) {
  return Math.round((playerScore / totalRounds) * 100);
}

function updateStreak(currentStreak, result) {
  if (result === "player") {
    return currentStreak + 1;
  }

  if (result === "computer") {
    return 0;
  }

  return currentStreak;
}

module.exports = {
  calculateWinRate,
  updateStreak,
};