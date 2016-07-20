import React, {Component, PropTypes} from 'react';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger'
import Popover from 'react-bootstrap/lib/Popover'
import QUIZ_DATA from 'data'
import acc from 'utils/acc'

const images = {
  "Q1.jpg":require('./images/Q1.jpg'),
  "Q2.jpg":require('./images/Q2.jpg'),
  "Q3.jpg":require('./images/Q3.jpg'),
  "Q4.jpg":require('./images/Q4.jpg'),
  "Q5.jpg":require('./images/Q5.jpg'),
  "Q6.jpg":require('./images/Q6.jpg'),
  "Q7.jpg":require('./images/Q7.jpg')
};

const artists = {
  "Μιχάλης Κουνέλης":require('./images/kounelis-mixalis.jpg'),
  "Γιώργος Κουτσουρέλης":require('./images/koytsourelis-giorgos.jpg'),
  "Κωνσταντίνος Παπαδάκης ή Ναύτης":require('./images/papadakis-kostas.jpg'),
  "Νικόλαος Τσέγκας":require('./images/tsagas-nikolaos.jpg'),
  "Νικόλαος Χάρχαλης":require('./images/xarxalis-nikolaos.jpg')
};

const next = (db, key)=> {
  var keys = Object.keys(db)
    , i = keys.indexOf(key);
  return i !== -1 && keys[i + 1] && db[keys[i + 1]];
};

const letters = QUIZ_DATA.letters;
const questionLabel = acc(QUIZ_DATA['question-label']).toUpperCase()

class Question extends Component {
  renderImage(image, display=true) {
    return image && <img className={display?'img':'hidden'} src={image} alt={image} width="560" height="555" />
  }
  renderAnswerButton({label, text, classes}, index) {
    const { checkAnswer } = this.props
    const btn = <a className={classes} onClick={()=> checkAnswer(index)}>{text}</a>
    if (artists[label]) {
      const popover = <Popover id={`popover${index}`}><img src={artists[label]} /></Popover>
      return (
        <OverlayTrigger trigger={["hover", "focus"]} rootClose placement="right" overlay={popover}>
          { btn }
        </OverlayTrigger>
      )
    }
    return btn;
  }
  render() {
    const {
      question, totalQuestions, currentQuestion, answers, image
    } = this.props;
    const nextImage = next(images, image)
    const _answers = answers.map((item, index)=> {
      item.text = letters[index].toUpperCase() + '. ' +item.label;
      if (item.answered && item["is-correct"]) {
        return {...item, classes: 'btn success disabled'}
      } else if (item.answered) {
        return {...item, classes: 'btn error disabled'}
      }
      return {...item, classes: 'btn'}
    })
    return (
      <div className="question-container active">
        <div className="left-panel">
          <h4 className="question-heading">
            <span className="question-name">{questionLabel}</span>&nbsp;
            <span className="question-value">( {currentQuestion} / {totalQuestions} )</span>
          </h4>
          <div className="question">{question}</div>
          <ul className="answers">
          {
            _answers.map((item, index)=> (
              <li key={index}>{ this.renderAnswerButton(item, index) }</li>
            ))
          }
          </ul>
        </div>
        <div className="right-panel">
          <div className="image-container">
            { this.renderImage(images[image]) }
            { this.renderImage(nextImage, false) }
          </div>
        </div>
      </div>
    );
  }
}
Question.propTypes = {
  question: PropTypes.string.isRequired,
  answers: PropTypes.array.isRequired,
  image: PropTypes.string.isRequired,
  currentQuestion: PropTypes.number.isRequired,
  totalAnswers: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
  isQuizCompleted: PropTypes.bool.isRequired,
  showAnswer: PropTypes.bool.isRequired,
  isAnswerCorrect: PropTypes.bool.isRequired,
  checkAnswer: PropTypes.func.isRequired
};

export default Question;
