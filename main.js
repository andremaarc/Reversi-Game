let currentPlayer = document.querySelector('div.current-player')
let board = document.querySelector('.board')
let cells = document.querySelectorAll('div.zones')
currentPlayer.classList.add('player1')

// Botão que reinicia o jogo
const restart = document.getElementById("btn-restart");
restart.addEventListener("click", function () {
    location.reload();
})

// Botão que abre o menu
const btnMenu = document.getElementById('btn-menu')
let menuView = document.getElementById('menu')

btnMenu.onclick = function () {
    menuView.style.display = "flex";
}

btnMenu.onblur = function () {
    setTimeout(() => {
        menuView.style.display = "none";
    }, 130)
}

var cel
cells.forEach(function (e) {
    // funcionamento do hover das divs
    e.addEventListener("mouseover", function () {
        if (currentPlayer.classList.contains('player2')) {
            this.style.backgroundColor = "#8bd3dd"
        } else {
            this.style.backgroundColor = "#f582ae"
        }
    })
    e.addEventListener("mouseout", function () {
        this.style.backgroundColor = ""
    })

    // funcionamento do click nas divs
    e.addEventListener("click", function () {
        let player = currentPlayer.classList.contains('player1') ? 'player1' : 'player2'

        cel = this

        if (!this.classList.contains("player1") && !this.classList.contains("player2")) {
            let captures = getCaptures(this)
            console.log(captures)
            if (captures.length >= 0) {
                this.classList.add(player)
                for (let i = 0; i < captures.length; i++) {
                    captures[i].classList.remove("player1")
                    captures[i].classList.remove("player2")
                    captures[i].classList.add(player)
                }
                switchPlayer()
            }
        }
    })
})

function switchPlayer() {
    if (currentPlayer.classList.contains('player1')) {
        currentPlayer.classList.replace('player1', 'player2')
        currentPlayer.innerHTML = 'Player 2'
    } else {
        currentPlayer.classList.replace('player2', 'player1')
        currentPlayer.innerHTML = 'Player 1'
    }
}

function getCaptures(cell) {
    let captures = [];
    let player = currentPlayer.classList.contains("player1") ? "player1" : "player2";
    let opponent = currentPlayer.classList.contains("player1") ? "player2" : "player1";

    let cellRect = cell.getBoundingClientRect();
    let boardRect = board.getBoundingClientRect();

    let x = Array.from(board.children).indexOf(cell.parentNode);
    let y = Array.from(cell.parentNode.children).indexOf(cell);

    // Check captures in all 8 directions
    for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
            if (dx === 0 && dy === 0) {
                continue;
            }
            let sequence = [];
            let nextX = x + dx;
            let nextY = y + dy;

            while (nextX >= 0 && nextX < 8 && nextY >= 0 && nextY < 8) {
                let nextCell = document.elementFromPoint(
                    boardRect.left + (cellRect.width * nextY + cellRect.width / 2),
                    boardRect.top + (cellRect.height * nextX + cellRect.height / 2)
                );

                if (!nextCell || nextCell === board) break;
                if (nextCell.parentNode !== board.children[nextX]) break;
                if (nextCell.classList.contains(opponent)) {
                    sequence.push(nextCell);
                } else if (nextCell.classList.contains(player) && sequence.length > 0) {
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


