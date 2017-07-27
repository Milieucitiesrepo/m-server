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

    const firstTitle = "1.1. Usage temporaire de l'ancien complexe Gaston-Bourret";
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
              <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
              RDC espace public ouvert polyvalent (murs et cloisons retirés)
              Étages: espaces educatifs
            </div>
            <EmojiiSlider/>
          </div>

        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
            </div>
            Bureaux co-working
            <EmojiiSlider />
          </div>
        </div>
        <div className="row">
          <div className={css.question}>
            Commerces

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
            </div>
            Espace à usage pluriel

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            Friche artistique-studios

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            Espace recherche scientifique

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            Café

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            Bureaux

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            Espaces verts et jardins potagers

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            Bâtiments fermés au public pour réhabilitation

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            Maison du projet (accueil/ exposition)

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
            Jardinières mobiles

          </div>
          <EmojiiSlider />
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            Stands restauration rapide / stand glacier

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            Espace camionnettes restauration - Food truck

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            Aire de jeux enfants

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            Parasols géants

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            Espace skateboard

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            Mur végétal anti-bruit

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            Surfaces peintes toiles géantes pour artistes

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            Jardins potagers dans jardinières mobiles

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            Trellis avec hamacs

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            Mobilier urbain reconfigurable

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
            Jardinières mobiles

          </div>
          <EmojiiSlider />
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            Stands restauration rapide / stand glacier

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            Espace camionnettes restauration - Food truck

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            Aire de jeux enfants

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            Parasols géants

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            Espace skateboard

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            Mur végétal anti-bruit

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            Surfaces peintes toiles géantes pour artistes

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            Jardins potagers dans jardinières mobiles

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            Trellis avec hamacs

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            Mobilier urbain reconfigurable

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
            Jardinières mobiles

          </div>
          <EmojiiSlider />
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            Stands restauration rapide / stand glacier

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            Espace camionnettes restauration - Food truck

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            Aire de jeux enfants

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            Parasols géants

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            Espace skateboard

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            Mur végétal anti-bruit

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            Surfaces peintes toiles géantes pour artistes

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            Jardins potagers dans jardinières mobiles

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            Trellis avec hamacs

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            Mobilier urbain reconfigurable

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
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            Jardinières mobiles

          </div>
          <EmojiiSlider />
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            Stands restauration rapide / stand glacier

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            Espace camionnettes restauration - Food truck

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            Aire de jeux enfants

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            Parasols géants

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            Espace skateboard

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            Mur végétal anti-bruit

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            Surfaces peintes toiles géantes pour artistes

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            Jardins potagers dans jardinières mobiles

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            Trellis avec hamacs

          </div>
          <EmojiiSlider />
        </div>
        <div className="row">
          <div className={css.question}>
            <div className={css.colorCircle}>
                <div className={css.circle} style={{ background: 'orange' }} >
                </div>
              </div>
            Mobilier urbain reconfigurable

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
