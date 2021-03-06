import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Sticky } from 'react-sticky';

import Link from './LinkToTop';
import Credits from './Credits';

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
    const title = page.title && page.title.rendered;
    const body = page.content && page.content.rendered;
    const credits = page.credits && Object.values(page.credits);

    var metaTags = [];
    if(page.yoast && page.yoast.metadesc)
      metaTags.push({name: 'description', content: page.yoast.metadesc});

    return (
      <main className="session-list">
        <Helmet title={title + " - The Rook and The Raven"} meta={metaTags} >
          <link rel="canonical" href={"https://therookandtheraven.com" + this.props.match.url} />
        </Helmet>
        <Sticky topOffset={25}>
          {(props) => {
            return (
              <header style={props.style} className={props.isSticky ? "sticky is-sticky" : "sticky"}>
                <div className="header-content">
                  <div>
                    <h3><Link to={path}>{name}</Link></h3>
                    <h2>{title}</h2>
                  </div>
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


        <Credits credits={[credits]} />
      </main>
    );
  }
};

export default CampaignPage;
