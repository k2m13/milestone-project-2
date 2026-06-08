const {
  moveList,
  getComputerMove,
  determineWinner,
} = require("../assets/js/gameLogic");

test("getComputerMove returns a valid move", () => {
  const move = getComputerMove();
  expect(moveList).toContain(move);
});

test("determineWinner returns draw when moves are the same", () => {
  expect(determineWinner("rock", "rock")).toBe("draw");
});

test("rock beats scissors", () => {
  expect(determineWinner("rock", "scissors")).toBe("player");
});

test("paper beats spock", () => {
  expect(determineWinner("paper", "spock")).toBe("player");
});

test("computer wins when player chooses rock and computer chooses paper", () => {
  expect(determineWinner("rock", "paper")).toBe("computer");
});