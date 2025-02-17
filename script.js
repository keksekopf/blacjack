// Backend for blackjack app

// Declare player variables
let hasBlackJack = false // Whether player has blackjack
let isAlive = false // Whether the game is finished
let message = "" // Informs user of current game state
let blackJack = 21

// Initialise dealer variables
let dealer = {
    cards: [],
    sum: 0
}

let player = {
    cards: [],
    sum: 0,
    name: "Carl",
    chips: 100,
    bet: 0,
    win: false,
    getName: function() {
        console.log("hello")
    }
}

// Initialise HTML elements as variables
let playerCards = document.getElementById("playerCards-el")
let cardsTotalValue = document.querySelector("#sum-el") // slower than getElementById
let messageEl = document.getElementById("message-el")
let playerEl = document.getElementById("player-el")
playerEl.textContent = player.name + ": $" + player.chips

let dealerCards = document.getElementById("dealerCards-el")

// Start the game
function startGame() {
    // Only start the game if another game isn't started
    player.win = false
    if (!isAlive || hasBlackJack) {
        isAlive = true
        hasBlackJack = false
        // Assign two random cards
        player.cards = [getRandomCard(), getRandomCard()]
        dealer.cards = [getRandomCard(), getRandomCard()]
        // Sum the variable so the game can start
        player.sum = player.cards.reduce(
            (partialSum, a) => partialSum + a, 0
        )
        dealer.sum = dealer.cards.reduce(
            (partialSum, a) => partialSum + a, 0
        )
        console.log(dealer.cards)
        console.log(dealer.sum)
        renderGame()
    }
}

// Render the game 
function renderGame() {
    playerCards.textContent = "Cards: "
    for (i = 0; i < player.cards.length; i++) {
        playerCards.textContent += player.cards[i] + " "
    }
    cardsTotalValue.textContent = "Sum: " + player.sum

    dealerCards.textContent = "Dealer's Hand: "
    for (i = 0; i < dealer.cards.length - 1; i++) {
        dealerCards.textContent += dealer.cards[i]
    }

    // Check win condition
    if (player.sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (player.sum === 21) {
        message = "You've got Blackjack!"
        hasBlackJack = true
    } else {
        message = "You're out of the game!"
        isAlive = false
    }
    messageEl.textContent = message
    checkBetOutcome()
}

// Add a new card to the player's hand
function drawCard() {
    if (isAlive && !hasBlackJack) {
        let newCard = getRandomCard()
        player.cards.push(newCard)
        player.sum += newCard
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

// Stand the game and compare the player's sum to the dealer's
function stand() {
    // Check whose hand is closer to blackjack
    // If the dealer's hand is greater than the player's hand and the dealer's hand is less than or equal to 21
    if (dealer.sum > player.sum && dealer.sum <= 21) {
        messageEl.textContent = "Dealer wins"
    } else if (dealer.sum === player.sum) {
        messageEl.textConteont = "Draw"
    } else {
        messageEl.textContent = "You win!"
        // check this again
        player.win = true
    }
    isAlive = false
    checkBetOutcome()
}

// Implement a betting function
function betFiveChips() {
    player.chips -= 5
    player.bet += 5
    playerEl.textContent = player.name + ": $" + player.chips
}

// Check if player won the bet
function checkBetOutcome() {
    if (!isAlive && player.win || hasBlackJack) {
        player.chips += player.bet * 2
        player.bet = 0
        playerEl.textContent = player.name + ": $" + player.chips
    } else {
        player.bet = 0
    }
}