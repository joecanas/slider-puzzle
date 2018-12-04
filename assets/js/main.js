/* Puzzle JS file: R/GA frontend-tests */

// Wrap all application code in an anonymous closure to avoid global scope
(function() {

    // Load DOM before loading the puzzle
    document.addEventListener("DOMContentLoaded", loadPuzzle);

    // Load the puzzle
    function loadPuzzle() {

        // Identify and track the (zero-based) position of the empty square
        let emptyRow = 2;
        let emptyCol = 2;

        // Offset position inside container element <ul>, used as reference for
        // placing all tiles. TODO: Calculate margin/padding vs. plugging in '9'.
        const puzzleElement = document.querySelector('.puzzle');
        const puzzleInnerLeft = puzzleElement.offsetLeft + 9;
        const puzzleInnerTop = puzzleElement.offsetTop + 9;

        // Width of one tile. TODO: Calculate actual styled <li> width
        // (not important for this assignment, which requires a precise
        // visual layout).
        const tileDistance = 68;

        // Initial tile layout. TODO: populate a multidimensional array, 
        // e.g., 3x3, 4x4 (5x5, ...?) based on simple config setting.
        const tileMap = {
            1: {
                row: 0,
                col: 0
            },
            2: {
                row: 0,
                col: 1
            },
            3: {
                row: 0,
                col: 2
            },
            4: {
                row: 1,
                col: 0
            },
            5: {
                row: 1,
                col: 1
            },
            6: {
                row: 1,
                col: 2
            },
            7: {
                row: 2,
                col: 0
            },
            8: {
                row: 2,
                col: 1
            },
            empty: {
                row: 2,
                col: 2
            }
        }

        // Get coordinates of moving tile and swap with empty square 
        const moveTile = function (tile, rowOriginal, colOriginal) {
            // Current tile's coordinates
            let row = rowOriginal;
            let col = colOriginal;

            return function () {
                let rowOffset = Math.abs(emptyRow - row);
                let colOffset = Math.abs(emptyCol - col);

                // Move tile to the empty square if adjacent
                if ((rowOffset == 1 && colOffset == 0) || (rowOffset == 0 && colOffset == 1)) {

                    // Position tile based on coordinates, tile size and container <ul> offset
                    // TODO: Animate tile positioning.
                    tile.style.left = (emptyCol * tileDistance) + puzzleInnerLeft + 'px';
                    tile.style.top = (emptyRow * tileDistance) + puzzleInnerTop + 'px';

                    // Swap tile and empty square coordinates
                    [row, emptyRow] = [emptyRow, row];
                    [col, emptyCol] = [emptyCol, col];
                }
                // TODO: Display onscreen message or log to console when player tries an illegal move
            }
        };

        // Add click listener to tiles based on initial layout 
        let initTiles = function () {
            let row = 0;
            let col = 0;
            const tiles = document.querySelectorAll('.tile');
            for (let i = 0; i < tiles.length; i++) {
                let tile = tiles.item(i);
                let tileId = i + 1;

                row = tileMap[tileId].row;
                col = tileMap[tileId].col;

                // position tiles for initial layout
                tile.style.left = (col * tileDistance) + puzzleInnerLeft + 'px';
                tile.style.top = (row * tileDistance) + puzzleInnerTop + 'px';

                // Add click event listener to each tile.
                // TODO: Replace clicking with dragging.
                // In this version, the user clicks tiles to move them. Per the
                // assignment ("Make the puzzle work with the same interaction model
                // as the original puzzle had."), draggable tiles would more closely
                // follow the original physical puzzle's model. However, dragging is
                // slightly more effort than clicking (and less satisfying, I believe).
                tile.addEventListener('click', moveTile(tile, row, col));
            }
        }();

    }
    
    function shufflePuzzle() {
        console.log('You called the shufflePuzzle function.');
        
        // Random shuffle sequences must be tested and tweaked to ensure they are solvable.
        // See https://www.cs.bham.ac.uk/~mdr/teaching/modules04/java2/TilesSolvability.html
    }

    // Shuffle function: expose via console only
    // TODO: Write a working shuffle function to generate a random set
    // and populate the board (testing to first ensure DOM is loaded and
    // board is initialized).
    window['shuffle'] = function () {
        shufflePuzzle();
        console.log('You called the one global function available here');
    };

})(); // Run Lola Run