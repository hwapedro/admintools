import React, { Component } from "react";
import "./spinner.css";

class Spinner extends Component {
  render() {
    return (
      <>
        <div id="floatingBarsG">
          <div class="blockG" id="rotateG_01" />
          <div class="blockG" id="rotateG_02" />
          <div class="blockG" id="rotateG_03" />
          <div class="blockG" id="rotateG_04" />
          <div class="blockG" id="rotateG_05" />
          <div class="blockG" id="rotateG_06" />
          <div class="blockG" id="rotateG_07" />
          <div class="blockG" id="rotateG_08" />
        </div>
      </>
    );
  }
}

export default Spinner;
