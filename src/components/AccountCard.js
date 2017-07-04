import React, {Component} from 'react'
import PropTypes from 'prop-types'

// Helpers
import {getCurrentUser} from '../helpers/auth'

// Components
import Radium from 'radium'
import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card'
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit'
import Divider from 'material-ui/Divider'
import ReauthenticateDialog from './ReauthenticateDialog'
import Form from './Form'
import IconButton from 'material-ui/IconButton'
import RaisedButton from './RaisedButton'

const defaultProps = {
  title: 'Account'
}

const propTypes = {
  title:                   PropTypes.string,
  isEditing:               PropTypes.bool,
  toggleIsEditing:         PropTypes.func,
  handleChangeDisplayName: PropTypes.func,
  handleChangeEmail:       PropTypes.func,
  handleChangePassword:    PropTypes.func,
  deleteAccount:           PropTypes.func
}

class AccountCard extends Component {
  constructor() {
    super()

    this.state = {
      isAccountCardForm:          true,
      reauthenticateDialogIsOpen: false,
      isDeletingAccount:          false
    }

    this.openReauthenticateDialog = this.openReauthenticateDialog.bind(this)
    this.closeReauthenticateDialog = this.closeReauthenticateDialog.bind(this)
    this.toggleIsEditing = this.toggleIsEditing.bind(this)
    this.submit = this.submit.bind(this)
    this.requestDeleteAccount = this.requestDeleteAccount.bind(this)
    this.cancel = this.cancel.bind(this)
  }

  openReauthenticateDialog() {
    this.setState({
      reauthenticateDialogIsOpen: true
    })
  }

  closeReauthenticateDialog() {
    this.setState({
      reauthenticateDialogIsOpen: false,
      isDeletingAccount: false
    })
  }

  toggleIsEditing() {
    this.props.toggleIsEditing()
  }

  cancel() {
    this.props.toggleIsEditing()

    this.setState({
      isDeletingAccount: false
    })
  }

  requestDeleteAccount() {
    this.openReauthenticateDialog()

    this.setState({
      isDeletingAccount: true
    })
  }

  submit() {
    this.props.createNewDisplayName()

    this.props.createNewEmail()

    this.props.createNewPassword()
  }

  render() {
    const styles = {
      accountCardComponentContianer: {
        height: '90.5vh',
        overflow: 'auto'
      },

      accountCardContainer: {
        width: '450px',
        height: '500px',
        margin: '10vh auto 0 auto',

        '@media (max-width: 999px)': {
          width: '100%',
          height: '100%',
          margin: '0'
        }
      },

      accountCard: {
        height: '100%'
      },

      accountCardHeader: {
        margin: '0 20px 0 20px'
      },

      accountModeEdit: {
        float: 'right',
        margin: '8px 0 0 0',
      },

      accountCardDivider: {
        color: '#e0e0e0'
      },

      userInfoContainer: {
        margin: '24px 24px 0 24px'
      },

      accountDisplayNameContainer: {
        height: '50px',
        border: '1px solid transparent'
      },

      accountEmailContainer: {
        height: '50px',
        border: '1px solid transparent'
      },

      accountDisplayNameText: {
        width: '100%',
        margin: '16px 0 0 0',
        fontSize: '16px'
      },

      accountEmailText: {
        width: '100%',
        margin: '16px 0 0 0',
        fontSize: '16px'
      },

      accountCardDeleteButtonContainer: {
        margin: '160px 32px 0 32px',

        '@media (max-width: 999px)': {
          margin: '120px 32px 0 32px',
        }
      }
    }

    const {
      title,
      newDisplayName,
      newEmail,
      newPassword,
      accountFormLoading,
      isEditing,
      handleChangeDisplayName,
      handleChangeEmail,
      handleChangePassword,
      editInfoError
    } = this.props

    let accountCardState
    if (isEditing) {
      accountCardState = (
        <Form
          loading={accountFormLoading}
          isAccountCardForm={this.state.isAccountCardForm}
          title="Edit Account Info"
          buttonLabel="Submit"
          nameFloatingLabelText="New Name"
          nameHintText="Change your display name..."
          name={newDisplayName}
          emailFloatingLabelText="New Email"
          emailHintText="Change your email..."
          email={newEmail}
          passwordFloatingLabelText="New Password"
          passwordHintText="Change your password..."
          password={newPassword}
          handleChangeDisplayName={handleChangeDisplayName}
          handleChangeEmail={handleChangeEmail}
          handleChangePassword={handleChangePassword}
          cancel={this.cancel}
          submit={this.submit}
          editInfoError={editInfoError}
        />
      )
    } else {
      accountCardState = (
        <div
          id="account-card-container"
          style={styles.accountCardContainer}
        >
          <Card
            id="account-card"
            style={styles.accountCard}
            zDepth={1}
          >
            <CardHeader
              id="account-card-header"
              style={styles.accountCardHeader}
              title={
                <h2>{title}</h2>
              }
            >
              <IconButton
                style={styles.accountModeEdit}
                tooltip="Edit Info"
                tooltipPosition="bottom-center"
                onTouchTap={this.openReauthenticateDialog}
              >
                <EditorModeEdit/>
              </IconButton>
            </CardHeader>

            <CardText>
              <div
                id="user-info-container"
                style={styles.userInfoContainer}
              >
                <div
                  id="account-display-name-container"
                  style={styles.accountDisplayNameContainer}
                >
                  <div
                    id="account-display-name-text"
                    style={styles.accountDisplayNameText}
                  >
                    {getCurrentUser().displayName}
                  </div>
                </div>

                <Divider
                  style={styles.accountCardDivider}
                />

                <div
                  id="account-email-container"
                  style={styles.accountEmailContainer}
                >
                  <div
                    id="account-email-text"
                    style={styles.accountEmailText}
                  >
                    {getCurrentUser().email}
                  </div>
                </div>
              </div>
            </CardText>

            <CardActions>
              <div
                id="account-card-delete-button-container"
                style={styles.accountCardDeleteButtonContainer}
              >
                <RaisedButton
                  label="Permanently Delete Account"
                  labelColor="white"
                  backgroundColor="#d32f2f"
                  fullWidth={true}
                  onTouchTap={this.requestDeleteAccount}
                />
              </div>
            </CardActions>
          </Card>
        </div>
      )
    }

    return (
      <div
        id="account-card-component-container"
        style={styles.accountCardComponentContianer}
      >
        {accountCardState}

        <ReauthenticateDialog
          message="Please retype your password..."
          isOpen={this.state.reauthenticateDialogIsOpen}
          closeReauthenticateDialog={this.closeReauthenticateDialog}
          toggleIsEditing={this.toggleIsEditing}
          isDeletingAccount={this.state.isDeletingAccount}
          deleteAccount={(currentPassword) => this.props.deleteAccount(currentPassword)}
        />
      </div>
    )
  }
}

AccountCard.defaultProps = defaultProps

AccountCard.propTypes = propTypes

export default Radium(AccountCard)
