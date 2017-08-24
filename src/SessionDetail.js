import React, { Component } from 'react';
import './Session.css';

const varis = require('./tokens/varis.png');
const torvald = require('./tokens/torvald.png');
const dero = require('./tokens/dero.png');
const mina = require('./tokens/mina.png');

class SessionDetail extends Component {
  componentWillMount() {
    /*this.setState({
      campaigns: []
    })*/
  }

  componentDidMount() {
    console.log(this.props);

    /*fetch("http://api.therookandtheraven.com/wp-json/wp/v2/campaign")
      .then(res => res.json())
      .then(res => {
        this.setState({
          campaigns: res
        });

        console.log(this.state);
      });*/
  }

  render() {
    /*const campaignList = this.state.campaigns.map((campaign, index) => {
      var classes = "menu-item";
      if(isActive(campaign.link, this.props.location.pathname)) {
        classes = classes + " active";
      }

      return <li key={index} className={classes} style={{backgroundImage: 'url(' + campaign.acf.cover_art + ')'}}><a href={stripHost(campaign.link)}><span>{campaign.name}</span></a></li>
    });*/

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

        <p>Accepting the third adventure in this month's Call to Adventure in Gâla, Kasiashi accepted (benevolently on behalf of all the assembled wanna-be adventurers) a scroll with the following words upon it:</p>
        <blockquote>
          "The village of Bramblebark is having a problem with wolves that they would like solved"<br />
          The pay: 500g. Good money.<br />
          Officially registering your group as:<br />
          Gray Lady<br />
          Dragon<br />
          Bree<br />
          Hugh<br />
          Sabine<br />
          Creepy Guy<br />
          Elf
        </blockquote>
        <p>With a word that you'll need to earn the right to title your group, Torvald (the Caller) sends you on your merry way.</p>
        <p>Following Hugh's infallible directions, you hit the forest road for a two-day journey. Reaching the common road campsite, you set up camp and hearing howls in the distance you post a watch. The first shift was entirely uneventful. The second shift a bit less so as despite the watchful eyes of the sentries, the camp was roused by Bree's yelp as she was dragged from her tent.</p>
        <p>A swift combat ensued lasting only moments. Varis's sleep magic negated the wolves' natural advantages for hunting as a pack allowing the party to pick them off one-by-one.  The wolves defeated, a message was discovered by the fire:</p>
        <blockquote>
          If you're alive to read this, welcome to the club<br />
          - The Lions of Dadun
        </blockquote>
        <p>Finishing out the night's sleep, you each feel a little more wary, a little more suspicious of your surroundings, than you were only a few short hours before.</p>

        <nav>
          <ul className="menu">
            <li className="menu-item"></li>
            <li className="menu-item"><a href="/campaign/the-dark-continent">Back to Campaign</a></li>
            <li className="menu-item"><a href="/campaign/the-dark-continent/session-2-bramblebark">Session 2: Bramblebark &gt;</a></li>
          </ul>
        </nav>
      </main>
    );
  }
};

export default SessionDetail;
