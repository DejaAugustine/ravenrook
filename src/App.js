import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <section className="site">
        <header>
          <h1 className="site-header">The Rook and The Raven</h1>
        </header>
        <nav className="site-nav">
          <ul className="menu">
            <li className="menu-item">Home</li>
            <li className="menu-item active">Campaigns</li>
            <li className="menu-item">Players</li>
            <li className="menu-item">Contact</li>
          </ul>
        </nav>
        <section className="content">
          <nav>
            <ul className="menu">
              <li className="menu-item">Blood In The Water</li>
              <li className="menu-item">The Dark Continent</li>
              <li className="menu-item">Curse Of Strahd</li>
              <li className="menu-item">The Journal of Dr. Dromio Lazlow</li>
            </ul>
          </nav>
          <section>
            <header>The Dark Continent</header>

          </section>
        </section>
      </section>
    );
  }
}

export default App;
