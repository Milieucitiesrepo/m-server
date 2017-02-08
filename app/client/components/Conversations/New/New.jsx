import React, { Component } from 'react'
import { render } from 'react-dom'
import css from './new.scss'

export default class New extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.submit = (e) => this._submit(e);
  }
  _submit(e) {
    e.preventDefault();

    $.ajax({
      url: `/conversations`,
      dataType: 'JSON',
      type: 'POST',
      contentType: false,
      processData: false,
      data: new FormData(e.currentTarget),
      success: conversation => {
        window.flash('notice', 'Conversation successfully created');
        Turbolinks.visit('/');
      },
      error: error => {
        this.setState({ error: error.responseJSON });
      }
    })
  }
  render(){
    const { error } = this.state;
    return <form onSubmit={this.submit} className='one-page-form'>

      <h2 style={{paddingLeft: '0.75rem'}}>Start a Conversation!</h2>

      <div className='row'>
        <div className='input-field col s12'>
          <label htmlFor='conversation_address'>Address</label>
          <input type='text' id='conversation_address' name='conversation[address]'/>
          {error && error.address && <div className='error-message'>{error.address}</div>}
        </div>
      </div>

      <div className='row'>
        <div className='input-field col s12 m6'>
          <label htmlFor='conversation_city'>City</label>
          <input type='text' id='conversation_city' name='conversation[city]'/>
        </div>

        <div className='input-field col s12 m6'>
          <label htmlFor='conversation_postal_code'>Postal Code</label>
          <input type='text' id='conversation_postal_code' name='conversation[postal_code]'/>
        </div>
      </div>

      <div className='row'>
        <div className='input-field col s12'>
          <label htmlFor='conversation_topic'>Topic</label>
          <input type='text' id='conversation_topic' name='conversation[topic]'/>
        </div>
      </div>

      <div className='row'>
        <div className='input-field col s12'>
          <label htmlFor='conversation_type'>Conversation type</label>
          <select name='conversation[conversation_type]' id='conversation_type'>
            <option value='Asking a question'>Asking a question</option>
            <option value='Vacant and derelict'>Vacant and derelict</option>
            <option value='Bike infrastructure'>Bike infrastructure</option>
            <option value='Heritage preservation'>Heritage preservation</option>
            <option value='Urban intensification'>Urban intensification</option>
            <option value='Neighborhood well-being'>Neighborhood well-being</option>
          </select>
        </div>
      </div>

      <div className='row'>
        <div className='input-field col s12'>
          <label htmlFor='conversation_body'>Body</label>
          <textarea id='conversation_body' name='conversation[body]' />
        </div>
      </div>

      <div className='row'>
        <div className='input-field col s12'>
          <label htmlFor='conversation_image'>Image</label>
          <input type='file' id='conversation_image' name='conversation[image]'/>
        </div>
      </div>

      <div className='row'>
        <div className='input-field col s12'>
          <button name='commit' type='submit' className='btn'>Start the conversation</button>
        </div>
      </div>

    </form>;
  }
}

document.addEventListener('turbolinks:load', () => {
  const conversationNew = document.querySelector('#conversation-new');
  conversationNew && render(<New/>, conversationNew)
})
