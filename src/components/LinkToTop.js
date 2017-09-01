import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LinkToTop extends Component {
  render() {
    return (
      <Link onClick={() => document.getElementById('wrapper').scrollIntoView()} {...this.props}>
        {this.props.children}
      </Link>
    );
  }
}

export default LinkToTop;
