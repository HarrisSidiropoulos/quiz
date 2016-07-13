import {NEXT_QUESTION, CHECK_ANSWER, HIDE_ANSWER} from '../actions'
import QUIZ_DATA from '../data'
import shuffle from 'shuffle-array'

const totalAnswers = QUIZ_DATA.questions.reduce((prev, next)=> {
  return prev + next.answers.length
}, 0)

shuffle(QUIZ_DATA.questions)

export const defaultQuestion = {
  question: QUIZ_DATA.questions[0].question,
  answers:QUIZ_DATA.questions[0].answers,
  image: QUIZ_DATA.questions[0].image,
  totalAnswers: totalAnswers,
  showAnswer: false,
  currentQuestion: 1,
  currentAnswer: -1,
  totalQuestions: QUIZ_DATA.questions.length,
  isQuizCompleted: QUIZ_DATA.questions.length==0,
  score: 0
}
const calculateScore = (answers, score)=> {
  let filteredAnswers = answers.filter(({answered}) => answered)
  return score + (filteredAnswers.length>0 ? answers.length - filteredAnswers.length + 1 : 0)
}

export default function Quiz(state = defaultQuestion, action) {
  switch (action.type) {
    case NEXT_QUESTION:
      if (state.currentQuestion>=state.totalQuestions) {
        state.currentQuestion = 0;
        state.score = 0;
        state.answers.forEach((item) => item.answered = null)
        shuffle(QUIZ_DATA.questions);
      }
      return {
        ...state,
        showAnswer: false,
        currentAnswer: -1,
        currentQuestion: state.currentQuestion + 1,
        question:QUIZ_DATA.questions[state.currentQuestion].question,
        answers:QUIZ_DATA.questions[state.currentQuestion].answers,
        image:QUIZ_DATA.questions[state.currentQuestion].image,
        isQuizCompleted: QUIZ_DATA.questions.length<=state.currentQuestion + 1
      };

    case CHECK_ANSWER:
      let answers = QUIZ_DATA.questions[state.currentQuestion-1].answers.map((item, index)=> (
        index===action.answer ? {...item, answered: true} : state.answers[index]
      ))
      return {
        ...state,
        showAnswer: true,
        currentAnswer: action.answer,
        answers: answers,
        score: answers[action.answer]['is-correct'] ? calculateScore(answers, state.score) : state.score
      }

    case HIDE_ANSWER:
      return {
        ...state,
        showAnswer: action.show
      }

    default:
      return state
  }
}
