import { connect } from "react-redux";

import BadgeList from "../../../components/Badges/BadgeList/";
import BadgesModule from "../../../store/modules/BadgesModule";
import ViewModule from "../../../store/modules/ViewModule";

const mapStateToProps = state => ({
  badges: BadgesModule.getBadges(state),
  loading: ViewModule.isLoading(state),
  error: ViewModule.isError(state)
});

const mapDispatchToProps = dispatch => ({
  deleteBadge: badgeIndex => dispatch(BadgesModule.delete(badgeIndex)),

  changeBadge: (index, title, description, icon) =>
    dispatch(BadgesModule.change(index, title, description, icon))
});

export default connect(mapStateToProps, mapDispatchToProps)(BadgeList);
