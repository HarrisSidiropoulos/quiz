import {expect} from 'chai';
import configureStore from './configureStore'
import {defaultQuestion} from '../reducers/quiz'

describe('Store', () => {
  const store = configureStore();
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
    it('should have keys question, totalAnswers, currentQuestion, totalQuestions, isQuizCompleted, score', () => {
      expect(store.getState().quiz).to.have.all.keys('question', 'totalAnswers', 'currentQuestion', 'totalQuestions', 'isQuizCompleted', 'score')
    });
  });
});
