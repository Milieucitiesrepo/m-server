import React, { Component } from 'react'
import { render } from 'react-dom'
import { capitalize, replace } from 'lodash'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { ShareButtons, generateShareIcon } from 'react-share'
import Chart from 'chart.js'

import css from './preview.scss'
import i18n from './locale'
import CommentsSection from '../../Comments/CommentsSection'
import Modal from '../../Utility/Modal/Modal'
import Comments from '../../Comments/Comments'
import Loader from '../../Common/Loader/Loader'
import Sentiment from '../../Common/Sentiment/Sentiment'

const { FacebookShareButton, TwitterShareButton } = ShareButtons;
const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');

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
    this.loadTimeline = () => this._loadTimeline();

    if(!props.devSite) {
      this.loadDevSite();
    }

  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.id !== this.props.id) this.loadDevSite();
    this.refs.container &&  this.refs.container.focus();

    if (this.state.devSite && !this.state.loading) {
      this.loadTimeline();
    }
  }

  _loadTimeline() {
    const { devSite } = this.state;
    $('.tl').timeline(devSite.status);
  }

  _loadDevSite() {
    $.getJSON(`/dev_sites/${this.props.id}`,
      devSite => this.setState({ devSite })
    );
  }

  _openEmailModal(e) {
    e.preventDefault();
    const { urban_planner_email, ward_councillor_email } = this.state.devSite;
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
    i18n.setLanguage(locale);
    if(!devSite) return <div></div>;

    const currentStatus = devSite.status;

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
        <h3 className={css.status}>{currentStatus}</h3>
          <div className='row'>
            <div className='col m4 s4'>
              <h3>{devSite.address}</h3>
              {i18n.devId}: {devSite.devID} <br/>
              {devSite.application_type_name.replace(/coa/, 'Committee of Adjustment')} <br/>
            </div>

            <div className='col m8 s6'>
              <img src={devSite.image_url} className={css.image} />
            </div>
            </div>
          <div className='row'>
            <div className='col m12 s4'>
              <div className={css.tabs}>
                  <Tabs>
                    <TabList>
                      <Tab>{i18n.description}</Tab>
                      <Tab>{i18n.attachments}</Tab>
                      <Tab>{i18n.notices}</Tab>
                    </TabList>

                    <TabPanel>
                      <h3 className={css.description}>{i18n.projectDescription}</h3>
                      <div dangerouslySetInnerHTML={{__html: devSite.description }}></div>
                    </TabPanel>
                    <TabPanel>
                      <h3 className={css.description}>{i18n.attachments}</h3>
                      {
                        (devSite.city_files.length > 0 || devSite.files.length > 0) &&
                        <h3 className={css.description}>{i18n.file}</h3>
                      }
                      {
                        devSite.city_files.map((file, i) => {
                          return(
                            <div key={i}>
                              <a href={file.link} target='_blank' className={css.filelink}>{file.name}</a>
                            </div>
                          )
                        })
                      }
                      {
                        devSite.files.map((file, i) => {
                          return(
                            <div key={i}>
                              <a href={file.url} target='_blank' className={css.filelink}>{file.name}</a>
                            </div>
                          )
                        })
                      }
                    </TabPanel>
                    <TabPanel>
                      <h3 className={css.description}>{i18n.notices}</h3>
                      {
                        devSite.statuses &&
                        devSite.statuses.map((status, i) => {
                          if (status.filesuploader) {
                            return(
                              <div key={i}>
                                <a href={status.filesuploader.url} target='_blank' className={css.filelink}>{status.filesuploader.name}</a>
                              </div>
                            )
                          }
                        })
                      }
                    </TabPanel>
                  </Tabs>
                </div>
             </div>
          </div>

          <div className='row'>
            <div className='col m11 s6'>
              <h3 className={css.timelinehead}>{i18n.projectTimeline}</h3>
              <div className='tl'></div>
            </div>
            <div className='col m1 s2'>
            <div className={css.sharecontainer}>
              share on<br/>
              <div className={css.share}>
              <FacebookShareButton url={devSite.url} title={devSite.address} media={devSite}>
                <FacebookIcon size={38} round />
              </FacebookShareButton>
              </div>
              <div className={css.share}>
              <TwitterShareButton url={devSite.url} title={devSite.address} media={devSite.image_url}>
                <TwitterIcon size={38} round />
              </TwitterShareButton>
              </div>
              <br/>
              <div className={css.message}>
              message<br/>
              planner<br/>
              </div>
              <div className={css.share}>
              <a href={`mailto:${devSite.urban_planner_email}`}>
                <img src={require('./images/messageplanner.svg')} className={css.commentimage} />
              </a>
              </div>
            </div>
          </div>
        </div>
      <div className='row'>
        <div className='col s12 m6'>
          <h3><b>{i18n.comments}</b></h3>
          <a name='comments'></a>

          <Comments devSiteId={devSite.id} />
        </div>
      </div>

        <CommentsSection devSite={devSite} devSiteId={devSite.id} applicationType={devSite.application_type_name}/>
        {
          showModal &&
          <Modal parent={this}>
            <EmailModal contact={contact} address={devSite.address} id={devSite.id} handleEmail={this.handleEmail} />
          </Modal>
        }
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
