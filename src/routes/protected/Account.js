import React, {Component} from 'react'

// Helpers
import {
  getCurrentUser,
  saveNewDisplayName,
  saveNewEmail,
  saveNewPassword,
  deleteAccount,
  reauthenticate
} from '../../helpers/auth'

// Components
import EmailNotVerified from '../../components/EmailNotVerified'
import AccountCard from '../../components/AccountCard'

class Account extends Component {
  constructor() {
    super()

    this.state = {
      isEmailVerified:    getCurrentUser().emailVerified ? true : false,
      isEditing:          false,
      accountFormLoading: false,
      currentPassword:    '',
      newDisplayName:     '',
      newEmail:           '',
      newPassword:        '',
      editInfoError:      ''
    }

    this.reloadPage = this.reloadPage.bind(this)
    this.toggleIsEditing = this.toggleIsEditing.bind(this)
    this.handleChangeDisplayName = this.handleChangeDisplayName.bind(this)
    this.handleChangeEmail = this.handleChangeEmail.bind(this)
    this.handleChangePassword = this.handleChangePassword.bind(this)
    this.createNewDisplayName = this.createNewDisplayName.bind(this)
    this.createNewEmail = this.createNewEmail.bind(this)
    this.createNewPassword = this.createNewPassword.bind(this)
    this.deleteAccount = this.deleteAccount.bind(this)
  }

  reloadPage() {
    location.reload()
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
    this.setState({
      accountFormLoading: true
    })

    if (this.state.newDisplayName !== '') {
      saveNewDisplayName(this.state.newDisplayName)
        .then(() => {
          this.setState({
            accountFormLoading: false,
            isEditing: false
          })
        })
    } else {
      return null
    }
  }

  createNewEmail() {
    this.setState({
      accountFormLoading: true
    })

    if (this.state.newEmail !== '') {
      saveNewEmail(this.state.newEmail)
        .then(() => {
          this.setState({
            accountFormLoading: false,
            isEditing: false
          })

          getCurrentUser().sendEmailVerification()
        })
        .catch((e) => {
          this.setState({
            editInfoError: e.message
          })
        })
    } else {
      return null
    }
  }

  createNewPassword() {
    this.setState({
      accountFormLoading: true
    })

    if (this.state.newPassword !== '') {
      saveNewPassword(this.state.newPassword)
        .then(() => {
          this.setState({
            accountFormLoading: false,
            isEditing: false
          })
        })
        .catch((e) => {
          this.setState({
            editInfoError: e.message
          })
        })
    } else {
      return null
    }
  }

  deleteAccount(currentPassword) {
    reauthenticate(currentPassword)
      .then(() => deleteAccount())
  }

  render() {
    return this.state.isEmailVerified ? (
      <div
        id="account-route"
      >
        <AccountCard
          editInfoError={this.state.editInfoError}
          isEditing={this.state.isEditing}
          toggleIsEditing={this.toggleIsEditing}
          accountFormLoading={this.state.accountFormLoading}
          handleChangeDisplayName={(event) => this.handleChangeDisplayName(event)}
          handleChangeEmail={(event) => this.handleChangeEmail(event)}
          handleChangePassword={(event) => this.handleChangePassword(event)}
          createNewDisplayName={this.createNewDisplayName}
          createNewEmail={this.createNewEmail}
          createNewPassword={this.createNewPassword}
          deleteAccount={(currentPassword) => this.deleteAccount(currentPassword)}
        />
      </div>
    ) : (
      <EmailNotVerified/>
    )
  }
}

export default Account
