import React, { Component } from 'react';

import SiteNav from './SiteNav.js';

class Homepage extends Component {

  render() {
    return (
      <div className="static">
        <SiteNav />
        <main>
          <p>Welcome to The Rook and The Raven</p>
        </main>
      </div>
    );
  }
};

export default Homepage;
