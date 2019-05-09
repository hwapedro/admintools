import React, { Component } from "react";
import styled from "styled-components";

import "./spinner.css";

class Spinner extends Component {
  render() {
    return (
      <div id="floatingBarsG">
        <div className="blockG" id="rotateG_01" />
        <div className="blockG" id="rotateG_02" />
        <div className="blockG" id="rotateG_03" />
        <div className="blockG" id="rotateG_04" />
        <div className="blockG" id="rotateG_05" />
        <div className="blockG" id="rotateG_06" />
        <div className="blockG" id="rotateG_07" />
        <div className="blockG" id="rotateG_08" />
      </div>
    );
  }
}

export default Spinner;
