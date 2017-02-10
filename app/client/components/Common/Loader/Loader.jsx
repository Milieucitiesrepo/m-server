import React, { Component } from 'react'

export default class Loader extends Component {
  render() {
    if(!this.props.loading) return false;
    return(
      <div className='loading-screen'>
        <div className='spinner'>
          <div className='bounce1'></div>
          <div className='bounce2'></div>
          <div className='bounce3'></div>
        </div>
      </div>
    )
  }
}
