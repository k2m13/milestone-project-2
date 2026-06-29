const {
  calculateWinRate,
  updateStreak,
} = require("../assets/js/stats-logic");

test("calculateWinRate returns 50 percent", () => {
  expect(calculateWinRate(5, 10)).toBe(50);
});

test("calculateWinRate returns 100 percent", () => {
  expect(calculateWinRate(10, 10)).toBe(100);
});

test("winning increases streak", () => {
  expect(updateStreak(3, "player")).toBe(4);
});

test("losing resets streak", () => {
  expect(updateStreak(5, "computer")).toBe(0);
});

test("draw keeps streak unchanged", () => {
  expect(updateStreak(4, "draw")).toBe(4);
});