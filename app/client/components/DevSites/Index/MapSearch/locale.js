import LocalizedStrings from 'react-localization';

const i18n = new LocalizedStrings({
  en:{
    search: "Search",
    address: "Address",
    year: "Year",
    ward: "Ward",
    status: "Status"

  },
  fr: {
    search: "Chercher",
    address: "Adresse",
    year: "An",
    ward: "Quartier",
    status: "Statut"
  }
});

export default i18n;
