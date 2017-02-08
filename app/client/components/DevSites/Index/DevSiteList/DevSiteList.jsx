import React, { Component } from 'react'
import css from './dev-site-list.scss'
import { replace, ceil } from 'lodash'
import i18n from './locale'

export default class DevSiteList extends Component {
  constructor(props) {
    super(props);
    this.parent = this.props.parent;
    this.state = { cityRequestSaved: false };
    this.handleDevSiteClick = (e) => this._handleDevSiteClick(e);
    this.handleDevSiteMouseEnter = (e) => this.parent.setState({ hoverdDevSiteId: e.currentTarget.dataset.id });
    this.handleDevSiteMouseLeave = () => this.parent.setState({ hoverdDevSiteId: null });
    this.handlePreviousClick = (e) => this._handlePreviousClick(e);
    this.handleForwardClick = (e) => this._handleForwardClick(e);
    this.saveCityRequest = (e) => this._saveCityRequest(e);
  }
  _handleDevSiteClick(e) {
    e.preventDefault();
    if(this.parent.state.activeDevSiteId === e.currentTarget.dataset.id){
      this.parent.setState({ activeDevSiteId: null });
    }else{
      this.parent.setState({ activeDevSiteId: e.currentTarget.dataset.id });
    }
  }
  _handlePreviousClick(e) {
    e.preventDefault();
    if(this.props.page < 1) return;
    this.parent.setState({ page: (this.props.page - 1) }, () => this.parent.loadDevSites());
  }
  _handleForwardClick(e) {
    e.preventDefault();
    if((this.props.page + 1) === ceil(this.props.total / 20)) return;
    this.parent.setState({ page: (this.props.page + 1) }, () => this.parent.loadDevSites());
  }
  _saveCityRequest(e) {
    e.preventDefault();

    if(e.which !== 13 && e.type !== 'click') {
      return false;
    }

    $.ajax({
      url: '/city_requests',
      dataType: 'JSON',
      type: 'POST',
      data: { city_request: { city: this.refs.cityRequest.value } },
      success: () => {
        window.flash('notice', i18n.cityRequestS);
      },
      error: error => {
        if(error.status == 422) {
          window.flash('alert', error.responseJSON.city);
        } else {
          window.flash('alert', i18n.cityRequestF);
        }
      }
    })
  }
  render() {
    return(
      <div className={css.container}>
        {
          this.props.devSites.length === 0 && !this.props.loading &&
          <div className={css.empty}>
            <h3>{i18n.cantFind}</h3>
            <div className={css.inputSuggestion}>
              <h3>{i18n.suggestCity}</h3>
              <div className={css.inputContainer}>
                <input id='suggest-city' ref='cityRequest' type='text' placeholder='ex. Montreal, Quebec' onKeyPress={this.handleSubmit} />
                <a className='btn' href='#' onClick={this.saveCityRequest}>Save</a>
              </div>
            </div>
          </div>
        }
        {
          this.props.devSites.length > 0 &&
          <div>
            <div className={css.pagination}>
              <a href="#" onClick={this.handlePreviousClick} className={this.props.page === 0 ? css.disableleftarrow : css.leftarrow}></a>
              {this.props.page + 1} / {ceil(this.props.total / 20)}
              <a href="#" onClick={this.handleForwardClick} className={(this.props.page+1) === ceil(this.props.total / 20) ? css.disablerightarrow : css.rightarrow}></a>
            </div>
            {
              this.props.devSites.map(devSite => {
                return(
                  <a href="#" onClick={this.handleDevSiteClick}
                              onFocus={this.handleDevSiteMouseEnter}
                              onBlur={this.handleDevSiteMouseLeave}
                              onMouseEnter={this.handleDevSiteMouseEnter}
                              onMouseLeave={this.handleDevSiteMouseLeave}
                              data-id={devSite.id}
                              className={this.props.activeDevSiteId == devSite.id ? css.activeitem : css.item}
                              key={devSite.id}
                  >
                    <img src={devSite.image_url} className={css.previewImage} />
                    <div className={css.infoContainer}>
                      <h3 className={css.address}>{devSite.street}</h3>
                      <div className={css.info}>{devSite.devID}</div>
                      <div className={css.info}>{replace(devSite.application_type, /coa/, 'Committee of Adjustment')}</div>
                      <div className={css.info} dangerouslySetInnerHTML={{__html: devSite.status}}></div>
                      <div className={css.description} dangerouslySetInnerHTML={{__html: devSite.description}}></div>
                    </div>
                  </a>
                )
              })
            }
            <div className={css.pagination}>
              <a href="#" onClick={this.handlePreviousClick} className={this.props.page === 0 ? css.disableleftarrow : css.leftarrow}></a>
              {this.props.page + 1} / {ceil(this.props.total / 20)}
              <a href="#" onClick={this.handleForwardClick} className={(this.props.page+1) === ceil(this.props.total / 20) ? css.disablerightarrow : css.rightarrow}></a>
            </div>
          </div>
        }
      </div>
    );
  }
}
