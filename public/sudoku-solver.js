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

const LETRAS_FILAS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
const INPUT_ERROR_MSG = 'Error: Expected puzzle to be 81 characters long.';

const { obtenerFilasHelper, mostrarErrorMsg, isInputOk } = require('../helpers');

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
    crearNuevoPuzzle: (input) => {
      // input es String.
      // input es una cadena de 81 caracteres, válida para un puzzle sudoku.
      // Devuelve un objeto con filas del tablero.
      const puzzle = {};

      if (isInputOk(input)) {
        const filas = obtenerFilasHelper(input);
        try {
          LETRAS_FILAS.forEach((key, i) => {
            puzzle[key] = filas[i];
          // acá puede haber un error si filas no tiene la misma longitud que LETRAS_FILAS
          // me parece que no da error si no que simplemente le asigna undefined a cada clave.
          });
        } catch (error) {
          console.error(error);
        }
      } else {
        mostrarErrorMsg(INPUT_ERROR_MSG);
      }
      return puzzle;
    }
  }; // fin module.exports
} catch (e) {}

/*
COMENTARIOS

1)

En referencia al resultado de << crearNuevoPuzzle >>:

No sé qué tipo de objeto sería.

En el viewer se nombran las filas desde A hasta I.

>>>> PERO ¡OJO! que las columnas las numera desde 1 y no desde 0. <<<<

Para generar ese objeto, tal vez tendría que escribir una clase, y para las filas utilizar split.

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split

Para obtener un array con los caracteres de una cadena: cadena.split('')

2)

Me parece que crearNuevoPuzzle podría ser una función helper o incluso estar de más
porque para rellenar el tablero de index.html con los números para inicializarlo
no haría falta crear el objeto, si no que se puede utlizar un código similar que recorra
la lista de letras y las filas para acceder a las celdas y modificarles el valor si hay un número
o dejarlas vacías si hay un punto. Sería algo así como
por cada i; con i desde 0 hasta longitud de filas - 1:
  letra = letras[i]
  por cada fila, recorrer la fila con un índice j:
    entonces vas a armar la clase del elemento del dom a modificar así:
    clase = `${letra}${j}`
    celda = document.getElementByClass(clase)[0]; // o algo así
    celda.textContent = filas[i][j]; // le introducís el valor que corresponde.
Todo eso previo chequeo de que el input es válido.

3)
En qué momento se usaría la función isNumberBetweenOneAndNine()?
*/
