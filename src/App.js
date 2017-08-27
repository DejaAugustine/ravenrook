import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch } from 'react-router-dom';


import Homepage from './Homepage.js';
import CampaignListing from './CampaignListing.js';
import ContactForm from './ContactForm.js';

import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <section className="site">
          <header>
            <h1 className="site-header">The Rook and The Raven</h1>
          </header>

          <Switch>
            <Route path="/" exact component={Homepage} />
            <Route path="/campaigns" component={CampaignListing} />
            <Route path="/contact" component={ContactForm} />
          </Switch>

          <footer>
            <p>Follow us on twitter: @dejaaugustine, @amberaugustine, and @therooktheraven</p>
            <p>
              <small>original content copyright &copy; 2015-2017 Déja Augustine and the respective party members</small>
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
