window.addEventListener('DOMContentLoaded', () => {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');

    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameInProgress = true;

    const PLAYER_X = 'X';
    const PLAYER_O = 'O';
    const PLAYER_X_WON = 'PLAYER_X_WON';
    const PLAYER_O_WON = 'PLAYER_O_WON';
    const TIE = 'TIE';

    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i].map(index => board[index]);
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            announce(currentPlayer === PLAYER_X ? PLAYER_X_WON : PLAYER_O_WON);
            isGameInProgress = false;
            return;
        }

        if (!board.includes('')) {
            announce(TIE);
            isGameInProgress = false;
        }
    }

    const announce = (type) => {
        let message = '';
        switch (type) {
            case PLAYER_O_WON:
                message = 'Player <span class="playerO">O</span> Won';
                break;
            case PLAYER_X_WON:
                message = 'Player <span class="playerX">X</span> Won';
                break;
            case TIE:
                message = 'Tie';
                break;
        }
        announcer.innerHTML = message;
        announcer.classList.remove('hide');
    };

    const isValidAction = (tile) => {
        return tile.innerText !== 'X' && tile.innerText !== 'O';
    };

    const updateBoard = (index) => {
        board[index] = currentPlayer;
    };

    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = (currentPlayer === PLAYER_X) ? PLAYER_O : PLAYER_X;
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    };

    const userAction = (tile, index) => {
        if (isValidAction(tile) && isGameInProgress) {
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    };

    const resetBoard = () => {
        board = Array(9).fill('');
        isGameInProgress = true;
        announcer.classList.add('hide');

        if (currentPlayer === PLAYER_O) {
            changePlayer();
        }

        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX', 'playerO');
        });
    };

    tiles.forEach(tile => {
        tile.addEventListener('click', () => userAction(tile, tiles.indexOf(tile)));
    });

    resetButton.addEventListener('click', resetBoard);
});
