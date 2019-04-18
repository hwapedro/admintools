import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import {
  changeElement,
  getAllElements,
  addElement,
  deletElement
} from "../../store/actions";


import SetCourse from "../Badges/SetBadge";
import CoursesList from "../Badges/BadgesList";
import Spinner from "../Spinner";

const name = 'badge'

class Badge extends Component {
  componentDidMount() {
    const { getAllBadges } = this.props;
    let token = localStorage.getItem("userId");
    getAllBadges(token,name);
  }

  
  render() {
    const {
      loading,
      badges,
      changeBadge,
      addBadge,
      getAllBadges,
      delBadge
    } = this.props;
    if (loading) {
      return (
        <>

          <Spinner />
        </>
      );
    }
    return (
      <>


        <SetCourse
          addBadge={(title, description, token, name) =>
            addBadge(title, description, token, name)
          }
          getAllBadges={(token, name) => getAllBadges(token, name)}
        />

        <CoursesList
          changeBadge={(courseIndex, title, description, token, name) =>
            changeBadge(courseIndex, title, description, token, name)
          }
          delBadge={(courseIndex, token, name) => delBadge(courseIndex, token, name)}
          badges={badges}
        />

      </>
    );
  }
}

Badge.defaultProps = {
  badges: [],
  loading: false,
  error: false,
  addBadge() {},
  delBadge() {},
  getAllBadges() {},
  changeBadge() {}
}

Badge.propTypes = {
  badges:  PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  error: PropTypes.bool,

  addBadge: PropTypes.func,
  delBadge: PropTypes.func,
  getAllBadges: PropTypes.func,
  changeBadge: PropTypes.func,
}

const mapStateToProps = state => ({
  badges: state.Badges.badges,
  loading: state.Badges.loading,
  error: state.Badges.error
});

const mapDispatchToProps = dispatch => ({
  addBadge: (title, description, token, name) =>
    dispatch(addElement(title, description, token, name)),

  delBadge: (courseIndex, token, name) =>
    dispatch(deletElement(courseIndex, token, name)),

  getAllBadges: (token, name) => dispatch(getAllElements(token, name)),

  changeBadge: (courseIndex, title, description, token, name) =>
    dispatch(changeElement(courseIndex, title, description, token, name))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Badge);
