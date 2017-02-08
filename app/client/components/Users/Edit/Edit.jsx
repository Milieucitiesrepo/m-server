import React, { Component } from 'react'
import { render } from 'react-dom'
import Header from '../../Layout/Header/Header'
import Footer from '../../Layout/Footer/Footer'
import ProfileHeader from '../../Common/ProfileHeader/ProfileHeader'
import ProfileMenu from '../../Common/ProfileMenu/ProfileMenu'
import TextInputWithLabel from '../../Common/FormFields/TextInputWithLabel'
import TextAreaWithLabel from '../../Common/FormFields/TextAreaWithLabel'
import i18n from './locale'
import css from './edit.scss'
import { debounce } from 'lodash'

export default class Edit extends Component {
  constructor(props) {
    super(props);

    this.state = { loading: true, verificationRequested: false };

    this.uploadAvatar = (e) => this._uploadAvatar(e);
    this.deleteAvatar = (e) => this._deleteAvatar(e);
    this.submitForm = (e) => this._submitForm(e);
    this.deleteAccount = (e) => this._deleteAccount(e);
    this.loadUser = () => this._loadUser();
    this.flagVerificationRequested = () => this._flagVerificationRequested();
    this.loadUser();
  }

  _loadUser() {
    $.getJSON(`/users/${document.body.dataset.userSlug}`,
      user => this.setState({ user, loading: false })
    );
  }

  _flagVerificationRequested() {
    this.setState({ verificationRequested: true })
  }

  _deleteAvatar(e) {
    const { locale, userSlug } = document.body.dataset;
    i18n.setLanguage(locale);
    const { avatarDelS, avatarDelF} = i18n;
    let form = new FormData();
    form.append('profile[remove_avatar]', true);

    this.setState({ avatarUploading: true });
    $.ajax({
      url: `/users/${userSlug}/profile`,
      dataType: 'JSON',
      type: 'PATCH',
      contentType: false,
      processData: false,
      data: form,
      success: user => {
        this.setState({ user, avatarUploading: false });
        window.flash('notice', avatarDelS);
      },
      error: error => {
        this.setState({ avatarUploading: false });
        window.flash('alert', avatarDelF)
      }
    });
  }

  _uploadAvatar(e) {
    const { locale, userSlug } = document.body.dataset;
    i18n.setLanguage(locale);
    const { profileUploadF, profileUploadS } = i18n;
    let form = new FormData();
    form.append('profile[avatar]', this.refs.avatar.files[0]);

    this.setState({ avatarUploading: true });
    $.ajax({
      url: `/users/${userSlug}/profile`,
      dataType: 'JSON',
      type: 'PATCH',
      contentType: false,
      processData: false,
      data: form,
      success: user => {
        this.setState({ user, avatarUploading: false });
        window.flash('notice', profileUploadS);
      },
      error: error => {
        this.setState({ avatarUploading: false });
        window.flash('alert', profileUploadF)
      }
    });
  }

  _submitForm(e) {
    this.setState({ verificationRequested: false })
    const form = new FormData(document.querySelector('#user-form'));
    const { locale, userSlug } = document.body.dataset;
    i18n.setLanguage(locale);
    const {profileUploadF, profileUploadS} = i18n;

    $.ajax({
      url: `/users/${userSlug}`,
      dataType: 'JSON',
      type: 'PATCH',
      contentType: false,
      processData: false,
      data: form,
      success: user => {
        this.setState({ user, error: null });
        window.flash('notice', profileUploadS);
      },
      error: error => {
        window.flash('alert', profileUploadF)
        this.setState({ error: error.responseJSON });
      }
    });
  }

  _deleteAccount() {
    const { locale, userSlug } = document.body.dataset;
    i18n.setLanguage(locale);
    const { deleteConfirm, accountDeleteS, accountDeleteF } = i18n;
    if(!confirm(deleteConfirm)){
      return false;
    }

    $.ajax({
      url: `/users/${userSlug}`,
      dataType: 'JSON',
      type: 'DELETE',
      success: () => {
        Turbolinks.visit('/');
        window.flash('notice', accountDeleteS);
      },
      error: error => {
        window.flash('alert', accountDeleteF)
      }
    });
  }

