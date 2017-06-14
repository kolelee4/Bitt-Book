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

  signin(e) {
    e.preventDefault()

    login(this.state.email, this.state.password)
      .catch((error) => {
        this.setState(setErrorMsg('Invalid username/password combination.'))
      })
  }

  resetPassword() {
    resetPassword(this.state.email)
      .then(() => this.setState(setErrorMsg(`Password reset email sent to ${this.state.email}`)))
      .catch((error) => this.setState(setErrorMsg('Email address not found.')))
  }

  render() {
    return (
      <div
        id="login-container"
      >
        <Form
          title="Sign In"
          buttonLabel="Sign In"
          noAccountMessage="Don't have an acount?"
          email={this.state.email}
          password={this.state.password}
          passwordHint="Enter your password..."
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
