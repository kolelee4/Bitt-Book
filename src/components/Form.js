import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import PropTypes from 'prop-types'

// Components
import {Card, CardHeader} from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import RaisedButton from './RaisedButton'

class Form extends Component {
  render() {
    const styles = {
      formContainer: {
        cursor: 'pointer',
        width: '100vw'
      },

      materialForm: {
        width: '450px',
        height: '500px',
        margin: '60px auto 0 auto'
      },

      formHeader: {
        margin: '0 0 0 20px'
      },

      textFieldContainer: {
        width: '80%',
        margin: '0 auto 0 auto'
      },

      formMessage: {
        float: 'left',
        margin: '80px 0 0 3vw'
      },

      signupLink: {
        color: '#146D8F'
      },

      forgotPasswordLink: {
        color: '#146D8F'
      },

      formSubmitButton: {
        float: 'right',
        margin: '80px 3vw 0 0'
      }
    }

    const {
      title,
      email,
      password,
      passwordHint,
      resetPassword,
      handleChangeEmail,
      handleChangePassword,
      noAccountMessage,
      loginMessage,
      buttonLabel,
      submit
    } = this.props

    let formMessageState
    if (loginMessage) {
      formMessageState =
      <div
        id="form-message-link-container"
      >
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
          to="/signup"
          style={styles.signupLink}
        >
          {noAccountMessage}
        </NavLink>
      </div>
    } else if (noAccountMessage) {
      formMessageState =
      <NavLink
        id="signup-link"
        to="/signup"
        style={styles.signupLink}
      >
        {noAccountMessage}
      </NavLink>
    } else {
      formMessageState =
      null
    }

    return (
      <div
        id="form-container"
        style={styles.formContainer}
      >
        <form
          onSubmit={submit}
        >
          <Card
            id="material-form"
            style={styles.materialForm}
          >
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
              <TextField
                hintText="Enter your email..."
                floatingLabelText="Email"
                fullWidth={true}
                value={email}
                onChange={handleChangeEmail}
              />

              <TextField
                hintText={passwordHint}
                type="password"
                floatingLabelText="Password"
                errorText={loginMessage}
                fullWidth={true}
                value={password}
                onChange={handleChangePassword}
              />
            </div>

            <div
              id="form-message"
              style={styles.formMessage}
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

Form.propTypes = {
  title:                PropTypes.string.isRequired,
  email:                PropTypes.string.isRequired,
  password:             PropTypes.string.isRequired,
  passwordHint:         PropTypes.string.isRequired,
  handleChangeEmail:    PropTypes.func.isRequired,
  handleChangePassword: PropTypes.func.isRequired,
  noAccountMessage:     PropTypes.string,
  loginMessage:         PropTypes.string,
  buttonLabel:          PropTypes.string.isRequired,
  submit:               PropTypes.func.isRequired
}

export default Form
