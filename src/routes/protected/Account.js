import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Account extends Component {
  render() {
    return(
      <h3>{this.props.title}</h3>
    )
  }
}

Account.defaultProps = {
  title: 'Account'
}

Account.propTypes = {
  title: PropTypes.string.isRequired
}

export default Account
