import React, { Component } from 'react'
import { render } from 'react-dom'
import Header from '../../Layout/Header/Header'
import Footer from '../../Layout/Footer/Footer'
import css from './privacy.scss'
import i18n from './locale'

export default class Privacy extends Component {
  render() {
    i18n.setLanguage(document.body.dataset.locale);
    return(
      <div className={css.root}>
        <Header />
        <div className='container'>
          <a href='/en'><i className='fa fa-long-arrow-left'></i>Back</a>
          <h1>{i18n.header}</h1>

          <p>
            {i18n.paragraph_1}
          </p>

          <ul>
            <li>{i18n.list_1_item_1}</li>
            <li>{i18n.list_1_item_2}</li>
            <li>{i18n.list_1_item_3}</li>
            <li>{i18n.list_1_item_4}</li>
            <li>{i18n.list_1_item_5}</li>
            <li>{i18n.list_1_item_6}</li>
          </ul>

          <p>
            {i18n.paragraph_2}
          </p>

          <p>
            {i18n.paragraph_3}
          </p>

          <p>
            {i18n.paragraph_4}
          </p>

          <h2>
            {i18n.header_2}
          </h2>

          <p>
            {i18n.paragraph_5}
          </p>

          <p>
            {i18n.paragraph_6}
          </p>

          <ul>
            <li>{i18n.list_2_item_1}</li>
            <li>{i18n.list_2_item_2}</li>
            <li>{i18n.list_2_item_3}</li>
            <li>{i18n.list_2_item_4}</li>
            <li>{i18n.list_2_item_5}</li>
            <li>{i18n.list_2_item_6}</li>
            <li>{i18n.list_2_item_7}</li>
          </ul>

          <p>
            {i18n.paragraph_7}
          </p>

          <h2>
            {i18n.header_3}
          </h2>

          <p>
            {i18n.paragraph_8}
          </p>

          <ul>
            <li>{i18n.list_3_item_1}</li>
            <li>{i18n.list_3_item_2}</li>
            <li>{i18n.list_3_item_3}</li>
            <li>{i18n.list_3_item_4}</li>
            <li>{i18n.list_3_item_5}</li>
            <li>{i18n.list_3_item_6}</li>
            <li>{i18n.list_3_item_7}</li>
            <li>{i18n.list_3_item_8}</li>
            <li>{i18n.list_3_item_9}</li>
            <li>{i18n.list_3_item_10}</li>
            <li>{i18n.list_3_item_11}</li>
            <li>{i18n.list_3_item_12}</li>
            <li>{i18n.list_3_item_13}</li>
            <li>{i18n.list_3_item_14}</li>
          </ul>

          <h2>
            {i18n.header_4}
          </h2>

          <p>
            {i18n.paragraph_9}
          </p>

          <p>
            {i18n.paragraph_10}
          </p>

          <p>
            {i18n.paragraph_11}
          </p>

          <ol>
            <li>{i18n.list_4_item_1}</li>
            <li>{i18n.list_4_item_2}</li>
            <li>{i18n.list_4_item_3}</li>
            <li>{i18n.list_4_item_4}</li>
            <li>{i18n.list_4_item_5}</li>
            <li>{i18n.list_4_item_6}</li>
            <li>{i18n.list_4_item_7}</li>
          </ol>

          <p>
            {i18n.paragraph_12}
          </p>

          <p>
            {i18n.paragraph_13}
          </p>

          <h2>
            {i18n.header_5}
          </h2>

          <p>
            {i18n.paragraph_14}
          </p>

          <p>
            {i18n.paragraph_15}
          </p>

          <p>
            {i18n.paragraph_16}
          </p>

          <p>
            {i18n.paragraph_17}
          </p>

          <p>
            {i18n.paragraph_18}
          </p>

          <h2>
            {i18n.header_6}
          </h2>

          <p>
            {i18n.paragraph_19}
          </p>

          <h2>
            {i18n.header_7}
          </h2>

          <p>
            {i18n.paragraph_20}
          </p>

          <h2>
            {i18n.header_8}
          </h2>

          <p>
            {i18n.paragraph_21}
          </p>

          <p>
            {i18n.paragraph_22}
          </p>

          <p>
            {i18n.paragraph_23}
          </p>

          <h2>
            {i18n.header_9}
          </h2>

          <p>
            {i18n.paragraph_24}
          </p>

          <p>
            {i18n.paragraph_25}
          </p>

          <p>
            {i18n.address_1} <br/>
            {i18n.address_2} <br/>
            {i18n.address_3} <br/>
            {i18n.address_4}
          </p>
        </div>
        <Footer />
      </div>
    );
  }
}

document.addEventListener('turbolinks:load', () => {
  const privacy = document.querySelector('#privacy')
  privacy && render(<Privacy/>, privacy)
})
