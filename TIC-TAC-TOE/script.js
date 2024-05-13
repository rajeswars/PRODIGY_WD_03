const cells = document.querySelectorAll('.cell');
const gameBoard = Array(9).fill('');
let currentPlayer = 'X';
const currentPlayerDisplay = document.getElementById('current-player');
const resetButton = document.getElementById('reset-button');

function checkWin() {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  return winningCombinations.some(combination => {
    return combination.every(index => gameBoard[index] === currentPlayer);
  });
}

function handleCellClick(e) {
  const cellIndex = Array.from(cells).indexOf(e.target);

  if (gameBoard[cellIndex] === '' && !checkWin()) {
    gameBoard[cellIndex] = currentPlayer;
    e.target.textContent = currentPlayer;
    e.target.style.color = currentPlayer === 'X' ? 'black' : 'red';

    if (checkWin()) {
      alert(`Player ${currentPlayer} wins!`);
      resetGame();
    } else if (!gameBoard.includes('')) {
      alert("It's a tie!");
      resetGame();
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      currentPlayerDisplay.textContent = currentPlayer;
    }
  }
}

function resetGame() {
  gameBoard.fill('');
  cells.forEach(cell => {
    cell.textContent = '';
    cell.style.color = '';
  });
  currentPlayer = 'X';
  currentPlayerDisplay.textContent = currentPlayer;
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);