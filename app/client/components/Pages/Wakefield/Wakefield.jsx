import React, { Component } from 'react'
import { render } from 'react-dom'
import css from './wakefield.scss'
import Header from '../../Layout/Header/Header'
import Footer from '../../Layout/Footer/Footer'
import Comments from '../../Comments/Comments'
import Loader from '../../Common/Loader/Loader'
import Sentiment from '../../Common/Sentiment/Sentiment'
import TypeformSurvey from './TypeformSurvey'
import { debounce, uniqueId } from 'lodash'
import i18n from './locale'
import { ShareButtons, generateShareIcon } from 'react-share';

const { FacebookShareButton, TwitterShareButton } = ShareButtons;
const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');

export default class Wakefield extends Component {
  constructor() {
    super()
    this.state = { loading: true };
    this.devSiteId = document.querySelector('#wakefield').dataset.id;
    this.surveySentiment = document.querySelector('#wakefield').dataset.surveySentiment;
    this.loadDevSite = () => this._loadDevSite();
  }

  componentDidMount() {
    this.loadDevSite();
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

  render() {
    const { loading, devSite } = this.state;
    const { locale } = document.body.dataset;
    const surveySentiment = JSON.parse(this.surveySentiment) || null
    i18n.setLanguage(locale);

    return (
      <div className={css.root}>
        <Header />
        <div className={`${css.container} container`}>
          <h1>Lorne Shoudice Spring, Le Pêche, Quebec, Canada</h1>
          <Loader loading={loading} />

          {
            !loading &&
            <div>
              <div className={css.share}>
                <FacebookShareButton
                  url={`${window.location.origin}/wakefield`}
                  title='Lorne Shoudice Spring, Le Pêche, Quebec'
                  description='The Lorne Shouldice Spring ( Wakefield Spring) is a treasured source of potable freshwater maintained by the municipality of La Pêche and local non-profit group Friends of the Wakefield Spring.'
                  picture='https://s3.ca-central-1.amazonaws.com/milieu-production/wakefield.jpg'
                  >
                  <FacebookIcon size={40} round />
                </FacebookShareButton>
                <br/>
                <TwitterShareButton
                  url={`${window.location.origin}/wakefield`}
                  title='Lorne Shoudice Spring, Le Pêche, Quebec'
                  picture='https://s3.ca-central-1.amazonaws.com/milieu-production/wakefield.jpg'
                  >
                  <TwitterIcon size={40} round />
                </TwitterShareButton>
              </div>

              <div className='flex m-col'>
                <div className={css.content}>
                  <h2 style={{marginTop: 0}}>{i18n.aboutProject}</h2>

                  <p>{i18n.aboutProjectP1}</p>
                  <p>{i18n.aboutProjectP2}</p>
                  <p>{i18n.aboutProjectP3}</p>
                  <p>{i18n.aboutProjectP4}</p>

                  <h2>{i18n.whatDoYouThink}</h2>

                  <p>{i18n.whatDoYouThinkP1}</p>
                  <p>{i18n.whatDoYouThinkP2}</p>
                </div>

                <div className={css.media}>
                  <Carousel />
                </div>
              </div>

              <TypeformSurvey surveyUrl='https://milieu.typeform.com/to/HHlHgX'/>

              <div className={css.sentiment}>
                {
                  surveySentiment &&
                  <h2>Survey Sentiment</h2>
                }
                {
                  surveySentiment &&
                  <Sentiment
                    chartId={`chart-sentiment-${surveySentiment.id}`}
                    anger={surveySentiment.anger}
                    disgust={surveySentiment.disgust}
                    fear={surveySentiment.fear}
                    joy={surveySentiment.joy}
                    sadness={surveySentiment.sadness}
                  />
                }
              </div>

              <h2>{i18n.communityTimeline}</h2>

              <img
                className={`hide-on-small-only ${css.timeline}`}
                src={require(`./images/timeline-horizontal-${locale}.svg`)}
                alt={i18n.timeline}
              />
              <img
                className={`hide-on-med-and-up ${css.timeline}`}
                src={require(`./images/timeline-vertical-${locale}.svg`)}
                alt={i18n.timeline}
              />

              <div className='flex m-col'>
                <div className={css.content}>
                  <h2>{i18n.comment}</h2>
                  <Comments devSiteId={this.devSiteId} />
                </div>
                <div className={css.sentiment}>
                  {
                    devSite.sentiment &&
                    <h2>Comment Sentiment</h2>
                  }
                  {
                    devSite.sentiment &&
                    <Sentiment
                      chartId={`chart-sentiment-${devSite.sentiment.id}`}
                      anger={devSite.sentiment.anger}
                      disgust={devSite.sentiment.disgust}
                      fear={devSite.sentiment.fear}
                      joy={devSite.sentiment.joy}
                      sadness={devSite.sentiment.sadness}
                      />
                  }
                  <h2>{i18n.attachments}</h2>
                  {
                    devSite.files.map((file, i) => {
                      return(
                        <a key={`file-${i}`} target='_blank' className={css.attachment} href={file.url}>
                          <span className={css.extension}>{file.extension}</span>
                          {file.name.replace(/_/g, ' ')}
                        </a>
                      )
                    })
                  }
                </div>
              </div>

              <div className={css.partners}>
                <h2 className='center-align'>{i18n.partners}</h2>
                <h4 className='center-align'><i>{i18n.partnersText}</i></h4>

                <br/>

                <div className='flex h-center v-center'>
                  <img className={css.logo} src={require('./images/cld_logo.png')} />
                  <img className={css.logo} src={require('./images/munilettre.png')} />
                  <img className={css.logo} src={require('./images/desjardin.png')} />
                </div>
              </div>
            </div>
          }
        </div>
        <Footer />
      </div>
    )
  }
}

const CAROUSEL_ITEMS = [
  {
    src: './images/wakefield-side.jpg',
    image: true,
  },
  {
    src: './images/wakefield-video.jpg',
    image: false,
    iframe: {
      en: 'https://www.youtube.com/embed/Qd5-BAoTMnk?rel=0&amp;showinfo=0',
      fr: 'https://www.youtube.com/embed/LWatPVfdrqA?rel=0&amp;showinfo=0'
    }
  },
  {
    src: './images/discover.jpg',
    image: true,
  },
  {
    src: './images/wakefield.jpg',
    image: true,
  },
]

class Carousel extends Component {
  constructor() {
    super()
    this.state = { itemIndex: 0 };
    this.previous = (e) => this._previous(e);
    this.next = (e) => this._next(e);
    this.mod = (n, m) => ((n % m) + m) % m
  }

