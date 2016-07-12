export const NEXT_QUESTION = 'NEXT_QUESTION';
export const IS_ANSWER_CORRECT = 'IS_ANSWER_CORRECT';

export const getNextQuestion = (score)=> ({
  type: NEXT_QUESTION,
  score
});
