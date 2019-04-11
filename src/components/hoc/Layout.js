import React, { Component } from "react";

import Menu from "../Menu";

class Layout extends Component {
  render() {
    return (
      <>
        <Menu />
        {this.props.children}
      </>
    );
  }
}

export default Layout;
