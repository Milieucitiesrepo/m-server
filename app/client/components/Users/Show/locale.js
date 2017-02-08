import LocalizedStrings from 'react-localization';

const i18n = new LocalizedStrings({
  en:{
    dashboard: 'Dashboard',
    edit: 'EDIT',
    recentComments: 'Recent Comments',
    noComment: 'You have not submitted a comment yet.'
  },
  fr: {
    dashboard: 'Tableau de bord',
    edit: 'modifier',
    recentComments: 'Commentaires récentes',
    noComment: 'Vouz n’avez pas publier de commentaire.'
  }
});

export default i18n;
