import React, {Component} from 'react'

// Helpers
import {auth} from '../helpers/auth'

// Components
import Form from '../components/Form'

const setErrorMsg = (error) => {
  return {
    signupError: error.message
  }
}

class Signup extends Component {
  constructor() {
    super()

    this.state = {
      signupError: null,
      email:       '',
      password:    ''
    }

    this.handleChangeEmail = this.handleChangeEmail.bind(this)
    this.handleChangePassword = this.handleChangePassword.bind(this)
    this.createUser = this.createUser.bind(this)
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

  createUser(e) {
    e.preventDefault()

    auth(this.state.email, this.state.password)
      .catch(e => this.setState(setErrorMsg(e)))
  }

  render() {
    return (
      <div
        id="signup-container"
      >
        <Form
          title="Sign Up"
          buttonLabel="Create Account"
          email={this.state.email}
          password={this.state.password}
          passwordHint="Create a password..."
          signupError={this.state.signupError}
          handleChangeEmail={(event) => this.handleChangeEmail(event)}
          handleChangePassword={(event) => this.handleChangePassword(event)}
          submit={(e) => this.createUser(e)}
        />
      </div>
    )
  }
}

export default Signup
