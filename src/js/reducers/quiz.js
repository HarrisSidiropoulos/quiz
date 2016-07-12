import {NEXT_QUESTION} from '../actions'
import QUIZ_DATA from '../data'
import uniqueRandomArray from 'unique-random-array'

const totalAnswers = QUIZ_DATA.questions.reduce((prev, next)=> {
  return prev + next.answers.length
}, 0)

const defaultQuestion = {
  question: uniqueRandomArray(QUIZ_DATA.questions)(),
  totalAnswers: totalAnswers,
  currentQuestion: 0,
  totalQuestions: QUIZ_DATA.questions.length,
  isQuizCompleted: QUIZ_DATA.questions.length==0
}

export default function Quiz(state = defaultQuestion, action) {
  switch (action.type) {
    case NEXT_QUESTION:
      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
        question: uniqueRandomArray(QUIZ_DATA.questions)(),
        isQuizCompleted: QUIZ_DATA.questions.length==0
      };
      default:
        return state
  }
}
