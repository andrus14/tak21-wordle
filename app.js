const alphabet = ['A', 'B', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'Š', 'Z', 'Ž', 'T', 'U', 'V', 'Õ', 'Ä', 'Ö', 'Ü'];

const messageDiv = document.querySelector('#message');
const keyBtns = document.querySelectorAll('#keyboard button');

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
        const key = e.key.toUpperCase();
        testLetter(key);
    });

    keyBtns.forEach(el => {

        const key = el.dataset.key.toUpperCase();

        el.addEventListener('click', e => {
            testLetter(key);        
        });

    });

});

function testLetter ( key ) {
    if ( !isGameOver ) {
        let nextCellEl = document.querySelector(`.letter[data-x="${nextCell[0]}"][data-y="${nextCell[1]}"]`);
    
        if ( alphabet.includes(key) && nextCell[0] <= 4 ) {
            nextCellEl.innerText = key;
            playerWord += key;
            nextCell[0]++;
        } else if ( key == 'BACKSPACE' && nextCell[0] > 0 ) {
            nextCell[0]--;
            nextCellEl = document.querySelector(`.letter[data-x="${nextCell[0]}"][data-y="${nextCell[1]}"]`);
            nextCellEl.innerText = '';
            playerWord = playerWord.slice(0, -1);
            messageDiv.innerText = '';
    } else if ( key == 'ENTER' && nextCell[0] == 5 ) {
            testWord();
        }
    }    
}

function testWord () {
    console.log(playerWord);

    if ( words.includes(playerWord.toLowerCase()) ) {
        isGameOver = true;

        for ( let i = 0; i < playerWord.length; i++ ) {
            let letter = playerWord.charAt(i).toLowerCase();
    
            const currentCellEl = document.querySelector(`.letter[data-x="${i}"][data-y="${nextCell[1]}"]`);
            const keyboardBtn = document.querySelector(`#keyboard button[data-key="${letter}"]`);
    
            if ( letter == currentWord.charAt(i) ) {
                currentCellEl.classList.add('correct-letter');
                keyboardBtn.classList.add('correct-letter');
            } else if ( currentWord.includes(letter) ) {
                currentCellEl.classList.add('present-letter');
                keyboardBtn.classList.add('present-letter');
                isGameOver = false;
            } else {
                currentCellEl.classList.add('absent-letter');
                keyboardBtn.classList.add('absent-letter');
                isGameOver = false;
            }
        }

        if ( isGameOver ) {
            messageDiv.innerText = 'Õige sõna: ' + currentWord.toUpperCase();
        } else {
            nextCell[0] = 0;
            nextCell[1]++;
            playerWord = '';
        }
    
    } else {
        messageDiv.innerText = 'Pole päris sõna';
    }

}