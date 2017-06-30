import React, {Component} from 'react'
import PropTypes from 'prop-types'

// Helpers
import {reauthenticate} from '../helpers/auth'

// Components
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from './RaisedButton'

const propTypes = {
  message:                   PropTypes.string.isRequired,
  isOpen:                    PropTypes.bool,
  requestClose:              PropTypes.func,
  closeReauthenticateDialog: PropTypes.func,
  setIsEditing:              PropTypes.func,
  isDeletingAccount:         PropTypes.bool,
  deleteAccount:             PropTypes.func
}

class ReauthenticateDialog extends Component {
  constructor() {
    super()

    this.state = {
      errorMessage:    null,
      currentPassword: ''
    }

    this.handleChangePassword = this.handleChangePassword.bind(this)
    this.submit = this.submit.bind(this)
    this.closeReauthenticateDialog = this.closeReauthenticateDialog.bind(this)
    this.deleteAccount = this.deleteAccount.bind(this)
  }

  handleChangePassword(event) {
    this.setState({
      currentPassword: event.target.value
    })
  }

  submit() {
    reauthenticate(this.state.currentPassword)
      .then(() => {
        this.props.closeReauthenticateDialog()

        this.props.toggleIsEditing()

        this.setState({
          currentPassword: '',
          errorMessage: ''
        })
      })
      .catch((e) => {
        this.setState({
          errorMessage: e.message
        })
      })
  }

  closeReauthenticateDialog() {
    this.setState({
      errorMessage: ''
    })

    this.props.closeReauthenticateDialog()
  }

  deleteAccount() {
    reauthenticate(this.state.currentPassword)
      .then(() => {
        this.props.deleteAccount(this.state.currentPassword)
      })
      .catch((e) => {
        this.setState({
          errorMessage: e.message
        })
      })
  }

  render() {
    const styles = {
      cancelFlatButton: {
        margin: '0 8px 0 0'
      }
    }
    const {
      message,
      isOpen,
      isDeletingAccount
    } = this.props

    const actions = [
      <FlatButton
        label="Cancel"
        style={styles.cancelFlatButton}
        onTouchTap={this.closeReauthenticateDialog}
      />,

      <RaisedButton
        label={isDeletingAccount ? 'Delete Account' : 'Submit'}
        primary={true}
        onTouchTap={isDeletingAccount ? this.deleteAccount : this.submit}
      />
    ]

    return (
      <div>
        <Dialog
          title={message}
          modal={false}
          actions={actions}
          open={isOpen}
          onRequestClose={this.closeReauthenticateDialog}
        >
          <TextField
            type="password"
            floatingLabelText="Password"
            hintText="Retype your password..."
            errorText={this.state.errorMessage}
            defaultValue={this.state.currentPassword}
            onChange={this.handleChangePassword}
          />
        </Dialog>
      </div>
    )
  }
}

ReauthenticateDialog.propTypes = propTypes

export default ReauthenticateDialog
