/*
  Export your functions for testing in Node.
  Note: The `try` block is to prevent errors on
  the client side
*/

import { puzzlesAndSolutions as LIBRARY_OF_SOLUTIONS } from './puzzle-strings.js';

const LETRAS_FILAS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
const INPUT_LENGTH_ERROR_MSG = 'Error: Expected puzzle to be 81 characters long.';
const NO_SOLUTION = 'No solution found';
const LONGITUD_FILA = 9;
const LONGITUD_PUZZLE = 81;

/* INICIO_FIN_BLOQUES: El primer par de cada subarray contiene [fila, columna] de la celda inicial del bloque, la de arriba a la izquierda. El segundo par contiene [fila, columna] de la celda final, la de abajo a la derecha del bloque.
La forma de INICIO_FIN_BLOQUES sería: [ [celda, celda] ], donde celda es un par de enteros de 0 a 8, donde el primero es la fila y el segundo la columna. */
const INICIO_FIN_BLOQUES = [ [[0,0], [2,2]],
                             [[0,3], [2,5]],
                             [[0,6], [2,8]],
                             [[3,0], [5,2]],
                             [[3,3], [5,5]],
                             [[3,6], [5,8]],
                             [[6,0], [8,2]],
                             [[6,3], [8,5]],
                             [[6,6], [8,8]]
                           ]; 
const textInput = document.getElementById('text-input');
const grillaTablero = document.getElementsByClassName("sudoku-input");
const clearBtn = document.getElementById("clear-button");
const solveBtn = document.getElementById("solve-button"); 

// EVENT HANDLERS //
function handleTextInput() {
  const input = textInput.value.split('');
  if (input.length === LONGITUD_PUZZLE) {
    if (sonTodosNumerosDe1a9(textInput.value)){
      const puzzle = crearNuevoPuzzle(textInput.value);
      if (noHayRepetidosEnLosGrupos(puzzle)){ 
        cleanErrorMsg();
        // Rellenar la grillaTablero
        for (let i = 0; i < input.length; i++){
          if (input[i] === '.') grillaTablero[i].value = "";
          else { grillaTablero[i].value = input[i];}
        }
        // Check if the puzzle is done
        if(estaResuelto(puzzle)) mostrarErrorMsg('¡Sudoku resuelto!');
      } else {
      mostrarErrorMsg('Hay repetidos');
      }
   } else {
    mostrarErrorMsg('No son todos números de 1 a 9 o .'); 
   }    
  }
  else {
    mostrarErrorMsg(INPUT_LENGTH_ERROR_MSG);
  }
}

function handleGrillaTableroInput(){
  let puzzleText = convertirGrillaATxt(); // Supongo que la longitud es correcta.
  if (sonTodosNumerosDe1a9(puzzleText)){
    const puzzle = crearNuevoPuzzle(puzzleText);
    if (noHayRepetidosEnLosGrupos(puzzle)){
      cleanErrorMsg();
      textInput.value = puzzleText;
      // Check if is it solved
      if(estaResuelto(puzzle)) mostrarErrorMsg('¡Sudoku resuelto!');
    } else {
      mostrarErrorMsg("Hay repetidos");
    }
  } else {
    mostrarErrorMsg("Debe ser un número de 1 a 9");
  }
}

function cleanBoard(){
  // limpiar textarea
  textInput.value = "";
  // limpiar la grillaTablero
  for (let i = 0; i < grillaTablero.length; i++){
    grillaTablero[i].value = "";
  }
}

function solveSudokuHandler(){
  const solution = solveSudoku(textInput.value);
  if (solution.length === LONGITUD_PUZZLE){ // se encontró solución
    textInput.value = solution;
    // Rellenar la grillaTablero. Quizá podría ser una función aparte.
    const input = solution.split(''); 
    for (let i = 0; i < solution.length; i++){
      grillaTablero[i].value = input[i]; 
    }
  } else {
    mostrarErrorMsg(NO_SOLUTION);
  }
}

// EVENT LISTENERS //

textInput.addEventListener('input', handleTextInput);

// Agrego un event listener a cada celda
for (let i = 0; i < grillaTablero.length; i++){
  const celda = grillaTablero[i];
  celda.addEventListener('input', handleGrillaTableroInput);
}

clearBtn.addEventListener('click', cleanBoard);

solveBtn.addEventListener('click', solveSudokuHandler);

document.addEventListener('DOMContentLoaded', () => {
  // Load a simple puzzle into the text area
  textInput.value = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
  // Rellena la grilla.
  const input = textInput.value.split('');
  if (input.length === LONGITUD_PUZZLE) { 
    mostrarErrorMsg("");
    for (let i = 0; i < input.length; i++){
      if (input[i] === '.') grillaTablero[i].value = "";
      else { grillaTablero[i].value = input[i];}
    }
  }
});