  _previous(e) {
    e.preventDefault();
    const { itemIndex } = this.state;

    $(this.refs.container).velocity({ 'left': '-66.66%' }, { duration: 350, complete: () => {
      this.setState({ itemIndex: this.mod((itemIndex + 1), CAROUSEL_ITEMS.length) })
    }})
  }

  _next(e) {
    e.preventDefault();
    const { itemIndex } = this.state;

    $(this.refs.container).velocity({ 'left': 0 }, { duration: 350, complete: () => {
      this.setState({ itemIndex: this.mod((itemIndex - 1), CAROUSEL_ITEMS.length) })
    }})
  }

  render() {
    const { locale } = document.body.dataset;
    const { itemIndex } = this.state;
    const currentItem = CAROUSEL_ITEMS[(itemIndex + 1) % CAROUSEL_ITEMS.length]
    let items = [];

    for (let i = itemIndex; i < (itemIndex + 3); i++) {
      const src = CAROUSEL_ITEMS[i%CAROUSEL_ITEMS.length].src
      items.push(<img key={src} className={css.carouselItem} src={require(src)} />)
    }

    $(`.${css.carouselItemsContainer}`).css({ left: '-33.33%' })

    return(
      <div className={css.carouselContainer}>
        <div className={css.carouselDisplay}>
          {
            currentItem.image &&
            <img ref='display' src={require(currentItem.src)} />
          }
          {
            !currentItem.image &&
            <iframe src={currentItem.iframe[locale]} frameBorder='0' allowFullScreen />
          }
        </div>
        <div ref='container' className={css.carouselItemsContainer}>
          <a href='#' onClick={this.previous} className={css.carouselPreviousItem}><i className='fa fa-angle-left' /></a>
          <img className={css.carouselItem} src={require(CAROUSEL_ITEMS[this.mod((itemIndex - 1), CAROUSEL_ITEMS.length)].src)} />
          {items}
          <img className={css.carouselItem} src={require(CAROUSEL_ITEMS[ this.mod((itemIndex + 3), CAROUSEL_ITEMS.length)].src)} />
          <a href='#' onClick={this.next} className={css.carouselNextItem} ><i className='fa fa-angle-right' /></a>
        </div>
      </div>
    )
  }
}

document.addEventListener('turbolinks:load', () => {
  const wakefield = document.querySelector('#wakefield');
  wakefield && render(<Wakefield/>, wakefield)
})


