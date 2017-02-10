import React, { Component } from 'react'
import { render } from 'react-dom'
import css from './home.scss'
import Header from '../../Layout/Header/Header'
import Footer from '../../Layout/Footer/Footer'
import DevSitePreview from '../../DevSites/Preview/Preview'
import Autocomplete from '../../Utility/Autocomplete/Autocomplete'
import Carousel from '../../Utility/Carousel/Carousel'
import { debounce } from 'lodash'
import i18n from './locale'

export default class Home extends Component {
  constructor() {
    super()
    this.state = { isMobile: (window.innerWidth < 600), featuredSites: [] }
    this.autocompleteCallback = (address, autocomplete) => this._autocompleteCallback(address, autocomplete)
    this.handleAutocompleteSelect = (address) => this._handleAutocompleteSelect(address)
    this.openModal = () => this._openModal();
    this.loadFeaturedSites = () => this._loadFeaturedSites();
    this.loadFeaturedSites();

    window.addEventListener('resize',
      debounce(() => {
        this.setState({ isMobile: (window.innerWidth < 600) })
      }, 100)
    );
  }

  _openModal() {
    document.querySelector('#sign-in-modal .modal-content').focus();
  }

  _autocompleteCallback(address, autocomplete) {
    const googleLocationAutocomplete = new google.maps.places.AutocompleteService()
    const request = { input: address, types: ['address'], componentRestrictions: {country: 'ca'} }
    googleLocationAutocomplete.getPlacePredictions(request, (predictions) => {
      const suggestions = predictions ? predictions.map(function(prediction){ return prediction.description }) : []
      autocomplete.setState({ suggestions })
    })
  }

  _handleAutocompleteSelect(address) {
    const { locale } = document.body.dataset;
    const geocoder = new google.maps.Geocoder()
    geocoder.geocode({'address': address}, (result) => {
      if(result.length > 0){
        const [latitude, longitude] = [result[0].geometry.location.lat(), result[0].geometry.location.lng()]
        Turbolinks.visit(`/${locale}/dev_sites?latitude=${latitude}&longitude=${longitude}`);
      } else {
        Turbolinks.visit(`/${locale}/dev_sites`);
      }
    })
  }

  _loadFeaturedSites() {
    $.getJSON('/dev_sites/?featured=true&limit=3',
      response => this.setState({ featuredSites: response.dev_sites })
    );
  }

  render() {
    const { isMobile } = this.state;
    const { locale, signedIn } = document.body.dataset;
    i18n.setLanguage(locale);

    return (
      <div>
        <Header />
        <div className={css.landingContainer}>
          <div>

            <h1><a href='https://about.milieu.io' className={css.headlineLink}>Milieu, </a><span>{i18n.heroText1}</span></h1>
          </div>
          <br />
          <p>{i18n.heroText2}</p>
          <a href='https://about.milieu.io/expertise' className={css.signUpButton}>{i18n.launchProject}</a>
        </div>
        <div className={css.searchContainer}>
          <h2 className={css.title}>{i18n.title}</h2>
          <div className={css.search}>
            <Autocomplete searchBtn callback={this.autocompleteCallback} placeholder={i18n.enterAddress} type='autocomplete' onSelect={this.handleAutocompleteSelect} frontPage={true}/>
          </div>
        </div>
        <div className={css.guelphContainer}>
          <a href='https://about.milieu.io/discover-milieu' className={css.milieuCityTag}> Discover Milieu City</a>
            <div>
              <a href='https://about.milieu.io/city-of-guelph' className={css.cityLink} >Guelph, ON</a>
              <p>{i18n.guelphDescription}</p>
              <br />
              <div className={css.partnerBlock}>
              <h3>{i18n.guelphPartner}</h3>
              <p>
                <a href='http://guelph.ca/' className={css.partnerLink}>City of Guelph, </a>
                <a href='http://www.innovationguelph.ca/' className={css.partnerLink}>  Innovation Guelph, </a>
                <a href='http://www.guelphchamber.com/' className={css.partnerLink}>  Guelph Chamber of Commerce, </a>
                <a href='http://codx.ca/' className={css.partnerLink}>  Canada’s Open Data Exchange, </a>
                <a href='http://www.uoguelph.ca/cbase/' className={css.partnerLink}>  CBaSE, University of Guelph</a>
              </p>
            </div>
            </div>


        </div>
        <div className={css.featuredContainer}>
          <h2 className={css.title}>{i18n.featuredDevelopments}</h2>
          <div className={css.featured}>
<<<<<<< HEAD
            <a href={`/${locale}/dev_sites?activeDevSiteId=1121`}><DevSitePreview id={1121} preview={true} horizontal={isMobile} /></a>
            <a href={`/${locale}/dev_sites?activeDevSiteId=1561`}><DevSitePreview id={1561} preview={true} horizontal={isMobile} /></a>
            <a href={`/${locale}/dev_sites?activeDevSiteId=1361`}><DevSitePreview id={1361} preview={true} horizontal={isMobile} /></a>
=======
            {
              this.state.featuredSites.map((site, index) => {
                return(
                  <a href={`/${locale}/dev_sites?activeDevSiteId=${site.id}`} key={index}>
                    <DevSitePreview
                      id={site.id}
                      preview={true}
                      horizontal={isMobile}
                    />
                  </a>
                )
              })
            }
>>>>>>> master
          </div>
        </div>
        <div className={css.articleContainer}>
          <Carousel>
            <a title={'Go to Milieu\'s article of Zoning 101'} href='https://medium.com/@MilieuCities/zoning-101-a88c1e397455#.du6yt0qgk' target='_blank' className={css.article}>
              <img src={require('./images/zoning.jpeg')}/>
              <div className={css.type}>{i18n.article}</div>
              <h2 className={css.title}>{i18n.title1}</h2>
              <div className={css.summary}>{i18n.summary1}</div>
            </a>
            <a title={'Go to Milieu\'s article of Whose streets are we planning?'} href='https://medium.com/@MilieuCities/whose-streets-are-we-planning-88f3ed1bc613#.hv858aafk' target='_blank' className={css.article}>
              <img src={require('./images/street-planning.jpeg')}/>
              <div className={css.type}>{i18n.article}</div>
              <h2 className={css.title}>{i18n.title2}</h2>
              <div className={css.summary}>{i18n.summary2}</div>
            </a>
            <a title={'Go to Milieu\'s article of What we learned from pop-up engagement'} href='https://medium.com/@MilieuCities/what-we-learned-from-pop-up-engagement-65cec34fefde#.l84ns3xc6' target='_blank' className={css.article}>
              <img src={require('./images/pop-up-engagement.jpeg')}/>
              <div className={css.type}>{i18n.article}</div>
              <h2 className={css.title}>What we learned from pop-up engagement</h2>
              <div className={css.summary}>Milieu’s on-going goal is to facilitate a human-centered approach to urban planning and development.</div>
            </a>
          </Carousel>
        </div>
      <Footer/>
      </div>
    )
  }
}

document.addEventListener('turbolinks:load', () => {
  const home = document.querySelector('#home');
  home && render(<Home/>, home)
})