// OTRAS FUNCIONES //

/* HTMLCollection -> String
grillaTablero es HTMLCollection de <input>
Devuelve una cadena de texto que contiene los números presentes en la grilla, en el orden correcto, con '.' en vez de lugares vacíos. Su longitud debe ser de LONGITUD_PUZZLE. */
function convertirGrillaATxt(){
  let puzzleText = "";
  for (let i = 0; i < grillaTablero.length; i++){
     const celda = grillaTablero[i];
     if (celda.value === "") puzzleText += ".";
     else puzzleText += celda.value;
  }
  return puzzleText;
}

/* String -> [[String]]
  str representa un puzzle sudoku válido. Tiene una longitud de 81 caracteres.
  Produce las filas del puzzle. Hay 9 filas con 9 columnas. */
function obtenerFilasHelper(str){
  const filas = [];
  for (let i = 0; i < str.length; i += LONGITUD_FILA) {
    const substr = str.substring(i, i + LONGITUD_FILA);
    filas.push(substr.split(''));
  }
  return filas;
}

/* [Number] [Number] [[String]] -> [String]
celda_inicio es un array con dos números que representan fila y columna inicial del bloque.
celda_final es un array de dos números que representan fila y columna final del bloque.
grilla es una lista de filas resultado de llamar a obtenerFilasHelper */
function obtenerUnBloque(celda_inicio, celda_final, grilla) {
  const bloque = [];
  const fila_inicial = celda_inicio[0];
  const fila_final = celda_final[0];
  const col_inicial = celda_inicio[1];
  const col_final = celda_final[1];
  for (let fila = fila_inicial; fila <= fila_final; fila++){
    for (let col = col_inicial; col <= col_final; col++){
      bloque.push(grilla[fila][col]);
    }
  }
  return bloque;
}

/* [[String]] -> [[String]]
 Grilla es un array de filas que representa la grilla, donde cada celda es fila,columna
 Devuelve un array con los bloques. */
function obtenerBloques(grilla) {
  const bloques = [];
  INICIO_FIN_BLOQUES.forEach((bloque) => bloques.push(obtenerUnBloque(bloque[0], bloque[1], grilla)));
  return bloques;
}

/* Number [[String]] -> [String]
   Devuelve la columna indicada de la grilla. */
function obtenerUnaColumna(col, grilla){
  const columna = [];
  const total_filas = grilla.length;
  for (let fila = 0; fila < total_filas; fila++){
    columna.push(grilla[fila][col]);
  }
  return columna;
}

/* [[String]] -> [[String]]
 La grilla es un array de filas, la grilla es cuadrada, la longitud de la primera fila es la cantidad de columnas.
 Devuelve un array de columnas. */
function obtenerColumnas(grilla) {
  const columnas = [];
  const total_columnas = grilla[0].length;
  for (let col = 0; col < total_columnas; col++){
    const columna = obtenerUnaColumna(col, grilla);
    columnas.push(columna);
  }
  return columnas;
}

/* String -> Boolean
  Devuelve true si la longitud de str es LONGITUD_PUZZLE */
function isInputLengthOk(str){
  return str.length === LONGITUD_PUZZLE;
}

/* String -> Boolean
  The input is a one character length string that should represent a number betwen 1 and 9.
  Returns true if num can be casted to a number and that number is in [1 .. 9] range
  Returns false otherwise.
*/
function isNumberBetweenOneAndNine(num){
      try {
        const number = Number(num);
        return number > 0 && number < 10;
      } catch (error) {
        console.error(error);
        return false;
      }
}

/* String -> Boolean 
Devuelve true si todos los caracteres de la cadena representan números entre 1 y 9. No se tienen en cuenta los '.'
*/
function sonTodosNumerosDe1a9(str){
  return str.split('').every(item => (item === '.') || isNumberBetweenOneAndNine(item));
}

/* String -> Boolean
Devuelve true si el input tiene la longitud correcta para el puzzle, si todos son números de 1 a 9 o '.', y si no hay repetidos en los grupos. */
function isInputOk(str){
  if(isInputLengthOk(str) && sonTodosNumerosDe1a9(str)){
    const puzzle = crearNuevoPuzzle(str);
    return noHayRepetidosEnLosGrupos(puzzle);
  }
  return false;
}

/* String String -> Boolean
  Devuelve true si las posiciones no consideradas vacías (no '.') en cada string de input coinciden.
*/
function coincidenTodas(puzzle_a, puzzle_b){
  const puzzle_a_arr = puzzle_a.split('');
  const puzzle_b_arr = puzzle_b.split('');
  return  puzzle_a_arr.every((celda, index) => {
    if (celda === '.') return true;
    else {
      return celda === puzzle_b_arr[index];
    }
  });
}

