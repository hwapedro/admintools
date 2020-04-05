import React, { Component } from "react";
import styled from "styled-components";
import Loader from "react-loader-spinner";

class Spinner extends Component {
  constructor(props) {
    super(props);
    this.timer = setTimeout(this.enableMessage, 250);
  }

  state = {
    displayMessage: false
  };

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  enableMessage = () => {
    this.setState({ displayMessage: true });
  };

  render() {
    const { displayMessage } = this.state;

    if (!displayMessage) {
      return null;
    }
    return (
      <SpinnerWrapper>
        <Loader type="Oval" color="#000000" height={50} width={50} />
      </SpinnerWrapper>
    );
  }
}

export default Spinner;

const SpinnerWrapper = styled.div`
  margin: 30rem auto 50%  ;
`;
