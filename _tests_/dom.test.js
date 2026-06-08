/**
 * @jest-environment jsdom
 */

const $ = require("jquery");

test("jQuery updates the player score display", () => {
  document.body.innerHTML = `
    <p id="player-score">0</p>
  `;

  $("#player-score").text("1");

  expect($("#player-score").text()).toBe("1");
});

test("jQuery updates the result message", () => {
  document.body.innerHTML = `
    <p id="result-message">Choose your move!</p>
  `;

  $("#result-message").text("You Win!");

  expect($("#result-message").text()).toBe("You Win!");
});