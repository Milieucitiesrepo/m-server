import React, { Component } from 'react'
import css from './timeline.scss'
import ReactTooltip from 'react-tooltip'
import i18n from './locale'

export default class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: (window.innerWidth < 992)
    }
  }

  render() {
    const { devSite } = this.props;
    const devSiteStatus = devSite.status;

    let firstPoint = '';
    let secondPoint = '';
    let thirdPoint = '';
    let fourthPoint = '';
    let fifthPoint = '';
    let meetingTooltip = '';
    const hoverDelay = this.state.isMobile ? 0 : 2000;


    if (devSite.meeting) {
      meetingTooltip =
        <li className={secondPoint} data-tip data-for="meeting" >
            <span>
              <ReactTooltip
                className={css.tooltip}
                place="top"
                type="light"
                effect="solid"
                id="meeting"
                delayHide={hoverDelay}>
                  <div className={css.scheduled}>
                    {i18n.scheduled}
                  </div>
                  <div className="row">
                    {i18n.date}: {devSite.meeting.date}
                  </div>
                  <div className="row">
                    {i18n.time}: {devSite.meeting.time}
                  </div>
                  <div className="row">
                    {i18n.location}: {devSite.meeting.location}
                  </div>
              </ReactTooltip>
              {i18n.meeting}
            </span>
        </li >;
    } else {
      meetingTooltip =
        <li className={secondPoint}>
          <span>{i18n.meeting}</span>
        </li>;
    }

    switch (devSiteStatus) {
      case 'Open':
        firstPoint = css.active;
        break;
      case 'Application Complete, Comment Period Open':
        firstPoint = css.visited;
        secondPoint = css.active;
        break;
      case 'Review':
        firstPoint = css.visited;
        secondPoint = css.visited;
        thirdPoint = css.active;
        break;
      case 'Planning Review Stage':
        firstPoint = css.visited;
        secondPoint = css.visited;
        thirdPoint = css.visited;
        fourthPoint = css.active;
        break;
      case 'Revision':
        firstPoint = css.visited;
        secondPoint = css.visited;
        thirdPoint = css.visited;
        fourthPoint = css.visited;
        fifthPoint = css.active;
    }

    return (
      <div className={css.checkoutwrap}>
        <ul className={css.checkoutbar}>
          <li className={firstPoint} >
            <span>{i18n.commentPeriod}</span>
          </li>
          {meetingTooltip}
          <li className={thirdPoint} >
            <span>
              {i18n.revisionChanges}
            </span>
          </li>
          <li className={fourthPoint} >
            <span>
              {i18n.decisionMeeting}
            </span>
            </li>
            <li className={fifthPoint} >
              <span>
                {i18n.decisionMade}
              </span>
            </li>
          </ul>
      </div>
    );
  }
}
