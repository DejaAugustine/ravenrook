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

class App extends Component {
  render() {
    return (
      <section className="site">
        <header>
          <h1 className="site-header">The Rook and The Raven</h1>
        </header>
        <nav className="site-nav">
          <ul className="menu">
            <li className="menu-item"><a href="#">Home</a></li>
            <li className="menu-item active"><a href="#">Campaigns</a></li>
            <li className="menu-item"><a href="#">Players</a></li>
            <li className="menu-item"><a href="#">Contact</a></li>
          </ul>
        </nav>
        <section className="campagins">
          <nav className="campaign-listing">
            <ul className="menu">
              <li className="menu-item"><a href="#"><span>Blood In The Water</span></a></li>
              <li className="menu-item active" style={{background: 'url(' + tempCover + ') top center no-repeat'}}><a href="#"><span>The Dark Continent</span></a></li>
              <li className="menu-item"><a href="#"><span>Curse Of Strahd</span></a></li>
              <li className="menu-item"><a href="#"><span>The Journal of Dr. Dromio Lazlow</span></a></li>
            </ul>
          </nav>
          <section className="campaign">
            <header>
              <h2>The Dark Continent</h2>
              <h3>Session 1: Welcome To The Club</h3>
              <ul className="menu cast-list">
                <li className="menu-item character" style={{background: 'url(' + aoeth + ') top center no-repeat'}}><a href="#"><span>Aoeth</span></a></li>
                <li className="menu-item character" style={{background: 'url(' + bree + ') top center no-repeat'}}><a href="#"><span>Bree</span></a></li>
                <li className="menu-item character" style={{background: 'url(' + gil + ') top center no-repeat'}}><a href="#"><span>Gil</span></a></li>
                <li className="menu-item character" style={{background: 'url(' + hugh + ') top center no-repeat'}}><a href="#"><span>Hugh</span></a></li>
                <li className="menu-item character" style={{background: 'url(' + kasiashi + ') top center no-repeat'}}><a href="#"><span>Kasiashi</span></a></li>
                <li className="menu-item character" style={{background: 'url(' + sabine + ') top center no-repeat'}}><a href="#"><span>Sabine</span></a></li>
              </ul>
            </header>

            <main>
              <aside>
                <h4>Notable Guests &amp; NPCs</h4>
                <article className="npc" style={{background: 'url(' + varis + ') center left no-repeat'}}>
                  <p>Varis - Moon Elf Wizard</p>
                  <p>The Seventh Adventurer</p>
                </article>
                <article className="npc" style={{background: 'url(' + torvald + ') center left no-repeat'}}>
                  <p>Torvald - Commoner</p>
                  <p>Gâla's "Caller"</p>
                </article>
              </aside>

              <p>Welcome to the Club!</p>
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

        </footer>
      </section>
    );
  }
}

export default App;
