import React, { Component } from "react";

class CourseList extends Component {
  state = {
    title: "",
    description: "",
    changeFlag: false,
    id: null
  };

  getParams = (id, title, description) => {
    console.log(id);
    this.setState({
      changeFlag: true,
      id: id,
      title: title,
      description: description
    });
  };

  setParams = event => {
    event.preventDefault();
    this.props.changeCourse(
      this.state.id,
      this.state.title,
      this.state.description
    );
    this.setState({ changeFlag: false, id: null });
  };

  deleteItem = id => {
    this.props.deleteCourse(id)
  };
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    let list = this.props.courses.map(course => {
      if (this.state.changeFlag && course.id === this.state.id) {
        return (
          <li key={course.id}>
            <form onSubmit={this.setParams}>
              <input
                name="title"
                onChange={this.onChange}
                value={this.state.title}
              />
              <textarea
                name="description"
                onChange={this.onChange}
                value={this.state.description}
              />
              <button type="submit">Подвердить</button>
            </form>
          </li>
        );
      } else {
        return (
          <li key={course.id}>
            <span>{course.title}</span>
            <span> {course.description}</span>
            <button
              onClick={() =>
                this.getParams(course.id, course.title, course.description)
              }
            >
              Изменить курс
            </button>
            <button onClick={() => this.deleteItem(course.id)}>
              Удалить курс
            </button>
          </li>
        );
      }
    });
    return (
      <>
        <ul>{list}</ul>
      </>
    );
  }
}

export default CourseList;
