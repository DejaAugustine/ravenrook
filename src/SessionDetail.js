import React, { Component } from 'react';
import Party from './Party.js';
import NPCs from './NPCs.js';

//import './Session.css';

class SessionDetail extends Component {
  render() {
    console.log("Detail", this.props);
    const session = this.props.session;
    const campaign = this.props.campaign;
    const body = session ? session.content.rendered : "";
    const title = session ? session.title.rendered : "";

    return (
      <main>
        <header>
          <h3>{title}</h3>
          <Party campaign={campaign} session={session} />
        </header>

        <NPCs campaign={campaign} session={session} />

        <section dangerouslySetInnerHTML={{__html: body}} />
      </main>
    );
  }
};

export default SessionDetail;
