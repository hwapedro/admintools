import React, { Component } from "react";

class SetCourse extends Component {
  state = {
    title: "",
    description: ""
  };

  onSubmit = (event) => {
    event.preventDefault();
    const { title, description } = this.state;
    this.props.newCourse(title, description);
  };
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    return (
      <>
        <form onSubmit={this.onSubmit}>
          <label>Название</label>
          <input
            name="title"
            placeholder="Название курса"
            type="text"
            value={this.state.title}
            onChange={this.onChange}
          />
          <label>Описание</label>
          <textarea
            name="description"
            placeholder="Описание курса"
            value={this.state.description}
            type="text"
            onChange={this.onChange}
          />
          <button type="submit">Cоздать новый курс</button>
        </form>
      </>
    );
  }
}

export default SetCourse;
