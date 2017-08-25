import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import CampaignListing from './CampaignListing.js';
import './App.css';

class App extends Component {
  render() {

    var active="home";
    if(window.location.pathname.indexOf('/campaigns') !== -1)
      active="campaigns";
    if(window.location.pathname.indexOf('/contact') !== -1)
      active="contact";

    return (
      <Router>
        <section className="site">
          <header>
            <h1 className="site-header">The Rook and The Raven</h1>
          </header>
          <nav className="site-nav">
            <ul className="menu">
              <li className={"menu-item" + (active === "home" ? " active": "")}><a href="/">Home</a></li>
              <li className={"menu-item" + (active === "campaigns" ? " active": "")}><a href="/campaigns">Campaigns</a></li>
              <li className={"menu-item" + (active === "contact" ? " active": "")}><a href="/contact">Contact</a></li>
            </ul>
          </nav>

          <Route path="/campaigns" component={CampaignListing} />

          <footer>
            <p>Follow us on twitter: @dejaaugustine, @amberaugustine, and @therooktheraven</p>
            <p>
              <small>original content copyright &copy; 2015-2017 Déja Augustine and the respective party members</small>
              <br />
              <small>licensed content and artwork (unless noted) are copyright the respective owner(s) and are used here without permission</small>
            </p>
          </footer>
        </section>
      </Router>
    );
  }
}

export default App;
