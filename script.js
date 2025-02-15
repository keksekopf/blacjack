// Backend for blackjack app

// Declare player variables
let cards = [] // Player's cards
let hasBlackJack = false // Whether player has blackjack
let isAlive = false // Whether the game is finished
let message = "" // Informs user of current game state
let sum = 0 // Sum of player's cards
let blackJack = 21

// Implement dealer function
let dealer = {
    cards: []
}

let player = {
    name: "Carl",
    chips: 145,
    getName: function() {
        console.log("hello")
    }
}

// Initialise HTML elements as variables
let playerCards = document.getElementById("cards-el")
let cardsTotalValue = document.querySelector("#sum-el") // slower than getElementById
let messageEl = document.getElementById("message-el")
let playerEl = document.getElementById("player-el")
playerEl.textContent = player.name + ": $" + player.chips

// Start the game
function startGame() {
    // Only start the game if another game isn't started
    if (!isAlive) {
        isAlive = true
        hasBlackJack = false
        // Assign two random cards
        cards = [getRandomCard(), getRandomCard()]
        dealer.cards = [getRandomCard(), getRandomCard()]
        // Sum the variable so the game can start
        sum = cards.reduce(
            (partialSum, a) => partialSum + a, 0
        )
        renderGame()
    }
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
    if (isAlive && !hasBlackJack) {
        let newCard = getRandomCard()
        cards.push(newCard)
        sum += newCard
        renderGame()
    } else {
        messageEl.textContent = "Please start a new game"
    }
}

function getRandomCard() {
    let randomCard = Math.ceil(Math.random() *13)
    if (randomCard > 10) {
        return 10
    } else if (randomCard === 1) {
        return 11
    } else {
        return randomCard
    }
}