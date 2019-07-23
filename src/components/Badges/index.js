import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  changeElement,
  getAllElements,
  addElement,
  deletElement
} from "../../store/actions";
// import { changeIconBadge } from "../../store/actions/actionBadges";

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
      changeIconBadge,
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
              // changeIconBadge={(icon, id) => changeIconBadge(icon, id)}
              getAllBadges={name => getAllBadges(name)}
              onChange={this.onChange}
              value={search}
            />

            <BadgesList
              badges={badges}
              search={search}
              changeBadge={(courseIndex, title, description, name, icon, id) =>
                changeBadge(courseIndex, title, description, name, icon, id)
              }
              delBadge={(courseIndex, name) => delBadge(courseIndex, name)}
              // changeIconBadge={(icon, id) => changeIconBadge(icon, id)}
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
  addBadge: (title, description, name) =>
    dispatch(addElement(title, description, name)),

  delBadge: (courseIndex, name) => dispatch(deletElement(courseIndex, name)),

  getAllBadges: name => dispatch(getAllElements(name)),

  changeBadge: (courseIndex, title, description, name, icon, id) =>
    dispatch(changeElement(courseIndex, title, description, name, icon, id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Badge);
