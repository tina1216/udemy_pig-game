/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
let scores, activePlayer, roundScore, gamePlaying;

init();
let diceImg = document.querySelector(".dice");
diceImg.style.display = "none";

//ROLL----------------------------------------------
document.querySelector(".btn-roll").addEventListener("click", () => {
  if (gamePlaying) {
    //random number
    dice = Math.floor(Math.random() * 6) + 1;

    //show the number on the dice
    diceImg.style.display = "block";
    diceImg.src = `dice-${dice}.png`;

    //store the number to current score
    if (dice !== 1) {
      roundScore += dice;
      document.getElementById(
        `current-${activePlayer}`
      ).textContent = roundScore;
    } else {
      nextPlayer();
    }
  }
});

//HOLD----------------------------------------------
document.querySelector(".btn-hold").addEventListener("click", function() {
  if (gamePlaying) {
    //add roundScore to scores(add existing one) = [0, 0](either one, depends on activePlayer)
    scores[activePlayer] += roundScore;
    //display it on current-0 or current-1
    document.querySelector(`#score-${activePlayer}`).textContent =
      scores[activePlayer];

    //check if the player won the game
    if (scores[activePlayer] >= 10) {
      document.getElementById(`name-${activePlayer}`).textContent = "WINNER!!";
      diceImg.style.display = "none";
      document
        .querySelector(`.player-${activePlayer}-panel`)
        .classList.remove("active");
      document
        .querySelector(`.player-${activePlayer}-panel`)
        .classList.add("winner");

      gamePlaying = false;

      // document.querySelector(".btn-roll").disabled = true;
      // document.querySelector(".btn-hold").disabled = true;
    } else {
      //change active player by using function
      nextPlayer();
    }
  }
});

//NEW GAME-------------------------------------------
document.querySelector(".btn-new").addEventListener("click", init);

//function==========================
//NEXT
function nextPlayer() {
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }

  roundScore = 0;

  document.getElementById("current-0").textContent = 0;
  document.getElementById("current-1").textContent = 0;

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  diceImg.style.display = "none";
}

// SET O---------------------------------------------
function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;

  gamePlaying = true;

  document.getElementById("current-0").textContent = 0;
  document.getElementById("current-1").textContent = 0;

  document.getElementById("score-0").textContent = 0;
  document.getElementById("score-1").textContent = 0;

  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");

  document.querySelector(".player-0-panel").classList.add("active");

  document.getElementById("name-0").textContent = "player 1";
  document.getElementById("name-1").textContent = "player 2";
}

/*-------------------------------------------------
YOUR 3 CHALLENGES

Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row.
  After that, it's the next player's turn.
  (Hint: Always save the previous dice roll in a separate variable)

2. Add an input field to the HTML where players can set the winning score,
  so that they can change the predefined score of 100.
  (Hint: you can read that value with the .value property in JavaScript.
  This is a good oportunity to use google to figure this out :)

3. Add another dice to the game, so that there are two dices now.
  The player looses his current score when one of them is a 1.
  (Hint: you will need CSS to position the second dice,
    so take a look at the CSS code for the first one.)
*/

function--