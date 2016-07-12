import {expect} from 'chai';
import configureStore from './configureStore'
import {defaultQuestion} from '../reducers/quiz'
import {NEXT_QUESTION, getNextQuestion} from '../actions'

describe('Store', () => {
  let store = configureStore();
  before(() => {
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
      it('should increase currentQuestion value', () => {
        store.dispatch(getNextQuestion());
        expect(store.getState().quiz.currentQuestion).to.be.equal(2);
      });
      it('should be completed after all questions has been asked', () => {
        while (store.getState().quiz.currentQuestion<store.getState().quiz.totalQuestions) {
          store.dispatch(getNextQuestion());
        }
        expect(store.getState().quiz.isQuizCompleted).to.be.true;
      });
    });
  });
});
