import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

const Template = ({ children, location })=> (
  <div className="container">
    <ReactCSSTransitionGroup
      component="div"
      className="pages"
      transitionName="top"
      transitionAppear={true}
      transitionAppearTimeout={100}
      transitionEnterTimeout={500}
      transitionLeaveTimeout={500}>

      {React.cloneElement(children, {
        key: location.pathname
      })}

    </ReactCSSTransitionGroup>
  </div>
)

export default Template
