import React, { Component } from 'react'
import { render } from 'react-dom'
import Dashboard from '../../../Layout/Dashboard/Dashboard'
import DevSitePreview from '../../../DevSites/Preview/Preview'
import css from '../../../Layout/Dashboard/dashboard.scss'
import Pagination from '../../../Utility/Pagination/Pagination'

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = { loading: true, page: 0 }
    this.loadDevSites = () => this._loadDevSites()
    this.loadDevSites()
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.page !== this.state.page) {
      window.scrollTo(0,0);
      this.loadDevSites();
    }
  }

  _loadDevSites() {
    const { userPrimaryOrganizationId } = document.body.dataset;
    $.getJSON(`/organizations/${userPrimaryOrganizationId}/dev_sites`,
      { page: this.state.page, limit: this.state.limit },
      json => this.setState({ devSites: json.dev_sites, total: json.total, loading: false })
    );
  }

  render() {
    const { devSites, loading, page, total } = this.state
    const { locale } = document.body.dataset
    return(
      <Dashboard loading={loading} activeComponent='manage_dev_site'>
        {
          !loading &&
          <div className={css.content}>
            <h2>Manage Development Sites</h2>
            <a href={`/${locale}/dev_sites/new`} className='btn'>Add Development Site</a>
            <div className='row'>
              {
                devSites && devSites.map(devSite => (
                  <div className={`col s12 m6 l4 ${css.devSite}`} key={`preview-${devSite.id}`}>
                    <a href={`/${locale}/dev_sites/${devSite.id}`}>
                      <DevSitePreview id={devSite.id} width={250} devSite={devSite} preview={true} />
                    </a>
                  </div>
                ))
              }
            </div>
            <Pagination page={page} limit={18} total={total} parent={this} />
          </div>
        }
      </Dashboard>
    );
  }
}

document.addEventListener('turbolinks:load', () => {
  const organizationDevSiteIndex = document.querySelector('#organizations-dev-sites-index');
  organizationDevSiteIndex && render(<Index/>, organizationDevSiteIndex);
})
