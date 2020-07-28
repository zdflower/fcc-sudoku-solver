const LONGITUD_FILA = 9;

const LONGITUD_PUZZLE = 81;

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
