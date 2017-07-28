import React, { Component } from 'react'
import { render } from 'react-dom'
import css from './index.scss'

export default class SearchForm extends Component {
  constructor(props) {
    super(props)
    this.state = { query: '' }
    this.handleChange = (e) => this._handleChange(e)
    this.handleSubmit = (e) => this._handleSubmit(e)
    this.clearSearch = (e) => this._clearSearch(e)
  }

  _handleChange(e) {
    this.setState({ query: e.currentTarget.value })
  }

  _handleSubmit(e) {
    e.preventDefault();
    const query = this.state.query;
    if (query.length < 1) return;

    this.props.handleSubmit(query);
  }

  _clearSearch(e) {
    e.preventDefault()
    this.setState({ query: '' })
    this.props.handleSubmit();
  }

  render() {
    return(
      <form className={`row ${css.searchForm}`} onSubmit={this.handleSubmit}>
        <div className='input-field col s12'>
          <label htmlFor='search-input'>Search sites</label>
          <input
            type="text"
            id='search-input'
            value={this.state.query}
            placeholder="File number, address, title, or description"
            onChange={this.handleChange}
          />
        </div>
        <div className='col s12 m12 l6'>
          <input type="submit" value='Search' className="btn submit" />
          <button className="btn cancel" onClick={this.clearSearch}>Clear search</button>
        </div>
      </form>
    )
  }
}