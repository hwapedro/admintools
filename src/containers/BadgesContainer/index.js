import { connect } from "react-redux";

import Badges from "../../components/Badges";
import BadgesModule from "../../store/modules/BadgesModule";
import ViewModule from "../../store/modules/ViewModule";

const mapStateToProps = state => ({
  loading: ViewModule.isLoading(state),
  error: ViewModule.isError(state)
});

const mapDispatchToProps = dispatch => ({
  getAllBadges: () => dispatch(BadgesModule.getAll())
});

export default connect(mapStateToProps, mapDispatchToProps)(Badges);
