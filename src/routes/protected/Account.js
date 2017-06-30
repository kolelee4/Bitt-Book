import React, {Component} from 'react'

// Helpers
import {
  saveNewDisplayName,
  saveNewEmail,
  saveNewPassword,
  deleteAccount,
  reauthenticate
} from '../../helpers/auth'

// Components
import AccountCard from '../../components/AccountCard'

class Account extends Component {
  constructor() {
    super()

    this.state = {
      isEditing:       false,
      currentPassword: '',
      newDisplayName:  '',
      newEmail:        '',
      newPassword:     '',
      editInfoError:   '',
    }

    this.toggleIsEditing = this.toggleIsEditing.bind(this)
    this.handleChangeDisplayName = this.handleChangeDisplayName.bind(this)
    this.handleChangeEmail = this.handleChangeEmail.bind(this)
    this.handleChangePassword = this.handleChangePassword.bind(this)
    this.createNewDisplayName = this.createNewDisplayName.bind(this)
    this.createNewEmail = this.createNewEmail.bind(this)
    this.createNewPassword = this.createNewPassword.bind(this)
    this.deleteAccount = this.deleteAccount.bind(this)
  }

  toggleIsEditing() {
    this.setState({
      isEditing: !this.state.isEditing
    })
  }

  handleChangeDisplayName(event) {
    this.setState({
      newDisplayName: event.target.value
    })
  }

  handleChangeEmail(event) {
    this.setState({
      newEmail: event.target.value
    })
  }

  handleChangePassword(event) {
    this.setState({
      newPassword: event.target.value
    })
  }

  createNewDisplayName() {
    if (this.state.newDisplayName !== '') {
      saveNewDisplayName(this.state.newDisplayName)

      this.setState({
        isEditing: false
      })
    }
  }

  createNewEmail() {
    if (this.state.newEmail !== '') {
      saveNewEmail(this.state.newEmail)
        .then(() => {
          this.setState({
            isEditing: false
          })
        })
        .catch((e) => {
          this.setState({
            editInfoError: e.message
          })
        })
    }
  }

  createNewPassword() {
    if (this.state.newPassword !== '') {
      saveNewPassword(this.state.newPassword)
        .then(() => {
          this.setState({
            isEditing: false
          })
        })
        .catch((e) => {
          this.setState({
            editInfoError: e.message
          })
        })
    }
  }

  deleteAccount(currentPassword) {
    reauthenticate(currentPassword)
      .then(() => deleteAccount())
  }

  render() {
    return(
      <div
        id="account-route"
      >
        <AccountCard
          editInfoError={this.state.editInfoError}
          isEditing={this.state.isEditing}
          toggleIsEditing={this.toggleIsEditing}
          handleChangeDisplayName={(event) => this.handleChangeDisplayName(event)}
          handleChangeEmail={(event) => this.handleChangeEmail(event)}
          handleChangePassword={(event) => this.handleChangePassword(event)}
          createNewDisplayName={this.createNewDisplayName}
          createNewEmail={this.createNewEmail}
          createNewPassword={this.createNewPassword}
          deleteAccount={(currentPassword) => this.deleteAccount(currentPassword)}
        />
      </div>
    )
  }
}

export default Account
