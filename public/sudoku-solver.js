const textArea = document.getElementById('text-input');
// import { puzzlesAndSolutions } from './puzzle-strings.js';

document.addEventListener('DOMContentLoaded', () => {
  // Load a simple puzzle into the text area
  textArea.value = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
});

/*
  Export your functions for testing in Node.
  Note: The `try` block is to prevent errors on
  the client side
*/
try {
  module.exports = {

    isNumberBetweenOneAndNine: (cellContent) => {
      // cellContent is String, ideally, a one character length string representing a number betwen
      // 1 and 9.
      // Returns true if cellContent can be casted to a number and that number is in [1 .. 9] range
      // Returns false otherwise.
      // Reflections:
      // Maybe it should check that the number is integer? That depends on cellContent, if it is
      // just a character, then the number can't have decimal part other than 0.

      try {
        const number = Number(cellContent);
        return number > 0 && number < 10;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
  }
} catch (e) {}
