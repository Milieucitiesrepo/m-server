import React, { Component } from 'react'
import css from './map-filter.scss'
import { toLower } from 'lodash'

export default class MapFilter extends Component {
  constructor(props) {
    super(props);
    this.state = { activeText: null }
    this.parent = this.props.parent;
    this.handleClick = (e) => this._handleClick(e);
  }
  _handleClick(e) {
    e.preventDefault();
    const text = this.state.activeText !== e.target.innerText ? e.target.innerText : null;
    this.setState({ activeText: text });

    this.parent.setState({ sort: toLower(text) },
      () => this.parent.search_and_sort()
    );

  }
  render() {
    const { activeText } = this.state;
    const sortType = ['Latest', 'Latest', 'Latest', 'Latest'];
    return <div className={css.container}>
      <div className={css.sort}>
        <div>Sort</div>
      </div>
      <div className={css.row}>
        {sortType.map((type, i) => {
          return <div className={css.col} key={i}>
            <a href="#"
               className={activeText === type ? css.activeitem : css.item}
               onClick={this.handleClick}>
               {type}
            </a>
          </div>;
        })}
      </div>
    </div>;
  }
}
