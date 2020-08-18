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
      // escribir algo en el text area, que sea correcto, que cumpla las condiciones
      // ¿llamar al manejador de evento del text area? ¿o se activaría solo con lo anterior?
      // obtener las celdas, obtener la cadena, chequear que en la misma posición del contenido de textarea y en la cadena a partir de las celdas está el mismo valor.
      // done();
    });

    // Entering a valid number in the grid automatically updates
    // the puzzle string in the text area
    test('Valid number in grid updates the puzzle string in the text area', done => {
      // escribir algo correcto en una celda
      // debería activarse el manejador de eventos para las celdas.
      // chequear que se actualizó correctamente el text area.
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
      //simulateClick(clearBtn);
      //llamo al manejador directamente, ya que con simulateClick me da error: MouseEvent is not defined.
      Solver.cleanBoard();
      // assert: textArea.value o textContent o como se llame donde va el texto del textarea === ""
      assert.equal(esVacia(textArea.value), true);
      // assert: para toda celda de celdasGrillaTablero, el contenido de la celda va a ser ""
      assert.equal(todas(celdasGrillaTablero, esVacia), true);
      done();
    });
    
    // Pressing the "Solve" button solves the puzzle and
    // fills in the grid with the solution
    test('Function showSolution(solve(input))', done => {
      const solveBtn = document.getElementById("solve-button");
      // habría que poner un puzzle para resolver
      const textArea = document.getElementById("text-input");
      textArea.value = '.7.89.....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6'; // es un puzzle con solución en la biblioteca de puzzles.
      // algo similar al test de clearInput pero se va a partir de ingresar un puzzle en text area, clickear el boton solve, entonces vamos a hacer: 
      Solver.solveSudokuHandler(); //esto va a buscar una solución y la va a poner en texArea.value reemplazando el puzzle incompleto.
      const solution = '473891265851726394926345817568913472342687951197254638734162589685479123219538746';
      assert.equal(textArea.value, solution);
      // COMPLETAR: ---v
      // assert: el contenido de cada celda va a corresponder con cada número de la solución.
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
    // la testeo con un array, aunque en el programa la uso con una HTMLCollection.
      const celdasArrayNoTodasVacias = [{"value": "."}, {"value": "4"}, {"value": ""}];
      const celdasArray = [{"value": ""}, {"value": ""}, {"value": ""}, {"value": ""}];
      assert.equal(todas(celdasArrayNoTodasVacias, esVacia), false, "No están todas vacías, debería dar false");
      assert.equal(todas(celdasArray, esVacia), true, "Están todas vacías, debería dar true.");
      done();
    });
  });
});


/* https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events, modificado */

function simulateClick(btn) {
  const event = new MouseEvent('click', {view: window, bubbles: true, cancelable: true});
  btn.dispatchEvent(event);
}

// celdas es lo que te devuelve getElementsByClassName, que es como un array pero no lo es. Se llama HTMLCollection.
// me gustaría como segundo parámetro un predicado que es el que se aplicaría a cada celda para ver si lo cumple.
function todas(celdas, fn_str){
  let result = true;
  for (let i= 0; i < celdas.length; i++){
    const celda = celdas[i];
    result = result && fn_str(celda.value);
  }
  return result;
}

// ¿Cómo conviene chequearlo? ¿Por longitud igual a 0 o por igualdad con ""?
function esVacia(str){
  return str.length === 0;
}
