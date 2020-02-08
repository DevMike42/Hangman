// GLOBAL VARIABLES
// =================================================

// Tracks start and reset of game
let isGameRunning = false;
// Array of words for game
const wordList = ['nacho', 'ramsees'];
// Current Solution
let chosenWord = '';
// Solution broken into an array
let chosenWordArr = [];
// Holds length of solution for adding blanks
let numBlanks = 0;
// Holds a mix of blanks and solved letters
let blanksAndSuccesses = [];
// Holds all wrong guesses
let wrongGuesses = [];
// Holds all correct guesses
let correctGuesses = [];

// Game Counters
let winCounter = 0;
let lossCounter = 0;
let numOfGuesses = 3;
let roundCounter = 0;


// Game Functions
// ==================================================================================================

// startRound()
function startRound() {
  numOfGuesses = 3;
  chosenWord = wordList[Math.floor(Math.random() * wordList.length)];
  console.log(chosenWord);
  chosenWordArr = chosenWord.split('');
  numBlanks = chosenWordArr.length;

  blanksAndSuccesses = [];
  wrongGuesses = [];
  correctGuesses = [];

  roundCounter++;

  fillBlanks();
  updateWordUI();
  updateStatsUI();
};

function fillBlanks() {
  for (let i = 0; i < numBlanks; i++) {
    blanksAndSuccesses.push('_');
  }
};

function checkLetter(letter, btn) {
  let letterInWord = false;

  for (let i = 0; i < numBlanks; i++) {
    if (chosenWord[i] === letter) {
      letterInWord = true;
    }
  }

  if (letterInWord) {
    for (let j = 0; j < numBlanks; j++) {
      if (chosenWord[j] === letter) {
        blanksAndSuccesses[j] = letter;
        correctGuesses.push(letter);
        correctLetterToggle(btn);
      }
      updateWordUI();
    }
  } else {
    wrongGuesses.push(letter);
    wrongLetterToggle(btn);
    numOfGuesses--;
    $('#guesses').text(numOfGuesses);
  }
};

function checkRoundStats() {
  if (chosenWordArr.toString() === blanksAndSuccesses.toString()) {
    winCounter++;
    //TODO: Show Bootstrap alert (round won)
    checkForWin();
  } else if (numOfGuesses === 0) {
    lossCounter++;
    // Display chosenWord
    // TODO: Show Bootstrap alert (round lost)
    checkForWin();
  }
};

function checkForWin() {
  if (roundCounter === 3) {
    updateStatsUI();
    resetKeyboardUI();
    displayResetBtn();
    // TODO: Display Bootstrap alert (game over)
  } else {
    updateStatsUI();
    resetKeyboardUI();
    displayNextBtn();
  }
};

function resetGame() {
  roundCounter = 0;
  winCounter = 0;
  lossCounter = 0;
  numOfGuesses = 0;
  updateStatsUI();
  hideGameBtn(event);
  startRound();
};

// UI Functions
// ==================================================================================================

function updateWordUI() {
  $('#wordUI')
    .html(blanksAndSuccesses.join('&nbsp'))
    .removeClass('invisible')
    .addClass('visible')
};

function updateStatsUI() {
  $('#round').text(roundCounter);
  $('#wins').text(winCounter);
  $('#losses').text(lossCounter);
  $('#guesses').text(numOfGuesses);
};

function resetKeyboardUI() {
  $('.letterKey').removeClass('bg-danger bg-success text-white disabled').addClass('bg-light text-secondary');
};

// Hides gameBtn
function hideGameBtn(event) {
  $(event.target).addClass('invisible');
};

// Displays gameBtn as Next Btn
function displayNextBtn() {
  $('#gameBtn')
    .removeClass('invisible btn-info')
    .addClass('visible btn-secondary')
    .text('Next Round');
};

function displayResetBtn() {
  $('#gameBtn')
    .removeClass('invisible btn-secondary')
    .addClass('visible btn-info')
    .text('Reset');
};

function correctLetterToggle(btn) {
  $(btn)
    .removeClass('bg-light text-secondary')
    .addClass('bg-success text-white disabled');
};

function wrongLetterToggle(btn) {
  $(btn)
    .removeClass('bg-light text-secondary')
    .addClass('bg-danger text-white disabled');
};

// EVENT LISTENERS
// =================================================

// Game Button
$('#gameBtn').on('click', function (event) {
  // Hides Start Btn
  if (this.innerHTML === "Start") {
    roundCounter = 0;
    startRound();
    hideGameBtn(event);
  } else if (this.innerHTML === "Next Round") {
    // roundCounter++;
    startRound();
    hideGameBtn(event);
  } else if (this.innerHTML === "Reset") {
    resetGame(event);
  }
});

// Click letter
$('.letterKey').on('click', function (event) {
  let letterGuessed = event.target.innerHTML.toLowerCase();
  let btn = event.target;
  checkLetter(letterGuessed, btn);
  checkRoundStats();
});