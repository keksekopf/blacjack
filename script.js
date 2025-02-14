// Backend for blackjack app

// Array of cards
let cards = [getRandomCard(), getRandomCard()]

// Variable to track the state of the player's victory
let hasBlackJack = false

// Tracks the state of the game
let isAlive = true
let gameStart = false

// Declare a variable to hold the message of the current game state
let message = ""

// Sum the value of the two player cards
let sum = cards.reduce(
    (partialSum, a) => partialSum + a, 0
)

// Perfect blackjack hand value
let blackJack = 21

// Initialise HTML elements as variables
let playerCards = document.getElementById("cards-el")
let cardsTotalValue = document.querySelector("#sum-el") // slower than getElementById
let messageEl = document.getElementById("message-el")
// let startButton = document.getElementById("start-btn")

// Start the game
function startGame() {
    renderGame()
}

// Render the game 
function renderGame() {
    playerCards.textContent = "Cards: "
    for (i = 0; i < cards.length; i++) {
        playerCards.textContent += cards[i] + " "
    }
    cardsTotalValue.textContent = "Sum: " + sum

    // Check win condition
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "You've got Blackjack!"
        hasBlackJack = true
    } else {
        message = "You're out of the game!"
        isAlive = false
    }
    messageEl.textContent = message
}

// Add a new card to the player's hand
function drawCard() {
    console.log("Drawing a new card")
    let newCard = Math.ceil(Math.random() * 11)
    cards.push(newCard)
    sum += newCard
    startGame()
}

function getRandomCard() {
    return Math.ceil(Math.random() *11)
}