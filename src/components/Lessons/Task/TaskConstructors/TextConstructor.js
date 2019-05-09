import React, { Component } from "react";
import { connect } from "react-redux";

import { addTask } from "../../../../store/actions/actionLessons";

let index = 100;
class TextConstructor extends Component {
  state = {
    name: "",
    options: []
  };

  infoChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  parseAnswer = async string => {
    const rr = new RegExp(/\~([^~]*?)\~/gi);
    let options = [];
    let m;
    while ((m = rr.exec(string))) {
      options.push(m[1]);
    }
    await this.setState({options: options})
  };

  addTextTask = async token => {
    await this.parseAnswer(this.state.name)
    const info = this.state;
    const { pageId, addTask } = this.props;
    const type = "text";
    await addTask( pageId, type, info);
  };

  setParams = event => {
    event.preventDefault();
  };
  // \~[a-zA-Z0-9\s_/&$%#?!|,.@"';:^(){}<>[\]+*\-\\]*\~
  render() {
   // this.parseAnswer();
    let token = localStorage.getItem("userId");
    return (
      <>
        <div>
          <span>Put words in ~ ~ to mark as answer</span>
          <div>
            <input
              name="name"
              placeholder="Question"
              onChange={this.infoChange}
            />
          </div>

          <button onClick={() => this.addTextTask(token)}>Save</button>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  addTask: ( pageid, type, info, answer) =>
    dispatch(addTask( pageid, type, info, answer))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TextConstructor);
