/**Game Controller (the central logic)

This is the “referee” and the brain of the game. It should orchestrate everything and contain higher-level rules.

Responsibilities

Track current player / turn — know whose turn it is and be able to switch turns.

Accept a move (for a given board index):

Ask the Gameboard to place the current player’s marker at that index.

If the placement fails (spot taken), return an indication and do nothing else.

If it succeeds, check for game end conditions (win or tie).

Win checking:

Hold the list of all winning index combinations (rows, columns, diagonals).

After each successful move, test those combos on the board to see if current player now has three in a row.

If a win is found, record the winner and end the game.

Tie checking:

If the board is full and no winner, declare a tie.

Game state:

Keep track of whether the game is active or already finished — so further clicks are ignored until reset.

Restart:

Reset the board and game state, optionally preserve player scores.

Expose methods the UI can call:

e.g., playMove(index) which returns status (move invalid, move ok, game won by X, draw, etc.) so the display can react.

Design notes

Keep win-checking logic inside the controller — it reasons about the rules, not the board’s storage.

The controller should use the Gameboard but not expose internals of the board.



Display / DOM Controller

This module bridges the logic to the UI.

Responsibilities

Render the board to the page based on the Gameboard state (map indices to DOM cells).

Attach click handlers to board cells. On click:

Ask the Game Controller to playMove(index).

Based on the controller’s response, update the UI (place X/O, show winner message, prevent further moves).

Update UI pieces:

Show current player’s turn.

Show win/draw messages.

Show restart button, and wire it to controller’s restart.

Keep DOM events scoped so you can re-render by clearing and rebuilding (or updating specific cells).

Avoid putting game logic here — only present state and forward user actions to the controller.

Mapping

Give each DOM cell a data attribute or consistent index so it maps 1:1 with the Gameboard array indices.



Flow of a typical user action (conceptually)

User clicks cell N.

DisplayController forwards playMove(N) to GameController.

GameController asks Gameboard to setMarker(N, currentPlayer.marker).

Gameboard validates and updates the array (or rejects).

If successful, GameController checks win/tie.

GameController returns status to DisplayController.

DisplayController updates the DOM accordingly (place marker, show winner, toggle turn, etc.).




Testing strategy (console first)

Build the Gameboard and GameController logic first. Don’t touch DOM.

From the console, simulate moves:

Call the controller to place markers.

After every move, check board state and the controller’s returned status.

Verify win detection for each winning combination and tie detection.

Verify invalid moves are rejected and do not flip turns.



Error handling & edge cases

Clicking an occupied cell should be ignored and should not change turn.

After a win or tie, further moves should be ignored until reset.

Invalid indices should be handled gracefully.

Reset must clear the board and set the controller state to allow a new game.




Encapsulation & structure rules (keep code tidy)

Minimize globals: ideally only player instances or a single entry point are global; everything else lives in modules/factories.

Gameboard: module (IIFE) because you only need one instance.

GameController: module (IIFE) because you only need one instance controlling the game.

Player: factory function (you’ll make two instances).

DisplayController: module (IIFE) as single UI manager.





Naming & API suggestions (conceptual names)

You’ll find it helpful to mentally standardize names:

Gameboard.getBoard() — read snapshot.

Gameboard.setMarker(index, marker) — place marker; returns true/false.

Gameboard.reset().

GameController.playMove(index) — main entry for a move; returns status.

GameController.resetGame().

DisplayController.renderBoard() and DisplayController.bindEvents().

(Those are suggestions so your modules talk in clear ways; don’t worry about exact function names.) */
