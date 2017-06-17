import React, {Component} from 'react'
import PropTypes from 'prop-types'

const defaultProps = {
  title: 'Account'
}

const propTypes = {
  title: PropTypes.string.isRequired
}

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

Account.defaultProps = defaultProps

Account.propTypes = propTypes

export default Account
