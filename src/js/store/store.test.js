import {expect} from 'chai';
import configureStore from './configureStore'
import {defaultQuestion} from '../reducers/quiz'
import {NEXT_QUESTION, getNextQuestion, CHECK_ANSWER, checkAnswer, HIDE_ANSWER, hideAnswer} from '../actions'

describe('Store', () => {
  let store = configureStore();
  beforeEach(() => {
    store = configureStore();
  });
  it('exists', () => {
    expect(store).to.exist
  });
  describe('Quiz reducer', () => {
    it('exists', () => {
      expect(store.getState().quiz).to.exist
    });
    it('should have defaultQuestion object as default value', () => {
      expect(store.getState().quiz).to.be.equal(defaultQuestion)
    });
    it('should have keys: question, totalAnswers, currentQuestion, totalQuestions, isQuizCompleted, score, answers, image currentAnswer showAnswer, isAnswerCorrect, answerDialogDescription, answerDialogType, answerDialogBtnLabel, currentQuestionScore', () => {
      expect(store.getState().quiz).to.have.all.keys('question', 'totalAnswers', 'currentQuestion', 'totalQuestions', 'isQuizCompleted', 'score', 'answers', 'image', 'currentAnswer', 'showAnswer', 'isAnswerCorrect', 'answerDialogDescription', 'answerDialogType', 'answerDialogBtnLabel', 'currentQuestionScore')
    });
    describe(`Quiz state after action ${CHECK_ANSWER}`, () => {
      describe(`When answer is correct`, () => {
        it('Value isAnswerCorrect to be true', ()=> {
          const stateBefore = store.getState();
          let i = store.getState().quiz.answers.findIndex((item)=>item['is-correct'])
          store.dispatch(checkAnswer(i));
          const stateAfter = store.getState();
          expect(stateAfter.quiz.isAnswerCorrect).to.be.true;
        })
      });
      describe(`When answer is not correct`, () => {
        it('Value isAnswerCorrect to be false', ()=> {
          const stateBefore = store.getState();
          let i = store.getState().quiz.answers.findIndex((item)=>item['is-correct'])
          store.dispatch(checkAnswer(i===0?i+1:i-1));
          const stateAfter = store.getState();
          expect(stateAfter.quiz.isAnswerCorrect).to.be.false;
        });
      });
    });
    describe(`Quiz state after action ${NEXT_QUESTION}`, () => {
      it('should be a new random question', ()=> {
        const stateBefore = store.getState();
        store.dispatch(getNextQuestion());
        const stateAfter = store.getState();
        expect(stateBefore).to.not.be.equal(stateAfter);
      });
    });
    describe(`Quiz state after action ${HIDE_ANSWER}`, () => {
      it('answer should be hidden', ()=> {
        store.dispatch(hideAnswer());
        expect(store.getState().quiz.showAnswer).to.be.false;
      });
    });
    describe('Quiz after all questions has been asked and answered', () => {
      const totalQuestions = store.getState().quiz.totalQuestions
      const totalAnswers = store.getState().quiz.totalAnswers
      beforeEach(() => {
        let i = store.getState().quiz.answers.findIndex((item)=>item['is-correct'])
        store.dispatch(checkAnswer(i));
        while (!store.getState().quiz.isQuizCompleted) {
          store.dispatch(getNextQuestion());
          let i = store.getState().quiz.answers.findIndex((item)=>item['is-correct'])
          store.dispatch(checkAnswer(i));
        }
      })
      it(`should score be equal to the total amount of answers(${totalAnswers})`, () => {
        const score = store.getState().quiz.score;
        expect(score).to.be.equal(totalAnswers);
      });
      it('should be completed', () => {
        expect(store.getState().quiz.isQuizCompleted).to.be.true;
      });
    });
    describe(`Quiz after starting again from the begining`, () => {
      beforeEach(() => {
        while (!store.getState().quiz.isQuizCompleted) {
          store.dispatch(getNextQuestion());
        }
        store.dispatch(getNextQuestion());
      });
      it('should reset currentQuestion', () => {
        expect(store.getState().quiz.currentQuestion).to.be.equal(1);
      });
      it('should reset isQuizCompleted', () => {
        expect(store.getState().quiz.isQuizCompleted).to.be.false;
      });
      it('should reset score', () => {
        expect(store.getState().quiz.score).to.be.equal(0);
      });
    });
  });
});
