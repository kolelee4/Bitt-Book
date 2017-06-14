import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Account extends Component {
  render() {
    const styles = {
      accountContainer: {
        margin: '0 20px 0 20px'
      }
    }

    return(
      <div
        id="account-container"
        style={styles.accountContainer}
      >
        <h3>{this.props.title}</h3>
      </div>
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
