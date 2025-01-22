console.log("JavaScript is running!");
const playerXClass = 'x';
const playerOClass = 'circle';
const winning_Combo = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
]

const cellElements = document.querySelectorAll('[data-cell]');
const boardElement = document.getElementById('board');
const winningMessageElement = document.getElementById('winningMessage');
const restartButton = document.getElementById('restartButton');
const winningMessageTextElement = document.getElementById('winningMessageTextElement');
let isPlayerOTurn = false;
let xWins = 0;
let oWins = 0;
let totalRounds = 3;
let currentRound = 1;

startGame()
restartButton.addEventListener('click', startGame)
function startGame() {
            
 isPlayerOTurn = false;
cellElements.forEach(cell => {
                cell.classList.remove(playerXClass)
                cell.classList.remove(playerOClass)
                cell.removeEventListener('click', handleCellClicks)
                cell.addEventListener('click', handleCellClicks, { once: true })

            })
            setBoardHoverClass();
            winningMessageElement.classList.remove('show');
        }
        restartButton.addEventListener('click', () => {
            xWins = 0;
            oWins = 0;
            currentRound = 1;
            restart.innerText = 'restart';
            updateScore();
            startGame();
        })

        function handleCellClicks(e) {
            const cell = e.target
            const currentClass = isPlayerOTurn? playerOClass : playerXClass
            console.log(currentClass);
            placeMark(cell, currentClass);
            if(checkWin(currentClass)) {
                endGame(false)
            }
            else if(isDraw()) {
                endGame(true)
            }
            else {
                swapTurns()
                setBoardHoverClass()
            }
        } 

        function endGame(draw) {
            //if (currentRound > totalRounds) return;
            if(draw) {
                winningMessageTextElement.innerText = `Round ${currentRound} is a draw`
            }
            else {
                const winner = `player with ${isPlayerOTurn ? "O's" : "X's"} wins`
                winningMessageTextElement.innerText = `${winner} wins Round ${currentRound}`;
                if (isPlayerOTurn) {
                    oWins++;
                } else {
                    xWins++;
                }
            }
            updateScore();
            winningMessageElement.classList.add('show')
            if (oWins === 3 || xWins === 3) {
                declareOverallWinner();
            } else {
                setTimeout(() => {
                    winningMessageTextElement.classList.remove('show');
                    currentRound++;
                    startGame();
                }, 2000); // Start the next round after a brief delay
               
            }
            
            cellElements.forEach(cell => {
                cell.removeEventListener('click', handleCellClicks)
            })
        }
        function declareOverallWinner() {
            if (xWins === 3) {
                winningMessageTextElement.innerText = `Player X wins the game with ${xWins} rounds!`;
            } else if (oWins === 3) {
                winningMessageTextElement.innerText = `Player O wins the game with ${oWins} rounds!`;
            } else {
                winningMessageTextElement.innerText = `The game is a tie with ${xWins} rounds each!`;
            }
            restartButton.innerText = 'Play Again';
            winningMessageElement.classList.add("show");
        }

        function isDraw() {
            return [...cellElements].every(cell => {
                return cell.classList.contains(playerXClass) || cell.classList.contains(playerOClass)
            })
        }
        function placeMark(cell, currentClass) {
            console.log("Placing mark:", currentClass, "on cell:", cell); // Debugging
            cell.classList.add(currentClass)
        }
        function swapTurns() {
            isPlayerOTurn = !isPlayerOTurn
        }
        function setBoardHoverClass() {
            boardElement.classList.remove(playerXClass)
            boardElement.classList.remove(playerOClass)
            if(isPlayerOTurn) {
                boardElement.classList.add(playerOClass)
            }
            else {
                boardElement.classList.add(playerXClass)
            }
        }
        function checkWin(currentClass) {
            return winning_Combo.some(combination => {
                const result =  combination.every(index => {
                    return cellElements[index].classList.contains(currentClass)
                })
                console.log('Checking combination:', combination, 'result:', result); // Debugging
                return result
            })
        }
        function updateScore() {
    const xScoreElement = document.getElementById("x-score");
    const oScoreElement = document.getElementById("o-score");

    // Update the displayed score values
    xScoreElement.textContent = xWins;
    oScoreElement.textContent = oWins;
}