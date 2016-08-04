import QUIZ_DATA from '../data'

export const calculateScore = (answers)=> {
  let filteredAnswers = answers.filter(({answered}) => answered)
  return (filteredAnswers.length>0 ? answers.length - filteredAnswers.length + 1 : 0)
}
export const getDialogValuesObject = (answers, isAnswerCorrect, currentAnswer, isQuizCompleted, score)=> {
  const quizCompletedMessage = QUIZ_DATA['end-game-message'].replace('{value}', `${score} /${totalAnswers}`);
  let answerDialogBtnLabel = isAnswerCorrect ? QUIZ_DATA["next-question-button-label"] : QUIZ_DATA["error-button-label"];
  let answerDialogDescription = currentAnswer<0 ? '' : answers[currentAnswer].description;
  let answerDialogType = isAnswerCorrect ? "success" : "danger";

  if (isQuizCompleted && isAnswerCorrect) {
    answerDialogDescription += '<hr><br>'+quizCompletedMessage;
    answerDialogType = "success";
    answerDialogBtnLabel = QUIZ_DATA["start-button-label"];
  }
  return {
    answerDialogDescription,
    answerDialogType,
    answerDialogBtnLabel
  }
}
export const totalAnswers = QUIZ_DATA.questions.reduce((prev, next)=> {
  return prev + next.answers.length
}, 0)
