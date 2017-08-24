import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import SessionList from './SessionList.js';
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
      sessions: []
    });
  }

  componentDidMount() {
    const $this = this;
    console.log("Campaign", this.props);

    fetch("http://api.therookandtheraven.com/wp-json/wp/v2/session?_embed")
      .then(res => res.json())
      .then(res => {
        console.log("Campaign:Fetch", res);
        this.setState({
          sessions: res
        });

        res.forEach(function(session) {
          console.log($this.props.location.pathname, session.slug);
          if($this.props.location.pathname.endsWith(session.slug)) {
            $this.setState({
              active: session
            });
          }
        });
      });
  }

  render() {
    console.log("Campaign:State", this.state);

    const name = this.props.name;
    const id = this.props.id;
    const description = this.props.description;
    const sessions = this.state.sessions;
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
          return (
            <p>Mup</p>
          );
        }} />

      </section>
    );
  }
};

export default Campaign;
