import React, {Component} from 'react'

// Helpers
import {auth} from '../helpers/auth'

const setErrorMsg = (error) => {
  return {
    signupError: error.message
  }
}

class Signup extends Component {
  constructor() {
    super()

    this.state = {
      signupError: null
    }

    this.createUser = this.createUser.bind(this)
  }

  createUser(e) {
    e.preventDefault()

    auth(this.email.value, this.password.value)
      .catch(e => this.setState(setErrorMsg(e)))
  }

  render() {
    return (
      <div
        id="signup-container"
      >
        <h2>Sign Up</h2>
        <form
          onSubmit={this.createUser}
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
            this.state.signupError &&
            <div>
              <span>Error:</span>&nbsp;{this.state.signupError}
            </div>
          }
          <button type="submit">Sign Up</button>
        </form>
      </div>
    )
  }
}

export default Signup
