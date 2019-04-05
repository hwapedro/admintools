import React, { Component } from "react";

import Page from '../PageList/Page'

class PageList extends Component {


  render() {

    console.log(this.props.pages)
    return (
      <>
       <ul><Page pages = {this.props.pages} id={this.props.id}/></ul>
       
      </>
    );
  }
}

export default PageList;