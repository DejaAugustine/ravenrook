import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Helmet } from "react-helmet";

import './App.css';

import StaticPage from './StaticPage';
import CampaignListing from '../containers/CampaignListing';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <section className="site">
          <Helmet>
            <title>The Anti-Heroic Misadventures of The Rook and The Raven</title>
            <meta name="description" content="A player and her DM recount the misadventures of four of their Dungeons and Dragons campaigns session-by-session - including DM notes and player commentary."/>
            <link rel="canonical" href="https://therookandtheraven.com/" />
          </Helmet>

          <header>
            <h1 className="site-header">The Rook and The Raven</h1>
          </header>

          <Switch>
            <Route path="/campaigns" component={CampaignListing} />
            <Route path="/contact" exact render={props => <StaticPage pageId="174" withNav="true" {...props} />} />
            <Redirect from="*" to="/campaigns" />
          </Switch>

          <footer>
            <p>Follow us on twitter <a href="https://twitter.com/dejaaugustine" className="twitter">@dejaaugustine</a>, <a href="https://twitter.com/amberaugustine" className="twitter">@amberaugustine</a>, and <a href="https://twitter.com/therooktheraven" className="twitter">@therooktheraven</a></p>
            <p>
              <small>original content copyright &copy; 2015-2017 Déja &amp; Amber Augustine and the respective party members</small>
              <br />
              <small>licensed content and artwork (unless noted) are copyright the respective owner(s) and are used here without permission</small>
            </p>
          </footer>
        </section>
      </BrowserRouter>
    );
  }
}

export default App;
