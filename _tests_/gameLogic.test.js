const {
  moveList,
  getComputerMove,
  determineWinner,
} = require("../assets/js/game-logic");

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

test("scissors beats lizard", () => {
  expect(determineWinner("scissors", "lizard")).toBe("player");
});

test("lizard beats paper", () => {
  expect(determineWinner("lizard", "paper")).toBe("player");
});

test("spock beats rock", () => {
  expect(determineWinner("spock", "rock")).toBe("player");
});

test("computer wins when scissors beats paper", () => {
  expect(determineWinner("paper", "scissors")).toBe("computer");
});

test("computer wins when lizard beats spock", () => {
  expect(determineWinner("spock", "lizard")).toBe("computer");
});