import {expect} from 'chai';
import configureStore from './configureStore'
import {defaultQuestion} from '../reducers/quiz'
import {NEXT_QUESTION, getNextQuestion} from '../actions'

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
    it('should have keys: question, totalAnswers, currentQuestion, totalQuestions, isQuizCompleted, score', () => {
      expect(store.getState().quiz).to.have.all.keys('question', 'totalAnswers', 'currentQuestion', 'totalQuestions', 'isQuizCompleted', 'score')
    });
    describe(`Quiz reducer action ${NEXT_QUESTION}`, () => {

    });
    describe('Quiz in the last question', () => {
      const totalQuestions = store.getState().quiz.totalQuestions
      beforeEach(() => {
        while (!store.getState().quiz.isQuizCompleted) {
          store.dispatch(getNextQuestion(5));
        }
      })
      it(`should be equal ${5*totalQuestions}`, () => {
        const score = store.getState().quiz.score + 5;
        expect(score).to.be.equal(5*totalQuestions);
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
