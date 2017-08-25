import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class SiteNav extends Component {

  render() {
    console.log("SiteNav", this.props);
    var active="home";

    if(this.props.location) {
      const pathname = this.props.location.pathname;
      
      if(pathname.indexOf('/campaigns') !== -1)
        active="campaigns";
      if(pathname.indexOf('/contact') !== -1)
        active="contact";
    }

    return (
      <nav className="site-nav">
        <ul className="menu">
          <li className={"menu-item" + (active === "home" ? " active": "")}>
            <Link to="/">Home</Link>
          </li>
          <li className={"menu-item" + (active === "campaigns" ? " active": "")}>
            <Link to="/campaigns">Campaigns</Link>
          </li>
          <li className={"menu-item" + (active === "contact" ? " active": "")}>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    );
  }
};

export default withRouter(SiteNav);
