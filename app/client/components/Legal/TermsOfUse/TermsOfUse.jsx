import React, { Component } from 'react'
import { render } from 'react-dom'
import Header from '../../Layout/Header/Header'
import Footer from '../../Layout/Footer/Footer'
import css from './terms.scss'

export default class TermsOfUse extends Component {
  render() {
    return(
      <div className={css.root}>
        <Header />
        <div className='container'>
          <a href='/en'><i className='fa fa-long-arrow-left'></i> Back</a>
          <h1>Terms of Use</h1>
          <h2>1. Introduction</h2>
          <ul>
            <li>1. These terms are a contract between you and Milieu.</li>
            <li>2. Your use of Milieu is conditional upon your acceptance of our terms of use.</li>
            <li>3. If you disagree with any of the terms, you cannot use Milieu.</li>
            <li>4. Please read the terms carefully.</li>
          </ul>
          <h2>2. Creating an Account</h2>
          <ul>
            <li>1. By creating a Milieu account, you agree to authenticate yourself with your real name and identity.</li>
            <li>2. You will not provide any false personal. information on Milieu, or create an account for anyone other than yourself without permission.</li>
            <li>3. You will not create more than one personal account.</li>
          </ul>
          <h2>3. Posting on Milieu</h2>
          <ul>
            <li>1. By posting content on Milieu you grant Milieu a non-exclusive and royalty free license to reproduce and publicly display your user content for any purpose.</li>
            <li>2. Content you post on Milieu represents your opinion and your opinion alone.</li>
            <li>3. Milieu is not responsible for any reliance or liability that may arise from content you post on Milieu.</li>
            <li>4. You will not post content containing offensive or hateful language.</li>
            <li>5. You will not post content or take any action on Milieu that infringes or violates someone else's rights or otherwise violates the law.</li>
            <li>6. We can remove any content or information you post on Milieu for any reason.</li>
          </ul>
          <h2>4. Respecting the Integrity of our Platform</h2>
          <ul>
            <li>1. You will not use our service to spread spam.</li>
            <li>2. You will not use our service for phishing or to distribute content which would compromise the security of someone else’s computer.</li>
            <li>3. You will not attempt to disrupt Milieu’s internal service or tamper with our API.</li>
          </ul>
          <h2>5. Intellectual Property</h2>
          <ul>
            <p>1. Milieu reserves all intellectual property related to its API, processes, methodologies and collateral materials.</p>
            <p>2. Public feedback through the consultation process or participation in the application will result in data collection that is specific to the proposed development under consideration. This data shall be the intellectual property of Milieu Technologies Ltd. Any publication by Milieu of data, conclusions or analysis arising from this consultation shall be at the discretion of Milieu.</p>
          </ul>
          <h2>6. Disclaimer of Warranty</h2>
          <ul>
            <li>1. Milieu is provided “as is” with no warranties, express or implied. Milieu comes with no warranty of merchantability, fitness for a particular purpose, security, non-infringement or title.</li>
          </ul>
          <h2>7. Limitation of Liability</h2>
          <ul>
            <li>1. Milieu is not liable for any loss or damages which may arise directly, or indirectly through the use of our service. This includes, but it not limited to, general, pecuniary and exemplary damages.</li>
            <li>2. To the maximum extent allowed by law, this limitation of liability will apply in all circumstances, whether the liability claim is based in statute, tort, or contract.</li>
          </ul>
          <h2>8. Severability</h2>
          <ul>
            <li>1. If any provision of these terms is found invalid by a court of law, the other provisions of the Terms will remain in full effect.</li>
            <li>2. If Milieu chooses not to exercise a term, that does not waive the term.</li>
          </ul>
          <h2>9. Change of Terms</h2>
          <ul>
            <li>1. Milieu can change the Terms of Use at any times.&nbsp;&nbsp;We will provide notice of changes to the terms of use by updating this terms document.&nbsp;&nbsp;You should check this&nbsp;terms document regularly for changes. If you do not agree to any change of terms, you must stop using Milieu.</li>
          </ul>
          <h3>Change Log</h3>
          <ul>
            <li>August 17, 2016: Updated our Terms of Use.</li>
          </ul>
        </div>
        <Footer />
      </div>
    );
  }
}

document.addEventListener('turbolinks:load', () => {
  const terms = document.querySelector('#terms_of_use')
  terms && render(<TermsOfUse/>, terms)
})
