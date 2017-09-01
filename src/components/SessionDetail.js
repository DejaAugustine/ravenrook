import React, { Component } from 'react';
import { Sticky } from 'react-sticky';

import './SessionDetail.css';

import Link from './LinkToTop';
import Party from '../containers/Party.js';
import NPCs from '../containers/NPCs.js';

class SessionDetail extends Component {
  componentWillMount() {
    this.props.selectSession(this.props.match.params.sessionSlug);
  }

  componentWillReceiveProps(newProps) {
    if(newProps.match.params.sessionSlug && (!this.props.sessionSlug || newProps.match.params.sessionSlug !== this.props.sessionSlug)) {
      newProps.selectSession(newProps.match.params.sessionSlug);
    }
  }

  basePath() {
    return this.props.match.path.replace(/\/session\/.*$/, '');
  }

  objectToPath(obj) {
    if(obj && obj.post_status === "publish") {
      return this.basePath() + '/session/' + obj.post_name;
    }
  }

  render() {
    if(!this.props.session) return(null);

    const session = this.props.session;
    const campaign = this.props.campaign;
    const name = campaign && campaign.name;
    const body = session.content && session.content.rendered;
    const title = session.title && session.title.rendered;
    const number = session.acf  && "Session " + session.acf.session_number;

    const path = this.basePath();

    const prevPath = session.acf && this.objectToPath(session.acf.previous_session);
    const prev = prevPath && (<Link to={prevPath}><i className="fa fa-chevron-left" aria-hidden="true"></i></Link>);

    const nextPath = session.acf && this.objectToPath(session.acf.next_session);
    const next = nextPath && (<Link to={nextPath}><i className="fa fa-chevron-right" aria-hidden="true"></i></Link>);

    var characterClasses = {};
    if(session.acf) {
      session.acf.characters.map(function(character, index){
        characterClasses[character.ID] = "present";
        return character.ID;
      });
    }

    return (
      <main className="session-detail">
        <Sticky topOffset={25}>
          {(props) => {
            return (
              <header style={props.style} className={props.isSticky ? "sticky is-sticky" : "sticky"}>
                <div className="back">{prev}</div>
                <div>
                  <h3><Link to={path}>{name}: {number}</Link></h3>
                  <h2>{title}</h2>
                </div>
                <div className="next">{next}</div>
              </header>
            )
          }}
        </Sticky>
        <Party classes={characterClasses} path={this.props.match} />

        <NPCs />

        <section className="content" dangerouslySetInnerHTML={{__html: body}} />

        <nav style={{clear: "both"}}>
          <ul className="menu">
            <li className="menu-item"><Link to={path}>Back to Campaign</Link></li>
          </ul>
        </nav>
      </main>
    );
  }
};

export default SessionDetail;
