import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Menu extends Component {
  render() {
    return (
      <>
        <Link to = '/courses'>Курсы</Link>
        <Link to = '/lessons'>Уроки</Link>
      </>
    );
  }
}

export default Menu;