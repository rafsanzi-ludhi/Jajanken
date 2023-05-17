window.onload = beginningAnimation(); // Run the beginning animation when the page loads


const rock = document.getElementById("rock");
const paper = document.getElementById("paper");
const scissors = document.getElementById("scissors");
const playerScore = document.querySelector(".player-score p");
const computerScore = document.querySelector(".computer-score p");
const winnerText = document.querySelector(".winner-text p");
const sprite = document.querySelector(".character");
const speechBubbleText = document.getElementById("speech-bubble-text");


let previousRoundWinner = '';


//! begin initial dialogue

function beginningAnimation() {
  fadeIn();
  const desc1 = document.querySelector("#desc1");
  let desc1Span = desc1.querySelectorAll("span");
  desc1Span = Array.from(desc1Span);

  const desc2 = document.querySelector("#desc2");
  const desc3 = document.querySelector("#desc3");

  desc1Span[desc1Span.length - 1].ontransitionend = () => {
    desc1.classList.add("fade-out");

    desc1.addEventListener("animationend", () => {
      desc1.classList.add("disappear");
      desc1.classList.remove("animate");
      desc2.classList.remove("disappear");
      desc2.classList.add("animate");
      fadeIn();
      let desc2Span = desc2.querySelectorAll("span");
      desc2Span = Array.from(desc2Span);

      desc2Span[desc2Span.length - 1].ontransitionend = () => {
        desc2.classList.add("fade-out");
        desc2.addEventListener("animationend", () => {
          desc2.classList.add("disappear");
          desc2.classList.remove("animate");
          desc3.classList.remove("disappear");
          desc3.classList.add("animate");
          fadeIn();

          let desc3Span = desc3.querySelectorAll("span");
          desc3Span = Array.from(desc3Span);

          desc3Span[desc3Span.length - 1].ontransitionend = () => {
            desc3.classList.add("fade-out");
              const sprite = document.querySelector(".character_spritesheet");
              // sprite.classList.remove("character_spritesheet");

            const cta = document.querySelector("#cta");

            cta.classList.add("drop-down");

            desc3.addEventListener("animationend", () => {
              desc3.classList.add("disappear");
              desc3.classList.remove("animate");

              // Stop the sprite animation
              stopSpriteAnimation();
              // sprite.classList.add("stop-animation");
            });
          };
        });
      };
    });
  };
}


// !`fadeIn` function
function fadeIn() {
  let text = document.querySelector(".animate");

  let strText = text.textContent;
  let splitText = strText.split("");
  text.textContent = "";
  //append span tags to each character in the string
  for (i = 0; i < splitText.length; i++) {
    text.innerHTML += `<span>${splitText[i]}</span>`;
  }

  let char = 0;
  let timer = setInterval(onTick, 1);

  function onTick() {
    const span = text.querySelectorAll("span")[char];
    span.classList.add("fade");
    char++;
    //starts the sprite animation when the dialogue starts fading in
    // if (char === 1) {
    //   startSpriteAnimation();
    // }
    //stops the function from running once the end of the string has been reached
    //stops the function from running once the end of the string has been reached
    if (char === splitText.length) {
      complete();
      return;
    }
  }
  function complete() {
    clearInterval(timer);
    timer = null; //clears the interval
  }
}

//* initial dialogue ends


//! Computer's choice
function computerPlay() {
  const choices = ["rock", "paper", "scissors"];
  const randomChoice = Math.floor(Math.random() * 3);
  return choices[randomChoice];
}


//! PLay a round of the game 

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


//! Update the score

function updateScore(winner) {
  if (winner === "player") {
    playerScore.textContent = parseInt(playerScore.textContent) + 1;
  } else if (winner === "computer") {
    computerScore.textContent = parseInt(computerScore.textContent) + 1;
  }

  if (playerScore === 5 || computerScore === 5) {
      declareWinner();
  }
}

//! Typewriter effect
function typeWriter(element, text, delay = 50) {
  let i = 0;

  function typeChar() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(typeChar, delay);
    }
  }
  
  typeChar();
}



