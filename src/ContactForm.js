import React, { Component } from 'react';

import SiteNav from './SiteNav.js';

class ContactForm extends Component {

  render() {
    return (
      <div className="static">
        <SiteNav />
        <main>
          A Contact Form!
        </main>
      </div>
    );
  }
};

export default ContactForm;
