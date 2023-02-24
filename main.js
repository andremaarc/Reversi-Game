// Botão que reinicia o jogo
const restart = document.getElementById("btn-restart");
restart.addEventListener("click", function () {
    location.reload();
})

// Botão que abre o menu
const btnMenu = document.getElementById('btn-menu')
let menuView = document.getElementById('menu')
let gameOverView = document.getElementById('game-over')

btnMenu.onclick = function () {
    menuView.style.display = "flex";
}

btnMenu.onblur = function () {
    setTimeout(() => {
        menuView.style.display = "none";
    }, 130)
}

// Lógica do jogo
let currentPlayer = document.querySelector('div.current-player')
let board = document.querySelector('.board')
let cells = document.querySelectorAll('td')
currentPlayer.classList.add('player1')

function switchPlayer() {
    if (currentPlayer.classList.contains('player1')) {
        currentPlayer.classList.replace('player1', 'player2')
        currentPlayer.innerHTML = 'Player 2'
    } else {
        currentPlayer.classList.replace('player2', 'player1')
        currentPlayer.innerHTML = 'Player 1'
    }
}

cells.forEach(function (e) {
    // funcionamento do hover das divs
    let divZone = e.querySelector('div')   
    divZone.addEventListener("mouseover", function () {
        if (!this.classList.contains("player1") && !this.classList.contains("player2")){
            if (currentPlayer.classList.contains('player2')) {
                this.style.backgroundColor = "#8bd3dd"
            } else {
                this.style.backgroundColor = "#f582ae"
            }
        }
    })
    divZone.addEventListener("mouseout", function () {
        this.style.backgroundColor = ""
    })

    // funcionamento do click nas divs
    divZone.addEventListener("click", function () {
        let player = currentPlayer.classList.contains('player1') ? 'player1' : 'player2'
        if (!this.classList.contains("player1") && !this.classList.contains("player2")) {
            let captures = getCaptures(e)
            if (captures.length > 0) {
                this.classList.add(player)
                for (let i = 0; i < captures.length; i++) {
                    let divCaptures = captures[i].querySelector('div')
                    divCaptures.classList.remove("player1")
                    divCaptures.classList.remove("player2")
                    divCaptures.classList.add(player)
                }
                score()
                switchPlayer()
                if(!hasValidMove()){
                    gameOver()
                }
            }
        }
    })
})

function getCaptures(cell) {
    let captures = [];
    let player = currentPlayer.classList.contains("player1") ? "player1" : "player2";
    let opponent = currentPlayer.classList.contains("player1") ? "player2" : "player1";

    let x = cell.parentNode.rowIndex;
    let y = cell.cellIndex;

    // checando todas as direções
    for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
            if (dx === 0 && dy === 0) {
                continue;
            }
            let sequence = [];
            let nextX = x + dx;
            let nextY = y + dy;

            while (nextX >= 0 && nextX < 8 && nextY >= 0 && nextY < 8) {
                let nextCell = board.rows[nextX].cells[nextY];
                let divNextCell = nextCell.querySelector('div')
                if (divNextCell.classList.contains(opponent)) {
                    sequence.push(nextCell);
                } else if (divNextCell.classList.contains(player) && sequence.length > 0) {
                    captures = captures.concat(sequence);
                    break;
                } else {
                    break;
                }
                nextX += dx;
                nextY += dy;
            }
        }
    }
    return captures;
}

function hasValidMove() {
    for (let i = 0; i < cells.length; i++) {
        let divCell = cells[i].querySelector('div')
        if (!divCell.classList.contains("player1") && !divCell.classList.contains("player2")) {
            if (getCaptures(cells[i]).length > 0) {
                return true;
            }
        }
    }
    return false;
}

function score(){
    let player1 = document.querySelectorAll('td > div.player1')
    let player2 = document.querySelectorAll('td > div.player2')
    let score1 = document.getElementById('score1')
    let score2 = document.getElementById('score2')
    score1.innerHTML = player1.length
    score2.innerHTML = player2.length
}

function gameOver(){
    let winner = document.getElementById('winner')

    let player1 = document.querySelectorAll('td > div.player1')
    let player2 = document.querySelectorAll('td > div.player2')
    let score1 = document.getElementById('score1')
    let score2 = document.getElementById('score2')
    score1.innerHTML = player1.length
    score2.innerHTML = player2.length
    if (player1.length > player2.length) {
        gameOverView.style.display = "flex";
        winner.innerHTML = 'Player 1'

    } else if (player1.length < player2.length) {
        gameOverView.style.display = "flex";
        winner.innerHTML = 'Player 2'
    } else {
        gameOverView.style.display = "flex";
        winner.innerHTML = 'Draw'
    }
    setTimeout(() => {
        gameOverView.style.display = "none";
    }, 3000)
}