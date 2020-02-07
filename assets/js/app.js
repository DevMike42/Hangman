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


/* startRound()

  - Reset (speficic) game values for round
    > Set numOfGuesses
    > Set chosenWord > Computer choose random word from wordList
    > Break down chosenWord into chosenWordArr
    > set numBlanks to length of chosenWordArr
    > Reset blanksAndSuccesses to empty arr
    > Reset wrongGuesses to empty arr
    > Reset correctGuesses to empt att
    > Run fillBlanks function
  - Update UI
    - Hide Start Btn
    - Update guesses left
    - Print blanks for word to guess
    - Clear correct and wrong guesses (change colors)
*/

/* fillBlanks()
  - Loop length of numBlanks and fill blanksAndSuccesses arr with _
*/

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


// EVENT LISTENERS
// =================================================

// Start Button
  // startRound()

// Click letter
  // checkLetter()
  // checkRoundStats()

// Next Round Btn
  // startRound()

// Reset Button
  // resetGame()