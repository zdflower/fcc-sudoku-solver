/*
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
      const textArea = document.getElementById('text-input');
      textArea.value = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
      // Completo un hueco ----------v
      textArea.value = '1.5..2.84..63812.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
      
      Solver.handleTextInput();
      const celdas = document.getElementsByClassName("sudoku-input");
      const textoGrilla = convertirHTMLCollectionInputATxt(celdas);
      assert.equal(textoGrilla, textArea.value);
      done();
    });

    // Entering a valid number in the grid automatically updates
    // the puzzle string in the text area
    test('Valid number in grid updates the puzzle string in the text area', done => {
      const textArea = document.getElementById('text-input');
      textArea.value = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
      document.getElementById('B5').value = '8';
      Solver.handleGrillaTableroInput();
      const celdas = document.getElementsByClassName("sudoku-input");
      const textoGrilla = convertirHTMLCollectionInputATxt(celdas);
      assert.equal(textoGrilla, textArea.value);
      done();
    });
  });

  suite('Clear and solve buttons', () => {
    // Pressing the "Clear" button clears the sudoku 
    // grid and the text area
    test('Function clearInput(). function cleanBoard()', done => {
      const textArea = document.getElementById("text-input");
      const celdasGrillaTablero = document.getElementsByClassName("sudoku-input");
      const clearBtn = document.getElementById("clear-button");
      Solver.cleanBoard();
      assert.equal(esVacia(textArea.value), true);
      assert.equal(todas(celdasGrillaTablero, esVacia), true);
      done();
    });
    
    // Pressing the "Solve" button solves the puzzle and
    // fills in the grid with the solution
    test('Function showSolution(solve(input)): function solveSudokuHandler()', done => {
      const solveBtn = document.getElementById("solve-button");
      const textArea = document.getElementById("text-input");
      textArea.value = '.7.89.....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6'; // Es un puzzle con solución en la biblioteca de puzzles.
      Solver.solveSudokuHandler(); // Busca una solución y reemplaza con ella el texArea.value.
      const solution = '473891265851726394926345817568913472342687951197254638734162589685479123219538746';
      assert.equal(textArea.value, solution);
      const celdas = document.getElementsByClassName("sudoku-input");
      const textoGrilla = convertirHTMLCollectionInputATxt(celdas);
      assert.equal(textoGrilla, solution); 
      done();
    });
  });
  
  suite('Helpers para los tests', () => {
    test('Function esVacía()', done => {
      const str = "";
      const str2 = "Esta no es una cadena vacia.";
      assert.equal(esVacia(str), true);
      assert.equal(esVacia(str2), false);
      done();
    });
    
    test('Function todas()', done => {
      // La testeo con un array, aunque en el programa la uso con una HTMLCollection.
      const celdasArrayNoTodasVacias = [{"value": "."}, {"value": "4"}, {"value": ""}];
      const celdasArray = [{"value": ""}, {"value": ""}, {"value": ""}, {"value": ""}];
      assert.equal(todas(celdasArrayNoTodasVacias, esVacia), false, "No están todas vacías, debería dar false");
      assert.equal(todas(celdasArray, esVacia), true, "Están todas vacías, debería dar true.");
      done();
    });
  });
});

/* HTMLCollection Function_on_string -> Boolean
   celdas es HTMLCollection, resultado de document.getElementsByClassName('sudoku-input').
   El segundo parámetro es un predicado que debe cumplir cada celda. */
function todas(celdas, fn_str){
  let result = true;
  for (let i= 0; i < celdas.length; i++){
    const celda = celdas[i];
    result = result && fn_str(celda.value);
  }
  return result;
}

function esVacia(str){
  return str.length === 0;
}

/* HTMLCollection -> String
inputCollection es el conjunto de celdas de la grilla, producto de document.getElementsByClassName('sudoku-input')
Devuelve una cadena que contiene los valores de todos los elementos de inputCollection. */
function convertirHTMLCollectionInputATxt(inputCollection){
  let txt = "";
  for (let i = 0; i < inputCollection.length; i++){
     const input = inputCollection[i];
     if (input.value === "") txt += ".";
     else txt += input.value;
  }
  return txt;
}
