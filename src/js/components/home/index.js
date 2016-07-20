import React from 'react'
import {Link} from 'react-router'
import QUIZ_DATA from 'data'
import acc from 'utils/acc'

const title = acc(QUIZ_DATA.title).toUpperCase()
const description = QUIZ_DATA.description
const startButtonLabel = QUIZ_DATA['start-button-label']

const Home = ()=> (
  <div className="home page active">
    <div className="left-panel">
      <div className="glyphicon logo-icon" />
      <div className="title">{title}</div>
      <div className="description">
        <br />
        <br />
        <Link to="quiz" className="btn btn-primary btn-lg">{startButtonLabel}</Link>
      </div>
    </div>
    <div className="right-panel">
      <div className="description">{description}
        <br />
        <br />
        <Link to="quiz" className="btn btn-primary btn-lg">{startButtonLabel}</Link>
      </div>
    </div>
  </div>
)

export default Home;
