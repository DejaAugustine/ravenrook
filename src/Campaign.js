import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import SessionList from './SessionList.js';
import SessionDetail from './SessionDetail.js';
import parseWPResponse from './utils.js';
import './Campaign.css';

const aoeth = require('./tokens/aoeth.png');
const bree = require('./tokens/bree.png');
const gil = require('./tokens/gil.png');
const hugh = require('./tokens/hugh.png');
const kasiashi = require('./tokens/kasiashi.png');
const sabine = require('./tokens/sabine.png');

class Campaign extends Component {
  componentWillMount() {
    this.setState({
      items: [],
      index: {},
      active: undefined
    });
  }

  componentDidMount() {
    const $this = this;

    fetch("http://api.therookandtheraven.com/wp-json/wp/v2/session?_embed&filter[orderby]=date&order=desc")
      .then(res => res.json())
      .then(res => parseWPResponse(res))
      .then(res => {
        $this.setState({
          items: res
        });

        for(var i=0;i<res.length;i++) {
          var item = res[i];
          var index = $this.state.index || {};

          index[item.slug] = item;
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

  render() {
    const $this = this;
    const name = this.props.name;
    const description = this.props.description;
    const sessions = this.state.items;
    const index = this.state.index;
    const active = this.state.active;

    const pageTitle = active === undefined ? "Campaign Overview" : "Session " + active.acf.session_number + ": " + active.title.rendered;

    return (
      <section className="campaign">
        <header>
          <h2>{name}</h2>
          <h3>{pageTitle}</h3>
          <ul className="menu cast-list">
            <li className="menu-item character" style={{backgroundImage: 'url(' + aoeth + ')'}}><a href="/characters/aoeth"><span>Aoeth</span></a></li>
            <li className="menu-item character" style={{backgroundImage: 'url(' + bree + ')'}}><a href="/characters/bree"><span>Bree</span></a></li>
            <li className="menu-item character" style={{backgroundImage: 'url(' + gil + ')'}}><a href="/characters/gil"><span>Gil</span></a></li>
            <li className="menu-item character" style={{backgroundImage: 'url(' + hugh + ')'}}><a href="/characters/hugh"><span>Hugh</span></a></li>
            <li className="menu-item character" style={{backgroundImage: 'url(' + kasiashi + ')'}}><a href="/characters/kasiashi"><span>Kasiashi</span></a></li>
            <li className="menu-item character" style={{backgroundImage: 'url(' + sabine + ')'}}><a href="/characters/sabine"><span>Sabine</span></a></li>
          </ul>
        </header>

        <Route path={this.props.match.url} exact render={function(props){
          return (
            <SessionList description={description} sessions={sessions} {...props} />
          );
        }} />

        <Route path={this.props.match.url + '/:sessionSlug'} render={function(props){
          const prev = <li className="menu-item"><a href={$this.props.match.url + '/bramblebark'}>&lt; Session 2: Bramblebark</a></li>;
          const top = <li className="menu-item"><a href={$this.props.match.url}>Back to Campaign</a></li>
          const next = <li className="menu-item"></li>
          return (
            <div>
              <SessionDetail session={index[props.match.params.sessionSlug]} {...props} />
              <nav>
                <ul className="menu">
                  {prev}
                  {top}
                  {next}
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
