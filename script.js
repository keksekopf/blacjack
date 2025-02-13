// Backend for blackjack app

// Variables representing the value of 2 random cards
let firstCard = Math.ceil(Math.random() *11)
let secondCard = Math.ceil(Math.random() * 11)
let cards[] = firstCard + secondCard

// Variable to track the state of the player's victory
let hasBlackJack = false

// Tracks the state of the game
let isAlive = true
let gameStart = false

// Declare a variable to hold the message of the current game state
let message = ""

// Sum the value of the two player cards
let sum = firstCard + secondCard

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
    // Display the player's hand and their total value
    playerCards.textContent = "Cards: " + firstCard + " & " + secondCard
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

function drawCard() {
    console.log("Drawing a new card")
    sum += Math.ceil(Math.random() * 11)
    // playerCards.textContent = "Cards: " + firstCard + " & " + secondCard + " & " + thirdCard
    startGame()
}

// function checkWin() {
//     if (sum <= 20) {
//         message = "Do you want to draw a new card?"
//     } else if (sum === 21) {
//         message = "You've got Blackjack!"
//         hasBlackJack = true
//     } else {
//         message = "You're out of the game!"
//         return isAlive = false
//     }

//     // Display the message
//     messageEl.textContent = message
// }

// function displaySum() {
//     cardsTotalValue.textContent = "Sum: " + sum
// }

// if (isAlive) {
//     document.getElementById("start-btn").innerHTML = "Draw Card"
//     event.target.onclick = drawCard
// } else {
//     document.getElementById("start-btn").innerHTML = "Game Over"
// }
