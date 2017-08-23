import React, { Component } from 'react';
import './App.css';
const tempCover = require('./tdc-cover.jpg');

const aoeth = require('./tokens/aoeth.png');
const bree = require('./tokens/bree.png');
const gil = require('./tokens/gil.png');
const hugh = require('./tokens/hugh.png');
const kasiashi = require('./tokens/kasiashi.png');
const sabine = require('./tokens/sabine.png');

const varis = require('./tokens/varis.png');
const torvald = require('./tokens/torvald.png');
const dero = require('./tokens/dero.png');
const mina = require('./tokens/mina.png');

class App extends Component {
  componentDidMount() {
    fetch("http://therookandtheraven.com/wp-json/wp/v2/posts")
      .then(res => res.json())
      .then(res => {
        console.log(res);
      });
  }

  render() {
    return (
      <section className="site">
        <header>
          <h1 className="site-header">The Rook and The Raven</h1>
        </header>
        <nav className="site-nav">
          <ul className="menu">
            <li className="menu-item"><a href="/">Home</a></li>
            <li className="menu-item active"><a href="/campaigns">Campaigns</a></li>
            <li className="menu-item"><a href="/players">Players</a></li>
            <li className="menu-item"><a href="/contact">Contact</a></li>
          </ul>
        </nav>
        <section className="campagins">
          <nav className="campaign-listing">
            <ul className="menu">
              <li className="menu-item"><a href="/campaigns/blood-in-the-water"><span>Blood In The Water</span></a></li>
              <li className="menu-item active" style={{background: 'url(' + tempCover + ') top center no-repeat'}}><a href="/campaigns/the-dark-continent"><span>The Dark Continent</span></a></li>
              <li className="menu-item"><a href="/campaigns/curse-of-strahd"><span>Curse Of Strahd</span></a></li>
              <li className="menu-item"><a href="/campaigns/journal-of-dromio-lazlow"><span>The Journal of Dr. Dromio Lazlow</span></a></li>
            </ul>
          </nav>
          <section className="campaign">
            <header>
              <h2>The Dark Continent</h2>
              <h3>Session 1: Welcome To The Club</h3>
              <ul className="menu cast-list">
                <li className="menu-item character" style={{background: 'url(' + aoeth + ') top center no-repeat'}}><a href="/characters/aoeth"><span>Aoeth</span></a></li>
                <li className="menu-item character" style={{background: 'url(' + bree + ') top center no-repeat'}}><a href="/characters/bree"><span>Bree</span></a></li>
                <li className="menu-item character" style={{background: 'url(' + gil + ') top center no-repeat'}}><a href="/characters/gil"><span>Gil</span></a></li>
                <li className="menu-item character" style={{background: 'url(' + hugh + ') top center no-repeat'}}><a href="/characters/hugh"><span>Hugh</span></a></li>
                <li className="menu-item character" style={{background: 'url(' + kasiashi + ') top center no-repeat'}}><a href="/characters/kasiashi"><span>Kasiashi</span></a></li>
                <li className="menu-item character" style={{background: 'url(' + sabine + ') top center no-repeat'}}><a href="/characters/sabine"><span>Sabine</span></a></li>
              </ul>
            </header>

            <main>
              <aside>
                <h4>Notable Guests &amp; NPCs</h4>
                <a href="/characters/varis" className="npc" style={{background: 'url(' + varis + ') center left no-repeat'}}>
                  <p>
                    Varis - Moon Elf Wizard<br />
                    The Seventh Adventurer
                  </p>
                </a>
                <a href="/characters/torvald" className="npc" style={{background: 'url(' + torvald + ') center left no-repeat'}}>
                  <p>
                    Torvald - Dwarf Commoner<br />
                    Gâla's "Caller"
                  </p>
                </a>
                <a href="/characters/dero" className="npc" style={{background: 'url(' + dero + ') center left no-repeat'}}>
                  <p>
                    Dero - Half-Orc Paladin<br />
                    Leader of the Lions of Dadun
                  </p>
                </a>
                <a href="/characters/mina" className="npc" style={{background: 'url(' + mina + ') center left no-repeat'}}>
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
            </main>


          </section>
        </section>
        <footer>
          <p>Follow us on twitter: @dejaaugustine, @amberaugustine, and @therooktheraven</p>
          <p>
            <small>original content copyright &copy; 2015-2017 Déja Augustine and the respective party members</small>
            <br />
            <small>licensed content and artwork (unless noted) remain the copyright of the original creator(s) and are used here without permission</small>
          </p>
        </footer>
      </section>
    );
  }
}

export default App;
