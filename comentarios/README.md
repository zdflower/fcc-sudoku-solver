**freeCodeCamp** - Quality Assurance 4: Sudoku Solver
------

<https://www.freecodecamp.org/learn/quality-assurance/quality-assurance-projects/sudoku-solver>

FCC - Example : <https://bottlenose-eucalyptus.glitch.me/>

Based on this boilerplate: <https://github.com/freeCodeCamp/boilerplate-project-sudoku-solver/>

### User stories:

1.  I can enter a sudoku puzzle by filling in the text area with either a number or period (.) to represent an empty cell. 
1. When a valid number is entered in the text area, the same number is applied to the correct cell of the sudoku grid.
1. I can enter a sudoku puzzle by adding numbers directly to the sudoku grid.
1. When a valid number is entered in the sudoku grid, the same number appears in the correct position in the text area.
1. The text area should only update the corresponding sudoku grid cell when a whole number between 1 and 9 is entered.
1. The sudoku grid should only update the puzzle string in the text area when a whole number between 1 and 9 is entered into a cell.
1. I can solve an incomplete puzzle by clicking the "Solve" button. When a solution is found, the sudoku grid and text area are automatically populated with the correct numbers for each cell in the grid or position in the text area.
1. This sudoku solver is not expected to be able to solve every incomplete puzzle. See `/public/puzzle-strings.js` for a list of puzzle strings it should be able to solve along with their solutions.
1. If the puzzle is not 81 numbers or periods long, append the message "Error: Expected puzzle to be 81 characters long." to the `error-msg` `div` so the text appears in red.
1. I can clear the text area and sudoku grid by clicking the "Clear" button.
1. All 6 unit tests are complete and passing. See `/tests/1_unit-tests.js` for the expected behavior you should write tests for.
1. All 4 functional tests are complete and passing. See `/tests/2_functional-tests.js` for the functionality you should write tests for.

### Testing and additional notes

* To run the tests on Glitch, set NODE_ENV to `test` without quotes.
* To run the tests in the console, use the command `npm run test`. To open the Glitch console, first click "Tools" in the bottom left corner and then click "Terminal".
* All logic can go into `public/sudoku-solver.js`.
* Create all of the unit/functional tests in `tests/1_unit-tests.js` and `tests/2_functional-tests.js`.


### Mis apuntes

foreach:

<https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/forEach>

testear dos objetos

<https://www.chaijs.com/api/assert/#method_deepequal>

Client side javascript

DOM (Document Object Model)

https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents

https://www.digitalocean.com/community/tutorials/introduction-to-the-dom

https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model

https://developer.mozilla.org/en-US/docs/Web/Events

https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event

https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event

https://eloquentjavascript.net/15_event.html

https://eloquentjavascript.net/18_http.html#forms

Client side form data validation
https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation

https://developer.mozilla.org/en-US/docs/Learn/Forms/Sending_and_retrieving_form_data

Tools for developing

https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Introducing_complete_toolchain

https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing

https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing/JavaScript

More stuff to read and learn, testing, etc.

https://krasimirtsonev.com/blog/article/unit-test-your-client-side-javascript-jsdom-nodejs

https://pauleveritt.github.io/posts/pylyglot/mocha

https://pauleveritt.github.io/posts/pylyglot/jsdom

how to mock window/document with mocha/chai - stack overflow https://stackoverflow.com/questions/36500723/how-to-mock-window-document-with-mocha-chai

A journey through client-side testing with javascript https://www.telerik.com/blogs/journey-client-side-testing-javascript

Problems

https://forum.freecodecamp.org/t/reference-error-require-is-not-defined/319190/11

http://browserify.org/

https://github.com/requirejs/requirejs

https://stackoverflow.com/questions/24412124/referenceerror-require-is-not-defined

Quise tener el código más organizado y separado en archivos pero para que funcione en el navegador tendría que instalar algo para que transforme el código que el navegador no interpreta, por ejemplo los require. Algo como browserify o require.js

Me apareció este problema cuando quise agregar un eventlistener para el evento input de textarea y cuando ubiqué el código en sudoku-solver.js después de module.exports no llegó a funcionar porque al comienzo hay un require para funciones helper que se usan en funciones definidas dentro del module.exports y salta error en el navegador y se ve que no sigue leyendo el código. Y como el event handler va a usar una de las funciones de module.exports si lo ubico antes no la encuentra.

Entonces o aprendo a usar este browserify, por ejemplo, si quiero ver cómo funciona la página en el navegador o voy a tener que reescribir todo para que todo el código esté en el archivo sudoku-solver.js

Otra cosa:

No me queda claro cómo funciona o cómo se supone que debe funcionar la aplicación. Trato de usar la app de ejemplo que provee freecodecamp y pareciera que la única manera de ingresar un puzzle en el tablero es escribiendo de a uno los números en las celdas y no pegando o escribiendo los números y puntos en el textarea, como supuse desde un principio. Lo que sí sucede es que una vez que vas llenando las celdas, el textarea se va actualizando.

Tests incomprensibles:

Ahora estoy viendo el siguiente test que voy a encarar, dice "Valid complete puzzles pass". No entiendo con qué parte de la aplicación se corresponde, porque en la app de ejemplo cuando se completa un puzzle no pasa nada, sea válido o no.

A ver, podría ser así, según lo que vi en la respuesta del ejemplo, tengo un puzzle válido para completar, entonces clickeás solve y te lo resuelve, lo completa. En cambio si el puzzle no es válido, no hace nada. Parece una boludez, no hay mucha respuesta o comunicación.

Igual sigo sin entender qué es lo que debería testear ahí. Porque no es que cuando terminás un puzzle y es válido te dice ok felicitaciones o se fija si es válido y devuelve true.

Otra pregunta: ¿debemos implementar un algoritmo para intentar resolver automáticamente un puzzle dado? ¿algo como fijarse una celda, sus vecinos de fila, de columna y de cuadrado?
