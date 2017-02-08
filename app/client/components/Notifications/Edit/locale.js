import LocalizedStrings from 'react-localization';

const i18n = new LocalizedStrings({
  en:{
    role: 'COMMUNITY MEMBER',
    dashboard: 'Dashboard',
    settings: 'Account Settings',
    notification: 'Notification',
    save: 'SAVE',
    notifications: 'Notifications',
    emailQ1: 'When would you like to receive emails from us?',
    emailQ1S1: 'When there is a new development in your area',
    emailQ1S2: 'Milieu newsletter and company updates',
    notiUpdateS: 'Notification updated successfully',
    notiUpdateF: 'Failed to save notification changes'
  },
  fr: {
    role: 'membre du communauté',
    dashboard: 'Tableau de bord',
    settings: 'Paramètres du compte',
    notification: 'Notification',
    save: 'sauvegarder',
    notifications: 'Notifications',
    emailQ1: 'Quand préférez-vous recevoir nos courriels?',
    emailQ1S1: 'Quand il y a un nouveau développement dans votre quartier',
    emailQ1S2: 'Bulletin de Milieu avec nouvelles de la compagnie',
    notiUpdateS: 'Notifications mises à jour',
    notiUpdateF: 'Changements de notifications échoués'
  }
});

export default i18n;
