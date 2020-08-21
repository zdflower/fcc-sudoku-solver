/* ToDo:
- Revisar código duplicado o redundante.
- Revisar código no utilizado e innecesario. 
*/

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

const INICIO_FIN_BLOQUES = [ [[0,0], [2,2]],
	                     [[0,3], [2,5]],
	                     [[0,6], [2,8]],
                             [[3,0], [5,2]],
	                     [[3,3], [5,5]],
	                     [[3,6], [5,8]],
	                     [[6,0], [8,2]],
	                     [[6,3], [8,5]],
	                     [[6,6], [8,8]]
                           ]; // el primer par de cada subarray contiene fila y columna de la celda inicial del bloque, arriba a la izquierda
                              // el segundo par contiene fila y columna de la celda final, abajo a la derecha.

const textInput = document.getElementById('text-input');

const grillaTablero = document.getElementsByClassName("sudoku-input");
 
const clearBtn = document.getElementById("clear-button");
const solveBtn = document.getElementById("solve-button"); 

// Manejadores de eventos //

// Responde a la introducción de texto en el textarea
function handleTextInput() {
  const input = textInput.value.split('');
  if (input.length === LONGITUD_PUZZLE) {
  /*************************** REVISAR Y REESCRIBIR ESTA MARAñA ******************************/
    if (sonTodosNumerosDe1a9(textInput.value)){
      const puzzle = crearNuevoPuzzle(textInput.value);
      if (noHayRepetidosEnLosGrupos(puzzle)){ 
        cleanErrorMsg();
        // Rellenar la grillaTablero
        for (let i = 0; i < input.length; i++){
          if (input[i] === '.') grillaTablero[i].value = "";
          else { grillaTablero[i].value = input[i];}
        }
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

/*******************REVISAR Y REESCRIBIR************************************/
// Responde a la introducción de texto en las celdas de la grilla
function handleGrillaTableroInput(){
  let puzzleText = convertirGrillaATxt(); //supongo que la longitud es correcta, ya que la cantidad de celdas es la correcta, pero quizá debería chequear igual, no?
  if (sonTodosNumerosDe1a9(puzzleText)){
    const puzzle = crearNuevoPuzzle(puzzleText);
    if (noHayRepetidosEnLosGrupos(puzzle)){
      cleanErrorMsg();
      textInput.value = puzzleText;
    } else {
      mostrarErrorMsg("Hay repetidos");
    }
  } else {
    mostrarErrorMsg("Debe ser un número de 1 a 9");
  }
}

function convertirGrillaATxt(){
  let puzzleText = "";
  for (let i = 0; i < grillaTablero.length; i++){
     const celda = grillaTablero[i];
     if (celda.value === "") puzzleText += ".";
     else puzzleText += celda.value;
  }
  return puzzleText;
}

function convertirHTMLCollectionInputATxt(inputCollection){
  let txt = "";
  for (let i = 0; i < inputCollection.length; i++){
     const input = inputCollection[i];
     if (input.value === "") txt += ".";
     else txt += input.value;
  }
  return txt;
}

function cleanBoard(){
  // limpiar textarea
  textInput.value = "";
  // limpiar la grillaTablero
  for (let i = 0; i < grillaTablero.length; i++){
    grillaTablero[i].value = "";
  }
}

function cleanErrorMsg(){
  mostrarErrorMsg("");
}

function solveSudokuHandler(){
  const solution = solveSudoku(textInput.value);
  if (solution.length === LONGITUD_PUZZLE){ // se encontró solución
    textInput.value = solution;
    // rellenar la grillaTablero.
    // quizá tendría que ubicar en funciones aparte parte del código de los manejadores de evento para grilla y para textinput
    // que también se podrían utilizar acá.
    const input = solution.split(''); 
    for (let i = 0; i < solution.length; i++){
      grillaTablero[i].value = input[i]; 
    }
  } else {
    mostrarErrorMsg(NO_SOLUTION);
  }
}

////////////// AGREGO LOS EVENT LISTENERS ////////////////////

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

function obtenerFilasHelper(str){
  // str es String.
  // str representa un puzzle sudoku válido.
  // Tiene una longitud de 81 caracteres.
  // El resultado es un Array de [String]
  // Cada elemento del resultado contiene un Array de 9 caracteres.
  // El resultado tiene 9 elementos y cada elemento a su vez tiene 9 elementos.

  const filas = [];
  for (let i = 0; i < str.length; i += LONGITUD_FILA) {
    // console.error(`i: ${i}, i + LONGITUD_FILA: ${i + LONGITUD_FILA}`);
    const substr = str.substring(i, i + LONGITUD_FILA);
    // console.error(`substr: ${substr}`);
    filas.push(substr.split(''));
  }
  return filas;
}

/* grilla = una lista de filas producto de obtenerFilasHelper */
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

/* Array de filas -> Array de bloques
 Grilla es un array que representa la grilla, donde cada celda es fila,columna
 Devuelve un array con los bloques.
*/
function obtenerBloques(grilla) {
  // para cada bloque en inicio_fin_bloques
  // recorrés grilla desde bloque[0][0] hasta bloque[1][0], es decir desde fila inicio hasta fila final
  // y para cada fila recorrés las columnas desde inicio hasta final: bloque[0][1] hasta bloque[1][1]

  // para cada inicio_fin_bloque obtener un bloque
  const bloques = [];
  INICIO_FIN_BLOQUES.forEach((bloque) => bloques.push(obtenerUnBloque(bloque[0], bloque[1], grilla)));
  return bloques;
}

function obtenerUnaColumna(col, grilla){
  const columna = [];
  const total_filas = grilla.length;
  for (let fila = 0; fila < total_filas; fila++){
    columna.push(grilla[fila][col]);
  }
  return columna;
}

/* Array -> Array
 La grilla es un array de filas, la grilla es cuadrada, la longitud de la primera fila es la cantidad de columnas.
 Devuelve un array de columnas.
 */
function obtenerColumnas(grilla) {
  const columnas = [];
  const total_columnas = grilla[0].length;   for (let col = 0; col < total_columnas; col++){
    const columna = obtenerUnaColumna(col, grilla);
    columnas.push(columna);
  }
  return columnas;
}

function estaCompletoYSinRepetidos(arr) {
  // Acá podría chequear que la longitud de arr sea 9 y que en arr esté el 1, el 2, el 3, ..., el 9.
  return arr.length === 9 && ["1", "2", "3", "4", "5", "6", "7", "8", "9"].every(n => arr.includes(n));
}

function estanTodosCompletosSinRepetidos(puzzle) {
  // puzzle es un array de arrays, que pueden ser filas, columnas o bloques
  // Chequea si el puzzle está resuelto. Devuelve true si la grilla está completa sin repetidos.
  return puzzle.every(arr => estaCompletoYSinRepetidos(arr));
}

function mostrarErrorMsg(msg){
  const errorDiv = document.getElementById('error-msg');
  errorDiv.textContent = msg;
}

// Tal vez habría que validar y sanitizar en algún lugar el input.
function isInputLengthOk(str){
  // Devuelve true si la longitud de str es LONGITUD_PUZZLE
  return str.length === LONGITUD_PUZZLE;
}

function coincidenTodas(puzzle_a, puzzle_b){
  // acá estoy mezclando, every es método de array y el input está en string
  const puzzle_a_arr = puzzle_a.split('');
  const puzzle_b_arr = puzzle_b.split('');
  return  puzzle_a_arr.every((celda, index) => {
    if (celda === '.') return true;
    else {
      return celda === puzzle_b_arr[index];
    }
  });
}
function getSolutionFromLibrary(index){
  //console.error(`En getSolutionFromLibrary(). index: ${index}`);
  return LIBRARY_OF_SOLUTIONS[index][1];
}

/* String -> Boolean
  The input is a one character length string that should represent a number betwen 1 and 9.
  Returns true if str can be casted to a number and that number is in [1 .. 9] range
  Returns false otherwise.
*/
function isNumberBetweenOneAndNine(char){
      try {
        const number = Number(char);
        return number > 0 && number < 10;
      } catch (error) {
        console.error(error);
        return false;
      }
}

/* String -> Object
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

/* String -> Boolean 
Devuelve true si todos los caracteres de la cadena representan números entre 1 y 9. No se tienen en cuenta los '.'
*/
function sonTodosNumerosDe1a9(str){
  return str.split('').every(item => (item === '.') || isNumberBetweenOneAndNine(item));
}

/* { Array de filas, Array de columnas, Array de bloques } -> Boolean
El input es un puzzle en la forma de un objeto con las filas, columnas y bloques.
Devuelve true si no hay repetidos en ningún bloque, fila o columna.
*/
function noHayRepetidosEnLosGrupos(puzzle){
  return puzzle.filas.every(fila => noTieneRepetidos(fila)) 
         && puzzle.columnas.every(col => noTieneRepetidos(col))
         && puzzle.bloques.every(bloq => noTieneRepetidos(bloq));
}

/*
Array -> Boolean
Devuelve true si todos los elementos que representan números del array son únicos. No se tienen en cuenta las cadenas vacías o los puntos.
Se supone que arr tiene longitud 9.
*/
function noTieneRepetidos(arr){
  //Podría utilizar regular expressions? Por ejemplo, pienso en la posibilidad de decir que el grupo de 1 a 9, cada uno, está 0 o 1 vez en arr. O podría usar otra vez every y para cada número en el rango 1-9 está no más de una vez
// Podría chequear que para cada número de 1 a 9 buscar que no esté más de una vez. Usar una función que busca si un elemento en particular está repetido.
  return arr.every(num => (num === '.') || !estaRepetido(arr, num)); // true si es una cadena vacía o un punto o si no está repetido
}

/*
Array, Char -> Boolean
Recibe un array de caracteres o string que representan números de 1 a 9, y un caracter o string  que representa un número de 1 a 9.
El tamaño del array debe ser de 9 elementos.
Devuelve true si el carácter está repetido en el array.
*/
function estaRepetido(array, num){
  // Veo cuántas veces aparece y si es más de una devuelve true.
  let apariciones = 0;
  for (let i = 0; i < array.length; i++){
    if(array[i] === num) apariciones++;
  }
  return apariciones > 1;
}

/* 
String -> String
Devuelve una solución para el input.
El método de resolución es buscar en una base de soluciones conocidas.
*/
function solveSudoku(input){
     let indice = 0;
     while (indice < LIBRARY_OF_SOLUTIONS.length && !coincidenTodas(input, getSolutionFromLibrary(indice))){
       indice++;
     }
     if (indice === LIBRARY_OF_SOLUTIONS.length) return "";
     else { return getSolutionFromLibrary(indice); } // un "problemita" de escribir así el loop sería repetir getSolutionFromLibrary(indice)
}

/*
String -> Boolean
Devuelve true si el input tiene la longitud correcta para el puzzle, si todos son números de 1 a 9 o '.', y si no hay repetidos en los grupos.
*/
function isInputOk(str){
  if(isInputLengthOk(str) && sonTodosNumerosDe1a9(str)){
    const puzzle = crearNuevoPuzzle(str);
    return noHayRepetidosEnLosGrupos(puzzle);
  }
  return false;
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
    convertirHTMLCollectionInputATxt,
    handleTextInput,
    handleGrillaTableroInput 
  };
} catch (e) {}

