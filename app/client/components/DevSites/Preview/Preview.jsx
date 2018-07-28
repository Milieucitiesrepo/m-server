import React, { Component } from 'react'
import css from './preview.scss'
import { capitalize, replace } from 'lodash'
import i18n from './locale'
import Modal from '../../Utility/Modal/Modal'
import { ShareButtons, generateShareIcon } from 'react-share'
import Comments from '../../Comments/Comments'
import CommentsSection from '../../Comments/CommentsSection'
import { render } from 'react-dom'
import Loader from '../../Common/Loader/Loader'
import Sentiment from '../../Common/Sentiment/Sentiment'
import Chart from 'chart.js'
import Tabs from '../Show/Tabs'
import Timeline from '../Timeline/Timeline'

const { FacebookShareButton, TwitterShareButton } = ShareButtons;
const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');

const commentPeriod = <img src={require('../../../icons/in comment period.svg')} title='comment period' />;
const archived = <img src={require('../../../icons/archived.svg')} title='archived' />;
const review = <img src={require('../../../icons/review.svg')} title='review' />;
const siteplan = <img src={require('../../../icons/siteplan.svg')} title="site plan " />;
const applicationRecieved = <img src={require('../../../icons/apprecieved.svg')} title="application recieved " />;

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = { showFiles: false, devSite: props.devSite }
    this.parent = this.props.parent;
    this.currentUserId = parseInt(document.body.dataset.userId);
    this.loadDevSite = () => this._loadDevSite();
    this.toggleShowFiles = (e) => this._toggleShowFiles(e);
    this.closeDevSite = (e) => this._closeDevSite(e);
    this.openEmailModal = (e) => this._openEmailModal(e);
    this.handleEmail = (e) => this._handleEmail(e);
    this.toggleLike = () => this._toggleLike();
    this.toggleFeatured = () => this._toggleFeatured();
    this.userAdmin = () => this._userAdmin();

    if(!props.devSite) {
      this.loadDevSite();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.id !== this.props.id) this.loadDevSite();
    this.refs.container &&  this.refs.container.focus();
  }

  _loadDevSite() {
    $.getJSON(`/dev_sites/${this.props.id}`,
      devSite => this.setState({ devSite })
    );
  }

  _openEmailModal(e) {
    e.preventDefault();
    const contact = e.currentTarget.innerText;
    this.setState({ showModal: true, contact });
  }

  _handleEmail(e) {
    e.preventDefault();
    const { contact } = this.state;
    const url = contact === 'Urban Planner' ? '/contact_file_lead' : '/contact_councillor';
    const { locale } = document.body.dataset;
    i18n.setLanguage(locale);
    const { messageSent, messageNotSent, mustSign } = i18n
    $.ajax({
      url: url,
      dataType: 'JSON',
      type: 'POST',
      cache: false,
      contentType: false,
      processData: false,
      data: new FormData(e.currentTarget),
      success: () => {
        window.flash('notice', messageSent)
        this.setState({ showModal: false });
      }, error: () => {
        window.flash('alert', messageNotSent)
        this.setState({ showModal: false });
      }
    });
  }

  _toggleLike() {
    const { devSite } = this.state;
    const data = devSite.like ?
                {dev_site: {likes_attributes: {'0' : {id: devSite.like.id, _destroy: 1 }}} } :
                {dev_site: {likes_attributes: {'0' : {user_id: this.currentUserId, dev_site_id: devSite.id}}} }

    $.ajax({
      url: `/dev_sites/${devSite.id}`,
      dataType: 'JSON',
      type: 'PATCH',
      cache: false,
      data: data,
      success: devSiteJson => this.setState({ devSite: devSiteJson }),
      error: error => {
        if(error.status == 403){
          window.flash('alert', mustSign)
        }
      }
    });
  }

  _toggleFeatured() {
    const { devSite } = this.state;
    const featured = !devSite.featured;
    const data = { dev_site: { featured }};
    $.ajax({
      url: `/dev_sites/${devSite.id}`,
      dataType: 'JSON',
      type: 'PATCH',
      data: data,
      success: devSiteJson => {
        this.setState({ devSite: devSiteJson })
      },
      error: error => {
        window.flash('alert', error)
      }
    });
  }

  _userAdmin() {
    return document.body.dataset.userRoles && (document.body.dataset.userRoles.indexOf('admin') !== -1)
  }

  _closeDevSite(e) {
    e.preventDefault();
    this.parent.setState({ activeDevSiteId: null });
  }

  _toggleShowFiles(e) {
    e.preventDefault();
    this.setState({ showFiles: !this.state.showFiles });
  }

  render() {
    const { devSite, showFiles, showModal, showReadMore, readMoreClicked, contact } = this.state;
    const { horizontal, preview } = this.props;
    const { locale } = document.body.dataset;
    const currentStatus = devSite ? devSite.current_status : '';
    i18n.setLanguage(locale);
    let smallIcon;

    switch(currentStatus) {
      case 'Application Received':
      smallIcon = applicationRecieved;
      break;
      case 'Application Complete, Comment Period Open':
      smallIcon = commentPeriod;
      break;
      case 'Planning Review Stage':
      smallIcon = siteplan;
      break;
      case 'Revision':
      smallIcon = review;
      break;
      case 'Decision':
      smallIcon = archived
      break;
    }

    if(!devSite) return <div></div>;

    if(preview && !horizontal) {
      return(
        <div>
          <h3 className={css.status}>{currentStatus}</h3>
        <div className={css.verticalPreviewContainer} style={{width: this.props.width}} title={`Development Site at ${devSite.address}`}>
          {false && <div className={css.status}>{i18n.openForComments}</div>}

          <img src={devSite.image_url} alt={`Image of ${devSite.address}`} className={css.image} />
          <div className={css.content}>
            <svg height='40' width='100%'>
              <mask id='circles'>
                <circle cx='10%' cy='20' r='15' fill='#aaa' />
                <circle cx='50%' cy='20' r='15' fill='#aaa' />
                <circle cx='90%' cy='20' r='15' fill='#aaa' />
                <circle cx='10%' cy='20' r='10' fill='#fff' />
                <circle cx='50%' cy='20' r='10' fill='#fff' />
                <circle cx='90%' cy='20' r='10' fill='#fff' />
                <line x1='10%' x2='90%' y1='20' y2='20' stroke='#fff' strokeWidth='2' />
              </mask>

              <linearGradient id='gradients'>
                <stop offset='0' stopColor='#92c7c6' />
                {devSite.general_status == 'Active Development' && <stop offset='0.4' stopColor='#ddd' />}
                {(devSite.general_status == 'Comment Period' || devSite.general_status == 'Active Development') && <stop offset='1' stopColor='#ddd'/>}
              </linearGradient>

              <rect height='40' width='100%' fill='url(#gradients)' mask='url(#circles)'></rect>
            </svg>
            <h3 className={css.address}>{devSite.address}</h3>
            <div className={css.description} dangerouslySetInnerHTML={{__html: devSite.description }} tabIndex='-1'></div>
          </div>
        </div>
      </div>
      )
    }

    if(preview && horizontal) {
      return(
        <div>
          <h3 className={css.status}>{currentStatus}</h3>
        <div className={css.horizontalPreviewContainer} title={`Go to ${devSite.address}`}>
          {false && <div className={css.status}>{i18n.openForComments}</div>}
          <img src={devSite.image_url} alt={`Image of ${devSite.address}`} className={css.image} />
          <div className={css.content}>
            <svg height='40' width='100%'>
              <mask id='circles'>
                <circle cx='10%' cy='20' r='15' fill='#aaa' />
                <circle cx='50%' cy='20' r='15' fill='#aaa' />
                <circle cx='90%' cy='20' r='15' fill='#aaa' />
                <circle cx='10%' cy='20' r='10' fill='#fff' />
                <circle cx='50%' cy='20' r='10' fill='#fff' />
                <circle cx='90%' cy='20' r='10' fill='#fff' />
                <line x1='10%' x2='90%' y1='20' y2='20' stroke='#fff' strokeWidth='2' />
              </mask>

              <linearGradient id='gradients'>
                <stop offset='0' stopColor='#92c7c6' />
                {devSite.general_status == 'Active Development' && <stop offset='0.4' stopColor='#ddd' />}
                {(devSite.general_status == 'Comment Period' || devSite.general_status == 'Active Development') && <stop offset='1' stopColor='#ddd'/>}
              </linearGradient>

              <rect height='40' width='100%' fill='url(#gradients)' mask='url(#circles)'></rect>
            </svg>
            <h3 className={css.address}>{devSite.address}</h3>
            <div className={css.description} dangerouslySetInnerHTML={{__html: devSite.description }} tabIndex='-1'></div>
          </div>
        </div>
      </div>
      )
    }

    return(
      <div>
        <div className={css.container} ref='container' tabIndex='-1'>
          <div className={css.menu}>
            <a className={css.close} onClick={this.closeDevSite} href='#'></a>
          </div>
          <div className={css.wrapper}>
            <div className='row'>
              <h1 className={css.devTitle}>{devSite.address}</h1>
                { devSite.url_full_notice &&
                  <div><a href={devSite.url_full_notice} target='_top' className={css.button}> {i18n.linkToPlanningPage} </a></div>
                }
                {false &&
                  <div >
                    <a href="#" >Read official notice</a>
                  </div>
                }
              <div className='col m6 s12'>

                <div className={css.icons}>{smallIcon}</div>
                <h3>{i18n.applicationFiles}:</h3>
                {
                  devSite.application_files.map((file, index) => (
                    <div className={css.description} key={index}>
                      <strong>{`${file.application_type}`}</strong>
                      <p>{i18n.devId}: {file.file_number}</p>
                      </div>
                  ))
                }
                <h3>{i18n.status}:</h3>
                <div className={css.description}>
                  <strong>{currentStatus}</strong>
                </div>


              </div>

              <div className='col m6 s12'>
                <img src={devSite.image_url} className={css.image} />
              </div>
            </div>

            <div className='row'>
              <div className='col s12'>
                <Timeline
                  devSite={devSite}
                />
              </div>
            </div>

            <Tabs devSite={devSite} />

            <div className='row'>
              <div className='col s12 m6'>
                <h3><b>{i18n.comments}</b></h3>

                <Comments devSiteId={devSite.id} />
              </div>
            </div>

            <CommentsSection devSite={devSite} devSiteId={devSite.id} />

            {
              showModal &&
              <Modal parent={this}>
                <EmailModal contact={contact} address={devSite.address} id={devSite.id} handleEmail={this.handleEmail} />
              </Modal>
            }
          </div>
        </div>
      </div>
    );
  }
}

const EmailModal = (props) => {
  return <div className={css.emailmodal} tabIndex='-1'>
    <div className={css.contact} >{i18n.contact} {props.contact}</div>
    <div className={css.address}>{props.address}</div>

    <form onSubmit={props.handleEmail} acceptCharset='UTF-8' >
      <input name='utf8' type='hidden' value='✓' />
      <input value={props.id} type='hidden' name='dev_site_id' />
      <div className='input-field'>
        <label>{i18n.name}</label>
        <input type='text' required='required' name='name' className={css.input} />
      </div>
      <div className='input-field'>
        <label>{i18n.email}</label>
        <input type='text' required='required' name='email' className={css.input} />
      </div>
      <div className='input-field'>
        <label>{i18n.message}</label>
        <textarea name='message' required='required' className={css.textarea}></textarea>
      </div>
      <input type='submit' name='commit' value='Send' className='btn' />
    </form>

  </div>
}
