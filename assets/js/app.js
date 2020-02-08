// GLOBAL VARIABLES
// =================================================

// Tracks start and reset of game
let isGameRunning = false;
// Array of words for game
const wordList = ['nacho', 'ramsees', 'incarnacio'];
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
let numOfGuesses = 10;
let roundCounter = 0;


// FUNCTIONS
// =================================================


// startRound()
function startRound() {

  numOfGuesses = 10;
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

  // TODO: Clear button backgrounds and remove disabled classes
};


// Fills blanks for word to be displayed each round start
function fillBlanks() {
  for (let i = 0; i < numBlanks; i++) {
    blanksAndSuccesses.push('_');
  }
};

function checkLetter(letter, btn) {
  //     - Declare temp letterInWord variable (boolean)
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
    console.log(blanksAndSuccesses);
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
    //TODO: Show Bootstrap alert
    updateStatsUI();
    resetKeyBoardUI();
    // TODO: Display next btn
    displayNextBtn();
  } else if (numOfGuesses === 0) {
    lossCounter++;
    // TODO: Show Bootstrap alert
    updateStatsUI();
    resetKeyBoardUI();
    // TODO: Display next btn
    displayNextBtn();
  }


};

/* resetGame()
  - Reset game counters
  - empty game arrays
  - Update UI
    > Clear btn colors
    > Show Start btn
    > Show Instructions
*/

function updateWordUI() {
  $('#wordUI')
    .html(blanksAndSuccesses.join('&nbsp'))
    .removeClass('invisible')
    .addClass('visible')
}

function updateStatsUI() {
  $('#round').text(roundCounter);
  $('#wins').text(winCounter);
  $('#losses').text(lossCounter);
  $('#guesses').text(numOfGuesses);
}

function resetKeyBoardUI() {
  $('.letterKey').removeClass('bg-danger bg-success text-white disabled').addClass('bg-light text-secondary');
}

// Hides gameBtn
function hideGameBtn(event) {
  $(event.target).addClass('invisible');
}

// Displays gameBtn as Next Btn
function displayNextBtn() {
  $('#gameBtn')
    .removeClass('invisible btn-info')
    .addClass('visible btn-secondary')
    .text('Next Round');
}

function correctLetterToggle(btn) {
  $(btn)
    .removeClass('bg-light text-secondary')
    .addClass('bg-success text-white disabled');
}

function wrongLetterToggle(btn) {
  $(btn)
    .removeClass('bg-light text-secondary')
    .addClass('bg-danger text-white disabled');
}



// EVENT LISTENERS
// =================================================

// Start Button
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
  }



  // startRound()

  // Next Round Btn
  // startRound()

  // Reset Button
  // resetGame()
});

// Click letter
$('.letterKey').on('click', function (event) {

  // console.log(event.target);
  let letterGuessed = event.target.innerHTML.toLowerCase();

  let btn = event.target;


  checkLetter(letterGuessed, btn);

  checkRoundStats();

  // checkLetter()
  // checkRoundStats()
});

