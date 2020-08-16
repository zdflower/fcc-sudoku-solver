/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

const chai = require("chai");
const assert = chai.assert;

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
let Solver;

suite('Functional Tests', () => {
  suiteSetup(() => {
    // DOM already mocked -- load sudoku solver then run tests
    Solver = require('../public/sudoku-solver.js');
  });
  
  suite('Text area and sudoku grid update automatically', () => {
    // Entering a valid number in the text area populates 
    // the correct cell in the sudoku grid with that number
    test('Valid number in text area populates correct cell in grid', done => {

      // done();
    });

    // Entering a valid number in the grid automatically updates
    // the puzzle string in the text area
    test('Valid number in grid updates the puzzle string in the text area', done => {

      // done();
    });
  });

  suite('Clear and solve buttons', () => {
    // Pressing the "Clear" button clears the sudoku 
    // grid and the text area
    test('Function clearInput()', done => {
      const textArea = document.getElementById("text-input");
      const celdasGrillaTablero = document.getElementsByClassName("sudoku-input");
      const clearBtn = document.getElementById("clear-button");
      // simular evento de click
      // https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events
      // si en algún momento entiendo cómo simular el click del botón clear, el test sería algo así:
      // click
      // assert: textArea.value o textContent o como se llame donde va el texto del textarea === ""
      // assert: para toda celda de celdasGrillaTablero, el contenido de la celda va a ser ""
      // done();
    });
    
    // Pressing the "Solve" button solves the puzzle and
    // fills in the grid with the solution
    test('Function showSolution(solve(input))', done => {
      const solveBtn = document.getElementById("solve-button");
      // algo similar al test de clearInput pero se va a partir de ingresar un puzzle en text area, clickear el boton solve, entonces vamos a hacer: 
      // assert: el contenido de textarea va a ser la solución
      // assert: el contenido de cada celda va a corresponder con cada número de la solución.
      // done();
    });
  });
});



