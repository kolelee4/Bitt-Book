import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import PropTypes from 'prop-types'

// Components
import Radium from 'radium'
import LinearProgress from 'material-ui/LinearProgress'
import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import RaisedButton from './RaisedButton'
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
  noAccountMessage:          PropTypes.string,
  signupError:               PropTypes.string,
  loginMessage:              PropTypes.string,
  buttonLabel:               PropTypes.string,
  submit:                    PropTypes.func
}

class Form extends Component {
  constructor() {
    super()

    this.state = {
      zDepth: 1
    }

    this.raiseForm = this.raiseForm.bind(this)
    this.lowerForm = this.lowerForm.bind(this)
    this.submit = this.submit.bind(this)
  }

  raiseForm() {
    this.setState({
      zDepth: 2
    })
  }

  lowerForm() {
    this.setState({
      zDepth: 1
    })
  }

  submit(e) {
    this.props.submit(e)
  }

  render() {
    const styles = {
      formContainer: {
        height: '90.5vh',
        overflow: 'auto'
      },

      materialForm: {
        width: '450px',
        height: '500px',
        margin: '60px auto 0 auto',

        '@media (max-width: 599px)': {
          width: '100%'
        }
      },

      materialFormCard: {
        cursor: 'pointer',
        height: '100%'
      },

      formHeader: {
        margin: '0 20px 0 20px'
      },

      textFieldContainer: {
        margin: '0 28px 0 28px'
      },

      formActions: {
        display: 'inline-block',
        width: '100%',
        padding: '80px 0 0 0'
      },

      formMessageContainer: {
        float: 'left',
        margin: '0 0 0 44px'
      },

      loginMessageText: {
        margin: '0',
        fontSize: '14px',
        color: 'red'
      },

      signupLink: {
        color: '#146D8F'
      },

      forgotPasswordLink: {
        color: '#146D8F'
      },

      formSubmitButton: {
        cursor: 'pointer',
        float: 'right',
        margin: '0 42px 0 0'
      },

      formCancelButton: {
        cursor: 'pointer',
        float: 'right'
      },

      signupProgress: {
        margin: '0 0 -4px 0'
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
      noAccountMessage,
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
        >
          <p
            style={styles.loginMessageText}
          >
            {loginMessage}
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
            style={styles.signupLink}
          >
            {noAccountMessage}
          </NavLink>
        </div>
      )
    } else if (noAccountMessage) {
      formMessageState = (
        <NavLink
          id="signup-link"
          to="/sign-up"
          style={styles.signupLink}
        >
          {noAccountMessage}
        </NavLink>
      )
    } else {
      formMessageState = null
    }

    return (
      <div
        id="form-container"
        style={styles.formContainer}
      >
        <form
          id="material-form"
          style={styles.materialForm}
          onSubmit={submit}
        >
          <Card
            id="material-form-card"
            style={styles.materialFormCard}
            zDepth={this.state.zDepth}
            onMouseEnter={this.raiseForm}
            onMouseLeave={this.lowerForm}
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

            <CardHeader
              id="form-header"
              style={styles.formHeader}
              title={
                <h2>
                  {title}
                </h2>
              }
            />

            <CardText>
              <div
                id="text-field-container"
                style={styles.textFieldContainer}
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
                    signupError === 'The password must be 6 characters long or more.' ?
                    signupError :
                    editInfoError === 'Password should be at least 6 characters' ?
                    editInfoError : null
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
                onTouchTap={(e) => this.submit(e)}
              />

              {
                isAccountCardForm ? (
                  <FlatButton
                    id="form-cancel-button"
                    style={styles.formCancelButton}
                    label="Cancel"
                    onTouchTap={cancel}
                  />
                ) : (
                  null
                )
              }
            </CardActions>
          </Card>
        </form>
      </div>
    )
  }
}

Form.propTypes = propTypes

export default Radium(Form)