//! Display the result message
function displayResultMessage(winner, playerSelection, computerSelection) {
  winnerText.textContent = ""; // Clear the current text
  let message;
  let delay = 100; // Add a delay before displaying the new message
  //an array holding different strings for win lose and draw
  const win = [`You won!`, `You're the best!`, `You're a winner!`, `You're a star!`];
  const winMessage = win[Math.floor(Math.random() * win.length)];
  
  const loss = [`oh no! you lost!`, `Arghh!`, `It's ok, you got this`, `Dieeee!!!`];
  const draw = [`It's a draw!`, `You're both winners!`, `You're both losers!`, `You're both stars!`];
  // if else statement to determine which string to display that randomly chooses from the array
  // ${capitalize(computerSelection)} beats ${playerSelection}.`
  // ${capitalize(playerSelection)} beats ${computerSelection}.`
  
    if (winner === "player") {
      message = winMessage + ` ${capitalize(playerSelection)} beats ${computerSelection}.`;
    } else if (winner === "computer") {
      message = loss[Math.floor(Math.random() * loss.length)];
    } else {
      message = draw[Math.floor(Math.random() * draw.length)];
    }


  setTimeout(() => {
    typeWriter(winnerText, message); // Use the typeWriter function to display the message
  }, delay);
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}




//! Event listeners for the buttons
rock.addEventListener("click", function () {
  const computerSelection = computerPlay();
  const winner = playRound("rock", computerSelection);
  updateSpeechBubble(winner);

  updateScore(winner);
  displayResultMessage(winner, "rock", computerSelection);
});

paper.addEventListener("click", function () {
  const computerSelection = computerPlay();
  const winner = playRound("paper", computerSelection);
  updateSpeechBubble(winner);

  updateScore(winner);
  displayResultMessage(winner, "paper", computerSelection);
});

scissors.addEventListener("click", function () {
  const computerSelection = computerPlay();
  const winner = playRound("scissors", computerSelection);
  updateSpeechBubble(winner);

  updateScore(winner);
  displayResultMessage(winner, "scissors", computerSelection);
});


//! END GAME Modal
const endAlert = document.querySelector("#end-alert");

function declareWinner() {
  rplContent();
  if (playerScore.textContent === 5) {
    endDesc.textContent = "You win! Mankind lives another day!!";
    returnMainBtn.innerText = "Play Again";
  } else if (computerScore.textContent === 5){
    endDesc.textContent = "You lost...who will save mankind now?";
    returnMainBtn.innerText = "Try Again?";
  }
  fadeIn();

  let endDescSpan = endDesc.querySelectorAll("span");
  endDescSpan = Array.from(endDescSpan);

  endDescSpan[endDescSpan.length - 1].ontransitionend = () => {
    returnMainBtn.classList.add("fade-in");
    /*returnMainBtn.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: 00,
      fill: "forwards",
      iterations: 1,
      delay: 0,
      easing: "ease-in",
    });*/
  };
}

function rplContent() {
  main.classList.add("disappear");
  endAlrt.classList.remove("disappear");
  desc.classList.remove("animate");
  endDesc.classList.add("animate");

  returnMainBtn.addEventListener("click", () => {
    main.classList.remove("disappear");
    endAlrt.classList.add("disappear");
    desc.classList.add("animate");
    returnMainBtn.classList.remove("fade-in");
    resetGame();
  });
}

//! sprite animation

function startSpriteAnimation() {
  sprite.classList.remove("stop-animation");
}

function stopSpriteAnimation() {
  // sprite.classList.add("stop-animation");
  sprite.classList.add("invisible");
}



// ! Undyne speech bubble text
// Update the updateSpeechBubble function

function updateSpeechBubble(winner) {
  if (winner === "computer" && previousRoundWinner !== "computer") {
    speechBubbleText.textContent = "Yeah!!! YEAH!!! This game rules!!!";
  } else if (winner === "player" && previousRoundWinner !== "player") {
    speechBubbleText.textContent = "Urgh... I haven't lost yet human!!!";
  } else if (parseInt(playerScore.textContent) === 3 && previousRoundWinner !== "playerAt4") {
    speechBubbleText.textContent = "You're gonna lose!!!";
    winner = "playerAt4";
  } else if (parseInt(computerScore.textContent) === 3 && previousRoundWinner !== "computerAt4") { // If the computer is at 4 points and hasn't said this yet then say it 
    speechBubbleText.textContent = "I'm gonna win!!!";
    winner = "computerAt4";
  } else if (winner === "draw") {
    speechBubbleText.textContent = "It's a draw!!!";
  }
  previousRoundWinner = winner;
}

