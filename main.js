/*
[1, 2, 3],
[4, 5, 6],
[7, 8, 9],
*/

var Player1 = "X";
var Player2 = "O";
var gameover = false;
var Xmark = [];
var Omark = [];
var Allmark = []; /* Keeps track of already chosen cells */
var fullArr = [1, 2, 3,
               4, 5, 6,
               7, 8, 9];
var Xscore = 0;
var Oscore = 0;
let count = 1;
var currentPlayer = Player1;

document.querySelector('.display_player').textContent = currentPlayer;

var positionToNumber = {
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9
};

var numberToWord = {
    1: 'one',
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five',
    6: 'six',
    7: 'seven',
    8: 'eight',
    9: 'nine'
};

/* If AIOption = 0, no AI */
var AIOption = 0;
var AiArr = [];
var AiRandomNumber;
var AiMoveCounter = 0;


/* Tic Tac Toe Win Condition */
const winBoard = [
/*  Horizontal Win */
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],

/*  Vertical Win */
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],

/*  Diagonal Win */
    [1, 5, 9],
    [3, 5, 7]
]


/* checks winner */
function CheckWinner(playerArray) {
    /* iterate through winning possible list */
    for (let i = 0; i < winBoard.length; i++) {
        /* looking at current win board */
        const currentWinBoard = winBoard[i];
        /* matches count */
        let matchCount = 0;
        for (let j = 0; j < currentWinBoard.length; j++) {
            if (playerArray.includes(currentWinBoard[j])) {
                matchCount++;
            }
        }
        /* if matchcount is equal to winboard length, then win */
        if (matchCount === currentWinBoard.length) {
            return true;
        }
    }
    return false;
}

function CheckDraw() {
    if (count > 9) { 
        alert("Game is a draw");
    }
}


function NewGame() { /* Soft Reset */
    gameover = false;
    /* Clear all the marks on the game board */
    const cells = document.querySelectorAll('.row div');
    for (let i = 0; i < cells.length; i++) {
        cells[i].textContent = ''; // Clear the content of each cell
    }

    /* Resets arrays */
    Xmark.splice(0, Xmark.length);
    Omark.splice(0, Omark.length);
    Allmark.splice(0, Allmark.length);

    currentPlayer = Player1;
    count = 1;
    AiMoveCounter = 0;

    /* updates to "Its your turn, X player" */
    document.querySelector('.display_player').textContent = currentPlayer;
}

function ResetGame() { /* Hard Rest */
    gameover = false;
    const cells = document.querySelectorAll('.row div');
    for (let i = 0; i < cells.length; i++) {
        cells[i].textContent = ''; // Clear the content of each cell
    }

    /* Resets player's piece location array */
    Xmark.splice(0, Xmark.length);
    Omark.splice(0, Omark.length);
    Allmark.splice(0, Allmark.length);

    currentPlayer = Player1;
    count = 1;
    AiMoveCounter = 0;


    /* Resets Score */
    Xscore = 0;
    Oscore = 0;
    document.querySelector('.display_X_score').textContent = Xscore;
    document.querySelector('.display_O_score').textContent = Oscore;

    /* updates to "Its your turn, X player" */
    document.querySelector('.display_player').textContent = currentPlayer;
}

function play(position) {
    if(gameover){
        return;
    }
    var mark = new String(position);
    var cell = document.getElementsByClassName(mark)[0];
    var chosenCell;

    if(cell.innerHTML.trim() === ""){
        cell.innerHTML = currentPlayer;
        

        if(currentPlayer == Player1){
            chosenCell = positionToNumber[position];

            Xmark.push(chosenCell);
            Allmark.push(chosenCell);
            Xmark.sort();
            Allmark.sort();
            console.log("Xmark after SORTING:", Xmark);
            console.log("Allmark after SORTING:", Allmark);

            if(CheckWinner(Xmark)){
                Xscore++;
                document.querySelector('.display_X_score').textContent = Xscore;
                alert("X WON");
                gameover = true;
                return;
            }
            count++;
            currentPlayer = Player2;
            
        }
        else if(currentPlayer == Player2 && AIOption == 0){
            /* Real player playing as 'O' */
            chosenCell = positionToNumber[position];
            console.log("PLAYER 2 (O)");

            Omark.push(chosenCell);
            Allmark.push(chosenCell);
            Omark.sort();
            Allmark.sort();
            console.log("Omark after SORTING:", Omark);
            console.log("Allmark after SORTING:", Allmark);

            if(CheckWinner(Omark)){
                Oscore++;
                document.querySelector('.display_O_score').textContent = Oscore;
                alert("O WON");
                gameover = true;
                return;
            }
            count++;
            currentPlayer = Player1;
        }

        if(currentPlayer == Player2 && AIOption == 1){
            AIRandomCellPicker();
            AIPopulator();
            AIDisplayer(AirandomNumber);

            if(CheckWinner(Omark)){
                Oscore++;
                document.querySelector('.display_O_score').textContent = Oscore;
                alert("O WON");
                gameover = true;
                return;
            }

            count++;
            currentPlayer = Player1;
        }
    }
    else{ /* If the cell is not empty */
        alert("Cell already chosen message 3");
        /* Message 3 related to cell already being chosen issues */
        if(count % 2 == 0){
            currentPlayer = Player2;
            console.log("Message 3: count: ", count);
            console.log("Message 3: currentplayer: ", currentPlayer);
        }
        else{
            currentPlayer = Player1;
            console.log("Message 3: count: ", count);
            console.log("Message 3: currentplayer: ", currentPlayer);

        }
        // count--;
        console.log("Message 3: count after deduction: ", count);

        return;
    }    
    document.querySelector('.display_player').textContent = currentPlayer;

    console.log("Count before CheckDraw(): ", count);
    CheckDraw();
}

/* Turns on/off AiMode */
function aiMode(){
    AIOption = !AIOption;
    console.log("AiOption: ", AIOption);

    if(AIOption == 1){
        console.log("AI Enabled");
        alert("AI Enabled");
    }
    else if(AIOption == 0){
        console.log("AI Disable");
        alert("AI Disabled");
    }
}

/* Picks a random cell for AI */
function AIRandomCellPicker(){
    var AiPossibleArray = fullArr.filter(num => !Allmark.includes(num));
    
    const randomIndex = Math.floor(Math.random() * AiPossibleArray.length);
    AirandomNumber = AiPossibleArray[randomIndex];
}

/* Populates Ai's Array */
function AIPopulator(){
    Omark.push(AirandomNumber);
    Allmark.push(AirandomNumber);
    Omark.sort();
    Allmark.sort();
    console.log("Ai's Omarks Array:", Omark);
    console.log("Ai's AllMark Array:", Allmark);
    AiPossibleArray = [];
}

/* Display AI's cell on website */
function AIDisplayer(AirandomNumber){
    if(AiMoveCounter == 4){
        return;
    }
    var tempString = positionToNumber[AirandomNumber];
    var mark =  numberToWord[AirandomNumber];
    var cell = document.getElementsByClassName(mark)[0];
    var chosenCell;

    cell.innerHTML = currentPlayer;
    AiMoveCounter++;
}
