import React, { Component } from 'react';
//import './Session.css';

const varis = require('./tokens/varis.png');
const torvald = require('./tokens/torvald.png');
const dero = require('./tokens/dero.png');
const mina = require('./tokens/mina.png');

class SessionDetail extends Component {
  render() {
    console.log("Detail", this.props);
    const session = this.props.session;
    const body = session ? session.content.rendered : "";

    return (
      <main>
        <aside>
          <h4>Notable Guests &amp; NPCs</h4>
          <a href="/characters/varis" className="npc" style={{backgroundImage: 'url(' + varis + ')'}}>
            <p>
              Varis - Moon Elf Wizard<br />
              The Seventh Adventurer
            </p>
          </a>
          <a href="/characters/torvald" className="npc" style={{backgroundImage: 'url(' + torvald + ')'}}>
            <p>
              Torvald - Dwarf Commoner<br />
              Gâla's "Caller"
            </p>
          </a>
          <a href="/characters/dero" className="npc" style={{backgroundImage: 'url(' + dero + ')'}}>
            <p>
              Dero - Half-Orc Paladin<br />
              Leader of the Lions of Dadun
            </p>
          </a>
          <a href="/characters/mina" className="npc" style={{backgroundImage: 'url(' + mina + ')'}}>
            <p>
              Mina - Human Cleric<br />
              Leader of the Covenant of the Fang and Scepter
            </p>
          </a>
        </aside>

        <section dangerouslySetInnerHTML={{__html: body}} />
      </main>
    );
  }
};

export default SessionDetail;
