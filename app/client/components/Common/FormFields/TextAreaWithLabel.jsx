import React, { Component } from 'react'

export default class TextAreaWithLabel extends Component {
  constructor(props) {
    super(props)
    const valid = this.props.defaultValue && this.props.defaultValue.length > 0
    const errorText = `${this.props.label} is a required field.`

    this.state = { valid, errorText }
    this.validate = (e) => this._validate(e)
  }

  _validate(e) {
    this.setState({ valid: this._fieldHasContent(e.currentTarget) })
  }

  _fieldHasContent(element) {
    return element.value.length > 0
  }

  render() {

    return(
      <div className={`input-field ${this.props.classes}`}>
        <label htmlFor={this.props.id}>{this.props.label}</label>
        <textarea
          id={this.props.id}
          defaultValue={this.props.defaultValue}
          name={this.props.name}
          form={this.props.form}
          onBlur={this.props.required && this.validate}
        />
        {
          (this.props.error || this.props.required && !this.state.valid) &&
          <div className='error-message'>{this.props.error || this.state.errorText}</div>
        }
      </div>
    )
  }
}
