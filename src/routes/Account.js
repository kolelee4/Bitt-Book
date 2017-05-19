import React, {Component} from 'react'

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

export default Account
