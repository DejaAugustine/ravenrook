import React, { Component } from 'react';

import './Credits.css';

class Credits extends Component {
  render() {
    const creditList = this.props.credits || [];
    var creditDedupe = {};
    const filteredList = creditList.filter(function(n){
      return (n === undefined || n === "" || creditDedupe.hasOwnProperty(n)) ? false  : (creditDedupe[n] = true);
    });
    const credits = filteredList.join(", ");

    return (
      <section className="credits" dangerouslySetInnerHTML={{__html: credits}} />
    );
  }
};

export default Credits;
