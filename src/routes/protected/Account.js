import React, {Component} from 'react'

// Database
import {base} from '../../config/base'

// Helpers
import {getCurrentUser} from '../../helpers/auth'

// Components
import AccountCard from '../../components/AccountCard'

class Account extends Component {
  constructor() {
    super()

    this.state = {
      userInfo: {}
    }
  }

  componentWillMount() {
    const user = getCurrentUser()

    this.ref = base.syncState(`users/${user.uid}/info`, {
      context: this,
      state:   'userInfo'
    })
  }

  render() {
    const styles = {
      accountRoute: {
        //
      }
    }

    return(
      <div
        id="account-route"
        style={styles.accountRoute}
      >
        <AccountCard
          displayName={this.state.userInfo.displayName}
          email={this.state.userInfo.email}
        />
      </div>
    )
  }
}

export default Account
