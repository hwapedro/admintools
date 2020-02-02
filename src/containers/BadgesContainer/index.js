import { connect } from "react-redux";

import Badges from "../../components/Badges";
import BadgesModule from "../../store/modules/BadgesModule"
import ViewModule from '../../store/modules/ViewModule'

const mapStateToProps = state => ({
    badges: BadgesModule.getBadges(state),
    loading: ViewModule.isLoading(state),
    error: ViewModule.isError(state)
  });
  
  const mapDispatchToProps = dispatch => ({
    addBadge: (title, description, icon) =>
      dispatch(BadgesModule.add(title, description, icon)),
  
    deleteBadge: (badgeIndex) => dispatch(BadgesModule.delete(badgeIndex)),
  
    getAllBadges: () => dispatch(BadgesModule.getAll()),
  
    changeBadge: (index, title, description, icon) => dispatch(BadgesModule.change(index, title, description, icon))
  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Badges);
  