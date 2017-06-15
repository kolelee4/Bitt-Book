import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import PropTypes from 'prop-types'

// Components
import {Card, CardHeader} from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import RaisedButton from './RaisedButton'

class Form extends Component {
  constructor() {
    super()

    this.state = {
      zDepth: 1
    }

    this.toggleZDepth = this.toggleZDepth.bind(this)
  }

  toggleZDepth() {
    this.state.zDepth === 1 ?
    this.setState({
      zDepth: 2
    }) :
    this.setState({
      zDepth: 1
    })
  }

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

      formMessageContainer: {
        float: 'left',
        margin: '80px 0 0 3vw'
      },

      loginMessageContainer: {
        float: 'left',
        fontWeight: '500'
      },

      loginMessageText: {
        margin: '0',
        fontSize: '14px',
        fontWeight: '500',
        color: '#d32f2f'
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
      signupError,
      loginMessage,
      buttonLabel,
      submit
    } = this.props

    let formMessageState
    if (loginMessage) {
      formMessageState =
      <div
        id="form-message"
      >
        <div
          style={styles.loginMessageContainer}
        >
          <h4
            style={styles.loginMessageText}
          >
            {loginMessage}
          </h4>
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
    } else if (noAccountMessage) {
      formMessageState =
      <NavLink
        id="signup-link"
        to="/sign-up"
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
            zDepth={this.state.zDepth}
            onMouseEnter={this.toggleZDepth}
            onMouseLeave={this.toggleZDepth}
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
                errorText={signupError}
                fullWidth={true}
                value={email}
                onChange={handleChangeEmail}
              />

              <TextField
                hintText={passwordHint}
                type="password"
                floatingLabelText="Password"
                fullWidth={true}
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

Form.propTypes = {
  title:                PropTypes.string.isRequired,
  email:                PropTypes.string.isRequired,
  password:             PropTypes.string.isRequired,
  passwordHint:         PropTypes.string.isRequired,
  handleChangeEmail:    PropTypes.func.isRequired,
  handleChangePassword: PropTypes.func.isRequired,
  noAccountMessage:     PropTypes.string,
  signupError:          PropTypes.string,
  loginMessage:         PropTypes.string,
  buttonLabel:          PropTypes.string.isRequired,
  submit:               PropTypes.func.isRequired
}

export default Form
