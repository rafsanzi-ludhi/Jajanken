const rock = document.getElementById("rock");
const paper = document.getElementById("paper");
const scissors = document.getElementById("scissors");
const playerScore = document.querySelector(".player-score p");
const computerScore = document.querySelector(".computer-score p");
const winnerText = document.querySelector(".winner-text p");

function computerPlay() {
  const choices = ["rock", "paper", "scissors"];
  const randomChoice = Math.floor(Math.random() * 3);
  return choices[randomChoice];
}

function playRound(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) {
    return "draw";
  }

  if (
    (playerSelection === "rock" && computerSelection === "scissors") ||
    (playerSelection === "paper" && computerSelection === "rock") ||
    (playerSelection === "scissors" && computerSelection === "paper")
  ) {
    return "player";
  }

  return "computer";
}

function updateScore(winner) {
  if (winner === "player") {
    playerScore.textContent = parseInt(playerScore.textContent) + 1;
  } else if (winner === "computer") {
    computerScore.textContent = parseInt(computerScore.textContent) + 1;
  }
}

function displayResultMessage(result) {
  if (result === "player") {
    winnerText.textContent = "You win!";
  } else if (result === "computer") {
    winnerText.textContent = "You lose!";
  } else {
    winnerText.textContent = "It's a draw!";
  }
}

rock.addEventListener("click", function () {
  const computerSelection = computerPlay();
  const winner = playRound("rock", computerSelection);
  updateScore(winner);
  displayResultMessage(winner);
});

paper.addEventListener("click", function () {
  const computerSelection = computerPlay();
  const winner = playRound("paper", computerSelection);
  updateScore(winner);
  displayResultMessage(winner);
});

scissors.addEventListener("click", function () {
  const computerSelection = computerPlay();
  const winner = playRound("scissors", computerSelection);
  updateScore(winner);
  displayResultMessage(winner);
});

