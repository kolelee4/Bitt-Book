import React, {Component} from 'react'
import {login, resetPassword} from '../helpers/auth'

function setErrorMsg(error) {
  return {
    loginMessage: error
  }
}

class Login extends Component {
  constructor() {
    super()

    this.state = {
      loginMessage: null
    }

    this.userLogin = this.userLogin.bind(this)
    this.resetPassword = this.resetPassword.bind(this)
  }

  userLogin(e) {
    e.preventDefault()

    login(this.email.value, this.password.value)
      .catch((error) => {
        this.setState(setErrorMsg('Invalid username/password combination.'))
      })
  }

  resetPassword() {
    resetPassword(this.email.value)
      .then(() => this.setState(setErrorMsg(`Password reset email sent to ${this.email.value}`)))
      .catch((error) => this.setState(setErrorMsg('Email address not found.')))
  }

  render() {
    return (
      <div>
        <h2>Log In</h2>
        <form
          onSubmit={this.userLogin}
        >
          <label>Email</label>
          <input
            placeholder="Email"
            ref={(email) => this.email = email}
          />
          <br/>
          <label>Password</label>
          <input
            placeholder="Password"
            ref={(password) => this.password = password}
          />
          {
            this.state.loginMessage &&
            <div>
              <span>Error:</span>
              &nbsp;{this.state.loginMessage}
              <br/>
              <a
                href="#"
                onClick={this.resetPassword}               >
                Forgot Password?
              </a>
            </div>
          }
          <button type="submit">Log In</button>
        </form>
      </div>
    )
  }
}

export default Login
