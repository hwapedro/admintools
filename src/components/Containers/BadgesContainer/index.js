import { connect } from "react-redux";
import Badges from "../../Badges";
import BadgesModule from "../../../store/modules/BadgesModule"
import ViewModule from '../../../store/modules/ViewModule'

const mapStateToProps = state => ({
    badges: BadgesModule.getBadges(state),
    loading: ViewModule.isLoading(state),
    error: ViewModule.isError(state)
  });
  
  const mapDispatchToProps = dispatch => ({
    createBadge: (title, description, icon) =>
      dispatch(BadgesModule.createBadge(title, description, icon)),
  
    delBadge: (courseIndex, name) => dispatch(BadgesModule.deletElement(courseIndex, name)),
  
    getAllBadges: name => dispatch(BadgesModule.getAllBadges(name)),
  
    changeBadge: (token, index, title, description, icon) => dispatch(BadgesModule.changeBadge(token, index, title, description, icon))
  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Badges);
  