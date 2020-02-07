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

  //   - Update UI
  //     - Hide Start Btn
  //     - Update guesses left
  //     - Print blanks for word to guess
  //     - Clear correct and wrong guesses (change colors)
};


/* fillBlanks()
  - Loop length of numBlanks and fill blanksAndSuccesses arr with _
*/
function fillBlanks() {
  for (let i = 0; i < numBlanks; i++) {
    blanksAndSuccesses.push('_');
  }
};

/* checkLetter(letter)
  Data
    - Declare temp letterInWord variable (boolean)
    - Loop through length of numBlanks
      - if letter exists in chosenWord > toggle letterInWord to true (use in next if statement)
    - If letterInWord === true
      - Loop length of numBlanks again
        - If chosenword[j] === letter
          - blankAndSuccesses[j] = letter
          - push letter to correctGuesses arr
        - else
          - push letter to wrongGuesses arr
          - Decrement numofGuesses
*/


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
  console.log(event.target.innerHTML);

  // checkLetter()
  // checkRoundStats()
});

