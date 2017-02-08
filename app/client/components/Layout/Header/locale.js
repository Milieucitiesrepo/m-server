import LocalizedStrings from 'react-localization';

const i18n = new LocalizedStrings({
  en:{
    map: 'Map',
    about: 'About',
    logIn: 'Log In',
    logOut: 'Log Out'
  },
  fr: {
    map: 'Carte',
    about: 'À Propos',
    logIn: 'Connexion',
    logOut: 'Deconnexion'
  }
});

export default i18n;
