import { useEffect } from 'react';
import { useQuiz } from '../contexts/QuizContext';

export default function Timer() {
    const { secondsRemaining, dispatch } = useQuiz();
    const minutes = Math.floor(secondsRemaining / 60);
    const seconds = secondsRemaining % 60;

    useEffect(
        function () {
            const id = setInterval(function () {
                dispatch({ type: 'tick' });
            }, 1000);
            return function () {
                clearInterval(id);
            };
        },
        [dispatch]
    );
    return (
        <div className='timer'>
            {minutes < 10 && '0'}
            {minutes}:{seconds < 10 && '0'}
            {seconds}
        </div>
    );
}
