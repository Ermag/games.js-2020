import { CONFIG } from './config'

// Returns a random integer between min (inclusive) and max (inclusive).
export function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)

    return Math.floor(Math.random() * (max - min + 1)) + min
}

export function shuffleArray (array) {
    let counter = array.length;
    
    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

function generateCharacters(count) {
    let chars = []

    for (let i = 0; i < count; i++) {
        chars.push(i)
    }

    return chars
}

function generateBoard(sizeX, sizeY) {
    let board = []

    // Y
    for (let y = 0; y < sizeX; y++) {
        let rows = []
 
        // X
        for (let x = 0; x < sizeY; x++) {
            // TODO: make it not random xD
            rows.push(getRandomInt(0, CONFIG.itemsCount))
        }

        board.push(rows)
    }

    return board
}

function generateCards(count, sizeX, sizeY) {
    let cards = []

    // Total cards
    for (let i = 0; i < count; i++) {
        let card = []
        let blocks = 0;

        // Y
        for (let y = 0; y < sizeX; y++) {
            let rows = []

            // X
            for (let x = 0; x < sizeY; x++) {
                // TODO: make it not random xD
                var r = getRandomInt(0, 1);
                if (r)
                  blocks++;
                if (blocks == 4)
                  r = 0;
                rows.push(r)
            }

            card.push(rows)
        }

        cards.push(card)
    }

    return cards
}

function generateRandomLevel() {
    const chars = generateCharacters(CONFIG.charsCount)
    const board = generateBoard(CONFIG.boardSize.x, CONFIG.boardSize.y)
    const cards = generateCards(CONFIG.cardsCount, CONFIG.cardSize.x, CONFIG.cardSize.y)

    return {
        chars,
        board,
        cards
    }
}

export function getLevel(index) {
    const levelIndex = index ? index : parseInt(localStorage.getItem('level-index'))
    let level = levelIndex >= 0 ? CONFIG.levels[levelIndex] : CONFIG.levels[0]

    // If we cannot find pre generated level... generate one
    if (!level) level = generateRandomLevel()
    if (!level.cards) level.cards = generateCards(CONFIG.cardsCount, CONFIG.cardSize.x, CONFIG.cardSize.y)
    level.generate = () => { level.board = generateBoard(CONFIG.boardSize.x, CONFIG.boardSize.y); level.cards = generateCards(CONFIG.cardsCount, CONFIG.cardSize.x, CONFIG.cardSize.y); }

    return level
}
