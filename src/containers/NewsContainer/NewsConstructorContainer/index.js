import { connect } from "react-redux";

import NewsConstructor from "../../../components/News/NewsConstructor";
import NewsModule from "../../../store/modules/NewsModule";

const mapDispatchToProps = dispatch => ({
  addNews: (title, description, icon) => dispatch(NewsModule.add(title, description, icon))
});

export default connect(null, mapDispatchToProps)(NewsConstructor);
