import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import SessionList from './SessionList.js';
import SessionDetail from './SessionDetail.js';
import parseWPResponse from './utils.js';
import './Campaign.css';

class Campaign extends Component {
  componentWillMount() {
    this.setState({
      items: [],
      index: {}
    });
  }

  componentWillReceiveProps(props) {
    const $this = this;
    const campaignId = props.campaign ? props.campaign.id : undefined;

    if(campaignId) {
      $this.setState({
        campaign: props.campaign
      });

      fetch("http://api.therookandtheraven.com/wp-json/wp/v2/session?categories=" + props.campaign.id + "&filter[orderby]=date&order=desc")
        .then(res => res.json())
        .then(res => parseWPResponse(res))
        .then(res => {
          $this.setState({
            items: res
          });

          for(var i=0;i<res.length;i++) {
            var item = res[i];
            var index = $this.state.index || {};

            index[item.slug] = i;
            $this.setState({
              index: index
            });

            if($this.props.location.pathname.endsWith(item.slug)) {
              $this.setState({
                active: item
              });
            }
          }
        });
      }
  }

  render() {
    const $this = this;
    const campaign = this.state.campaign;
    const name = campaign ? campaign.name : '';
    const sessions = this.state.items;
    const index = this.state.index;

    return (
      <section className="campaign">
        <header>
          <h2>{name}</h2>
        </header>

        <Route path={this.props.match.url} exact render={function(props){
          return (
            <SessionList campaign={campaign} sessions={sessions} {...props} />
          );
        }} />

        <Route path={this.props.match.url + '/:sessionSlug'} render={function(props){
          const i = index[props.match.params.sessionSlug];
          var prev = <span>&nbsp;</span>;
          if(i < sessions.length - 1) {
            const ps = sessions[i + 1];
            prev = <a href={$this.props.match.url + '/' + ps.slug}>&lt; Session {ps.acf.session_number}</a>;
          }
          const top = <a href={$this.props.match.url}>Back to Campaign</a>;
          var next = <span>&nbsp;</span>;
          if(i > 0) {
            const ns = sessions[i - 1];
            next = <a href={$this.props.match.url + '/' + ns.slug}>Session {ns.acf.session_number} &gt;</a>;
          }
          return (
            <div>
              <SessionDetail campaign={campaign} session={sessions[i]} {...props} />
              <nav>
                <ul className="menu">
                  <li className="menu-item">{prev}</li>
                  <li className="menu-item">{top}</li>
                  <li className="menu-item">{next}</li>
                </ul>
              </nav>
            </div>
          );
        }} />

      </section>
    );
  }
};

export default Campaign;
