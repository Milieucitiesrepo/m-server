import LocalizedStrings from 'react-localization';

const i18n = new LocalizedStrings({
  en:{
    messageSent: "Message successfully sent!",
    messageNotSent: "Your message was not sent, please try again.",
    mustSign: "Must sign in to like a development site.",
    openForComments: "Open for Comments",
    committee: "Committee of Adjustment",
    share: "Share",
    devId: "Development Id",
    ward: "Ward",
    status: "Status",
    description: "Description",
    view: "View ",
    hide: "Hide ",
    file: " attached files",
    urbanPlanner: "Urban Planner",
    councillor: "Councillor",
    name: "Name",
    email: "Email",
    message: "Message",
    notices: 'Notices',
    attachments: 'Attachments',
    contact: "Contact",
    emailCouncillor: "Email the Councillor",
    emailUrbanPlanner: "Email the Urban Planner",
    projectDescription: 'Project Description',
    projectTimeline: 'Project Timeline'
  },
  fr: {
    messageSent: "Message envoyé avec succès!",
    messageNotSent: "Votre message n'a pas été envoyé, veuillez essayer de nouveau",
    mustSign: "Vous devez vous connecter pour continuer.",
    openForComments: "Ouvert(e) à commentaires",
    committee: "Committee of Adjustment",
    share: "Partager",
    devId: "Demande no",
    ward: "Quartier",
    status: "État d’avancement",
    description: "Description",
    view: "Afficher ", //TODO: Double check!
    hide: "Masquer ",
    file: " Pièces jointes",
    urbanPlanner: "Urbaniste",
    councillor: "Conseiller",
    name: "Prénom",
    email: "Courriel",
    message: "Message",
    contact: "Contacter",
    emailCouncillor: "Contacter le(la) Conseiller(ère)",
    emailUrbanPlanner: "Contacter l'Urbaniste",
    projectDescription: 'Project Description',
    projectTimeline: 'Project Timeline'
  }
});

export default i18n;
