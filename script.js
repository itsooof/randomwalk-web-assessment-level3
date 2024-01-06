// Wait for the DOM to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', () => {
    // Get references to important elements in the HTML
    const board = document.getElementById('board');
    const scoreXElement = document.getElementById('scoreX');
    const scoreOElement = document.getElementById('scoreO');

    // Initialize game state variables
    let currentPlayer = 'X';
    let boardState = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
    let scoreX = 0;
    let scoreO = 0;

    // Function to render the Tic Tac Toe game board
    function renderBoard() {
        board.innerHTML = '';
        // Create individual cells for each position on the board
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.index = i;
            cell.textContent = boardState[i];
            // Attach event listener to handle cell clicks
            cell.addEventListener('click', handleCellClick);
            board.appendChild(cell);
        }
    }

    // Event handler for handling cell clicks
    function handleCellClick(event) {
        // Get the index of the clicked cell
        const index = event.target.dataset.index;
        // Check if the clicked cell is empty and the game is still active
        if (boardState[index] === '' && gameActive) {
            // Update the board state, re-render the board, and check for win/draw
            boardState[index] = currentPlayer;
            renderBoard();
            checkWin();
            checkDraw();
            switchPlayer();
        }
    }

    // Switch the player for the next turn
    function switchPlayer() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    // Check for a winning pattern on the board
    function checkWin() {
        // Define winning patterns for Tic Tac Toe
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        // Iterate through each winning pattern and check if it's achieved
        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                // If a winning pattern is found, declare the winner and reset the game
                declareWinner();
                return;
            }
        }
    }

    // Declare the winner, update the score, and reset the game state
    function declareWinner() {
        gameActive = false;
        alert(`Player ${currentPlayer} wins!`);
        updateScore();
        resetGame();
    }

    // Check for a draw if all cells are filled with no winner
    function checkDraw() {
        if (!boardState.includes('') && gameActive) {
            // If it's a draw, alert the players and reset the game
            alert('It\'s a draw!');
            resetGame();
        }
    }

    // Update the score based on the current player
    function updateScore() {
        if (currentPlayer === 'X') {
            scoreX++;
            scoreXElement.textContent = scoreX;
        } else {
            scoreO++;
            scoreOElement.textContent = scoreO;
        }
    }

    // Reset the game state for a new round
    function resetGame() {
        currentPlayer = 'X';
        boardState = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        renderBoard();
    }

    // Initial rendering of the game board
    renderBoard();
});