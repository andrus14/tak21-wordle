const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'Š', 'Z', 'Ž', 'T', 'U', 'V', 'W', 'Õ', 'Ä', 'Ö', 'Ü', 'X', 'Y'];
const firstCell = document.querySelector('#first-cell');

document.addEventListener('keydown', e => {
    console.log(e);

    const key = e.key.toUpperCase();
    if ( alphabet.includes(key) ) {
        firstCell.innerText = key;
    }

});