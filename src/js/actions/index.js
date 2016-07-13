export const NEXT_QUESTION = 'NEXT_QUESTION';
export const CHECK_ANSWER = 'CHECK_ANSWER';
export const HIDE_ANSWER = 'HIDE_ANSWER';

export const getNextQuestion = ()=> ({
  type: NEXT_QUESTION
});

export const checkAnswer = (answer)=> ({
  type: CHECK_ANSWER,
  answer
});
export const hideAnswer = (show=true)=> ({
  type: HIDE_ANSWER,
  show
});
