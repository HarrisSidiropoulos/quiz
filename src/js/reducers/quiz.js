import {NEXT_QUESTION, CHECK_ANSWER, HIDE_ANSWER} from '../actions'
import QUIZ_DATA from '../data'
import {calculateScore, getDialogValuesObject, totalAnswers} from './quizHelper'
import shuffle from 'shuffle-array'

shuffle(QUIZ_DATA.questions)

export const INITIAL_STATE = {
  question: QUIZ_DATA.questions[0].question,
  answers:QUIZ_DATA.questions[0].answers,
  image: QUIZ_DATA.questions[0].image,
  totalAnswers: totalAnswers,
  showAnswer: false,
  currentQuestion: 1,
  currentAnswer: -1,
  isAnswerCorrect: false,
  totalQuestions: QUIZ_DATA.questions.length,
  isQuizCompleted: QUIZ_DATA.questions.length==0,
  answerDialogDescription: '',
  answerDialogType: 'danger',
  answerDialogBtnLabel: '',
  currentQuestionScore: 0,
  score: 0
}

export default function Quiz(state = INITIAL_STATE, action) {
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
      const isAnswerCorrect = typeof answers[action.answer]['is-correct'] !== 'undefined'
      const score = isAnswerCorrect ? calculateScore(answers) : 0
      return {
        ...state,
        showAnswer: true,
        currentAnswer: action.answer,
        isAnswerCorrect: isAnswerCorrect,
        answers: answers,
        score: state.score + score,
        currentQuestionScore: score,
        ...getDialogValuesObject(answers, isAnswerCorrect, action.answer, state.isQuizCompleted, state.score + score)
      }

    case HIDE_ANSWER:
      return {
        ...state,
        showAnswer: false
      }

    default:
      return state
  }
}
