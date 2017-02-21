import React, { Component } from 'react'
import { render } from 'react-dom'
import i18n from './locale'

export default class TypeformSurvey extends Component {
  constructor() {
    super()
    this.mobile = /mobile|tablet/i.test(navigator.userAgent);
  }

  componentDidMount() {
    if (this.mobile) {
      (function(){var qs,js,q,s,d=document,gi=d.getElementById,ce=d.createElement,gt=d.getElementsByTagName,id='typef_orm_share',b='https://s3-eu-west-1.amazonaws.com/share.typeform.com/';if(!gi.call(d,id)){js=ce.call(d,'script');js.id=id;js.src=b+'share.js';q=gt.call(d,'script')[0];q.parentNode.insertBefore(js,q)}id=id+'_';if(!gi.call(d,id)){qs=ce.call(d,'link');qs.rel='stylesheet';qs.id=id;qs.href=b+'share-button.css';s=gt.call(d,'head')[0];s.appendChild(qs,s)}})()
    }
  };

  render() {
    const mobile = /mobile|tablet/i.test(navigator.userAgent);
    return(
      <div>
      { this.mobile &&
        <a className='btn typeform-share' href={this.props.surveyUrl} data-mode='1' target='_blank'>{i18n.startSurvey}</a>
      }
      {
        !this.mobile &&
        <iframe src={this.props.surveyUrl} id="typeform_survey" autoFocus></iframe>
      }
      </div>
    );
  };
}