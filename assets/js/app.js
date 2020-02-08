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

  $('#wordUI')
    .html(blanksAndSuccesses.join('&nbsp'))
    .removeClass('invisible')
    .addClass('visible')

  $('#round').text(roundCounter);
  $('#wins').text(winCounter);
  $('#losses').text(lossCounter);
  $('#guesses').text(numOfGuesses);

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
        // $(btn).text('FFF');


      }
    }
    console.log(blanksAndSuccesses);
  } else {
    wrongGuesses.push(letter);
    wrongLetterToggle(btn);
    numOfGuesses--;

  }
};

/* checkRoundStats()
  Data
    - Compare lettersInChosenWord and blanksAndSuccesses
      If match = WIN
        - Increment winCounter
        - Update UI
          > guesses left
          > wins
          > Display Bootstrap alert (win)
        - Check round counter
          If not = 5
            > Display Next Round Btn
      Else (if numOfGuesses = 0) = LOSS
        - Increment lossCounter
        - Update UI
          > guesses left
          > losses
          > Display bootstrap alert (loss)
        - Check round counter
          If = 5
            > Display Restart Btn
*/


/* resetGame()
  - Reset game counters
  - empty game arrays
  - Update UI
    > Clear btn colors
    > Show Start btn
    > Show Instructions
*/

// Hides gameBtn
function hideGameBtn(event) {
  $(event.target).addClass('invisible');
}

// Displays gameBtn as Next Btn
function displayNextBtn() {
  $('.gameBtn')
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
$('.gameBtn').on('click', function (event) {
  // Hides Start Btn
  if (this.innerHTML === "Start") {
    roundCounter = 0;


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


  // checkLetter()
  // checkRoundStats()
});

