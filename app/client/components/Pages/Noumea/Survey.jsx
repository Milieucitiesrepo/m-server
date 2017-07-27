import React, { Component } from 'react'
import { render } from 'react-dom'
import css from './css/survey.scss'
import _ from 'lodash'
import { RIETextArea } from 'riek'
import EmojiiSlider from './EmojiiSlider'
import { debounce } from 'lodash'
import SurveyTitleMap from './SurveyTitleMap'
import MobileFooter from './MobileFooter'
import AnswerForm from './AnswerForm'
import Header from './Header'
import { ShareButtons, generateShareIcon } from 'react-share';

const { FacebookShareButton, TwitterShareButton } = ShareButtons;
const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');

export default class Survey extends Component {

  constructor(props) {
    super(props);
    this.state = {
      participantId: '',
      questionSet: [],
      isMobile: (window.innerWidth < 600)
    };
    this.handleSubmit = () => this.handleSubmit();
    window.addEventListener('resize',
      debounce(() => {
        this.setState({ isMobile: (window.innerWidth < 600) })
      }, 100)
    );
  }

  handleSubmit() {
    preventDefault(e);
    $.ajax({
      url: this.props.url,
      dataType: 'JSON',
      type: 'POST',
      data: answers,
      success: function(data) {
        this.setState({data: data});
        console.log("Added data", data)
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  render() {
    const { isMobile } = this.state;

    const firstTitle = "1.1 Usage temporaire de l'ancien complexe Gaston-Bourret";
    const secondTitle= "1.2 Usage temporaire du parking et du terrain vague adjacent";
    const thirdTitle= "Circulations";
    const fourthTitle = "Espaces publiques/ espaces verts";
    const fifthTitle = "Bâti";

    const firstDescription = "L’ancien site de l’hôpital Gaston-Bourret est composé de 26 bâtiments,\
      dont trois sont voués à la démolition, et un, en préfabriqué, au démantèlement.\
       Nous proposons que les bâtiments à haute valeur patrimoniale ne soit pas utilisés durant la phase temporaire,\
       durant laquelle ils subiront une expertise à des fins de restauration.\
       A l’opposé, les autres bâtiments recevront  selon leur état des programmes adéquats .";

   const secondDescription = "Coincé entre le mur de soutènement de l’ancien hôpital et la voie express 1, le parking Gaston-Bourret est peu utilisé.\
      Son manque d’ombrage et de verdure ainsi que sa surface en asphalte qui capte la chaleur, le rendent peu hospitalier. Cependant, grâce à divers mobiliers urbains, à des auvents, \
      à l’introduction de végétation et à l’impulse d’événements culturels ponctuels, le parking peut devenir très rapidement non seulement un espace publique à l’excellent\
      confort thermique, mais aussi un lieu dynamique où diverses cultures urbaines peuvent de rencontrer et s’exprimer.  Nous proposons de placer, de manière provisoire, \
      le terminus de bus (réseau RAI et bus Karai) présentement localisé sur le site du Port Moselle, ainsi qu'un parking sur le terrain vague à l’ouest du parking de l’ancien CHT Gaston-Bourret.";

    const thirdDescription = "La voie express 1 et la voie camion SLN longeant le front de mer contribuent à couper l’entrée nord u littoral et de la Grande Rade.\
      Cette coupure est accentuée par le fait que le complexe hospitalier est surélevé de 5 m par rapport au niveau de l’entrée nord, ses murs de soutènement au \
      est et ouest, empêchant tout accès piéton.\
      Afin de remédier à l’isolement de l’entrée nord nous avons proposé trois strategies principales:\
      > Le déplacement de la voie express #1 vers le périmètre nord de l’ancien complexe hospitalier. \
      > Le déplacement de la voie camion SLN sur la voie express #1 selon un horaire prédéfini (hors heure de pointe)\
      > La création d’une large passerelle végétalisée qui mènerait de l’ancien complexe hospitalier vers le nouveau front de mer et son parc botanique. \
      > Le renforcement de l’axe piéton nord-sud menant de la place des Cocotiers vers le front de mer. ";

    const fourthDescription = "Notre vision pour l’entrée nord à l’échelle du centre ville et de ses environs urbains vise à la désenclaver et à l’ouvrir non\
      seulement vers le littoral mais aussi vers quatre espaces publiques clefs, desquelles elle deviendra le coeur battant.\
      En effet, l’entrée nord se trouve à la croisée de 4 espaces publiques majeurs du centre ville: un existant, la place des Cocotiers, un en cours de \
      développement, le Quai Ferry, et deux que deux nouveaux espaces verts que nous souhaitons créer:\
      Le parc en terrasse SLN, qui comprendra des aires de loisirs passifs, une voie cyclables, des allées piétonnes, \
      un parking en surface vert et durable, le terminal ferry et un nouveau musée maritime avec \
      Le parc linéaire avenue James Cook Nous proposons que l’entrée nord devienne le fil conducteur reliant ces\
      4 espaces publiques. Pour ce faire nous souhaitons lui donner une identité unique: celle de jardin botanique vivant\
      représentant les diverses essences végétales et agricoles caractéristiques des communautés qui ont fait la richesse culturelle de la Nouvelle Calédonie. \
      Ces communautés seront amenées à participer à la création et au développement continu de ce parc botanique. ";

    const fifthDescription = "Une fois l’entrée nord re-aménagée, de manière temporaire puis de manière définitive, la partie nord du centre ville s’en verra\
      totalement transformée et deviendra un lieu de residence et de loisir prisé. Donc, l’aménagement des enveloppes et des programmations du bâtit doit être \
      calibré avec finesse afin de mettre en valeur et rehausser les espaces publiques et les espaces verts proposés. Le bâtit doit aussi contribuer à établir une \
      nouvelle identité de la ville de Nouméa, dont la facade avant et le skyline sont actuellement dominés par la tour Beef. Enfin, le bâtit doit être pensé de manière\
      bioclimatique afin qu’il contribue au confort thermique autant de ses alentours que de ses intérieurs, en privilégiant les techniques de ventilation et de déshumidication passives.\
      Ainsi, nous avons proposé des bâtiments nouveaux ainsi que des bâtiments réhabilités.";


      const firstMap = './images/survey-map-immediat-1.png';
      const secondMap = './images/survey-map-immediat-2.png';
      const thirdMap = './images/survey-map-circulations.png';
      const fourthMap = './images/survey-map-public.png';
      const fifthMap = './images/survey-map-bati.png';

    const firstNote = "Notez les differents programmes que nous proposons!";
    const secondNote = "Notez les differents programmes que nous proposons! Donnez nous votre avis sur chacun!";
    const thirdNote = "Notez les differents modes de circulations que nous proposons + donnez nous votre avis sur chacun!";
    const fourthnote = "3.1 Que pensez vous du placement et des identités de chaque espace vert/espace publique que nous proposons?";
    const fifthNote = "Que pensez vous de la programmation des espaces bâtits que nous proposons?";

    const survey1q1 = "RDC espace public ouvert polyvalent (murs et cloisons retirés) Étages: espaces educatifs";
    const survey1q2 = "Bureaux co-working";
    const survey1q3 = "Commerces";
    const survey1q4 = "Espace à usage pluriel";
    const survey1q5 = "Friche artistique-studios";
    const survey1q6 = "Espace recherche scientifique";
    const survey1q7 = "Café";
    const survey1q8 = "Bureaux";
    const survey1q9 = "Espaces verts et jardins potagers";
    const survey1q10 = "Bâtiments fermés au public pour réhabilitation";
    const survey1q11 = "Maison du projet (accueil/ exposition)";

    const survey2q1 = "Jardinières mobiles";
    const survey2q2 = "Stands restauration rapide / stand glacier";
    const survey2q3 = "Espace camionnettes restauration - Food truck";
    const survey2q4 = "Aire de jeux enfants";
    const survey2q5 = "Parasols géants";
    const survey2q6 = "Espace skateboard";
    const survey2q7 = "Mur végétal anti-bruit";
    const survey2q8 = "Surfaces peintes toiles géantes pour artistes";
    const survey2q9 = "Zones vertes créées par percement de l’asphalte et zones pique-nique";
    const survey2q10 = "Espace marchés éphémères (parvis + tables)";
    const survey2q11 = "Jardins potagers dans jardinières mobiles";
    const survey2q12 = "Trellis avec hamacs";
    const survey2q13 = "Mobilier urbain reconfigurable";

    const survey3q1 = "Voie express #1 déplacée";
    const survey3q2 = "Voie Néobus retracée et réaménagée + stations";
    const survey3q3 = "Voie Karai bus + stations";
    const survey3q4 = "Voie bus + station SMTI";
    const survey3q5 = "Voie tchou-tchou train";
    const survey3q6 = "Voie cyclable + Vélib";
    const survey3q7 = "Voie piétonne";
    const survey3q8 = "Connections piétonne";
    const survey3q9 = "Passerelle végétalisée principale";
    const survey3q10 = "Parking verticaux vertes (P.V.V.)";

    const survey4q1 = "Bâtiment multifonctionnel (École de danse, bureaux, hôtel, ...)";
    const survey4q2 = "Résidentiel avec commerce au RDC";
    const survey4q3 = "Parking verticaux vertes (avec commerce, sports ou culture)";
    const survey4q4 = "Bureaux";
    const survey4q5 = "Espaces à usage collectif";
    const survey4q6 = "Terminal croisiéristes";
    const survey4q7 = "Musée Maritime de Nouvelle-Calédonie avec son pavillon flottant";

    return (
      <div className="container">
        { !isMobile &&
          <Header />
        }
        <div className="row">
          <div className="col-xs-3 col-md-4 icons">
            { isMobile &&
              <img
                src={require(`./images/theme-immediat.svg`)}
                width="45px"
                height="45px"
             />
            }
            {
              !isMobile &&
              <img
                src={require(`./images/theme-immediat.svg`)}
                width="85px"
                height="85px"
             />
            }
            <FacebookShareButton
              url="/participez"
              title="Un projet collaboratif de concertation citoyenne pour la nouvelle entrée nord du centre-ville de Nouméa"
              media={require(`./images/theme-immediat.svg`)}
            >
              <FacebookIcon size={32} round />
              </FacebookShareButton>
              <TwitterShareButton
                url="/participez"
                title="Un projet collaboratif de concertation citoyenne pour la nouvelle entrée nord du centre-ville de Nouméa"
                media={require(`./images/theme-immediat.svg`)}>
                <TwitterIcon size={32} round />
              </TwitterShareButton>
              <a href="mailto:webmaster@example.com">
                <i className="fa fa-envelope-o fa-2x" aria-hidden="true"></i>
              </a>
          </div>
        </div>
        <SurveyTitleMap
          description={firstDescription}
          map={firstMap}
          title={firstTitle}
          notes={firstNote}
        />

      {/* 1 First Survey */}

        <div className={css.forms}>
          <div className="row">
            <div className={css.question}>
                <img
                  src={require(`./images/q1-1-1.svg`)}
                  />
              </div>
              {survey1q1}
            <EmojiiSlider/>
          </div>

        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
            </div>
            {survey1q2}
            <EmojiiSlider />
          </div>
        </div>
        <div className="row">
          <div className={css.question}>
            {survey1q3}

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
            </div>
            {survey1q4}

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            {survey1q5}

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            {survey1q6}

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            {survey1q7}

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            {survey1q8}

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            {survey1q9}

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            {survey1q10}

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            {survey1q11}

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.comments}>
            <AnswerForm />
          </div>
        </div>
      </div>

      <SurveyTitleMap
        description={secondDescription}
        map={secondMap}
        title={secondTitle}
        notes={secondNote}
      />

      {/* 2 Survey */}
      <div className={css.forms} name="second" ref="second">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            {survey2q1}

          </div>
          <EmojiiSlider />
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            {survey2q2}

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            {survey2q3}

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            {survey2q4}

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            {survey2q5}

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            {survey2q6}

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            {survey2q7}

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            {survey2q8}

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            {survey2q9}

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            {survey2q10}

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            {survey2q11}

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            {survey2q12}

          </div>
          <div className="row">
            <div className={css.question}>
              <div className={css.colorCircle}>
                  <div className={css.circle} style={{ background: 'orange' }} >
                  </div>
                </div>
              {survey2q13}

            </div>
            <EmojiiSlider />
          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.comments}>
            <AnswerForm />
          </div>
        </div>
      </div>

      <SurveyTitleMap
        description={thirdDescription}
        map={thirdMap}
        title={thirdTitle}
        notes={thirdNote}
      />

      {/* 3 Survey */}

      <div className={css.forms}>
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            {survey3q1}

          </div>
          <EmojiiSlider />
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            {survey3q2}

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            {survey3q3}

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            {survey3q4}

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            {survey3q5}

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            {survey3q6}

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            {survey3q7}

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            {survey3q8}

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            {survey3q9}

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            {survey3q10}

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.comments}>
            <AnswerForm />
          </div>
        </div>
      </div>


      <SurveyTitleMap
        description={fourthDescription}
        map={fourthMap}
        title={fourthTitle}
        notes={fourthnote}
      />

      {/* 4 Survey */}

      <div className={css.forms}>
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            {survey4q1}

          </div>
          <EmojiiSlider />
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            {survey4q2}

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            {survey4q3}

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            {survey4q4}

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            {survey4q5}

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            {survey4q6}

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            {survey4q7}

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            {survey4q8}

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            {survey4q9}

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            {survey4q10}

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            {survey4q11}

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            {survey4q12}

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.comments}>
            <AnswerForm />
          </div>
        </div>
      </div>
      <SurveyTitleMap
        description={fifthDescription}
        map={fifthMap}
        title={fifthTitle}
        notes={fifthNote}
      />

    {/* 5 Survey */}

    <div className={css.forms}>
      <div className={row}>
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            {survey5q1}

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            {survey5q2}

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            {survey5q3}

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            {survey5q4}

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            {survey5q5}

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            {survey5q6}

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            {survey5q7}

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.comments}>
            <AnswerForm />
          </div>
        </div>
      </div>
      { isMobile &&
        <MobileFooter  />
      }
  </div>
    );
  }
}


document.addEventListener('turbolinks:load', () => {
  const survey = document.querySelector('#survey');
  survey && render(<Survey />, survey)
})
