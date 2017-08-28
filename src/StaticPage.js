import React, { Component } from 'react';
import { fetchData } from './utils.js';
import SiteNav from './SiteNav.js';
import { Helmet } from "react-helmet";

class StaticPage extends Component {
  loadPage(props) {
    fetchData("https://api.therookandtheraven.com/wp-json/wp/v2/pages?include=" + props.pageId, res => {
      const page = res[0];

      if(page) {
        this.setState({
          description: page.yoast.metadesc,
          title: page.yoast.title,
          content: page.content.rendered,
          pageId: props.pageId
        });
      }
    });
  }

  componentWillMount() {
    if(!this.state) {
      this.setState({
        title: '',
        description: '',
        content: ''
      });
    }

    this.loadPage(this.props);
  }

  componentWillReceiveProps(newProps) {
    if(this.state.pageId && this.state.pageId === newProps.pageId) return;

    this.loadPage(newProps);
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>{this.state.title}</title>
          <meta name="description" content={this.state.description}/>
        </Helmet>
        <SiteNav />
        <main className="content" dangerouslySetInnerHTML={{__html: this.state.content}} />
      </div>
    );
  }
};

export default StaticPage;
