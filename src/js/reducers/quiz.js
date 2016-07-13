import {NEXT_QUESTION} from '../actions'
import QUIZ_DATA from '../data'
import shuffle from 'shuffle-array'

const totalAnswers = QUIZ_DATA.questions.reduce((prev, next)=> {
  return prev + next.answers.length
}, 0)

export const defaultQuestion = {
  question: QUIZ_DATA.questions[0],
  totalAnswers: totalAnswers,
  currentQuestion: 1,
  totalQuestions: QUIZ_DATA.questions.length,
  isQuizCompleted: QUIZ_DATA.questions.length==0,
  score: 0
}

export default function Quiz(state = defaultQuestion, action) {
  switch (action.type) {
    case NEXT_QUESTION:
      if (state.currentQuestion>=state.totalQuestions) {
        state.currentQuestion = 0;
        state.score = 0;
        shuffle(QUIZ_DATA.questions);
      }
      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
        question:QUIZ_DATA.questions[state.currentQuestion],
        score: state.score + (action.score || 0),
        isQuizCompleted: QUIZ_DATA.questions.length<=state.currentQuestion + 1
      };
      default:
        return state
  }
}
