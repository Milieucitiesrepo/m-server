import React, { Component } from 'react'
import { render } from 'react-dom'
import SurveyIntro from './SurveyIntro'
import css from './css/noumea.scss'
import _ from 'lodash'
import { RIETextArea } from 'riek'

export default class Participez extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: ''
    };
    this.saveAnswers = this.saveAnswers.bind(this);
  }

  saveAnswers(answers) {
    return new Promise((resolve, reject) => {
      const data = {
        comment: {answers}
      };

      $.ajax({
        url: `/submit_survey`,
        dataType: 'JSON',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        success: (comment) => {
          console.log("You saved data", data)
          resolve(comment)
        },
        error: (error) => {
          console.log("There was an error: ", error)
          reject(error)
        }
      })
    })
  }

  render() {
    return (
      <div className="submitBox">
        <AnswerForm
          saveAnswers={this.saveAnswers} />
      </div>
    );
  }
}

class AnswerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({amount: e.target.value})
  }

  handleSubmit(e) {
    let amount = this.state.amount
    e.preventDefault()
    console.log("You submitted data", amount)
    this.setState({amount: amount})
    this.props.saveAnswers({amount: amount});
  }

  render() {
    return (
       <SurveyIntro />
    );
  }
}

document.addEventListener('turbolinks:load', () => {
  const participez = document.querySelector('#participez');
  participez && render(<Participez />, participez)
})