  render() {
    const { user, avatarUploading, loading, error } = this.state;
    const { userSlug, userAvatar, userName, locale } = document.body.dataset;
    i18n.setLanguage(locale);
    if(user && !user.address) user.address = {}
    return(
      <div>
        <Header/>
        <ProfileHeader
          parent={this}
          userName={userName}
          userAvatar={userAvatar}
          user={user}
          showVerificationButton={user && user.profile.verification_status === 'notVerified'}
          flagVerificationRequested={this.flagVerificationRequested}
          verificationCallback={this.loadUser}
        />
        <div className={css.container}>
          <div className='container'>
            <ProfileMenu active='settings' />
            {
              loading &&
              <div className='loading-screen'>
                <div className='spinner'>
                  <div className='bounce1'></div>
                  <div className='bounce2'></div>
                  <div className='bounce3'></div>
                </div>
              </div>
            }
            {
              !loading &&
              <div className={css.content}>
                <h2>{i18n.settings}</h2>

                <div className={css.meta}>
                  <div className={css.label}>
                    <div className={css.avatar}>
                      {avatarUploading && <div className={css.loader}><i className='fa fa-spin fa-circle-o-notch fa-3x fa-fw' /></div>}
                      {user && user.profile.avatar && <div className={css.icon} onClick={this.deleteAvatar} ><i className='fa fa-trash-o'/></div>}
                      <input type='file' ref='avatar' id='profile_avatar' onChange={this.uploadAvatar} style={{display: 'none'}} />
                      <img alt='Editable Profile Avatar' src={ user && user.profile.avatar|| require('../../Common/images/default-avatar.png')} />
                      <label htmlFor='profile_avatar' className={css.changePhoto}>{i18n.changePhoto}</label>
                    </div>
                  </div>
                  <div className={css.data}>
                    <form id='user-form'>
                      <input type='hidden' name={'user[profile_attributes][id]'} value={user.profile.id}/>
                      <div className='row'>
                        <TextInputWithLabel
                          classes='col s12 m12 l6'
                          id='profile_name'
                          name='user[profile_attributes][name]'
                          label={i18n.name}
                          defaultValue={user.profile.name}
                          required={true}
                        />
                      </div>
                      <div className='row'>
                        <div className='input-field col s12' style={{display: 'flex', alignItems: 'center'}}>
                          <input type='hidden' name='user[profile_attributes][anonymous_comments]' value={false} />
                          <input type='checkbox' id='profile_anonymous' defaultChecked={user.profile.anonymous_comments} name='user[profile_attributes][anonymous_comments]'/>
                          <label htmlFor='profile_anonymous'>I would like all my comments to be anonymous</label>
                        </div>
                        <TextInputWithLabel
                          classes='col s12 m12 l6'
                          id='profile_organization'
                          name='user[profile_attributes][organization]'
                          label={i18n.organization}
                          defaultValue={user.profile.organization}
                          required={this.state.verificationRequested}
                        />
                        <TextInputWithLabel
                          classes='col s12 m12 l6'
                          id='profile_community_role'
                          name='user[profile_attributes][community_role]'
                          label={i18n.communityRole}
                          defaultValue={user.profile.community_role}
                          required={this.state.verificationRequested}
                        />
                        <TextInputWithLabel
                          classes='col s12'
                          id='profile_web_presence'
                          name='user[profile_attributes][web_presence]'
                          label={i18n.webPresence}
                          defaultValue={user.profile.web_presence}
                          required={false}
                          tooltipText={i18n.webPresenceTooltipText}
                        />
                      </div>
                      <div className='row'>
                        <TextAreaWithLabel
                          classes='col s12'
                          id='profile_bio'
                          name='user[profile_attributes][bio]'
                          label={i18n.bio}
                          defaultValue={user.profile.bio}
                          required={this.state.verificationRequested}
                        />
                      </div>
                    </form>
                  </div>
                </div>
                <div className={css.meta}>
                  <div className={css.label}>
                    {i18n.contact}
                  </div>
                  <div className={css.data}>
                    <div className='row'>
                      <TextInputWithLabel
                        classes='col s12 m12 l6'
                        id='user_email'
                        name='user[email]'
                        label={i18n.email}
                        defaultValue={user.email}
                        form='user-form'
                        required={true}
                      />
                    </div>
                  </div>
                </div>
                {
                  !user.provider &&
                  <div className={css.meta}>
                    <div className={css.label}>
                      {i18n.password}
                    </div>
                    <div className={css.data}>
                      <div className='row'>
                        <div className='input-field col s12 m12 l6'>
                          <label htmlFor='user_password'>{i18n.newPassword}</label>
                          <input id='user_password' type='password' name='user[password]' form='user-form'/>
                          {error && error.password && <div className='error-message'>{error.password}</div>}
                        </div>
                      </div>
                      <div className='row'>
                        <div className='input-field col s12 m12 l6'>
                          <label htmlFor='user_password_confirmation'>{i18n.newPasswordConfirmation}</label>
                          <input id='user_password_confirmation' type='password' name='user[password_confirmation]' form='user-form'/>
                          {error && error.password_confirmation && <div className='error-message'>{error.password_confirmation}</div>}
                      </div>
                      </div>
                    </div>
                  </div>
                }
                <div className={css.meta}>
                  <div className={css.label}>
                    {i18n.location}
                  </div>
                  <div className={css.data}>
                    <input type='hidden' name={'user[address_attributes][id]'} value={user.address.id}/>
                    <div className='row'>
                      <TextInputWithLabel
                        classes='col s12 m12 l6'
                        id='address_street'
                        name='user[address_attributes][street]'
                        label={i18n.street}
                        defaultValue={user.address.street}
                        form='user-form'
                        required={false}
                      />
                    </div>
                    <div className='row'>
                      <TextInputWithLabel
                        classes='col s12 m12 l6'
                        id='address_city'
                        name='user[address_attributes][city]'
                        label={i18n.city}
                        defaultValue={user.address.city}
                        form='user-form'
                        required={false}
                      />
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <button name='commit' type='submit' className='btn' onClick={this.submitForm}>{i18n.save}</button>
                  <a name='commit' type='submit' style={{marginLeft: 10, float: 'right'}} onClick={this.deleteAccount} href='#'>{i18n.delete}</a>
                </div>
              </div>
            }
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

document.addEventListener('turbolinks:load', () => {
  const edit = document.querySelector('#users-edit')
  edit && render(<Edit/>, edit)
})
