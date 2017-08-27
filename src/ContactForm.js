import React, { Component } from 'react';
import { Helmet } from "react-helmet";

import SiteNav from './SiteNav.js';

class ContactForm extends Component {

  render() {
    return (
      <div>
        <Helmet>
          <title>Contact Us - The Rook and The Raven</title>
          <meta name="description" content="Have a question? "/>
          <link rel="canonical" href="https://therookandtheraven.com/contact/" />
        </Helmet>
        <SiteNav />
        <main>
          <h2>Contact Us</h2>
          <p>Have a question? Have a suggestion? Reach out to us on twitter!</p>
          <p>Déja (DM) - @dejaaugustine</p>
          <p>Amery (Player) - @amberaugustine</p>
          <p>And be sure to follow @therookandtheraven for updates on when new sessions are posted!</p>
        </main>
      </div>
    );
  }
};

export default ContactForm;
