import LocalizedStrings from 'react-localization';

const i18n = new LocalizedStrings({
  en: {
    communityMember: 'Community Member',
    pendingVerification: 'Verified status pending',
    notVerified: 'Not Verified',
    verified: 'Verified',
    status: "Status: ",
    requestVerification: 'Get verified',
    verificationTooltip: "By verifying your account, you can gain accountability and credibility when discussing a project or participating in a consultation. Have the option of keeping your comments anonymous. Your profile must be complete in order to be verified."
  },
  fr: {
    communityMember: 'Membre du Communauté',
    pendingVerification: 'En attente de vérification',
    notVerified: 'Non Verifié',
    verified: 'Verifié',
    status: "Etat: ",
    requestVerification: 'Demande de vérification'
  }
});

export default i18n;
