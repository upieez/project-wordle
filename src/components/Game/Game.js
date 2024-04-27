import React from 'react';

import { sample } from '../../utils';
import { WORDS } from '../../data';

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const [guess, setGuess] = React.useState('');
  const [guesses, setGuesses] = React.useState([]);

  function handleGuess(event) {
    event.preventDefault();
    console.log(guess)
    setGuess('');
    const guessObj = {
      id: crypto.randomUUID(),
      value: guess
    }
    setGuesses([...guesses, guessObj])
  }

  function handleChange(event) {
    // User input need to be all uppercase;
    const text = event.target.value
    const upperCaseText = text.toUpperCase();
    setGuess(upperCaseText);
  }

  return (
    <>
      <div>
        {guesses.map((data) => (
          <p key={data.id} className="guess">{data.value}</p>
        ))}
      </div>
      <form className="guess-input-wrapper" onSubmit={handleGuess}>
        <label htmlFor='guess-input'>Enter guess:</label>
        <input id="guess-input" type="text" pattern='[A-Za-z]{5}' minLength={5} maxLength={5} value={guess} onChange={handleChange} />
      </form>
    </>
  );
}

export default Game;
