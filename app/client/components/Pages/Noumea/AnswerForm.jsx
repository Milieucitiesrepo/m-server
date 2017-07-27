import React, { Component } from 'react'
import { render } from 'react-dom'
import css from './css/survey.scss'
import _ from 'lodash'
import { RIETextArea } from 'riek'
import { debounce } from 'lodash'
import { ShareButtons, generateShareIcon } from 'react-share';

export default class AnswerForm extends Component {

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
      <div className="container">
       <div className="row">
         <div className={css.comments}>
          <form onSubmit={this.handleSubmit}>
            <input 
            type="text" 
            value={this.state.amount} 
            onChange={this.handleChange} />
             <center>
               <input 
               type="submit" 
               value="la prochaine question" 
               />
             </center>
          </form>
         </div>
       </div>
      </div>
    );
  }
}