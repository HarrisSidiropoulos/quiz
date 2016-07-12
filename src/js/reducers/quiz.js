import {NEXT_QUESTION} from '../actions'
import QUIZ_DATA from '../data'
import uniqueRandomArray from 'unique-random-array'

const defaultQuestion = {
  question: uniqueRandomArray(QUIZ_DATA.questions)(),
  isQuizCompleted: QUIZ_DATA.questions.length==0
}

const totalAnswers = QUIZ_DATA.questions.reduce((prev, next)=> {
  return prev + next.answers.length
}, 0)

export default function Quiz(state = defaultQuestion, action) {
  switch (action.type) {
    case NEXT_QUESTION:
      return {
        ...state,
        question: uniqueRandomArray(QUIZ_DATA.questions)(),
        isQuizCompleted: QUIZ_DATA.questions.length==0
      };
      default:
        return state
  }
}
