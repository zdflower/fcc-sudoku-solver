**freeCodeCamp** - Quality Assurance 4: Sudoku Solver
------

<https://www.freecodecamp.org/learn/quality-assurance/quality-assurance-projects/sudoku-solver>

FCC - Example : <https://bottlenose-eucalyptus.glitch.me/>

Based on this boilerplate: <https://github.com/freeCodeCamp/boilerplate-project-sudoku-solver/>

### User stories:

- [x] I can enter a sudoku puzzle by filling in the text area with either a number or period (.) to represent an empty cell. 
- [x] When a valid number is entered in the text area, the same number is applied to the correct cell of the sudoku grid.
- [x] I can enter a sudoku puzzle by adding numbers directly to the sudoku grid.
- [x] When a valid number is entered in the sudoku grid, the same number appears in the correct position in the text area.
- [x] The text area should only update the corresponding sudoku grid cell when a whole number between 1 and 9 is entered.
- [x] The sudoku grid should only update the puzzle string in the text area when a whole number between 1 and 9 is entered into a cell.
- [x] I can solve an incomplete puzzle by clicking the "Solve" button. When a solution is found, the sudoku grid and text area are automatically populated with the correct numbers for each cell in the grid or position in the text area.
- [x] This sudoku solver is not expected to be able to solve every incomplete puzzle. See `/public/puzzle-strings.js` for a list of puzzle strings it should be able to solve along with their solutions.
- [x] If the puzzle is not 81 numbers or periods long, append the message "Error: Expected puzzle to be 81 characters long." to the `error-msg` `div` so the text appears in red.
- [x] I can clear the text area and sudoku grid by clicking the "Clear" button.
- [x] All 6 unit tests are complete and passing. See `/tests/1_unit-tests.js` for the expected behavior you should write tests for.
- [x] All 4 functional tests are complete and passing. See `/tests/2_functional-tests.js` for the functionality you should write tests for.

### Testing and additional notes

* To run the tests on Glitch, set NODE_ENV to `test` without quotes.
* To run the tests in the console, use the command `npm run test`. To open the Glitch console, first click "Tools" in the bottom left corner and then click "Terminal".
* All logic can go into `public/sudoku-solver.js`.
* Create all of the unit/functional tests in `tests/1_unit-tests.js` and `tests/2_functional-tests.js`.


### Recursos

foreach <https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/forEach>

Testear dos objetos <https://www.chaijs.com/api/assert/#method_deepequal>

#### Client side javascript

- DOM (Document Object Model)

<https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents>

<https://www.digitalocean.com/community/tutorials/introduction-to-the-dom>

<https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model>

- Events

<https://developer.mozilla.org/en-US/docs/Web/Events>

<https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event>

<https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event>

<https://eloquentjavascript.net/15_event.html>

<https://eloquentjavascript.net/18_http.html#forms>

- Client side form data validation

<https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation>

<https://developer.mozilla.org/en-US/docs/Learn/Forms/Sending_and_retrieving_form_data>

- Tools for developing

<https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Introducing_complete_toolchain>

<https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing>

<https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing/JavaScript>

#### More stuff to read and learn, testing, etc.

<https://krasimirtsonev.com/blog/article/unit-test-your-client-side-javascript-jsdom-nodejs>

<https://pauleveritt.github.io/posts/pylyglot/mocha>

<https://pauleveritt.github.io/posts/pylyglot/jsdom>

how to mock window/document with mocha/chai - stack overflow
<https://stackoverflow.com/questions/36500723/how-to-mock-window-document-with-mocha-chai>

A journey through client-side testing with javascript
<https://www.telerik.com/blogs/journey-client-side-testing-javascript>

#### Javascript syntax and the browser

<https://forum.freecodecamp.org/t/reference-error-require-is-not-defined/319190/11>

<http://browserify.org/>

<https://github.com/requirejs/requirejs>

<https://stackoverflow.com/questions/24412124/referenceerror-require-is-not-defined>

#### Módulos

<https://javascript.info/modules-intro>

### Observaciones

- Un puzzle se resuelve mediante una "base de datos" de soluciones conocidas. Los puzzles que no están en la "base de
datos", para esta implementación de sudoku, no tienen solución.
