import React, { Component } from 'react'
import css from './carousel.scss'
import { debounce } from 'lodash'

export default class Carousel extends Component {
  constructor(props) {
    super(props);

    this.moveToPrevious = (e) => this._moveToPrevious(e);
    this.moveToNext = (e) => this._moveToNext(e);
    this.canNavigate = () => this._canNavigate();
    this.state = { positionsMoved: 0, canNavigate: this.canNavigate() }

    window.addEventListener('resize', () => {
      debounce(() => {
        this.setState({ canNavigate: this.canNavigate() });
      }, 100)()
    })
  }
  _canNavigate() {
    return (this.props.children.length > 3 && window.innerWidth > 992 ||
            this.props.children.length > 2 && window.innerWidth < 992 && window.innerWidth > 600 ||
            this.props.children.length > 1 && window.innerWidth < 600)
  }
  _moveToPrevious(e) {
    e.preventDefault();
    const { positionsMoved } = this.state;
    $('.entry').velocity('transition.slideLeftOut', { duration: 500, complete: () => {
      this.setState({ positionsMoved: (positionsMoved + 1) % this.props.children.length }, () => {
        $('.entry').velocity('transition.slideRightIn', { duration: 500 })
      })
    }})
  }
  _moveToNext(e) {
    e.preventDefault();
    const { positionsMoved } = this.state;
    $('.entry').velocity('transition.slideRightOut', { duration: 500, complete: () => {
      this.setState({ positionsMoved: positionsMoved ? (positionsMoved - 1) % this.props.children.length : this.props.children.length - 1 }, () => {
        $('.entry').velocity('transition.slideLeftIn', { duration: 500})
      })
    }})
  }
  render() {
    const { canNavigate, positionsMoved } = this.state;
    const childrenLength = this.props.children.length;

    return(
      <div className={css.container} style={canNavigate ? {} : { justifyContent: 'center' }}>
        {
          canNavigate &&
          <a href='#' onClick={this.moveToPrevious}><i className='fa fa-angle-left'></i></a>
        }
        {
          !canNavigate &&
          this.props.children
        }
        {
          canNavigate &&
          <div style={{display: 'flex', width: '100%', height: 200, justifyContent: 'center', alignItems: 'center'}}>
            <div className='entry'>
              {this.props.children[positionsMoved % childrenLength]}
            </div>
            <div className='entry hide-on-small-and-down'>
              {this.props.children[(positionsMoved + 1) % childrenLength]}
            </div>
            <div className='entry hide-on-med-and-down'>
              {this.props.children[(positionsMoved + 2) % childrenLength]}
            </div>
          </div>
        }
        {
          canNavigate &&
          <a href='#' onClick={this.moveToNext}><i className='fa fa-angle-right'></i></a>
        }
      </div>
    );
  }
}
