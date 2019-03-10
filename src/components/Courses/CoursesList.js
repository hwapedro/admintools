import React, { Component } from "react";

const token = localStorage.getItem("userId");

class CourseList extends Component {
  state = {
    title: "",
    description: "",
    changeFlag: false,
    courseIndex: null
  };

  getParams = (courseIndex, title, description) => {
    this.setState({
      changeFlag: true,
      courseIndex: courseIndex,
      title: title,
      description: description
    });
  };

  setParams = event => {
    event.preventDefault();
    this.props.changeCourse(
      this.state.courseIndex,
      this.state.title,
      this.state.description,
      token
    );
    this.setState({ changeFlag: false, courseIndex: null });
  };

  deleteItem = courseIndex => {
    
    this.props.delCourse(courseIndex,token)
  };
  
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    let list = this.props.courses.map(course => {
      if (this.state.changeFlag && course.courseIndex === this.state.courseIndex) {
        return (
          <li key={course.courseIndex}>
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
          <li key={course.courseIndex}>
            <span>{course.title}</span>
            <span> {course.description}</span>
            <button
              onClick={() =>
                this.getParams(course.courseIndex, course.title, course.description)
              }
            >
              Изменить курс
            </button>
            <button onClick={() => this.deleteItem(course.courseIndex)}>
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
