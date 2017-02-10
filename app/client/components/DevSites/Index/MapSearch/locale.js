import LocalizedStrings from 'react-localization';

const i18n = new LocalizedStrings({
  en:{
    search: "Search",
    address: "Address",
    year: "Year",
    ward: "Ward",
    status: "Status",
    city: "City"

  },
  fr: {
    search: "Chercher",
    address: "Adresse",
    year: "An",
    ward: "Quartier",
    status: "Statut",
    city: "Ville"

  }
});

export default i18n;
