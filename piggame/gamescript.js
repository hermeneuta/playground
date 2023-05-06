'use strict';

function roll() {
    if (playing) {
    //Get random number from 1 to 6
    let r = Math.trunc(Math.random()*6 + 1);

    //Display dice
    document.querySelector('.dice').src=`dice-${r}.png`;
    diceRoll.classList.remove('hidden');

    //Check if dice is not 1. If so add score to current
    if (r!==1) {
        add+=r;
        document.getElementById(`current--${pl}`).textContent = add; 
    //If dice is 1 reset current score and switch player
    } else if (r===1) {
        document.getElementById(`current--${pl}`).textContent = 0; 
        add = 0;
        switchPlayer();
    }
}
};

function hold() {
    if (playing) {
    //Add current score to main score
    score[pl] += add;
    document.getElementById(`score--${pl}`).textContent = score[pl]; 

    //Check if player win
    if (score[pl] >= 100) {
        playing = false;
        document.querySelector(`.player--${pl}`).classList.add('player--winner');
        document.getElementById(`current--${pl}`).textContent = 0; 
        diceRoll.classList.add('hidden');
        switchPlayer();
        // document.querySelector(`player--${pl}`).classList.remove('player--active');
    }

    //Reset current score if player dosen't win and switch player
    else {
        switchPlayer();
    }
}
};

//manipulate global index of player and activate backgroud for active player
function switchPlayer() {
    document.getElementById(`current--${pl}`).textContent = 0;
    add = 0; 
    pl = pl === 0 ? 1 : 0;
    document.querySelector(`.player--0`).classList.toggle('player--active');
    document.querySelector(`.player--1`).classList.toggle('player--active');
};

//Setting values for new game
function reset() {
    //table that stores scores
    score = [0, 0];
    //state variable
    playing = true;
    //current score variable
    add = 0;
    //active player number
    pl = 0;

    diceRoll.classList.add('hidden');
    document.getElementById('score--0').textContent = 0;
    document.getElementById('score--1').textContent = 0;
    document.getElementById('current--0').textContent = 0;
    document.getElementById('current--1').textContent = 0;
    document.getElementById('name--0').textContent = 'Player 1';
    document.getElementById('name--1').textContent = 'Player 2';
    document.querySelector(`.player--0`).classList.remove('player--winner');
    document.querySelector(`.player--1`).classList.remove('player--winner');

}

let playing, score, add, pl;

const makeRoll = document.querySelector('.btn--roll');
const pressHold = document.querySelector('.btn--hold');
const newGame = document.querySelector('.btn--new');
const diceRoll = document.querySelector('.dice');

makeRoll.addEventListener('click', roll);
pressHold.addEventListener('click', hold);
newGame.addEventListener('click', reset);

reset();
