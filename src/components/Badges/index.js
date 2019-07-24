import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAllElements, deletElement } from "../../store/actions";

import { changeBadge, createBadge } from "../../store/actions/actionBadges";

import BadgeConstructor from "./BadgeConstructor";
import BadgesList from "./BadgeList";
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
      createBadge,
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
             value={search}
              createBadge={(title, description, name) =>
                createBadge(title, description, name)
              }
              getAllBadges={name => getAllBadges(name)}
              onChange={this.onChange}
            />

            <BadgesList
              badges={badges}
              search={search}
              changeBadge={(courseIndex, title, description, name, icon) =>
                changeBadge(courseIndex, title, description, name, icon)
              }
              delBadge={(courseIndex, name) => delBadge(courseIndex, name)}
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
  changeBadge() {},
  changeIconBadge() {}
};

Badge.propTypes = {
  badges: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  error: PropTypes.bool,

  addBadge: PropTypes.func,
  delBadge: PropTypes.func,
  getAllBadges: PropTypes.func,
  changeBadge: PropTypes.func,
  changeIconBadge: PropTypes.func
};

const mapStateToProps = state => ({
  badges: state.Badges.badges,
  loading: state.reducer.loading,
  error: state.reducer.error
});

const mapDispatchToProps = dispatch => ({
  createBadge: (title, description, icon) =>
    dispatch(createBadge(title, description, icon)),

  delBadge: (courseIndex, name) => dispatch(deletElement(courseIndex, name)),

  getAllBadges: name => dispatch(getAllElements(name)),

  changeBadge: (token, index, title, description, icon) => dispatch(changeBadge(token, index, title, description, icon))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Badge);
