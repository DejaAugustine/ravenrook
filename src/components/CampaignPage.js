import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CampaignPage extends Component {
  /*parseState(props) {
    this.setState({
      path: props.match.path,
      campaign: props.campaign,
      index: props.pageIndex || {},
      pages: props.pages || [],
      pageSlug: props.match.params.pageSlug
    });
  }

  componentWillMount() {
    this.parseState(this.props);
  }

  componentWillReceiveProps(newProps) {
    if(!newProps.campaign) return;

    this.parseState(newProps);
  }*/

  render() {
    console.log("CampaignPage:render", this.props);
    const campaign = this.props.campaign;
    const name = campaign.name || '';
    const path = campaign.path || '/';

    const page = this.props.page || {};
    const title = page.title ? page.title.rendered : '';
    const body = page.content ? page.content.rendered : '';

    return (
      <main className="session-list">
        <header>
          <h3><Link to={path}>{name}</Link></h3>
          <h2>{title}</h2>
        </header>

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
