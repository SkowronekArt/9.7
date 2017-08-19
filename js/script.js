var newGameBtn = document.getElementById('js-newGameButton');
var nextGameBtn = document.getElementById('js-nextGameButton');

newGameBtn.addEventListener('click', newGame);
nextGameBtn.addEventListener('click', nextGame);

var pickRock = document.getElementById('js-playerPick_rock'),
    pickPaper = document.getElementById('js-playerPick_paper'),
    pickScissors = document.getElementById('js-playerPick_scissors');

pickRock.addEventListener('click', function() {
    playerPick('rock')
});
pickPaper.addEventListener('click', function() {
    playerPick('paper')
});
pickScissors.addEventListener('click', function() {
    playerPick('scissors')
});



var gameState = 'notStarted', //started // ended
    player = {
        name: '',
        score: 0
    },
    computer = {
        score: 0
    };

var newGameElem = document.getElementById('js-newGameElement'),
    pickElem = document.getElementById('js-playerPickElement'),
    resultsElem = document.getElementById('js-resultsTableElement'),
    nextGameElem = document.getElementById('js-nextGameElement'),
    nextGameBtn = document.getElementById('js-nextGameButton'),
    whoWasTheWinner= document.getElementById('js-whoWasTheWinner');
    

function setGameElements() {
    switch (gameState) {
        case 'started':
            newGameElem.style.display = 'none';
            nextGameElem.style.display = 'none';
            nextGameBtn.style.display = 'none';
            pickElem.style.display = 'block';
            resultsElem.style.display = 'block';
            whoWasTheWinner.style.display = "none";
            break;
        case 'ended':
            newGameElem.style.display = 'none';
            nextGameElem.style.display = 'block';
            nextGameBtn.style.display = 'block';
            pickElem.style.display = 'none';
            resultsElem.style.display = 'block';
            whoWasTheWinner.style.display = "block";
            break;
        case 'notStarted':
        default:
            newGameElem.style.display = 'block';
            nextGameElem.style.display = 'none';
            nextGameBtn.style.display = 'none';
            pickElem.style.display = 'none';
            resultsElem.style.display = 'none';
            whoWasTheWinner.style.display = "none";
     
    }
}
setGameElements();


var playerPointsElem = document.getElementById('js-playerPoints'),
    playerNameElem = document.getElementById('js-playerName'),
    computerPointsElem = document.getElementById('js-computerPoints');



function newGame() {
    player.name = prompt('Twoje imię', 'TY');
    if (player.name) {
        player.score = computer.score = 0;
        gameState = 'started';
        setGameElements();
        playerNameElem.innerHTML = player.name;
        playerPointsElem.innerHTML  = "0";
        computerPointsElem.innerHTML  = "0";
    }

}

function getComputerPick() {
    var possiblePicks = ['rock', 'paper', 'scissors'];
    return possiblePicks[Math.floor(Math.random() * 3)];
}

var playerPickElem = document.getElementById('js-playerPick'),
    computerPickElem = document.getElementById('js-computerPick'),
    playerResultElem = document.getElementById('js-playerResult'),
    computerResultElem = document.getElementById('js-computerResult');

function playerPick(playerPick) {
    var computerPick = getComputerPick();

    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;
}


function checkRoundWinner(playerPick, computerPick) {
    playerResultElem.innerHTML = computerResultElem.innerHTML = '';

    var winnerIs = 'player';

    if (playerPick == computerPick) {
        winnerIs = 'noone'; // remis
    } else if (
        (computerPick == 'rock' && playerPick == 'scissors') ||
        (computerPick == 'scissors' && playerPick == 'paper') ||
        (computerPick == 'paper' && playerPick == 'rock')) {

        winnerIs = 'computer';
    }

    if (winnerIs == 'player') {
        playerResultElem.innerHTML = "Win!";
        player.score++;
    } else if (winnerIs == 'computer') {
        computerResultElem.innerHTML = "Win!";
        computer.score++;
    }

    console.log("komputer linia 125: " + computer.score);
    console.log("gracz linia 126: " + player.score);

    writeResults()
}


function writeResults() {
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;

    endOfGame()
}



function endOfGame(playerPoints, computerPoints) {

    if ((player.score == 3) || (computer.score == 3)) {
        whoWasTheWinner.innerHTML = "";




        if (computer.score > player.score) {
            whoWasTheWinner.innerHTML = "<div class='row text-center'><button class='btn'>komp wygrał</button></div>";
        } else {
            whoWasTheWinner.innerHTML = "<div class='row text-center'><button class='btn'>" + player.name + " wygrał/a</button></div>";
        }
        nextGame();
    }
}


function playerPick(playerPick) {
    var computerPick = getComputerPick();

    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;

    checkRoundWinner(playerPick, computerPick);

}


function nextGame() {


    gameState = 'ended';
    setGameElements();
    nextGameBtn.innerHTML = "Jeszcze raz";
    nextGameBtn.addEventListener('click', newGame);
}
