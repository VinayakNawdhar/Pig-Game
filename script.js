// "use strict";
const mainEl = document.querySelector("main");
const inputEl = document.querySelectorAll(".playerInput");
const submitBtn = document.getElementById("ENTER");
const newgame = document.querySelector(".btn--new");
const imageEl = document.querySelector(".dice");
const rolldice = document.querySelector(".btn--roll");
const curr0 = document.getElementById("current--0");
const curr1 = document.getElementById("current--1");
const score0 = document.getElementById("score--0");
const score1 = document.getElementById("score--1");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const holdBtn = document.querySelector(".btn--hold");
let activePlayer = document.querySelector(".player--active");
let randomNumber;
let count = 0;
let playerWon = false;

let playerName0 = "";
let playerName1 = "";


submitBtn.addEventListener("click", function () {
  submitBtnfnc();
});


document.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    submitBtnfnc();
  }
});



rolldice.addEventListener("click", function () {
  if (!playerWon) {
    randomNumber = Math.trunc(Math.random() * 6 + 1);
    imageEl.src = `dice-${randomNumber}.png`;
    if (randomNumber === 1) {
      switch (count) {
        case 0:
          player0.currScore = 0;
          updateCurrentScores();
          break;
        case 1:
          player1.currScore = 0;
          updateCurrentScores();
          break;
      }
      switchActivePlayer();
      return;
    }
    switch (count) {
      case 0:
        player0.currScore += randomNumber;
        updateCurrentScores();
        break;
      case 1:
        player1.currScore += randomNumber;
        updateCurrentScores();
        break;
    }
    if (player0.currScore + player0.totalScore >= 100) {
      player0El.classList.add("player--winner");
      player0.totalScore += player0.currScore;
      player0.currScore = 0;
      updateCurrentScores();
      updateTotalScores();
      document.querySelector("#name--0").textContent = `${playerName0} WINS 🎉`;
      playerWon = true;
      imageEl.src = "gameover.png";
    }
    if (player1.currScore + player1.totalScore >= 100) {
      player1El.classList.add("player--winner");
      player1.totalScore += player1.currScore;
      player1.currScore = 0;
      updateCurrentScores();
      updateTotalScores();
      document.querySelector("#name--1").textContent = `${playerName1} WINS 🎉`;
      playerWon = true;
      imageEl.src = "gameover.png";
    }
  }
});



newgame.addEventListener("click", function () {
  player0.currScore = 0;
  player0.totalScore = 0;
  player1.currScore = 0;
  player1.totalScore = 0;
  updateCurrentScores();
  updateTotalScores();
  playerWon = false;
  imageEl.src = "lp.png"
  if (count === 1) {
    document.querySelector("#name--1").textContent = `${playerName1}`;
    player1El.classList.remove("player--winner");
    switchActivePlayer();
  } else {
    document.querySelector("#name--0").textContent = `${playerName0}`;
    player0El.classList.remove("player--winner");
  }
});



holdBtn.addEventListener("click", function () {
  if (randomNumber && !playerWon) {
    switch (count) {
      case 0:
        player0.totalScore += player0.currScore;
        player0.currScore = 0;
        updateCurrentScores();
        updateTotalScores();
        break;
      case 1:
        player1.totalScore += player1.currScore;
        player1.currScore = 0;
        updateCurrentScores();
        updateTotalScores();
        break;
    }
    switchActivePlayer();
  }
});


let player0 = {
  currScore: 0,
  totalScore: 0,
};
let player1 = {
  currScore: 0,
  totalScore: 0,
};


updateCurrentScores();
updateTotalScores();



function updateCurrentScores() {
  curr0.textContent = player0.currScore;
  curr1.textContent = player1.currScore;
}
function updateTotalScores() {
  score0.textContent = player0.totalScore;
  score1.textContent = player1.totalScore;
}
function switchActivePlayer() {
  if (player0El.classList.contains("player--active")) {
    player0El.classList.remove("player--active");
    player1El.classList.add("player--active");
  } else {
    player0El.classList.add("player--active");
    player1El.classList.remove("player--active");
  }
  count = (count + 1) % 2;
}



function submitBtnfnc() {
  if (
    document.getElementById("playerName-0").value &&
    document.getElementById("playerName-1").value
  ) {
    playerName0 = document.getElementById("playerName-0").value;
    playerName1 = document.getElementById("playerName-1").value;
    mainEl.classList.remove("hidden");
    document.getElementById("name--0").textContent = playerName0;
    document.getElementById("name--1").textContent = playerName1;
    document.querySelector(".container").classList.add("hidden");
  }
}
