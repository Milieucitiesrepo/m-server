import React, { Component } from 'react'
import css from './modal.scss'

export default class Modal extends Component {
  constructor(props) {
    super(props);
    this.handleCloseModal = (e) => this._handleCloseModal(e)
  }
  componentDidMount() {
    const { overlay, modal } = this.refs;
    $(overlay).velocity({ opacity: 1 }, { duration: 200 });
    $(modal).velocity('transition.expandIn', { duration: 500 });
  }
  _handleCloseModal(e) {
    const { overlay } = this.refs;
    if(e.target === overlay){
      $(overlay).velocity({ opacity: 0 }, { duration: 200,
        complete: () => this.props.parent.setState({ showModal: false }) }
      );
    }
  }
  render() {
    return <div className={css.container}>
      <div className={css.overlay} ref='overlay' onClick={this.handleCloseModal}>
        <div className={css.modal} ref='modal' >
          {this.props.children}
        </div>
      </div>
    </div>;
  }
}