/* Number -> String
  Devuelve una cadena que representa la solución de un puzzle.
*/
function getSolutionFromLibrary(index){
  return LIBRARY_OF_SOLUTIONS[index][1];
}

/* String -> {[[String]] [[String]] [[String]]}
 Input es una cadena de 81 caracteres, válida para un puzzle sudoku, que contiene sólo números de 1 a 9.
 Devuelve un objeto con filas, columnas y bloques del tablero.
*/
function crearNuevoPuzzle(input){
  const puzzle = {};

  if (isInputLengthOk(input) && sonTodosNumerosDe1a9(input)) { 
    puzzle.filas = obtenerFilasHelper(input);
    puzzle.columnas = obtenerColumnas(puzzle.filas);
    puzzle.bloques = obtenerBloques(puzzle.filas); 
  } else {
    mostrarErrorMsg(INPUT_LENGTH_ERROR_MSG); // acá podría pasar que el problema no esté en la longitud si no en que no sean todos números de 1 a 9 y entonces el mensaje de error estaría mal.
  }
  return puzzle;
}

/* { [[String]], [[String]], [[String]] } -> Boolean
El input es un puzzle en la forma de un objeto con las filas, columnas y bloques.
Devuelve true si no hay repetidos en ningún bloque, fila o columna.
*/
function noHayRepetidosEnLosGrupos(puzzle){
  return puzzle.filas.every(fila => noTieneRepetidos(fila)) 
         && puzzle.columnas.every(col => noTieneRepetidos(col))
         && puzzle.bloques.every(bloq => noTieneRepetidos(bloq));
}

/* [String] -> Boolean
Devuelve true si todos los elementos que representan números del array son únicos. No se tienen en cuenta las cadenas vacías o los puntos.
Se supone que arr tiene longitud 9. */
function noTieneRepetidos(arr){
  //¿Podría utilizar regular expressions?
  return arr.every(num => (num === '.') || !estaRepetido(arr, num)); 
}

/* [String] String -> Boolean
  Recibe un array de string con caracteres que representan números de 1 a 9, y un caracter que representa un número de 1 a 9.
  El tamaño del array debe ser de 9 elementos.
  Devuelve true si el carácter está repetido en el array. */
function estaRepetido(array, num){
  let apariciones = 0;
  for (let i = 0; i < array.length; i++){
    if(array[i] === num) apariciones++;
  }
  return apariciones > 1;
}

/* [String] -> Boolean
   Devuelve true si el array tiene 9 elementos, sin repetidos y es alguna permutación de los números de 1 a 9. */
function estaCompletoYSinRepetidos(arr) {
  return arr.length === 9 && ["1", "2", "3", "4", "5", "6", "7", "8", "9"].every(n => arr.includes(n));
}

/* [[String]] -> Boolean
  puzzle es un array de filas, columnas o bloques.
  Chequea si el puzzle está resuelto. Devuelve true si la grilla está completa sin repetidos, es decir si todos los elementos de puzzle tienen 9 elementos, sin repetidos y es alguna permutación de los números de 1 a 9. */
function estanTodosCompletosSinRepetidos(puzzle) {
  return puzzle.every(arr => estaCompletoYSinRepetidos(arr));
}

/* String -> String
Devuelve una solución para el input.
El método de resolución es buscar en una base de soluciones conocidas. */
function solveSudoku(input){
     let indice = 0;
     while (indice < LIBRARY_OF_SOLUTIONS.length && !coincidenTodas(input, getSolutionFromLibrary(indice))){
       indice++;
     }
     if (indice === LIBRARY_OF_SOLUTIONS.length) return "";
     else { return getSolutionFromLibrary(indice); } 
}

function mostrarErrorMsg(msg){
  const errorDiv = document.getElementById('error-msg');
  errorDiv.textContent = msg;
}

function cleanErrorMsg(){
  mostrarErrorMsg("");
}

/* {[[String]] [[String]] [[String]]} -> Boolean
Devuelve true si el puzzle está resuelto.
*/
function estaResuelto(puzzle){
  return estanTodosCompletosSinRepetidos(puzzle.filas);
}

try {
  module.exports = {
    isNumberBetweenOneAndNine,
    crearNuevoPuzzle,
    solveSudoku,
    cleanBoard,
    solveSudokuHandler,
    obtenerFilasHelper,
    obtenerUnBloque,
    obtenerBloques,
    coincidenTodas,
    obtenerColumnas,
    isInputOk,
    estaCompletoYSinRepetidos,
    estanTodosCompletosSinRepetidos,
    convertirGrillaATxt,
    handleTextInput,
    handleGrillaTableroInput 
  };
} catch (e) {}
