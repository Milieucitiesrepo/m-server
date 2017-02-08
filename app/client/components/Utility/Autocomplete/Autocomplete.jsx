import React, { Component } from 'react'
import { omit } from 'lodash'
import css from './autocomplete.scss'

export default class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false, suggestions: [], highlightedIndex: null, value: '', inputProps: null };

    this.search = (value) => this._search(value);
    this.handleListSuggestionClick = (e) => this.setSuggestion(e.target.innerText);
    this.handleSearchClick = (e) => this._handleSearchClick(e);
    this.handleChange = (e) => this.setState({ value: this.inputTextField.value });
    this.handleFocus = (e) => this._handleFocus(e);
    this.handleBlur = (e) => this._handleBlur(e);
    this.handleKeyUp = (e) => this._handleKeyUp(e);
    this.handleKeyDown = (e) => this._handleKeyDown(e);
    this.handleSyntheticBlur = (e) => this._handleSyntheticBlur(e);
    this.openDropdown = () => this._openDropdown();
    this.closeDropdown = () => this._closeDropdown();
    this.setSuggestion = (suggestion) => this._setSuggestion(suggestion);

  }
  componentDidMount() {
    this.setState({ inputProps: omit(this.props, ['callback', 'className', 'onSelect', 'onFocus', 'searchBtn']) });
  }
  _handleKeyUp(e) {
    if([9,13,27,38,40].indexOf(e.which) !== -1) return;
    this.search(this.inputTextField.value);
  }
  _handleKeyDown(e) {
    switch(e.which){
      case 9: /* TAB */
      this.closeDropdown();
      break;
      case 13: /* ENTER */
      e.preventDefault();
        this.setSuggestion(this.state.suggestions[this.state.highlightedIndex] || this.inputTextField.value);
      break;
      case 27: /* ESC */
      this.closeDropdown();
      break;
      case 40: /* ARROW DOWN */
      this.setState({ highlightedIndex: (this.state.highlightedIndex !== null ?
                                        (this.state.highlightedIndex + 1) % this.state.suggestions.length :
                                         0) });
      break;
      case 38: /* ARROW UP */
      e.preventDefault();
      this.setState({ highlightedIndex: (this.state.highlightedIndex ?
                                        (this.state.highlightedIndex - 1) % this.state.suggestions.length :
                                        this.state.suggestions.length - 1) });
      break;
    }
  }
  _handleFocus(e) {
    if(typeof this.props.onFocus === 'function') {
      this.props.onFocus(e);
    }
    this.search();
  }
  _handleBlur(e) {
    if(typeof this.props.onBlur === 'function') {
      this.props.onBlur(e);
    }
  }
  _handleSyntheticBlur(e) {
    if(e.target === this.inputTextField) return;
    this.closeDropdown();
  }
  _handleSearchClick(e) {
    e.preventDefault();
    this.setSuggestion(this.inputTextField.value);
  }
  _openDropdown() {
    this.setState({ open: true });
    document.addEventListener('click', this.handleSyntheticBlur);
  }
  _closeDropdown() {
    this.setState({ open: false, suggestions: [], highlightedIndex: null });
    this.inputTextField.blur();
    document.removeEventListener('click', this.handleSyntheticBlur);
  }
  _search(value = this.state.value){
    if(value === '' || this.inputTextField.value.length < this.props.minChars){
      this.setState({ suggestions: [] });
      return;
    }
    this.props.callback(value, this);
    this.openDropdown();
  }
  _setSuggestion(suggestion) {
    this.setState({ value: '' });
    if(typeof this.props.onSelect === 'function') {
      this.props.onSelect(suggestion);
    }
    this.closeDropdown();
  }
  render() {
    let searchWrap;
    if (this.props.frontPage == true) {
      searchWrap = css.frontWrapper;
    }
    else {
      searchWrap = css.wrapper;
    }

    return(
      <div className={searchWrap}>
        <i className={`fa fa-map-marker ${css.searchicon}`}></i>
        <input type='text' className={css.textfield}
          autoComplete='off'
          {...this.state.inputProps}
          ref={(input) => this.inputTextField = input}
          value={this.state.value}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onKeyUp={this.handleKeyUp}
          onKeyDown={this.handleKeyDown}
          onChange={this.handleChange}
        />
        {
          this.props.searchBtn &&
          <a className={css.searchBtn} href='#' onClick={this.handleSearchClick}>
            Search
          </a>
        }
        {
          this.state.open &&
          <ul className={css.dropdown}>
            {
              this.state.suggestions.map((suggestion,i) => {
                return(
                  <li key={i} onClick={this.handleListSuggestionClick} className={this.state.highlightedIndex === i ? css.highlighted : ''}>
                    {suggestion}
                  </li>
                )
              })
            }
          </ul>
        }
      </div>
    );
  }
}
