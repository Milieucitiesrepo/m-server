import React, { Component } from 'react'
import { render } from 'react-dom'
import css from './css/noumea.scss'
import Header from './Header'
import MobileFooter from './MobileFooter'
import { debounce, uniqueId } from 'lodash'

export default class Noumea extends Component {
  constructor() {
    super()
    this.state = { loading: true, isMobile: (window.innerWidth < 600) };
    this.devSiteId = document.querySelector('#noumea').dataset.id;
    this.surveySentiment = document.querySelector('#noumea').dataset.surveySentiment;
    window.addEventListener('resize',
      debounce(() => {
        this.setState({ isMobile: (window.innerWidth < 600) })
      }, 100)
    );
  }

  render() {
    const {  isMobile } = this.state;

    return (
      <div className={css.container}>
        { !isMobile &&
          <Header />
        }
          <div className="row">
            <div className= {css.logoContainer}>
              <a href="https://www.noumea.nc">
                <img
                src={require(`./images/logo-noumea.jpg`)}
                />
              </a>
              <a href="http://www.province-sud.nc/">
                <img
                  src={require(`./images/logo-provincesud.png`)}
                />
              </a>
              <a href="https://gouv.nc/">
                <img
                src={require(`./images/logo-nc.png`)}
              />
              </a>
          </div>
          <div className={css.description}>
                <h1>ENTRÉE NORD</h1>
                <h3>Un projet collaboratif de concertation citoyenne pour la nouvelle entrée nord du centre-ville de Nouméa</h3>
            </div>
          </div>

      <div className={css.introContainer}>
      <div className={css.videoContainer}>
        <iframe src="https://www.youtube.com/embed/cBkWhkAZ9ds?rel=0&amp;showinfo=0" allowFullScreen></iframe>
      </div>

      <div className={css.visionContainer}>
        <div className={css.introText}>
          <h2>VISION POUR L'ENTRÉE NORD</h2>
          <h3>Proposition de scénario d'aménagement</h3>
          <p>
            L’entrée nord du centre ville de Nouméa est une zone caractérisée par l'ancien Centre Hospitalier Territorial Gaston-Bourret, son parking et la voie express #1. C’est actuellement un no man’s land, coupé du littoral et du centre ville pourtant si proches, qui marque la baie de la Grande Rade d'un aspect désertique, vide et fantôme... Une baie jusque là délaissée, alors que son panorama est la première image de Nouméa que perçoivent la plupart des visiteurs. Une baie ignorée alors qu’elle est adjacente à deux sources majeurs de l’économie néo-caledonienne: la Société Le Nickel et le Port Autonome de la Nouvelle Calédonie.
          </p>
          <p>
            Et si cela changeait? Quel serait l'impact sur l'entrée nord et ses environs immédiats? Sur Nouméa et ses habitants? Enfin, sur  la Nouvelle-Calédonie?
          </p>
          <p>
          Nous proposons de developper une vision partagée pour l’entrée nord en tant que passerelle autant physique que symbolique: reliant le coeur de ville à la mer, les croisiéristes et touristes à la culture néo-calédonienne, et les populations nouméennes entre elles.
          </p>
          <p>
            Ces efforts seront menés par l’architecte urbaniste Aziza Chaouni, accompagnée de la SCET et de toutes les parties prenantes concernées par le projet.
          </p>
        </div>

      <div className={css.themeContainer}>
          <div className={css.theme}>
            <h2>Thématiques</h2>

            <img src={require('./images/theme-immediat-m.svg')} alt="Usage immédiat du CHT Gaston-Bourret et de son parking: Prenez part à la première étape de la transformation de l’entrée nord !"
              />
            <img src={require('./images/theme-circulations-m.svg')} alt="Circulations: Donnez votre avis sur notre proposition de reorganisation des flux véhicules, piétons, bicyclettes, bus, néobus et petit train autour de l’entrée nord ! "
              />
            <img src={require('./images/theme-public-m.svg')} alt="Espaces publics et espaces verts: Proposez des espaces publics et espaces verts qui auront la capacité d’améliorer votre qualité de vie !"
              />
            <img src={require('./images/theme-bati-m.svg')} alt="Bâti: Partagez vos opinions au sujet des bâtiments neufs ou à rénover que nous suggérons pour l’entrée nord ! "
              />
          </div>
      </div>
    </div>


    <div className={css.aboutContainer}>
      <h2>À propos du projet de concertation citoyenne</h2>
        <div>
            <p>
              Votre participation peut influencer les futurs aménagements de votre ville, et en l'occurence la vision urbaine de l'entrée nord. La période de concertation grâce à ce site web se déroulera du 31 Juillet à fin Octobre.
            </p>
        <div className={css.timelineContainer}>
            </div>
            <img
              src={require(`./images/timeline.svg`)} alt="L'engagement civique est crucial. Vous pouvez donner votre avis sur l'avenir de votre ville durant des consultations publiques ou bien en utilisant ce site web initié par la municipalité de Nouméa."
            />
    </div>
            <p>
              Le calendrier de l'exposition sera bientôt affiché. Vous pourrez y laisser votre avis, qui sera immédiatement transmis au site web.
            </p>
      </div>
          </div>

            <div className={css.partnersContainer}>
            <h2>les partenaires</h2>
              <div className={css.partnersLogoContainer} >
                <a href="http://www.azizachaouniprojects.com/">
                  <img
                    src={require(`./images/logo-acp.svg`)}
                  /></a>

                <a href="http://www.caissedesdepots.fr/">
              <img
                    src={require(`./images/logo-scet.png`)}
                  />
              </a>
              <a href="https://milieu.io/"><img
                src={require(`./images/logo-milieu.png`)}
              /></a>
            </div>
          </div>
          { isMobile &&
            <MobileFooter />
            }
        </div>
    )
  }
}

document.addEventListener('turbolinks:load', () => {
  const noumea = document.querySelector('#noumea');
  noumea && render(<Noumea/>, noumea)
})
