import React, { Component } from 'react';
import './Session.css';

class SessionList extends Component {
  componentWillMount() {

  }

  componentDidMount() {
    console.log("SessionList", this.props);
  }

  render() {
    const sessionList = this.props.sessions.map((session, index) => {
      return <li key={index} className="menu-item" style={{backgroundImage: 'url(' + session.acf.cover_art + ')'}}><a href={this.props.match.url + '/' + session.slug}><span>{session.name}</span></a></li>
    });

    return (
      <main>
        <p className="description">{this.props.description}</p>
        <ul className="menu">
          {sessionList}
        </ul>
      </main>
    );
  }
};

export default SessionList;
