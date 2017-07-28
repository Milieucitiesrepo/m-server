import LocalizedStrings from 'react-localization';

const i18n = new LocalizedStrings({
  en:{
    messageSent: "Message successfully sent!",
    mustSign: "Must sign in to like a development site.",
    openForComments: "Open for Comments",
    committee: "Committee of Adjustment",
    share: "Share",
    devId: "File Number",
    appType: "Application Type",
    ward: "Ward",
    wardName: "Ward Name",
    status: "Status",
    comments: "Comments",
    description: "Description",
    view: "View",
    hide: "Hide",
    file: "Attached Files",
    urbanPlanner: "Urban Planner",
    councillor: "Councillor",
    name: "Name",
    email: "Email",
    message: "Message",
    notices: 'Notices',
    attachments: 'Attachments',

  },
  fr: {
    messageSent: "Message envoyé avec succès!",
    mustSign: "Vous devez vous connecter pour continuer.",
    openForComments: "Ouvert(e) à commentaires",
    committee: "Committee of Adjustment",
    share: "Partager",
    devId: "Demande no",
    appType: "Type de demande",
    ward: "Quartier",
    wardName: "Nom du quartier",
    status: "État d’avancement",
    comments: "Commentaires",
    description: "Description",
    view: "Afficher", //TODO: Double check!
    hide: "Masquer",
    file: "Pièces jointes",
    urbanPlanner: "Urbanisme",
    councillor: "Conseiller",
    name: "Prénom",
    email: "Courriel",
    message: "Message"
  }
});

export default i18n;
