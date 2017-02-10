import React, { Component } from 'react'
import css from './pagination.scss'

export default class Pagination extends Component {
  constructor(props) {
    super(props)
    this.numberOfPages = Math.ceil(this.props.total/this.props.limit) || 1
    this.previousPage = (e) => this._previousPage(e)
    this.nextPage = (e) => this._nextPage(e)
    this.goToPage = (e) => this._goToPage(e)
    this.pageIndex = () => this._pageIndex()
  }

  componentDidMount() {
    this.numberOfPages = Math.ceil(this.props.total/this.props.limit) || 1
  }

  componentWillReceiveProps(nextProps) {
    this.numberOfPages = Math.ceil(nextProps.total/nextProps.limit) || 1
  }

  _previousPage(e) {
    e.preventDefault()
    if(this.props.page == 0) return
    this.props.parent.setState({ page: this.props.page - 1, loading: true })
  }

  _nextPage(e) {
    e.preventDefault()
    if((parseInt(this.props.page) + 1) == this.numberOfPages) return
    this.props.parent.setState({ page: this.props.page + 1, loading: true  })
  }

  _goToPage(e) {
    e.preventDefault()
    this.props.parent.setState({ page: parseInt(e.currentTarget.dataset.page), loading: true })
  }

  _pageIndex() {
    const { page } = this.props
    const pageIndex = []
    let [start, finish] = [1, 2]
    if(this.numberOfPages - page >= 10) {
      if(page < 3) {
        start = 1
        finish = 10
      } else {
        start = parseInt(page) - 2
        finish = parseInt(page) + 7
      }
    } else if(this.numberOfPages - page < 10 && this.numberOfPages > 10){
      start = this.numberOfPages - 9
      finish = this.numberOfPages
    } else {
      start = 1
      finish = this.numberOfPages + 1
    }

    for (let i = start; i < finish; i++) {
      pageIndex.push(i)
    }

    return pageIndex
  }

  render() {
    return(
      <div className={css.pagination}>
        <a href='#' onClick={this.previousPage} className={`fa fa-angle-left ${css.btn}`}></a>
          {
            this.pageIndex().map(i => {
              return(
                <a href='#'
                   key={i}
                   onClick={this.goToPage}
                   data-page={i - 1}
                   className={`hide-on-small-only ${(this.props.page + 1 == i) && css.selected}  ${css.clearButton}`}>
                   {i}
                 </a>
              )
            })
          }
        <span className='hide-on-med-and-up'>
          {this.props.page + 1} / {this.numberOfPages}
        </span>
        <a href='#' onClick={this.nextPage} className={`fa fa-angle-right ${css.btn}`}></a>
      </div>
    );
  }
}
