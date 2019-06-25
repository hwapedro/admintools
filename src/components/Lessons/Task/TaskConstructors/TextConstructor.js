import React, { Component } from "react";
import { connect } from "react-redux";

import {
  TaskTitleInput,
  QuestionInput,
  DescriptionSpan,
  TaskButton
} from "../../style";
import { addTask } from "../../../../store/actions/actionLessons";


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
    await this.setState({ options: options });
  };

  addTextTask = async () => {
    await this.parseAnswer(this.state.text);
    const info = this.state;
    const { pageId, addTask } = this.props;
    const type = "text";
    await addTask(pageId, type, info);
  };

  setParams = event => {
    event.preventDefault();
  };

  render() {
    return (
      <>
        <div>
          <DescriptionSpan>Put words in ~ ~ to mark as answer</DescriptionSpan>
          <div>
            <TaskTitleInput
              name="name"
              placeholder="Title"
              onChange={this.infoChange}
            />
          </div>
          <div>
            <QuestionInput
              name="text"
              placeholder="Question"
              onChange={this.infoChange}
            />
          </div>

          <TaskButton onClick={() => this.addTextTask()}>Save</TaskButton>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  addTask: (pageid, type, info, answer) =>
    dispatch(addTask(pageid, type, info, answer))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TextConstructor);
