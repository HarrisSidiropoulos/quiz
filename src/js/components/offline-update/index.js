/* eslint no-console:  */
import React, {Component} from 'react'
require('./styles.scss')

class OfflineUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: '',
      message: "Quiz has been updated.",
      hidden: true
    }
    if (process.env.NODE_ENV!=='production') {
      return;
    }
    const {install} = require('offline-plugin/runtime')
    install({
      onInstalled: ()=> this.onInstalled(),
      onUpdating: ()=> this.onUpdating(),
      onUpdateReady: ()=> this.onUpdateReady(),
      onUpdateFailed: ()=> this.onUpdateFailed(),
      onUpdated: ()=> this.onUpdated()
    })
  }
  onInstalled() {
    console.log("onInstalled")
  }
  onUpdating() {
    console.log("onUpdating")
    this.setState({
      ...this.state,
      status: 'updating',
      message: 'updating...',
      hidden: false
    })
  }
  onUpdateReady() {
    const {applyUpdate} = require('offline-plugin/runtime')
    console.log("onUpdateReady")
    applyUpdate()
    this.setState({
      ...this.state,
      status: 'update-ready',
      hidden: false
    })
  }
  onUpdateFailed() {
    console.log("onUpdateFailed")
    this.setState({
      ...this.state,
      message: "Quiz has not been updated.",
      status: 'update-failed',
      hidden: false
    })
  }
  onUpdated() {
    this.setState({
      ...this.state,
      status: 'updated',
      message: "Quiz has been updated.",
      hidden: false
    })
  }
  reload() {
    window.location.reload()
  }
  dismiss() {
    this.setState({
      ...this.state,
      hidden: true
    })
  }
  renderActions() {
    const {status} = this.state;
    if (status==='updating') {
      return '';
    }
    return (
      <span>
        <a href="javascript:" onClick={()=> this.reload()}>Reload</a>
        <span> page to apply update or </span>
        <a href="javascript:" onClick={()=> this.dismiss()}>dismiss</a>
        <span> notification.</span>
      </span>
    )
  }
  render() {
    const {hidden, message} = this.state;
    return (
      <div className={`offline-update${hidden?' hidden':''}`}>
        <div className="container">
          <span>{message} </span>
          {this.renderActions()}
        </div>
      </div>
    )
  }
}

export default OfflineUpdate
