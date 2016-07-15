import React from 'react'
import {Link} from 'react-router'
import QUIZ_DATA from 'data'
import acc from 'utils/acc'

const Home = ()=> (
  <div className="home page active">
    <div className="left-panel">
      <div className="glyphicon logo-icon" />
      <div className="title">{acc(QUIZ_DATA.title).toUpperCase()}</div>
      <div className="description">
        <br />
        <br />
        <div className="btn btn-primary btn-lg">{QUIZ_DATA['start-button-label']}</div>
      </div>
    </div>
    <div className="right-panel">
      <div className="description">{QUIZ_DATA.description}
        <br />
        <br />
        <Link to="quiz" className="btn btn-primary btn-lg">{QUIZ_DATA['start-button-label']}</Link>
      </div>
    </div>
  </div>
)

export default Home;
