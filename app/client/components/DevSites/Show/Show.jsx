import React, { Component } from 'react'
import { render } from 'react-dom'
import css from './show.scss'
import Header from '../../Layout/Header/Header'
import Footer from '../../Layout/Footer/Footer'
import Modal from '../../Utility/Modal/Modal'
import Comments from '../../Comments/Comments'
import i18n from './locale'
import Chart from 'chart.js'
import { ShareButtons, generateShareIcon } from 'react-share';

const { FacebookShareButton, TwitterShareButton } = ShareButtons;
const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');

export default class DevSiteShow extends Component {
  constructor(props) {
    super(props);
    this.state = { showFiles: false, loading: true }
    this.devSiteId = document.querySelector('#dev-site-show').dataset.id;
    this.loadDevSite = () => this._loadDevSite();
    this.handleEmail = (e) => this._handleEmail(e);
    this.openEmailModal = (e) => this._openEmailModal(e);
    this.generateChart = () => this._generateChart();
    this.loadDevSite();
  }
  componentDidUpdate(prevProps, prevState) {
    if(this.state.devSite && !prevState.devSite) {
      this.generateChart();
    }
  }
  _handleEmail(e) {
    e.preventDefault();
    const { contact } = this.state;
    const url = contact === 'Urban Planner' ? '/contact_file_lead' : '/contact_councillor';
    const { locale } = document.body.dataset;
    i18n.setLanguage(locale);
    const { messageSent, mustSign } = i18n
    $.ajax({
      url,
      dataType: 'JSON',
      type: 'POST',
      cache: false,
      contentType: false,
      processData: false,
      data: new FormData(e.currentTarget),
      success: () => {
        window.flash('notice', messageSent)
        this.setState({ showModal: false });
      }
    })
  }
  _loadDevSite() {
    $.ajax({
      url: `/dev_sites/${this.devSiteId}`,
      dataType: 'JSON',
      type: 'GET',
      success: devSite => this.setState({ devSite, loading: false }),
      error: () => {
        window.flash('alert', 'Failed to load Development Site. Reload the page and try again.')
      }
    })
  }
  _openEmailModal(e) {
    e.preventDefault();
    const { urban_planner_email, ward_councillor_email } = this.state.devSite;
    const contact = e.currentTarget.innerText;
    this.setState({ showModal: true, contact });
  }
  _formatEmotion(str) {
    return (parseFloat(str) * 100).toFixed(0)
  }
  _generateChart() {
    const { anger, disgust, fear, joy, sadness } = this.state.devSite.sentiment;
    const chart = document.getElementById('chart');
    new Chart(chart, {
      type: 'doughnut',
      animation: {
        animateScale: true
      },
      data: {
        labels: ['Anger', 'Disgust', 'Fear', 'Joy', 'Sadness'],
        datasets: [{
          label: 'Emotion',
          data: [
            this._formatEmotion(anger),
            this._formatEmotion(disgust),
            this._formatEmotion(fear),
            this._formatEmotion(joy),
            this._formatEmotion(sadness)
          ],
          backgroundColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(255, 159, 64, 1)'
          ]
        }]
      },
      options: {
        legend: {
          position: 'left'
        }
      }
    });
  }
  render() {
    const { devSite, loading, showModal, contact } = this.state;
    return(
      <div className={css.root}>
        <Header />
        <div className={`${css.container} container`}>
          {
            loading &&
            <div className='loading-screen'>
              <div className='spinner'>
                <div className='bounce1'></div>
                <div className='bounce2'></div>
                <div className='bounce3'></div>
              </div>
            </div>
          }
          {
            !loading &&
            <div>
              <h1>{devSite.address}</h1>
              <div className='row'>
                <div className='col s12 m6'>
                  <img src={devSite.image_url} className={css.image} />

                  <div className={css.share}>
                    <FacebookShareButton url={devSite.url} title={devSite.address} media={devSite.image_url}>
                      <FacebookIcon size={32} round />
                    </FacebookShareButton>
                    <TwitterShareButton url={devSite.url} title={devSite.address} media={devSite.image_url}>
                      <TwitterIcon size={32} round />
                    </TwitterShareButton>
                  </div>

                  <div className={css.emailofficials}>
                    <a href='#' onClick={this.openEmailModal} className={css.email} title='Email the Urban Planner'>
                      <i className={css.mail}></i> Urban Planner
                    </a>
                    <a href='#' onClick={this.openEmailModal} className={css.email} title='Email the Councillor'>
                      <i className={css.mail}></i> Councillor
                    </a>
                  </div>
                </div>
                <div className='col s12 m6'>
                  <div className='row'>
                    <div className='col s6'>
                      Development Id:
                    </div>
                    <div className='col s6'>
                      {devSite.devID}
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col s6'>
                      Application Type:
                    </div>
                    <div className='col s6'>
                      {devSite.application_type.replace(/coa/, 'Committee of Adjustment')}
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col s6'>
                      Ward Name:
                    </div>
                    <div className='col s6'>
                      {devSite.ward_name}
                    </div>
                  </div>

                  <h3 style={{padding: '0 0.75rem'}}><b>Status</b></h3>
                  {
                    devSite.statuses.map(status => {
                      return(
                        <div className='row' key={status.id}>
                          <div className='col s12 m6'>{status.status}</div>
                          <div className='col s12 m6'>{status.friendly_status_date}</div>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
              <div className='row'>
                <div className='col s12 m6'>
                  <h3><b>Description</b></h3>
                  <div dangerouslySetInnerHTML={{__html: devSite.description }}></div>
                  {
                    (devSite.city_files.length > 0 || devSite.files.length > 0) &&
                    <h3><b>Files</b></h3>
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
                          <a href={file.link} target='_blank' className={css.filelink}>{file.name}</a>
                        </div>
                      )
                    })
                  }
                  {
                    devSite.sentiment &&
                    <h3><b>Sentiment</b></h3>
                  }
                  {
                    devSite.sentiment &&
                    <canvas id='chart' width='500' height='300'></canvas>
                  }
                </div>
                <div className='col s12 m6'>
                  <h3><b>Comments</b></h3>

                  <Comments devSiteId={devSite.id} />
                </div>
              </div>
            </div>
          }
        </div>
        {
          showModal &&
          <Modal parent={this}>
            <EmailModal contact={contact} address={devSite.address} id={devSite.id} handleEmail={this.handleEmail} />
          </Modal>
        }
        <Footer/>
      </div>
    );
  }
}

const EmailModal = (props) => {
  return(
    <div className={css.emailmodal} tabIndex='-1'>
      <div className={css.contact} >Contact {props.contact}</div>
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
  )
}

document.addEventListener('turbolinks:load', () => {
  const devSiteShow = document.querySelector('#dev-site-show');
  devSiteShow && render(<DevSiteShow/>, devSiteShow)
})
