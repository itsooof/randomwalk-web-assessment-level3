
document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const scoreXElement = document.getElementById('scoreX');
    const scoreOElement = document.getElementById('scoreO');

    let currentPlayer = 'X';
    let gameActive = true;
    let scoreX = 0;
    let scoreO = 0;

    function renderBoard() {
        board.innerHTML = '';
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

    function handleCellClick(event) {
        const index = event.target.dataset.index;
        // Check if the clicked cell is empty and the game is still active
        if (boardState[index] === '' && gameActive) {
            // Update the board state, re-render the board, and check for win/draw
            boardState[index] = currentPlayer;
            renderBoard();
            switchPlayer();
        }
    }

    function switchPlayer() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    function checkWin() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                // If a winning pattern is found, declare the winner and reset the game
                declareWinner();
                return;
            }
        }
    }

    function declareWinner() {
        gameActive = false;
        alert(`Player ${currentPlayer} wins!`);
        update();
        resetGame();
    }

    function checkDraw() {
        if (!boardState.includes('') && gameActive) {
            alert('It\'s a draw!');
            reset();
        }
    }

    function updateScore() {
        if (currentPlayer === 'X') {
            scoreX++;
            scoreXElement = scoreX;
        } else {
            scoreO++;
            scoreOElement = scoreO;
        }
    }
    renderBoard();
});
