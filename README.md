# Mindgame: Rock • Paper • Scissors • Lizard • Spock
* [Introduction](#introduction)
* [Idea](#idea)

## 1. [User Experience](#user-experience)
### Strategy Plane
* [Project Goals](#project-goals)
* [Player Goals](#player-goals)
* [Developer Goals](#developer-goals)
* [Business Goals](#business-goals)

### Scope Plane
* User Stories
* MoSCoW Prioritisation

### Structure Plane
* Site Structure
* User Flow

### Skeleton Plane
* Wireframes

### Surface Plane
* Colour Palette
* Typography
* Visual Design

* Design Choices
* Wireframes
* Mockups (?)

## 2. Features
* Existing Features
* Features Left to Implement

## 3. [Technologies Used](#techonlogies-used)
* Interesting Code Solutions

## 4. [Testing](#testing)
* Manual: Expected, Testing, Result, Fix
* Bugs Discovered

## 5. Deployment
* Deployment to Github
* How to Run This Project Locally

## 6. Credits
* Content
* Media
* Code
* Acknowledgements

## 7. [Licence](#licence)

## Introduction

MindGame is a browser-based implementation of Rock, Paper, Scissors, Lizard, Spock, developed as part of the Code Institute Level 5 Diploma in Web Application Development. The project combines strategic gameplay, modern web technologies, and a futuristic user interface inspired by glassmorphism and science-fiction aesthetics.

The application allows players to compete against a computer opponent while tracking scores, analysing gameplay patterns, and developing winning strategies.


## Idea

Rock, Paper, Scissors, Lizard, Spock is an extension of the traditional game of Rock, Paper, Scissors, popularised by the television series The Big Bang Theory. Two additional hand signs are introduced: Lizard (represented by a hand puppet gesture) and Spock (represented by the Vulcan salute).

The game is played by two opponents who simultaneously choose one of the five available signs. The winner is determined according to a predefined set of interactions. If both opponents choose the same sign, the round results in a draw.

- Scissors cuts Paper
- Paper covers Rock
- Rock crushes Lizard
- Lizard poisons Spock
- Spock smashes Scissors
- Scissors decapitates Lizard
- Lizard eats Paper
- Paper disproves Spock
- Spock vaporizes Rock
- and Rock crushes Scissors

<p align="center">
  <img src="assets/readme/RockPaperScissorsLizardSpock.jpg" width="350" alt="Rules Diagram">
</p>

1. ## User Experience 

The UX section describes the design process, planning, and the idea behind Mindgame, taking into consideration user needs, accessibility and project goals.

### Project Goals

MindGame aims to create an engaging and visually appealing browser-based implementation of Rock, Paper, Scissors, Lizard, Spock. The project combines strategic gameplay with modern web design principles, including glassmorphism and futuristic user interface elements inspired by science fiction and cyberpunk aesthetics.

The primary goal is to provide users with an enjoyable gaming experience while showcasing the use of HTML, CSS, and JavaScript to create an interactive web application. The project also aims to encourage users to think strategically by presenting statistics, gameplay history, and behavioural insights based on their previous choices.

### Player Goals

As a player I want to:

* Learn the rules of Rock, Paper, Scissors, Lizard, Spock quickly and easily.
* Play rounds against a computer opponent with minimal effort.
* Receive immediate visual feedback after each round.
* Track their score throughout a match.
* View previous rounds and gameplay history.
* Analyse their own playing patterns and favourite moves.
* Enjoy a responsive experience across desktop, tablet and mobile devices.
* Interact with a visually appealing and immersive game environment.

### Developer Goals

The developer aims to:

* Demonstrate responsive web design using CSS.
* Demonstrate proficiency in HTML5 semantic structure.
* Implement game logic using modern JavaScript.
* Apply DOM manipulation techniques to create an interactive user experience.
* Develop reusable and maintainable code.
* Practise version control using Git and GitHub through regular incremental commits.
* Produce a professional portfolio project suitable for showcasing web development skills.

### Business Goals

Although MindGame is an educational project, it has been designed as if it were a commercial browser game. Its business goals include:

* Encouraging users to spend time interacting with the application.
* Providing an intuitive and enjoyable user experience.
* Building * user engagement through statistics and progression systems.
* Creating a distinctive visual identity that differentiates the game from traditional Rock, * Paper, Scissors implementations.
* Demonstrating features that could support future expansion, such as player accounts, ranked matches, achievements, and adaptive AI opponents.


### MoSCoW Prioritisation

The project requirements and planned features were prioritised using the MoSCoW framework to ensure that the core gameplay experience was delivered before additional enhancements.

#### User Stories
First-Time Visitor:
* As a first-time visitor, I want to understand the rules quickly so that I can start playing immediately.
* As a first-time visitor, I want the interface to be intuitive so that I do not need external instructions.
* As a first-time visitor, I want clear visual feedback after each round so that I understand why I won or lost.

Returning Player
* As a returning player, I want to play multiple rounds quickly so that the game remains engaging.
* As a returning player, I want to track my score so that I can measure my performance.
* As a returning player, I want to review previous rounds so that I can identify patterns in my gameplay.
* As a returning player, I want to see statistics about my choices so that I can improve my strategy.

Competitive Player
* As a competitive player, I want to achieve a high win rate so that I can demonstrate my skill.
* As a competitive player, I want to view progression and ranking information so that I feel rewarded for continued play.
* As a competitive player, I want the game to provide strategic insights so that I can make better decisions.

Site Owner
* As the site owner, I want users to enjoy the game so that they remain engaged with the application.
* As the site owner, I want the website to function correctly across different devices and browsers.
* As the site owner, I want the codebase to be maintainable and scalable so that additional features can be implemented in future releases.

#### Must Have

These features are essential for the application to function as a playable game:

* Responsive user interface.
* Navigation menu.
* Rock, Paper, Scissors, Lizard, Spock game logic.
* Computer-generated opponent choices.
* Win, lose, and draw determination.
* Round result display.
* Player and computer score tracking.
* Reset game functionality.
* Rules and instructions section.
* Casual mode: computer chooses a random move.

#### Should Have

These features significantly improve the user experience but are not essential for the game to function:

* Match history panel.
* Round counter.
* Statistics dashboard.
* Win percentage calculations.
* Visual animations and transitions.
* Enhanced accessibility features.
* Hard mode: computer analyses the player’s previous moves and tries to counter the most frequent one.
    - 1. Look at player's previous moves.
    - 2. Find the move the player uses most often.
    - 3. Computer chooses a move that beats that move.
    - 4. If there is no history yet, computer chooses randomly.

#### Could Have

These features would provide additional engagement and replay value if time permits:

* Rank progression system.
* Player profile customisation.
* Behavioural analysis of player choices.
* AI-generated strategic recommendations.
* Sound effects and background music.
* Achievement and badge system.
* Adaptive difficulty or 'AI confidence' messages.

#### Won't Have (Current Release)

The following features were considered but are outside the scope of the current project release:

* Online multiplayer gameplay.
* User registration and authentication.
* Cloud-based data storage.
* Global leaderboards.
* Real-time player matchmaking.
* Mobile application version.


>While the core project focuses on creating a polished and accessible implementation of Rock, Paper, Scissors, Lizard, Spock, the longer-term vision for MindGame is to evolve into a strategic browser game that analyses player behaviour and adapts to individual playing styles.

Favicon from Magnific(https://www.magnific.com/icon/creativity_15557951#fromView=search&page=1&position=3&uuid=e59fb263-67ba-4c6e-9098-a6b2811f5241)

3. ## Techonlogies Used

### Modern CSS Features Used

The project uses modern responsive CSS techniques. Layouts are built with CSS Grid using fractional (fr) units. 
Typography and icons use ```clamp()``` 
to create fluid scaling between minimum and maximum sizes. 
Relative units (rem) are used for spacing and sizing to improve accessibility 
and maintain consistent proportions across different screen sizes.

Empty move labels are hidden using the :empty pseudo-class, allowing the placeholder icon 
to remain perfectly centred until a move is selected.

### Interesting Solutions

When the expected visual change did not occur, browser developer tools and CSS inspection revealed that the issue 
was not in the JavaScript logic but in CSS specificity and property overriding. This reinforced 
the importance of debugging both behaviour and presentation separately.


## JavaScript Engine Plan

### Variables

- `playerMove` — stores the move selected by the player.
- `computerMove` — stores the move randomly selected by the computer.
- `roundNumber` — tracks the current round.
- `playerScore` — tracks the player's score.
- `computerScore` — tracks the computer's score.
- `totalRounds` — tracks the number of completed rounds.
- `wins` — tracks player wins.
- `losses` — tracks player losses.
- `draws` — tracks drawn rounds.
- `currentStreak` — tracks consecutive player wins.

### Arrays

- `moveList` — stores the five possible moves: rock, paper, scissors, lizard, spock.
- `roundHistory` — stores previous round results.

### Objects

- `winningMoves` — stores which moves beat which other moves.
- `moveFrequency` — stores how often the player chooses each move.
- `ruleMessages` — stores the explanation for each winning combination.

### Functions

- `getComputerMove()` — randomly selects a computer move.
- `playRound(playerMove)` — runs one complete round.
- `determineWinner(playerMove, computerMove)` — compares both moves and returns win, lose, or draw.
- `updateScores(result)` — updates player and computer scores.
- `updateRoundStats(result)` — updates total rounds, wins, losses, draws, streak, and win rate.
- `updateMoveFrequency(playerMove)` — records how often the player uses each move.
- `displayChoices(playerMove, computerMove)` — displays both selected moves.
- `displayResult(result, playerMove, computerMove)` — displays the round result message.
- `addRoundToHistory(roundData)` — stores the round result in the history array.
- `renderHistory()` — displays round history on the page.
- `renderStats()` — updates total rounds, win rate, and current streak.
- `resetBattlePanel()` — resets the visible battle area.
- `resetGame()` — resets scores, rounds, history, and statistics.

### Event Listeners

- Navigation click listeners for Play, Rank, Rules, and Settings.
- Move button click listeners for Rock, Paper, Scissors, Lizard, and Spock.
- Optional keyboard listeners for accessibility:
  - `r` = Rock
  - `p` = Paper
  - `s` = Scissors
  - `l` = Lizard
  - `c` = Spock
  - `Escape` = return to Play or close overlays
  - Arrow keys or Tab for navigation support where appropriate.

### Game Loop

1. Player selects a move.
2. Computer randomly selects a move.
3. Both choices are displayed.
4. Winner is determined.
5. Scoreboard is updated.
6. Round history is updated.
7. Statistics are recalculated.
8. Round number increases.
9. Player can continue by choosing another move or reset the game.

### Score System

- Player gains 1 point for a win.
- Computer gains 1 point for a loss.
- No points are awarded for a draw.
- The game can be played until a set round limit, for example 15 rounds.

### History System

Each completed round should store:

- Round number.
- Player move.
- Computer move.
- Result.
- Rule explanation.

Example:

```javascript
{
  round: 1,
  playerMove: "rock",
  computerMove: "scissors",
  result: "win",
  rule: "Rock crushes Scissors"
}
```

### Statistics System

The statistics system should calculate:

- Total rounds played.
- Player win rate.
- Current winning streak.
- Most frequently selected move.
- Move frequency for each option.
- Win Condition

The game should check the `winningMoves` object.

```javascript
const winningMoves = {
  rock: ["scissors", "lizard"],
  paper: ["rock", "spock"],
  scissors: ["paper", "lizard"],
  lizard: ["spock", "paper"],
  spock: ["scissors", "rock"]
};
```

If `winningMoves[playerMove].includes(computerMove)` is true, the player wins.
If both moves are the same, the round is a draw. Otherwise, the computer wins.

4. ## Testing

### Manual Regression Testing

| Feature | Test | Expected Result | Pass/Fail |
|----------|----------|----------|----------|
| Navigation | Click Play, Rank, Rules and Settings tabs | Correct screen is displayed and active tab is highlighted | Pass |
| Next Round Button | Load page and click Next Round before choosing a move | Nothing happens | Pass |
| Round Flow | Select a move card | Computer move appears, result is displayed and move buttons become disabled | Pass |
| Next Round | Click Next Round after a completed round | Round number increases, battle panel resets and move buttons are re-enabled | Pass |
| Scoreboard | Win a round | Player score increases by 1 | Pass |
| Scoreboard | Lose a round | Computer score increases by 1 | Pass |
| Scoreboard | Draw a round | Neither score changes | Pass |
| Round History | Complete a round | Round result is added to the history panel | Pass |
| Total Rounds | Complete a round | Total rounds statistic increases by 1 | Pass |
| Win Rate | Win and lose multiple rounds | Win rate updates correctly | Pass |
| Current Streak | Win consecutive rounds | Streak increases correctly | Pass |
| Current Streak | Lose or draw a round | Streak resets to 0 | Pass |
| Match End | Reach 8 wins or complete 15 rounds with a higher score | Match winner message is displayed | Pass |
| Match End | Match finishes | Move buttons remain disabled | Pass |
| New Game | Click New Game after a completed match | Scores, stats, history and round number reset | Pass |
| New Game | Start a new game | Move buttons are enabled and game is playable again | Pass |
| Responsiveness | Test on mobile, tablet and desktop widths | Layout remains usable and readable | Pass |

### Automated testing with Jest

Automated testing was implemented using Jest. Core game logic, DOM manipulation, and statistics calculations were tested independently.
I prioritised testing the core game logic, statistics calculations and DOM updates because these are the most important functions and 
the most likely to affect gameplay if they fail.

![Jest](assets/readme/Screenshot%202026-06-09%20at%2000.08.29.png)

7. ## Licence

MIT Licence

Copyright (c) [2026] [Kamil Sterniczuk, k2m13]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.