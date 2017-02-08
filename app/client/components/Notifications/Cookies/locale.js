import LocalizedStrings from 'react-localization';

const i18n = new LocalizedStrings({
  en:{
    text1: "We use cookies to ensure you get the best experience on our website. Please read our ",
    text2: " to find out more.",
    privacy: "Privacy Policy"
  },
  fr: { //TODO: Double check!
    text1: "Nous utilisons des cookies pour vous assurer d'avoir la meilleure expérience sur notre site. ",
    text2: "",
    privacy: "politique de confidentialité"
  }
});

export default i18n;
