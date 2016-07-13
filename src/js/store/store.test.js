import {expect} from 'chai';
import configureStore from './configureStore'
import {defaultQuestion} from '../reducers/quiz'
import {NEXT_QUESTION, getNextQuestion, checkAnswer} from '../actions'

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
    it('should have defaultQuestion as default value', () => {
      expect(store.getState().quiz).to.be.equal(defaultQuestion)
    });
    it('should have keys: question, totalAnswers, currentQuestion, totalQuestions, isQuizCompleted, score, answers, image currentAnswer', () => {
      expect(store.getState().quiz).to.have.all.keys('question', 'totalAnswers', 'currentQuestion', 'totalQuestions', 'isQuizCompleted', 'score', 'answers', 'image', 'currentAnswer')
    });
    describe(`Quiz reducer action ${NEXT_QUESTION}`, () => {

    });
    describe('Quiz in the last question', () => {
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
      it(`should score be equal ${totalAnswers}`, () => {
        const score = store.getState().quiz.score + store.getState().quiz.answers.length;
        expect(score).to.be.equal(totalAnswers);
      });
      it('should be completed', () => {
        expect(store.getState().quiz.isQuizCompleted).to.be.true;
      });
    });
    describe(`Quiz after all questions has been asked`, () => {
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
