import React, { Component } from 'react';
import { Sticky } from 'react-sticky';

import Link from './LinkToTop';

class CampaignPage extends Component {
  componentWillMount() {
    this.props.selectCampaignPage(this.props.match.params.pageSlug);
  }

  componentWillReceiveProps(newProps) {
    if(newProps.pageSlug && newProps.pageSlug !== this.props.pageSlug) {
      this.props.selectCampaignPage(newProps.pageSlug);
    }
  }

  render() {
    const campaign = this.props.campaign;
    const name = campaign.name || '';

    const path = this.props.match.path.replace(/:pageSlug.*$/, '');

    const page = this.props.page || {};
    const title = page.title ? page.title.rendered : '';
    const body = page.content ? page.content.rendered : '';

    return (
      <main className="session-list">
        <Sticky topOffset={25}>
          {(props) => {
            return (
              <header style={props.style} className={props.isSticky ? "sticky is-sticky" : "sticky"}>
                <div className="header-content">
                  <h3><Link to={path}>{name}</Link></h3>
                  <h2>{title}</h2>
                </div>
              </header>
            )
          }}
        </Sticky>

        <p className="description" dangerouslySetInnerHTML={{__html: body}} />

        <nav style={{clear: "both"}}>
          <ul className="menu">
            <li className="menu-item"><Link to={path}>Back to Campaign</Link></li>
          </ul>
        </nav>
      </main>
    );
  }
};

export default CampaignPage;
