import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';

class SiteNav extends Component {

  render() {
    return (
      <nav className="site-nav">
        <ul className="menu">
          <li className="menu-item">
            <NavLink to="/campaigns">Home</NavLink>
          </li>
          <li className="menu-item">
            <NavLink to="/campaigns">Campaigns</NavLink>
          </li>
          <li className="menu-item">
            <a href="https://shop.therookandtheraven.com">Shop</a>
          </li>
          <li className="menu-item">
            <NavLink to="/contact">Contact</NavLink>
          </li>
        </ul>
      </nav>
    );
  }
};

export default withRouter(SiteNav);
