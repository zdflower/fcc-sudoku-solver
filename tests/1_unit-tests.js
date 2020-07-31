/*
 *
 *
 *       FILL IN EACH UNIT TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]----
 *       (if additional are added, keep them at the very end!)
 */

const chai = require('chai');

const assert = chai.assert;

const jsdom = require('jsdom');

const { JSDOM } = jsdom;
let Solver;

// helper
const { obtenerFilasHelper, isInputOk, obtenerUnBloque, obtenerBloques, obtenerColumnas, estaCompletoYSinRepetidos, estanTodosCompletosSinRepetidos } = require('../helpers');
//

suite('UnitTests', () => {
  suiteSetup(() => {
    // Mock the DOM for testing and load Solver
    return JSDOM.fromFile('./views/index.html')
      .then((dom) => {
        global.window = dom.window;
        global.document = dom.window.document;

        Solver = require('../public/sudoku-solver.js');
      });
  });

  // Only the digits 1-9 are accepted
  // as valid input for the puzzle grid
  suite('Function isNumberBetweenOneAndNine?(cellContent)', () => {
    test('Valid "1-9" characters', (done) => {
      const input = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
      input.forEach((item) => {
        assert.isOk(Solver.isNumberBetweenOneAndNine(item));
      });
      done();
    });

    // Invalid characters or numbers are not accepted
    // as valid input for the puzzle grid
    test('Invalid characters (anything other than "1-9") are not accepted', (done) => {
      const input = ['!', 'a', '/', '+', '-', '0', '10', 0, '.'];
      input.forEach((item) => {
        assert.isNotOk(Solver.isNumberBetweenOneAndNine(item));
      });
      done();
    });
  });

  suite('Function crearNuevoPuzzle()', () => {
    test('Parses a valid puzzle string into an object', done => {
      const input = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      const expectedPuzzle = {
                              "A": [".", ".", "9", ".", ".", "5", ".", "1", "."],
                              "B": ["8", "5", ".", "4", ".", ".", ".", ".", "2"],
                              "C": ["4", "3", "2", ".", ".", ".", ".", ".", "."],
                              "D": ["1", ".", ".", ".", "6", "9", ".", "8", "3"],
                              "E": [".", "9", ".", ".", ".", ".", ".", "6", "."],
                              "F": ["6", "2", ".", "7", "1", ".", ".", ".", "9"],
                              "G": [".", ".", ".", ".", ".", ".", "1", "9", "4"],
                              "H": ["5", ".", ".", ".", ".", "4", ".", "3", "7"],
                              "I": [".", "4", ".", "3", ".", ".", "6", ".", "."]
                              };

      assert.deepEqual(Solver.crearNuevoPuzzle(input), expectedPuzzle);
      done();
    });

    // Puzzles that are not 81 numbers/periods long show the message
    // "Error: Expected puzzle to be 81 characters long." in the
    // `div` with the id "error-msg"
    test('Shows an error for puzzles that are not 81 numbers long', done => {
      const shortStr = '83.9.....6.62.71...9......1945....4.37.4.3..6..';
      const longStr = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6...';
      const errorMsg = 'Error: Expected puzzle to be 81 characters long.';
      const errorDiv = document.getElementById('error-msg');

      Solver.crearNuevoPuzzle(shortStr);
      assert.equal(errorDiv.textContent, errorMsg);

      Solver.crearNuevoPuzzle(longStr);
      assert.equal(errorDiv.textContent, errorMsg);
      done();
    });
  });

  suite('Function ____()', () => {
    // Valid complete puzzles pass
    test('Valid puzzles pass', done => {
      const input = '769235418851496372432178956174569283395842761628713549283657194516924837947381625';
      const puzzle = obtenerFilasHelper(input);
      assert.isOk(estanTodosCompletosSinRepetidos(puzzle));
      done();
    });

    // Invalid complete puzzles fail
    test('Invalid puzzles fail', done => {
      const input = '779235418851496372432178956174569283395842761628713549283657194516924837947381625';
      const puzzle = obtenerFilasHelper(input);
      assert.isNotOk(estanTodosCompletosSinRepetidos(puzzle));
      done();
    });
  });

  suite('Function ____()', () => {
    // Returns the expected solution for a valid, incomplete puzzle
    test('Returns the expected solution for an incomplete puzzle', done => {
      const input = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';

      // done();
    });
  });

  /* Testeo funciones helper */

  suite('Function obtenerFilasHelper()', () => {
    test('Produce un array de arrays con las filas del puzzle', done => {
      const input = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      assert.isArray(obtenerFilasHelper(input));
      assert.lengthOf(obtenerFilasHelper(input), 9, 'Hay 9 filas');
      assert.lengthOf(obtenerFilasHelper(input)[0], 9, 'Cada fila tiene 9 columnas');
      // este va a dar error cuando el anterior no es verdadero, porque se pretende acceder a
      // una posición del array que tal vez no existe si obtenerFilasHelper(input) está vacío.
      done();
    });
  });

  suite('Function isInputOk()', () => {
    test('Devuelve true para un input válido de 81 caracteres', done => {
      const input = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      assert.isOk(isInputOk(input));
      done();
    });
  });

  suite('Función estaCompletoYSinRepetidos', () => {
          test('Reconoce que un array está completo y sin repetidos', done => {
            const input = ["1", "5", "7", "3", "9", "4", "6", "2", "8"];
            assert.isOk(estaCompletoYSinRepetidos(input));
            done();
          });

          test('Reconoce que un array NO está completo', done => {
            const input = ["1", ".", ".", ".", "9", ".", "6", "2", "."];
            assert.isNotOk(estaCompletoYSinRepetidos(input));
            done();
          });

          test('Reconoce que un array NO está completo y TIENE repetidos', done => {
            const input = ["1", "9", "4", "3", "9", ".", "6", "2", "."];
            assert.isNotOk(estaCompletoYSinRepetidos(input));
            done();
          });

          test('Reconoce que un array TIENE repetidos', done => {
            const input = ["1", "9", "5", "3", "7", "8", "6", "2", "5"];
            assert.isNotOk(estaCompletoYSinRepetidos(input));
            done();
          });

  });

suite('Función estánTodosCompletosYSinRepetidos', () => {
  test('Reconoce que el puzzle está completo y sin repetidos', done => {
    const input = '769235418851496372432178956174569283395842761628713549283657194516924837947381625';
    const puzzle = obtenerFilasHelper(input);
    assert.isOk(estanTodosCompletosSinRepetidos(puzzle));
    done();
  });
});

  suite('Function obtenerUnBloque()', () => {
    test('Obtiene un bloque que comienza en celda_i y termina en celda_f', done => {
      const grilla = [        [".", ".", "9", ".", ".", "5", ".", "1", "."],
                              ["8", "5", ".", "4", ".", ".", ".", ".", "2"],
                              ["4", "3", "2", ".", ".", ".", ".", ".", "."],
                              ["1", ".", ".", ".", "6", "9", ".", "8", "3"],
                              [".", "9", ".", ".", ".", ".", ".", "6", "."],
                              ["6", "2", ".", "7", "1", ".", ".", ".", "9"],
                              [".", ".", ".", ".", ".", ".", "1", "9", "4"],
                              ["5", ".", ".", ".", ".", "4", ".", "3", "7"],
                              [".", "4", ".", "3", ".", ".", "6", ".", "."]];
      const inicio = [3, 0];
      const fin = [5, 2];
      const expected = ["1", ".", ".", ".", "9", ".", "6", "2", "."];
      assert.deepEqual(obtenerUnBloque(inicio, fin, grilla), expected);
      done();
    });
  });

  suite('Function obtenerBloques()', () => {
    test('Obtiene todos los bloques de una grilla', done => {
      const grilla = [        [".", ".", "9", ".", ".", "5", ".", "1", "."],
                              ["8", "5", ".", "4", ".", ".", ".", ".", "2"],
                              ["4", "3", "2", ".", ".", ".", ".", ".", "."],

                              ["1", ".", ".", ".", "6", "9", ".", "8", "3"],
                              [".", "9", ".", ".", ".", ".", ".", "6", "."],
                              ["6", "2", ".", "7", "1", ".", ".", ".", "9"],

                              [".", ".", ".", ".", ".", ".", "1", "9", "4"],
                              ["5", ".", ".", ".", ".", "4", ".", "3", "7"],
                              [".", "4", ".", "3", ".", ".", "6", ".", "."]];
      const expected = [
                        [".", ".", "9", "8", "5", ".", "4", "3", "2"],
                        [".", ".", "5", "4", ".", ".", ".", ".", "."],
                        [".", "1", ".", ".", ".", "2", ".", ".", "."],
                        ["1", ".", ".", ".", "9", ".", "6", "2", "."],
                        [".", "6", "9", ".", ".", ".", "7", "1", "."],
                        [".", "8", "3", ".", "6", ".", ".", ".", "9"],
                        [".", ".", ".", "5", ".", ".", ".", "4", "."],
                        [".", ".", ".", ".", ".", "4", "3", ".", "."],
                        ["1", "9", "4", ".", "3", "7", "6", ".", "."]
                       ];
      assert.deepEqual(obtenerBloques(grilla), expected);
      done();
    });
  });

  suite("Función obtenerColumnas", () => {
    test('Obtiene todas las columnas de la grilla', done => {
       const grilla = [        [".", ".", "9", ".", ".", "5", ".", "1", "."],
                              ["8", "5", ".", "4", ".", ".", ".", ".", "2"],
                              ["4", "3", "2", ".", ".", ".", ".", ".", "."],

                              ["1", ".", ".", ".", "6", "9", ".", "8", "3"],
                              [".", "9", ".", ".", ".", ".", ".", "6", "."],
                              ["6", "2", ".", "7", "1", ".", ".", ".", "9"],

                              [".", ".", ".", ".", ".", ".", "1", "9", "4"],
                              ["5", ".", ".", ".", ".", "4", ".", "3", "7"],
                              [".", "4", ".", "3", ".", ".", "6", ".", "."]];
      const expectedCols = [[".", "8", "4", "1", ".", "6", ".", "5", "."],
                        [".", "5", "3", ".", "9", "2", ".", ".", "4"],
                        ["9", ".", "2", ".", ".", ".", ".", ".", "."],
                        [".", "4", ".", ".", ".", "7", ".", ".", "3"],
                        [".", ".", ".", "6", ".", "1", ".", ".", "."],
                        ["5", ".", ".", "9", ".", ".", ".", "4", "."],
                        [".", ".", ".", ".", ".", ".", "1", ".", "6"],
                        ["1", ".", ".", "8", "6", ".", "9", "3", "."],
                        [".", "2", ".", "3", ".", "9", "4", "7", "."]
                       ];
      const columnas = obtenerColumnas(grilla);
      assert.deepEqual(columnas, expectedCols);
      done();
    });
  });

});

