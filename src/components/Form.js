import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import PropTypes from 'prop-types'

// Components
import LinearProgress from 'material-ui/LinearProgress'
import {Card, CardHeader} from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import RaisedButton from './RaisedButton'

const propTypes = {
  loading:              PropTypes.bool,
  title:                PropTypes.string.isRequired,
  name:                 PropTypes.string,
  email:                PropTypes.string.isRequired,
  password:             PropTypes.string.isRequired,
  passwordHint:         PropTypes.string.isRequired,
  handleChangeName:     PropTypes.func,
  handleChangeEmail:    PropTypes.func.isRequired,
  handleChangePassword: PropTypes.func.isRequired,
  noAccountMessage:     PropTypes.string,
  signupError:          PropTypes.string,
  loginMessage:         PropTypes.string,
  buttonLabel:          PropTypes.string.isRequired,
  submit:               PropTypes.func.isRequired
}

class Form extends Component {
  constructor() {
    super()

    this.state = {
      zDepth: 1
    }

    this.raiseForm = this.raiseForm.bind(this)
    this.lowerForm = this.lowerForm.bind(this)
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

  render() {
    const styles = {
      formContainer: {
        cursor: 'pointer',
        display: 'table',
        width: '100vw'
      },

      materialForm: {
        display: 'table-cell',
        width: '100vw',
        height: '90.2vh',
        verticalAlign: 'middle'
      },

      materialFormCard: {
        width: '450px',
        height: '500px',
        margin: '0 auto 0 auto'
      },

      formHeader: {
        float: 'left',
        margin: '0 0 0 28px'
      },

      textFieldContainer: {
        width: '80%',
        margin: '0 auto 0 auto'
      },

      formMessageContainer: {
        float: 'left',
        margin: '80px 0 0 40px'
      },

      loginMessageContainer: {
        float: 'left',
        width: '280px'
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
        margin: '80px 40px 0 0'
      },

      signupProgress: {
        margin: '0 0 -8px 0'
      }
    }

    const {
      loading,
      title,
      name,
      email,
      password,
      passwordHint,
      resetPassword,
      handleChangeName,
      handleChangeEmail,
      handleChangePassword,
      noAccountMessage,
      signupError,
      loginMessage,
      buttonLabel,
      submit
    } = this.props

    let formMessageState
    if (loginMessage) {
      formMessageState = (
        <div
          id="form-message"
        >
          <div
            id="login-message-container"
            style={styles.loginMessageContainer}
          >
            <p
              style={styles.loginMessageText}
            >
              {loginMessage}
            </p>
          </div>

          <br/>
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
          style={styles.materialForm}
          onSubmit={submit}
        >
          <Card
            id="material-form"
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

            <div
              id="text-field-container"
              style={styles.textFieldContainer}
            >
              {
                title === 'Sign In' ? null :
                (
                  <TextField
                    fullWidth={true}
                    hintText="Enter your name..."
                    floatingLabelText="Name"
                    value={name}
                    onChange={handleChangeName}
                  />
                )
              }

              <TextField
                fullWidth={true}
                hintText="Enter your email..."
                floatingLabelText="Email"
                errorText={
                  signupError === 'The email address is badly formatted.' ?
                  signupError :
                  signupError === 'The email address is already in use by another account.' ?
                  signupError :
                  null
                }
                value={email}
                onChange={handleChangeEmail}
              />

              <TextField
                fullWidth={true}
                hintText={passwordHint}
                type="password"
                floatingLabelText="Password"
                errorText={
                  signupError === 'The password must be 6 characters long or more.' ?
                  signupError : null
                }
                value={password}
                onChange={handleChangePassword}
              />
            </div>

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
          </Card>
        </form>
      </div>
    )
  }
}

Form.propTypes = propTypes

export default Form
