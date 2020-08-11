/* To do:
- Revisar código duplicado o redundante
- Ante un evento de input de una celda, antes de rellenar ESA celda (así no chequeo todas, si no sólo la que va a cambiar), chequear si es válido el contenido, el número que se quiere insertar, si no está en ninguno de los subgrupos de la celda: fila, columna, bloque.
- Ver porqué no funciona solveSudoku, ¿por qué obtengo el mensaje de error: "Uncaught TypeError: LIBRARY_OF_SOLUTIONS[index] is undefined"?
- En solveSudokuHandler, (y quizá solveSudoku), antes de tratar de hallar una solución, habría que chequear que haya un puzzle empezado con cierta cantidad de pistas, no? Como mínimo que en textInput no hay una cadena vacía, es más que hay una cadena con la longitud adecuada para un puzzle, una cadena válida como puzzle. Creo que hay una función que chequea eso!
- En handleGrillaTablero ¿no habría que utilizar la función isNumberBetweenOneAndNine? ¿Y en handleTextInput también?
*/

const LETRAS_FILAS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
const INPUT_ERROR_MSG = 'Error: Expected puzzle to be 81 characters long.';
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

function handleTextInput(e) {
  const input = e.target.value.split('');
  if (input.length === LONGITUD_PUZZLE) { 
    mostrarErrorMsg("");//Borra el posible mensaje de error que hubiera habido antes.
    // Rellenar la grillaTablero
    for (let i = 0; i < input.length; i++){
      // antes de rellenar la celda, ver si es un punto, caso en el cual no hay que hacer nada.
      if (input[i] === '.') grillaTablero[i].value = "";
      else { grillaTablero[i].value = input[i];}
    }
  }
  else {
   mostrarErrorMsg(INPUT_ERROR_MSG);
  }
}

function handleGrillaTableroInput(e){
  let puzzleText = "";
  // recorrer las celdas
  for (let i = 0; i < grillaTablero.length; i++){
    const celda = grillaTablero[i];
    // chequeo si no es un carácter numérico
    // ¿Acá no habría que usar la función isNumberBetweenOneAndNine? o poner este test ahí, o también usar alguna función que cheque si es un valor lícito en el sentido de que no se repite en la fila, columna o bloque de la celda?
    if (/^\D*$/.test(celda.value)) puzzleText += "."; // quizá podría haber chequeado también si value es una cadena vacía...
    else puzzleText += celda.value;
  }
  textInput.value = puzzleText;
}

function cleanBoard(){
  // limpiar textarea
  textInput.value = "";
  // limpiar la grillaTablero
  for (let i = 0; i < grillaTablero.length; i++){
    grillaTablero[i].value = "";
  }
}

function inicializarTablero(event){
  console.log("Inicializando el tablero");
  console.log(event.target.value);
  console.log(crearNuevoPuzzle(event.target.value)); // esto solo devuelve un objeto. Tal vez está de más. Tal vez habría que usar esta función para rellenar la grilla.
};

function solveSudokuHandler(){
// usar solveSudoku, pasarle el contenido de textInput
// luego la solución debe reemplazar el contenido de textInput y como consecuencia también se tiene que actualizar la grillaTablero

  const solution = solveSudoku(textInput.value);
// PARÁ, ¿y si no se encontró solución? solución va a ser una cadena vacía. Habría que chequear eso primero y en ese caso mostrar un mensaje, en vez de borrar todo. A mí me parece mejor así.
  if (solution.length === LONGITUD_PUZZLE){ // se encontró solución
    textInput.value = solution;
    // rellenar la grillaTablero.
    // quizá tendría que ubicar en funciones aparte parte del código de los manejadores de evento para grilla y para textinput
    // que también se podrían utilizar acá.
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

// botón clear
clearBtn.addEventListener('click', cleanBoard);

// Botón solve
solveBtn.addEventListener('click', solveSudokuHandler);

// Documento recién cargado
document.addEventListener('DOMContentLoaded', () => {
  // Load a simple puzzle into the text area
  textInput.value = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
  // llamo a handleTextInput para que rellene la grilla
  // o llamar a una función que rellena la grilla.
  const input = textInput.value.split('');
  if (input.length === LONGITUD_PUZZLE) { 
    mostrarErrorMsg("");//Borra el posible mensaje de error que hubiera habido antes.
    // Rellenar la grillaTablero
    for (let i = 0; i < input.length; i++){
      // antes de rellenar la celda, ver si es un punto, caso en el cual no hay que hacer nada.
      if (input[i] === '.') grillaTablero[i].value = "";
      else { grillaTablero[i].value = input[i];}
    }
  }
});

/*
  Export your functions for testing in Node.
  Note: The `try` block is to prevent errors on
  the client side
*/

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

function obtenerBloques(grilla) {
  // grilla es un array que representa la grilla, donde cada celda es fila,columna
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

function obtenerColumnas(grilla) {
  const columnas = [];
  const total_columnas = grilla[0].length; // la grilla es un array de filas, la grilla es cuadrada, la longitud de la primera fila es la cantidad de columnas.
  for (let col = 0; col < total_columnas; col++){
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
function isInputOk(str){
  // Devuelve true si la longitud de str es LONGITUD_PUZZLE
  return str.length === LONGITUD_PUZZLE;
  // return !(str.length < LONGITUD_PUZZLE || str.length > LONGITUD_PUZZLE);
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

const puzzlesAndSolutions = [
  [
    '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.',
    '135762984946381257728459613694517832812936745357824196473298561581673429269145378'
  ],
  [
    '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3',
    '568913724342687519197254386685479231219538467734162895926345178473891652851726943'
  ],
  [
    '..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1',
    '218396745753284196496157832531672984649831257827549613962415378185763429374928561'
  ],
  [
    '.7.89.....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6',
    '473891265851726394926345817568913472342687951197254638734162589685479123219538746'
  ],
  [
    '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51',
    '827549163531672894649831527496157382218396475753284916962415738185763249374928651'
  ]
];

const LIBRARY_OF_SOLUTIONS = puzzlesAndSolutions;
function getSolutionFromLibrary(index){
  return LIBRARY_OF_SOLUTIONS[index][1];
}

function isNumberBetweenOneAndNine(cellContent){
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
}

// REVISAR ESTA FUNCIÓN. No me parece que acá tenga que chequear la longitud del input.
// Quizá eso tenga que ir asociado al cambio de input en textarea, cada vez que pasa eso
function crearNuevoPuzzle(input){
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
/* 
String -> String
Devuelve una solución para el input.
El método de resolución es buscar en una base de soluciones conocidas.
*/
function solveSudoku(input){
     let indice = 0;
     let solution = getSolutionFromLibrary(indice);
     let solHasBeenFound = coincidenTodas(input, solution);
     while (indice < LIBRARY_OF_SOLUTIONS.length && !solHasBeenFound){
       indice++;
       solution = getSolutionFromLibrary(indice); 
       solHasBeenFound = coincidenTodas(input, solution);
     }
     if (indice === LIBRARY_OF_SOLUTIONS.length){
       return "";
     }
     else {
       return solution;
     }
}

try {
  module.exports = {
    isNumberBetweenOneAndNine,
    crearNuevoPuzzle,
    solveSudoku 
  };
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
