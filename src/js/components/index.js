import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

const Template = ({ children, location })=> (
  <div className="container">
    <div className="pages">
      <ReactCSSTransitionGroup
        component="div"
        transitionName="top"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}>

        {React.cloneElement(children, {
          key: location.pathname
        })}

      </ReactCSSTransitionGroup>
    </div>
  </div>
)

export default Template
