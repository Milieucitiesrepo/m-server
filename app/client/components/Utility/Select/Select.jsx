import React, { Component } from 'react'
import css from './select.scss'

export default class Select extends Component {
  constructor(props) {
    super(props);
    this.state = { active: false, value: this.props.defaultValue, highlightedIndex: null }
    this.handleSyntheticBlur = (e) => this._handleSyntheticBlur(e);
    this.handleFocus = () => this._openDropdown();
    this.handleClick = () => this._openDropdown();
    this.closeDropdown = () => this._closeDropdown();
    this.dropdownNode = () => this._dropdownNode();
    this.handleKeyDown = (e) => this._handleKeyDown(e);
    this.handleSelected = (selectedText) => this._handleSelected(selectedText);
    this.selectedTextNode = () => this._selectedTextNode();
    this.handleListOptionsClick = (e) => this.handleSelected(e.target.innerText);

  }
  _handleSelected(selectedText) {
    const text = (selectedText === this.props.title ? null : selectedText);
    this.setState({ value: text });
    this.props.onSelect(this.props.title, text);
    this.closeDropdown();
  }
  _handleKeyDown(e) {
    switch(e.which){
      case 9: /* TAB */
      this.closeDropdown();
      break;
      case 13: /* ENTER */
      e.preventDefault();
      if(this.state.highlightedIndex !== null) this.handleSelected(this.props.options[this.state.highlightedIndex - 1]);
      break;
      case 27: /* ESC */
      this.closeDropdown();
      break;
      case 40: /* ARROW DOWN */
      this.setState({ highlightedIndex: (this.state.highlightedIndex !== null ?
                                        (this.state.highlightedIndex + 1) % (this.props.options.length + 1) :
                                         0) });
      break;
      case 38: /* ARROW UP */
      this.setState({ highlightedIndex: (this.state.highlightedIndex ?
                                        (this.state.highlightedIndex - 1) % (this.props.options.length + 1) :
                                        this.props.options.length - 1) });
      break;
    }
  }
  _handleSyntheticBlur(e) {
    if(e.target === this.refs.dropdown || e.target === this.refs.container) return;
    this.closeDropdown();
  }
  _openDropdown() {
    this.setState({ active: true }, () => this.refs.dropdown.focus() );
    document.addEventListener('click', this.handleSyntheticBlur);
  }
  _closeDropdown() {
    this.setState({ active: false, highlightedIndex: null });
    document.removeEventListener('click', this.handleSyntheticBlur);
  }
  _dropdownNode() {
    return <ul className={css.dropdown} onKeyDown={this.handleKeyDown} tabIndex="0" ref="dropdown">
      <li onClick={this.handleListOptionsClick}
          className={this.state.highlightedIndex === 0 && css.highlighted}>
        {this.props.title}
      </li>
      <div className={css.divider}></div>
        {this.props.options.map( (option, i) => {
          if (option == 'Active Development'){
            return(<li key={i} className={css.title}>
                       {option}
                   </li>);
          }
          if (option == 'Comment Period'){
            return(<li key={i} className={css.title}>
                       {option}
                   </li>);
          }
          if (option == 'Comment period closed'){
            return(<li key={i} className={css.title}>
                       {option}
                   </li>);
          }
          else{
            return(<li key={i} onClick={this.handleListOptionsClick} className={this.state.highlightedIndex === (i+1) && css.highlighted}>
                       {option}
                   </li>);
          }
        })}
    </ul>;
  }
  _selectedTextNode() {
    return <div className={css.active}>
      <div className={css.subtitle}>{this.props.title}</div>
      <div className={css.value} title={this.state.value}>{this.state.value}</div>
    </div>;
  }
  render() {
    return <div className={css.container} ref="container">
      <div className={css.wrapper} onClick={this.handleClick} onFocus={this.handleFocus} tabIndex="0" ref="wrapper">
        <i className={css.caret}></i>
        <div className={css.title}>
          {this.state.value ? this.selectedTextNode() : this.props.title}
        </div>
      </div>
      {this.state.active && this.dropdownNode()}
    </div>;
  }
}
