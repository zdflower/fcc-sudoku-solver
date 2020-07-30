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

exports.obtenerFilasHelper = str => {
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
};

exports.obtenerUnBloque = (celda_inicio, celda_final, grilla) => {
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
};

exports.obtenerBloques = grilla => {
  // grilla es un array que representa la grilla, donde cada celda es fila,columna
  // para cada bloque en inicio_fin_bloques
  // recorrés grilla desde bloque[0][0] hasta bloque[1][0], es decir desde fila inicio hasta fila final
  // y para cada fila recorrés las columnas desde inicio hasta final: bloque[0][1] hasta bloque[1][1]

  // para cada inicio_fin_bloque obtener un bloque
  const bloques = [];
  INICIO_FIN_BLOQUES.forEach((bloque) => bloques.push(exports.obtenerUnBloque(bloque[0], bloque[1], grilla)));
  return bloques;
};

exports.obtenerColumnas = grilla => {
  const columnas = [];
  const total_columnas = grilla[0].length; // la grilla es un array de filas, la grilla es cuadrada, la longitud de la primera fila es la cantidad de columnas.
  const total_filas = grilla.length;
  for (let col = 0; col < total_columnas; col++){
    const columna = [];
    for (let fila = 0; fila < total_filas; fila++){
      columna.push(grilla[fila][columna]);
    }
    columnas.push(columna);
  }
  return columnas;
};

exports.estaCompletoYSinRepetidos = arr => {
  // Acá podría chequear que la longitud de arr sea 9 y que en arr esté el 1, el 2, el 3, ..., el 9.
  return arr.length === 9 && [1, 2, 3, 4, 5, 6, 7, 8, 9].every(n => arr.includes(n));
};

exports.estanFilasCompletasSinRepetidos = filas => {
  // Podría usar una suerte de reduce que condense un AND del resultado de aplicar a cada fila una
  // función estáCompletoYSinRepetidos(array)
  return filas.every(fila => exports.estaCompletoYSinRepetidos(fila));
};

exports.mostrarErrorMsg = (msg) => {
  const errorDiv = document.getElementById('error-msg');
  errorDiv.textContent = msg;
};

// Tal vez habría que validar y sanitizar en algún lugar el input.
exports.isInputOk = (str) => {
  // Devuelve true si la longitud de str es LONGITUD_PUZZLE
  return str.length === LONGITUD_PUZZLE;
  // return !(str.length < LONGITUD_PUZZLE || str.length > LONGITUD_PUZZLE);
};
