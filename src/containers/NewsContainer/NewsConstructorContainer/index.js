import { connect } from "react-redux";

import NewsConstructor from "../../../components/News/NewsConstructor";
import NewsModule from "../../../store/modules/NewsModule";

const mapDispatchToProps = dispatch => ({
  addNews: (title, description) => dispatch(NewsModule.add(title, description))
});

export default connect(null, mapDispatchToProps)(NewsConstructor);
