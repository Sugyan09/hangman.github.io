const hangmanImage = document.querySelector(".hangman-box img");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector(".play-again")

let currentWord, correctLetters, wrongGuessCount;
const maxGuesses = 6;

const resetGame = () => {
  correctLetters = [];
  wrongGuessCount = 0;
  hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`
  guessesText.innerText =`${wrongGuessCount} / ${maxGuesses}`
  keyboardDiv.querySelectorAll('button').forEach(btn => btn.disabled = false);
  wordDisplay.innerHTML = currentWord
    .split("")
    .map(() => `<li class="letter"></li>`)
    .join("");
  gameModal.classList.remove('show');

}

const getRandomWord = () => {
  const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
  currentWord = word;
  console.log(word);
  document.querySelector(".hint-text b").innerText = hint;
  resetGame();
};

const gameOver = (isVictory) => {
  setTimeout(() => {
    const modalText = isVictory ? `you found the word:` : `the correct word was:`;
    gameModal.querySelector('img').src = `images/${isVictory ? `victory` : `lost`}.gif`;
    gameModal.querySelector('h4').innerText = `${isVictory ? `Congrats!` : `Game Over`}`;
    gameModal.querySelector('p').innerHTML = `${modalText} <b>${currentWord}</b>`;
    gameModal.classList.add('show')
  }, 300)

}

const initGame = (button, clickedLetter) => {
  //checking if the clicked word exists on the current word
  if (currentWord.includes(clickedLetter)) {
    //showing all the correct letters on the word display
    [...currentWord].forEach((letter, index) => {
      if (letter === clickedLetter) {
        correctLetters.push(letter)
        wordDisplay.querySelectorAll("li")[index].innerText = letter;
        wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
      }
    });
  } else {
    //updating UI on wrong guesses
    wrongGuessCount++;
    hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`
  }
  button.disabled = true;
  guessesText.innerText =`${wrongGuessCount} / ${maxGuesses}`
  
  //calling gameOver function when condition meets
  if (wrongGuessCount === maxGuesses) return gameOver(false);
  if (correctLetters.length === currentWord.length) return gameOver(true);
};

// Creating keyboard button and adding events
for (let i = 97; i <= 122; i++) {
  const button = document.createElement("button");
  button.innerText = String.fromCharCode(i);
  keyboardDiv.appendChild(button);
  button.addEventListener("click", (e) =>
    initGame(e.target, String.fromCharCode(i))
  );
}

getRandomWord();
playAgainBtn.addEventListener('click', getRandomWord);

