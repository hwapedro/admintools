import { connect } from 'react-redux'

import BadgeConstructor from '../../../components/Badges/BadgeConstructor/'
import BadgesModule from '../../../store/modules/BadgesModule'

const mapDispatchToProps = (dispatch) => ({
  addBadge: (title, description, icon, type) => dispatch(BadgesModule.add(title, description, icon, type)),
})

export default connect(null, mapDispatchToProps)(BadgeConstructor)
