import React, { Component } from 'react'
import { render } from 'react-dom'
import css from './css/surveymap.scss'
import _ from 'lodash'
import { debounce } from 'lodash'

export default class SurveyTitleMap extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isMobile: (window.innerWidth < 600)
    };
    this.handleSubmit = () => this.handleSubmit();
    window.addEventListener('resize',
      debounce(() => {
        this.setState({ isMobile: (window.innerWidth < 600) })
      }, 100)
    );
  }

  render() {
    const { isMobile }  = this.state;
    const { description , map , title, notes } = this.props;
    return (
      <div className={css.mapWrapper}>
        <div className="row">
          <h2>{title}</h2>
        </div>
        <div className="row">
          <p className={css.description}>
            {description}
          </p>
        </div>
          <div className="column">
          <div className="row">
            <div className={css.map}>
              { isMobile &&
                <img
                  src={require(`${map}`)}
                  width="100%"
                  height="240px"
               />
              }
              { !isMobile &&
                <img
                  className={css.mapPc}
                  src={require(`${map}`)}
                  width= '100%'

               />
              }
            </div>
          </div>
        </div>
        <div className="row">
          <div className={css.notes}>
            <h4>here{notes}</h4>
          </div>
        </div>
      </div>
    );
  }
}
