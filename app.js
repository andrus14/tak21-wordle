const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'Š', 'Z', 'Ž', 'T', 'U', 'V', 'W', 'Õ', 'Ä', 'Ö', 'Ü', 'X', 'Y'];

// const firstCell = document.querySelector('#first-cell');
// const letterCells = document.querySelectorAll('.letter');
let nextCell = [0, 0];
let words = [];
let playerWord = '';


fetch('words.txt')
.then(response => response.text())
.then(data => {
    words = data.split('\n');

    let currentWord = words[Math.floor(Math.random() * words.length)];
    console.log(currentWord);

    document.addEventListener('keydown', e => {
        console.log(e);
    
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
            console.log(playerWord);

            for ( let i = 0; i < playerWord.length; i++ ) {
                let letter = playerWord.charAt(i).toLowerCase();
                console.log(letter);

                const currentCellEl = document.querySelector(`.letter[data-x="${i}"][data-y="${nextCell[1]}"]`);
                if ( letter == currentWord.charAt(i) ) {
                    currentCellEl.classList.add('correct-letter');
                    console.log('õige täht, õiges kohas', letter);
                } else if ( currentWord.includes(letter) ) {
                    currentCellEl.classList.add('present-letter');
                    console.log('õige täht, vales kohas', letter);
                } else {
                    currentCellEl.classList.add('absent-letter');
                }
            }
        }
    });

});

