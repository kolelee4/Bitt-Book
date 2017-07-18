import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import PropTypes from 'prop-types'

// Components
import Radium from 'radium'
import LinearProgress from 'material-ui/LinearProgress'
import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import RaisedButton from '../ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'

const propTypes = {
  loading:                   PropTypes.bool,
  isAccountCardForm:         PropTypes.bool,
  title:                     PropTypes.string,
  nameFloatingLabelText:     PropTypes.string,
  nameHintText:              PropTypes.string,
  name:                      PropTypes.string,
  emailFloatingLabelText:    PropTypes.string,
  emailHintText:             PropTypes.string,
  email:                     PropTypes.string,
  passwordFloatingLabelText: PropTypes.string,
  passwordHintText:          PropTypes.string,
  password:                  PropTypes.string,
  handleChangeDisplayName:   PropTypes.func,
  handleChangeEmail:         PropTypes.func,
  handleChangePassword:      PropTypes.func,
  accountStateMessage:       PropTypes.string,
  signupError:               PropTypes.string,
  loginMessage:              PropTypes.string,
  buttonLabel:               PropTypes.string,
  submit:                    PropTypes.func
}

class Form extends Component {
  render() {
    const styles = {
      formContainer: {
        width: '450px',
        height: '500px',
        margin: '10vh auto 0 auto',
        padding: '0 0 60px 0',

        '@media (max-width: 599px)': {
          width: '100%',
          height: '100%',
          margin: '0',
          padding: '0'
        }
      },

      signupProgress: {
        margin: '-4px 0 0 0'
      },

      materialFormCard: {
        cursor: 'pointer',
        height: '100%',
        padding: '24px'
      },

      formActions: {
        display: 'inline-block',
        width: '92%',
        overflow: 'visible',
        margin: '0 16px 0 16px',
        padding: '0'
      },

      formMessage: {
        float: 'left',
        width: '200px',
        margin: '0',
        padding: '0',

        '@media (max-width: 999px)': {
          width: '150px'
        }
      },

      loginMessageText: {
        color: 'red'
      },

      accountLink: {
        textDecoration: 'none',
        color: '#146D8F'
      },

      forgotPasswordLink: {
        textDecoration: 'none',
        color: '#146D8F'
      },

      formCancelButton: {
        cursor: 'pointer',
        float: 'right'
      },

      formSubmitButton: {
        cursor: 'pointer',
        float: 'right',
        margin: '0'
      }
    }

    const {
      loading,
      title,
      isAccountCardForm,
      nameFloatingLabelText,
      nameHintText,
      name,
      emailFloatingLabelText,
      emailHintText,
      email,
      passwordFloatingLabelText,
      passwordHintText,
      password,
      resetPassword,
      handleChangeDisplayName,
      handleChangeEmail,
      handleChangePassword,
      accountStateMessage,
      signupError,
      loginMessage,
      editInfoError,
      buttonLabel,
      cancel,
      submit
    } = this.props

    let formMessageState
    if (loginMessage) {
      formMessageState = (
        <div
          id="form-message"
          style={styles.formMessage}
        >
          <p
            style={styles.loginMessageText}
          >
            {signupError === 'Please enter in all your information.' ? signupError : loginMessage}
          </p>

          <br/>

          <a
            id="forgot-password-link"
            style={styles.forgotPasswordLink}
            href="#"
            onClick={resetPassword}
          >
            Forgot your password?
          </a>

          <br/>
          <br/>

          <NavLink
            id="signup-link"
            to="/sign-up"
            style={styles.accountLink}
          >
            {accountStateMessage}
          </NavLink>
        </div>
      )
    } else if (signupError) {
      formMessageState = (
        <div
          id="form-message"
          style={styles.formMessage}
        >
          <p
            style={styles.loginMessageText}
          >
            {signupError === 'Please enter in all your information.' ? signupError : loginMessage}
          </p>

          <br/>

          <NavLink
            id="signup-link"
            to="/sign-in"
            style={styles.accountLink}
          >
            {accountStateMessage}
          </NavLink>
        </div>
      )
    } else if (accountStateMessage) {
      formMessageState = (
        <div
          id="form-message"
          style={styles.formMessage}
        >
          <NavLink
            id="account-link"
            to={accountStateMessage === `Don't have an account?` ? '/sign-up' : '/sign-in'}
            style={styles.accountLink}
          >
            {accountStateMessage}
          </NavLink>
        </div>
      )
    } else {
      formMessageState = null
    }

    return (
      <form
        id="form-container"
        style={styles.formContainer}
      >
        {
          loading ? (
            <LinearProgress
              id="signup-progress"
              style={styles.signupProgress}
              mode="indeterminate"
            />
          ) : null
        }

        <Card
          id="material-form-card"
          style={styles.materialFormCard}
          zDepth={1}
        >
          <CardHeader
            id="form-header"
            title={
              <h2>
                {title}
              </h2>
            }
          />

          <CardText>
            <div
              id="text-field-container"
            >
              {
                title === 'Sign In' ? null :
                (
                  <TextField
                    fullWidth={true}
                    floatingLabelText={nameFloatingLabelText}
                    hintText={nameHintText}
                    defaultValue={name}
                    onChange={handleChangeDisplayName}
                  />
                )
              }

              <TextField
                fullWidth={true}
                floatingLabelText={emailFloatingLabelText}
                hintText={emailHintText}
                errorText={
                  signupError === 'The email address is badly formatted.' ?
                  signupError :
                  signupError === 'The email address is already in use by another account.' ?
                  signupError :
                  editInfoError === 'The email address is badly formatted.' ?
                  editInfoError :
                  editInfoError === 'The email address is already in use by another account.' ?
                  editInfoError :
                  null
                }
                defaultValue={email}
                onChange={handleChangeEmail}
              />

              <TextField
                fullWidth={true}
                type="password"
                floatingLabelText={passwordFloatingLabelText}
                hintText={passwordHintText}
                errorText={
                  signupError === 'Please enter in all your information.' || 'The email address is badly formatted.' ?
                  null :
                  signupError === 'The password must be 6 characters long or more.' ||
                  'Password should be at least 6 characters' ?
                  signupError :
                  editInfoError === 'The password must be 6 characters long or more.' ||
                  'Password should be at least 6 characters' ?
                  editInfoError :
                  null
                }
                defaultValue={password}
                onChange={handleChangePassword}
              />
            </div>
          </CardText>

          <CardActions
            id="form-actions"
            style={styles.formActions}
          >
            <div
              id="form-message-container"
              style={styles.formMessageContainer}
            >
              {formMessageState}
            </div>

            <RaisedButton
              id="form-submit-button"
              style={styles.formSubmitButton}
              primary={true}
              label={buttonLabel}
              onTouchTap={submit}
            />

            {
              isAccountCardForm ? (
                <FlatButton
                  id="form-cancel-button"
                  style={styles.formCancelButton}
                  label="Cancel"
                  onTouchTap={cancel}
                />
              ) : null
            }
          </CardActions>
        </Card>
      </form>
    )
  }
}

Form.propTypes = propTypes

export default Radium(Form)
