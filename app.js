const alphabet = ['A', 'B', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'Š', 'Z', 'Ž', 'T', 'U', 'V', 'Õ', 'Ä', 'Ö', 'Ü'];

const corretAnswerDiv = document.querySelector('#correct-answer');

let nextCell = [0, 0];
let words = [];
let playerWord = '';
let currentWord = '';
let isGameOver = false;

fetch('words.txt')
.then(response => response.text())
.then(data => {
    words = data.split('\n');

    currentWord = words[Math.floor(Math.random() * words.length)];
    console.log(currentWord);

    document.addEventListener('keydown', e => {
    
        if ( !isGameOver ) {
            let nextCellEl = document.querySelector(`.letter[data-x="${nextCell[0]}"][data-y="${nextCell[1]}"]`);
            const key = e.key.toUpperCase();
        
            if ( alphabet.includes(key) && nextCell[0] <= 4 ) {
                nextCellEl.innerText = key;
                playerWord += key;
                nextCell[0]++;
            } else if ( key == 'BACKSPACE' && nextCell[0] > 0 ) {
                nextCell[0]--;
                nextCellEl = document.querySelector(`.letter[data-x="${nextCell[0]}"][data-y="${nextCell[1]}"]`);
                nextCellEl.innerText = '';
                playerWord = playerWord.slice(0, -1);
            } else if ( key == 'ENTER' && nextCell[0] == 5 ) {
                testWord();
            }
        }
    });

});

function testWord () {
    isGameOver = true;
    console.log(playerWord);

    for ( let i = 0; i < playerWord.length; i++ ) {
        let letter = playerWord.charAt(i).toLowerCase();

        const currentCellEl = document.querySelector(`.letter[data-x="${i}"][data-y="${nextCell[1]}"]`);
        if ( letter == currentWord.charAt(i) ) {
            currentCellEl.classList.add('correct-letter');
        } else if ( currentWord.includes(letter) ) {
            currentCellEl.classList.add('present-letter');
            isGameOver = false;
        } else {
            currentCellEl.classList.add('absent-letter');
            isGameOver = false;
        }
    }

    if ( isGameOver ) {
        corretAnswerDiv.innerText = 'Õige sõna: ' + currentWord.toUpperCase();
    } else {
        nextCell[0] = 0;
        nextCell[1]++;
        playerWord = '';
    }
}