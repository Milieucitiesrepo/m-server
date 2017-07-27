import React, { Component } from 'react'
import { render } from 'react-dom'
import css from './css/noumea.scss'
import { Slider } from 'antd'
import 'antd/dist/antd.less'

export default class EmojiiSlider extends Component {
  constructor() {
    super();
    this.handleGetEmotion = this.handleGetEmotion.bind(this);
    this.state = {
      currentEmoji: ''
    };
  }

  handleGetEmotion(value) {
    this.setState({ currentEmoji: value });
  }

  render() {
    const { currentEmoji } = this.state;

    let broken = currentEmoji === 0 ? <img src={require(`./images/1high.svg`)}/> : <img src={require(`./images/1.svg`)}/>;
    let sad = currentEmoji === 1 ? <img src={require(`./images/2high.svg`)}/> : <img src={require(`./images/2.svg`)}/>;
    let happy = currentEmoji === 2 ? <img src={require(`./images/3high.svg`)}/>  :  <img src={require(`./images/3.svg`)}/>;
    let love = currentEmoji === 3 ? <img src={require(`./images/4high.svg`)}/> : <img src={require(`./images/4.svg`)}/>;
    let muchlove = currentEmoji === 4 ? <img src={require(`./images/5high.svg`)}/> : <img src={require(`./images/5.svg`)}/>;

    // if (currentEmoji === '0') {
    //   let broken =  style={{ background: 'orange' }}/>;
    // }

    const marks = {
      0: {
        label: broken,
      },
      1: {
        label: sad,
      },
      2: {
        label: happy,
      },
      3: {
        label: love,
      },
      4: {
        label: muchlove,
      },

    };

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <Slider marks={marks} defaultValue={2} max={4} tipFormatter={false} onChange={this.handleGetEmotion} included={false}/>
          </div>
        </div>
      </div>
    )
  }
}
