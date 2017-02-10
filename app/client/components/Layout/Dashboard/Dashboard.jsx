import React, { Component } from 'react'
import { render } from 'react-dom'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import ProfileHeader from './ProfileHeader/ProfileHeader'
import ProfileMenu from './ProfileMenu/ProfileMenu'
import Loader from '../../Common/Loader/Loader'
import css from './dashboard.scss'

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { loading, children, activeComponent } = this.props;
    return(
      <div>
        <Header/>
        <ProfileHeader active={activeComponent} />
        <div className={css.container}>
          <div className='container'>
            <ProfileMenu active={activeComponent} />
            <Loader loading={loading} />
            {children}
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}
