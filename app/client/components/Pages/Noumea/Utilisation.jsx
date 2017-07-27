import React, { Component } from 'react'
import { render } from 'react-dom'
import Footer from '../../Layout/Footer/Footer'
import Comments from '../../Comments/Comments'
import Loader from '../../Common/Loader/Loader'
import Sentiment from '../../Common/Sentiment/Sentiment'
import { debounce, uniqueId } from 'lodash'

export default class Utilisation extends Component {
  constructor() {
    super()
    this.state = { loading: true };
    this.devSiteId = document.querySelector('#utilisation').dataset.id;
    this.surveySentiment = document.querySelector('#utilisation').dataset.surveySentiment;
  }

  render() {
    const { loading } = this.state;

    return (
      <div>
        <h1>Utilisation page</h1>
          <img
            src={require(`./images/5.svg`)}
          />
          <img
            src={require(`./images/4.svg`)}
          />
    </div>
    )
  }
}

document.addEventListener('turbolinks:load', () => {
  const noumea = document.querySelector('#utilisation');
  noumea && render(<Utilisation/>, noumea)
})
