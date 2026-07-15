const cells = document.querySelectorAll(".cell");
const message = document.getElementById("message");

const restartBtn = document.getElementById("restartBtn");
const pvpBtn = document.getElementById("pvpBtn");
const cpuBtn = document.getElementById("cpuBtn");

let currentPlayer = "X";
let gameActive = true;

let gameMode = "pvp";

let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];


// SELECT GAME MODE

pvpBtn.addEventListener("click", () => {
    gameMode = "pvp";
    restartGame();
    message.textContent = "👥 Player vs Player Mode";
});

cpuBtn.addEventListener("click", () => {
    gameMode = "cpu";
    restartGame();
    message.textContent = "🤖 Player vs Computer Mode";
});


// CELL CLICK

cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});

function handleCellClick(e){

    const clickedCell = e.target;
    const index = clickedCell.getAttribute("data-index");

    if(gameState[index] !== "" || !gameActive){
        return;
    }

    updateCell(clickedCell, index);

    checkWinner();

    // COMPUTER MOVE
    if(gameMode === "cpu" && gameActive && currentPlayer === "O"){
        setTimeout(computerMove, 500);
    }
}


// UPDATE CELL

function updateCell(cell, index){

    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if(currentPlayer === "X"){
        cell.style.background = "linear-gradient(145deg, #36d1dc, #5b86e5)";
    }else{
        cell.style.background = "linear-gradient(145deg, #ff416c, #ff4b2b)";
    }
}


// SWITCH PLAYER

function changePlayer(){

    currentPlayer = currentPlayer === "X" ? "O" : "X";

    if(gameMode === "pvp"){
        message.textContent = `🎯 Player ${currentPlayer}'s Turn`;
    }
}


// CHECK WINNER

function checkWinner(){

    let roundWon = false;

    for(let i = 0; i < winningConditions.length; i++){

        const condition = winningConditions[i];

        let a = gameState[condition[0]];
        let b = gameState[condition[1]];
        let c = gameState[condition[2]];

        if(a === "" || b === "" || c === ""){
            continue;
        }

        if(a === b && b === c){

            roundWon = true;

            condition.forEach(index => {
                cells[index].classList.add("win");
            });

            break;
        }
    }

    if(roundWon){

        if(gameMode === "cpu"){

            if(currentPlayer === "X"){
                message.textContent = "🎉 Congratulations! You Win!";
            }else{
                message.textContent = "😢 Computer Wins! Try Again!";
            }

        }else{
            message.textContent = `🎉 Player ${currentPlayer} Wins!`;
        }

        gameActive = false;
        return;
    }

    // DRAW

    if(!gameState.includes("")){
        message.textContent = "🤝 Match Draw!";
        gameActive = false;
        return;
    }

    changePlayer();
}


// COMPUTER MOVE

function computerMove(){

    let emptyCells = [];

    for(let i = 0; i < gameState.length; i++){
        if(gameState[i] === ""){
            emptyCells.push(i);
        }
    }

    let randomIndex =
        emptyCells[Math.floor(Math.random() * emptyCells.length)];

    const cell = document.querySelector(`[data-index='${randomIndex}']`);

    updateCell(cell, randomIndex);

    checkWinner();
}


// RESTART GAME

restartBtn.addEventListener("click", restartGame);

function restartGame(){

    currentPlayer = "X";
    gameActive = true;

    gameState = ["", "", "", "", "", "", "", "", ""];

    message.textContent = "🎮 New Game Started";

    cells.forEach(cell => {

        cell.textContent = "";

        cell.style.background =
            "linear-gradient(145deg, #00c6ff, #0072ff)";

        cell.classList.remove("win");
    });
}