import React, { Component } from "react";
import PropTypes from "prop-types";
import BadgeConstructor from "./BadgeConstructor";
import BadgesList from "./BadgeList";
import Spinner from "../Spinner";
import Error from "../Error";

const name = "badge";

export default class Badge extends Component {
  state = {
    search: "",
    activeLanguage: { label: "Russian", value: "ru" }
  };

  componentDidMount() {
    const { getAllBadges } = this.props;
    getAllBadges(name);
  }

  handleLangChange = activeLanguage => {
    this.setState({ activeLanguage });
  };

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
      deleteBadge,
      error
    } = this.props;

    const { search, activeLanguage } = this.state;
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
              addBadge={(title, description, icon) => addBadge(title, description, icon)}
              getAllBadges={() => getAllBadges()}
              onChange={this.onChange}
              activeLanguage={activeLanguage}
              handleLangChange={activeLanguage =>
                this.handleLangChange(activeLanguage)
              }
            />

            <BadgesList
              badges={badges}
              search={search}
              changeBadge={(badgeIndex, title, description, icon) =>
                changeBadge(badgeIndex, title, description, icon)
              }
              activeLanguage={activeLanguage}
              handleLangChange={activeLanguage =>
                this.handleLangChange(activeLanguage)
              }
              deleteBadge={badgeIndex => deleteBadge(badgeIndex)}
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
  deleteBadge() {},
  getAllBadges() {},
  changeBadge() {}
};

Badge.propTypes = {
  badges: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  error: PropTypes.bool,

  addBadge: PropTypes.func,
  deleteBadge: PropTypes.func,
  getAllBadges: PropTypes.func,
  changeBadge: PropTypes.func
};
