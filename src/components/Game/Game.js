import React from 'react';

import { sample } from '../../utils';
import { WORDS } from '../../data';
import GuessResult from '../GuessResult/GuessResult';

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const [guess, setGuess] = React.useState('');
  const [guesses, setGuesses] = React.useState([]);
  const [gameStatus, setGameStatus] = React.useState();

  function handleGuess(event) {
    event.preventDefault();
    console.log(guess)
    setGuess('');
    setGuesses([...guesses, guess])
  }

  function handleChange(event) {
    // User input need to be all uppercase;
    const text = event.target.value
    const upperCaseText = text.toUpperCase();
    setGuess(upperCaseText);
  }

  React.useEffect(() => {
    if (guesses.some((value)=> value === answer)) {
      setGameStatus('happy');
    } else if (gameStatus !== 'happy' && guesses.length > 5) {
      setGameStatus('sad')
    }

  }, [guesses, gameStatus])

  return (
    <>
      {gameStatus && (
        <div className={`${gameStatus} banner`}>
          <p>
            {gameStatus === 'happy' ? 
            <>
            <strong>Congratulations!</strong> Got it in
            <strong>{guesses.length} guesses</strong>. 
            </>
            :  
            <>
            Sorry, the correct answer is <strong>{answer}</strong>
            </>
            }
          </p>
        </div>
      )}
      <GuessResult guesses={guesses} answer={answer} />
      <form className="guess-input-wrapper" onSubmit={handleGuess}>
        <label htmlFor='guess-input'>Enter guess:</label>
        <input 
          id="guess-input"
          type="text"
          pattern='[A-Za-z]{5}'
          minLength={5}
          maxLength={5}
          value={guess}
          onChange={handleChange}
        />
      </form>
    </>
  );
}

export default Game;
