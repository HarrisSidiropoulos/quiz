import {NEXT_QUESTION, CHECK_ANSWER, HIDE_ANSWER} from '../actions'
import QUIZ_DATA from '../data'
import shuffle from 'shuffle-array'

export const totalAnswers = QUIZ_DATA.questions.reduce((prev, next)=> {
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
  isAnswerCorrect: false,
  totalQuestions: QUIZ_DATA.questions.length,
  isQuizCompleted: QUIZ_DATA.questions.length==0,
  answerDialogDescription: '',
  answerDialogType: 'danger',
  answerDialogBtnLabel: '',
  currentQuestionScore: 0,
  score: 0
}
const calculateScore = (answers)=> {
  let filteredAnswers = answers.filter(({answered}) => answered)
  return (filteredAnswers.length>0 ? answers.length - filteredAnswers.length + 1 : 0)
}
const getDialogValuesObject = (answers, isAnswerCorrect, currentAnswer, isQuizCompleted, score)=> {
  const quizCompletedMessage = QUIZ_DATA['end-game-message'].replace('{value}', `${score} /${totalAnswers}`);
  let answerDialogBtnLabel = isAnswerCorrect ? QUIZ_DATA["next-question-button-label"] : QUIZ_DATA["error-button-label"];
  let answerDialogDescription = currentAnswer<0 ? '' : answers[currentAnswer].description;
  let answerDialogType = isAnswerCorrect ? "success" : "danger";

  if (isQuizCompleted) {
    answerDialogDescription += '<hr><br>'+quizCompletedMessage;
    answerDialogType = "success";
    answerDialogBtnLabel = QUIZ_DATA["start-button-label"];
  }
  return {
    answerDialogDescription,
    answerDialogType,
    answerDialogBtnLabel,
  }
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
