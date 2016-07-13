export const NEXT_QUESTION = 'NEXT_QUESTION';
export const CHECK_ANSWER = 'CHECK_ANSWER';
export const SHOW_ANSWER = 'SHOW_ANSWER';

export const getNextQuestion = ()=> ({
  type: NEXT_QUESTION
});

export const checkAnswer = (answer)=> ({
  type: CHECK_ANSWER,
  answer
});
export const showAnswer = (show=true)=> ({
  type: SHOW_ANSWER,
  show
});
