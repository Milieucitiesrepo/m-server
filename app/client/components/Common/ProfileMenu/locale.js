import LocalizedStrings from 'react-localization';

const i18n = new LocalizedStrings({
  en:{
    dashboard: 'Dashboard',
    settings: 'Account Settings',
    notification: 'Notifications',
  },
  fr: {
    dashboard: 'Tableau de bord',
    settings: 'Paramètres du compte',
    notification: 'Notifications',
  }
});

export default i18n;