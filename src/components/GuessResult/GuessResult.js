import React from 'react';
import Guess from '../Guess';
import { range } from '../../utils';
import { NUM_OF_GUESSES_ALLOWED } from '../../constants';

function GuessResult({ guesses, answer }) {
  return (
    <div className='guess-results'>
      {range(NUM_OF_GUESSES_ALLOWED).map((row) => (
        <Guess key={row} word={guesses[row]} answer={answer} />
      ))}
    </div>
  );
}

export default GuessResult;
