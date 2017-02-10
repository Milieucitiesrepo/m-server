import React, { Component } from 'react'
import { render } from 'react-dom'
import TextInputWithLabel from '../../Common/FormFields/TextInputWithLabel'
import css from '../../Layout/Dashboard/dashboard.scss'

export default class New extends Component {
  render() {
    return(
      <div className={css.meta}>
        <div className={css.label}>
          Add an Organization
        </div>
        <div className={css.data}>
          <div className='row'>
            <TextInputWithLabel
              classes='col s12 m12 l12'
              id='organization_name'
              name='organization[name]'
              label="Name of organization"
            />
          </div>
          <div className='row'>
            <div className='col'>
              <button
                name='commit'
                type='submit'
                className='btn'
                onClick={this.props.onCreate}>
                Add Organization
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
