import React, {Component} from 'react'
import {login, resetPassword} from '../helpers/auth'

// Components
import Form from '../components/Form'

const setErrorMsg = (error) => {
  return {
    loginMessage: error
  }
}

class Signin extends Component {
  constructor() {
    super()

    this.state = {
      loading:      false,
      loginMessage: null,
      email:        '',
      password:     ''
    }

    this.handleChangeEmail = this.handleChangeEmail.bind(this)
    this.handleChangePassword = this.handleChangePassword.bind(this)
    this.signin = this.signin.bind(this)
    this.resetPassword = this.resetPassword.bind(this)
  }

  handleChangeEmail(event) {
    this.setState({
      email: event.target.value
    })
  }

  handleChangePassword(event) {
    this.setState({
      password: event.target.value
    })
  }

  signin() {
    login(this.state.email, this.state.password)
      .catch((e) => {
        this.setState({
          loginMessage: 'Invalid username/password combination.'
        })

        this.setState({
          loading: false
        })
      })

    this.setState({
      loading: true
    })
  }

  resetPassword() {
    resetPassword(this.state.email)
      .then(() => this.setState(setErrorMsg(`Password reset email sent to ${this.state.email}`)))
      .catch((error) => this.setState(setErrorMsg('Email address not found.')))
  }

  render() {
    const styles = {
      signinContainer: {
        width: '100vw',
        height: '90.2vh',
        overflow: 'auto'
      }
    }

    return (
      <div
        id="login-container"
        style={styles.signinContainer}
      >
        <Form
          loading={this.state.loading}
          title="Sign In"
          buttonLabel="Sign In"
          accountStateMessage="Don't have an account?"
          emailFloatingLabelText="Email"
          emailHintText="Enter your email..."
          email={this.state.email}
          passwordFloatingLabelText="Password"
          passwordHintText="Enter your password..."
          password={this.state.password}
          handleChangeEmail={(event) => this.handleChangeEmail(event)}
          handleChangePassword={(event) => this.handleChangePassword(event)}
          submit={(e) => this.signin(e)}
          loginMessage={this.state.loginMessage}
          resetPassword={this.resetPassword}
        />
      </div>
    )
  }
}

export default Signin
