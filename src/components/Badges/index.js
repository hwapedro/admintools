import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  changeElement,
  getAllElements,
  addElement,
  deletElement
} from "../../store/actions";

import BadgeConstructor from "./BadgeConstructor";
import BadgesList from "../Badges/BadgesList";
import Spinner from "../Spinner";
import Error from "../Error";

const name = "badge";

class Badge extends Component {
  state = {
    search: ""
  };

  componentDidMount() {
    const { getAllBadges } = this.props;
    getAllBadges(name);
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      loading,
      badges,
      changeBadge,
      addBadge,
      getAllBadges,
      delBadge,
      error
    } = this.props;

    const { search } = this.state;

    return (
      <>
        {error && (
          <>
            <Error name={name} />
          </>
        )}

        {loading && (
          <>
            <Spinner />
          </>
        )}
        {!error && !loading && (
          <>
            <BadgeConstructor
              addBadge={(title, description, name) =>
                addBadge(title, description, name)
              }
              getAllBadges={name => getAllBadges(name)}
              onChange={this.onChange}
              value={search}
            />

            <BadgesList
              changeBadge={(courseIndex, title, description, name) =>
                changeBadge(courseIndex, title, description, name)
              }
              delBadge={(courseIndex, name) => delBadge(courseIndex, name)}
              badges={badges}
              search={search}
            />
          </>
        )}
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
};

Badge.propTypes = {
  badges: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  error: PropTypes.bool,

  addBadge: PropTypes.func,
  delBadge: PropTypes.func,
  getAllBadges: PropTypes.func,
  changeBadge: PropTypes.func
};

const mapStateToProps = state => ({
  badges: state.Badges.badges,
  loading: state.Badges.loading,
  error: state.Badges.error
});

const mapDispatchToProps = dispatch => ({
  addBadge: (title, description, name) =>
    dispatch(addElement(title, description, name)),

  delBadge: (courseIndex, name) => dispatch(deletElement(courseIndex, name)),

  getAllBadges: name => dispatch(getAllElements(name)),

  changeBadge: (courseIndex, title, description, name) =>
    dispatch(changeElement(courseIndex, title, description, name))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Badge);
