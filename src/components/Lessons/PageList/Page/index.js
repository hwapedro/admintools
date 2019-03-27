import React, { Component } from "react";

class Page extends Component {
  
  render() {
    console.log(this.props)
    let list
    if (this.props.pages) {
      list = this.props.pages.map(page => {
      return (
        <li key={page._id}>
          <span> {page.text}</span>
        </li>
      );
    });}

    return <>{list}</>;
  }
}

export default Page;
