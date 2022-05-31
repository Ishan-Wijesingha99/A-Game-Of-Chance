'use strict';



// defining frequently used variables in the DOM
const scoreElement0 = document.querySelector('#score--0');
const scoreElement1 = document.querySelector('#score--1');

const diceHTML = document.querySelector('.dice');

const rollBtn = document.querySelector('.btn--roll');
const newGameBtn = document.querySelector('.btn--new');
const holdBtn = document.querySelector('.btn--hold');

const currentScoreElement0 = document.querySelector('#current--0');
const currentScoreElement1 = document.querySelector('#current--1');

const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');







// creating the starting conditions
let totalScores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

let playingTheGame = true;

diceHTML.classList.add('hidden');
scoreElement0.textContent = 0;
scoreElement1.textContent = 0;







// creating a function for switching the active player so that we can invoke this function in multiple places in our code (the DRY principle)
const switchPlayer = function() {
    
    // reset current score to 0 and change HTML element of activePlayer so it also displays 0 again
    currentScore = 0;
    document.querySelector(`#current--${activePlayer}`).textContent = currentScore;


    // switch to next player
    // basically activePlayer = 0 when it's player 1's turn and activePlayer = 1 when it's player 2's turn. So we're just going to be alternating between 0 and 1 as the turns go by
    activePlayer = activePlayer === 0 ? 1 : 0;


    // change the background color so that it indicates the active player has switched 
    // use classList.toggle() which adds the class if it isn't there and removes the class if it is there
    player0Element.classList.toggle('player--active');
    player1Element.classList.toggle('player--active');

}








// IMPORTANT NOTE ABOUT GENERATING A RANDOM NUMBER BETWEEN 1 AND X

// Math.random() generates a random number from 0 to 1
// If you want to change this to a random number between 0 and x, you need to do Math.random() * x
// The above expression will give you a random number between 0 and x, but it will be a decimal value, if you want to make it into a whole number, you must truncate it (shaves off the decimal part, it doesn't round it, it just shaves 5.782 into 5). Use Math.trunc(Math.random() * x)
// Now that you've trucated it, it will only generate random numbers from 0,1,2,3,4....(x-1). Because you've shaved off the decimal part, you'll never actually get x, you'll always get one less than x. 
// Use the expression Math.trunc(Math.random() * x) + 1 to get numbers from 1,2,3,4...x , it won't be from 0 to x, but it will be from 1 to x



// Implementing functionality of the dice roll buttton

rollBtn.addEventListener('click', function() {
    
    if (playingTheGame) {

        const randomDiceRoll = Math.trunc(Math.random() * 6) + 1;

        // How to put different pictures on a certain HTML element (changing the src of the HTML image)
        diceHTML.src = `dice-${randomDiceRoll}.png`;
    
        diceHTML.classList.remove('hidden');



        if (randomDiceRoll !== 1) {
            // add dice roll to current score
            currentScore = currentScore + randomDiceRoll;
    
            // display that current score to the active player's HTML element
            document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
    
        } else {

            switchPlayer();

        }

    }

})






// implementing functionality of the hold button

holdBtn.addEventListener('click', function() {

    if (playingTheGame) {

        // add current score to the active player's total score
        // display the active player's total score on the active player's HTML element
        totalScores[activePlayer] = totalScores[activePlayer] + currentScore;
        document.querySelector(`#score--${activePlayer}`).textContent = totalScores[activePlayer];

        // Check if player has won or not
        if (totalScores[activePlayer] >= 100) {
        
        // if active player's score is 100 or more, active player wins
        playingTheGame = false;

        // add the black background to winning player
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        // remove the usual background of the active player
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');

        // get rid of dice picture
        diceHTML.classList.add('hidden');

        } else {
        
        // if active player's score is less than 100, switch the player
        switchPlayer();

        }


    }

})




// implementing the functionality of the NEW GAME button

newGameBtn.addEventListener('click', function() {
    
    // setting the total scores of each player back to 0 and the total score HTML elements back to 0
    totalScores = [0, 0];
    scoreElement0.textContent = totalScores[0];
    scoreElement1.textContent = totalScores[1];

    // setting the current score javascript variable back to 0 and the current score HTML elements back to 0
    currentScore = 0;
    currentScoreElement0.textContent = currentScore;
    currentScoreElement1.textContent = currentScore;

    // making player 1 the active player again
    activePlayer = 0;

    // making the background colour of player 2 normal and background colour of player 1 the active player background
    player0Element.classList.add('player--active');
    player1Element.classList.remove('player--active');

    // making sure the black winner background isn't present in either player
    player0Element.classList.remove('player--winner');
    player1Element.classList.remove('player--winner');

    // remove dice picture if it's there
    diceHTML.classList.add('hidden');

    // if you reset the game before a winner is decided, then the code above is all you need for the game to reset completely, but remember, if a winner is decided and then you click NEW GAME, the ROLL DICE button and HOLD button won't work, because the playingTheGame variable is FALSE now. So you also need to reset that variable to TRUE in this code block
    playingTheGame = true;

})