/*

COMENTARIOS

1) sobre  test('Shows an error for puzzles that are not 81 numbers long'):

    const errorDiv = document.getElementById('error-msg'); // esto me confunde acerca de lo que
      // debe hacer la función que estoy testeando
      // porque parece implicar que tiene que modificar este div?

      // en algún momento habrá que agregar event listeners?

      // ¿no tendría que ir en la parte de test funcional?
      // ¿?

      // ¿o tendría que ser otra función aparte de crearNuevoPuzzle que muestre el mensaje de error?

      // ¿Tendrías que primero llamar a Solver.crearNuevoPuzzle(shortStr)
      // suponiendo que ahora crearNuevoPuzzle también actualiza el view?
      // y después ver si en errorDiv está errorMsg?
      // assert.equals(Solver.crearNuevoPuzzle(shortStr), errorMsg)
      // done();

      // Voy a escribir un test, sin importarme la manipulación del dom, voy viendo
      // si no no avanzo para nada y no tiene sentido.

      // o tal vez hacer eso que dije antes, de que crearNuevoPuzzle use una función que modifique
      // el error div, entonces primero llamo a crearNuevoPuzzle y después comparo el contenido
      // de errordiv con errormsg

      // Hay algo que no me cierra, que no veo, lo que yo veo es que por un lado tendría que estar
      // este crearNuevoPuzzle y por otro lado la función que testea si el input es válido,
      // que en todo caso la usaría crearNuevoPuzzle antes de hacer su trabajo, no sé.
      // porque si no no estarías haciendo un test unitario.
      // no entiendo esta suit de test, se supone que una suit es un conjunto de tests para una
      // misma función, acá parecieran testearse distintas funciones o una función que hace
      // distintas cosas, lo cual no es tan unitario...
*/
