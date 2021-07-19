'use strict';

//selecting elements
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');

const score0EL = document.querySelector('#score--0');
const score1EL = document.querySelector('#score--1');

const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--1');

const diceEL = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Variables declaration
let scores, currentScore, activePlayer, playing;

//Initlization variables function
const init = () => {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0EL.textContent = 0;
  score1EL.textContent = 0;
  current0EL.textContent = 0;
  current1EL.textContent = 0;

  diceEL.classList.add('hidden');
  player0EL.classList.remove('player--winner');
  player1EL.classList.remove('player--winner');
  player0EL.classList.add('player--active');
  player1EL.classList.remove('player--active');
};
// Function call
init();

// Switch player function
const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
};

// Rolling dice implementation
btnRoll.addEventListener('click', () => {
  if (playing) {
    //1- Randon dice roll

    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    //2- Display dice img
    diceEL.classList.remove('hidden');
    diceEL.src = `dice-${dice}.png`;

    //3- check for rolled 1 if true, switch to second player
    if (dice !== 1) {
      //   Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //   switch to next player
      switchPlayer();
    }
  }
});

// Hold button implementation
btnHold.addEventListener('click', () => {
  if (playing) {
    //add currentscore to active player scores
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // check if score >= 100 //TODOfinish game
    if (scores[activePlayer] >= 50) {
      playing = false;
      diceEL.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

// Rsetting the new game
btnNew.addEventListener('click', init);
