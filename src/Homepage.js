import React, { Component } from 'react';
import { fetchData } from './utils.js';
import SiteNav from './SiteNav.js';
import { Helmet } from "react-helmet";

class Homepage extends Component {
  componentWillMount() {
    const $this = this;

    this.setState({
      title: '',
      description: '',
      content: ''
    });

    fetchData("https://api.therookandtheraven.com/wp-json/wp/v2/pages?include=169", function(res) {
      const page = res[0];

      if(page) {
        $this.setState({
          description: page.yoast.metadesc,
          title: page.yoast.title,
          content: page.content.rendered
        });
      }
    });
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>{this.state.title}</title>
          <meta name="description" content="{this.state.description}"/>
        </Helmet>
        <SiteNav />
        <main className="content" dangerouslySetInnerHTML={{__html: this.state.content}} />
      </div>
    );
  }
};

export default Homepage;
