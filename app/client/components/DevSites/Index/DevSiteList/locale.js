import LocalizedStrings from 'react-localization';

const i18n = new LocalizedStrings({
  en:{
    cantFind: 'Can\'t find what you are looking for?',
    suggestCity: 'Suggest a city to add to our dataset.',
    cityRequestS: "Thank you for requesting a city.",
    cityRequestF: "An error occured while attempting to save your city request. Refresh the page and try again."
  },
  fr: {
    cantFind: 'Vous n\'arrivez pas à trouver ce que vous cherchez?',
    suggestCity: 'Suggérer une ville à ajouter à notre base de données.',
    cityRequestS: "Merci d'avoir demandé une ville.",
    cityRequestF: "Une erreur s'est produite lors de la tentative d'enregistrement de votre demande de ville. Veuillez rafraîchir la page et essayer à nouveau.",
  }
});

export default i18n;
