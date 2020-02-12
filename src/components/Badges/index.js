import React, { Component } from "react";
import PropTypes from "prop-types";
import BadgeConstructorContainer from "../../containers/BadgesContainer/BadgeConstructorContainer";
import BadgeListContainer from "../../containers/BadgesContainer/BadgeListContainer";
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
    const { loading, error } = this.props;
    console.log(this.props);
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
            <BadgeConstructorContainer
              value={search}
              onChange={this.onChange}
              activeLanguage={activeLanguage}
              handleLangChange={activeLanguage =>
                this.handleLangChange(activeLanguage)
              }
            />

            <BadgeListContainer
              search={search}
              activeLanguage={activeLanguage}
              handleLangChange={activeLanguage =>
                this.handleLangChange(activeLanguage)
              }
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
