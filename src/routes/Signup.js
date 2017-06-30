import React, {Component} from 'react'

// Helpers
import {auth} from '../helpers/auth'

// Components
import Form from '../components/Form'

class Signup extends Component {
  constructor() {
    super()

    this.state = {
      loading:     false,
      signupError: null,
      displayName: '',
      email:       '',
      password:    ''
    }

    this.handleChangeDisplayName = this.handleChangeDisplayName.bind(this)
    this.handleChangeEmail = this.handleChangeEmail.bind(this)
    this.handleChangePassword = this.handleChangePassword.bind(this)
    this.createUser = this.createUser.bind(this)
  }

  handleChangeDisplayName(event) {
    this.setState({
      displayName: event.target.value
    })
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

  createUser() {
    auth(this.state.email, this.state.password)
      .catch((e) => {
        this.setState({
          loading: false,
          signupError: e.message
        })
      })
      .then((user) => {
        user.sendEmailVerification()
      })

    this.setState({
      loading: true
    })

    localStorage.setItem(`${this.state.email}-display-name`, this.state.displayName)
  }

  render() {
    const styles = {
      signupContainer: {
        width: '100vw',
        height: '90.2vh',
        overflow: 'auto'
      }
    }

    return (
      <div
        id="signup-container"
        style={styles.signupContainer}
      >
        <Form
          loading={this.state.loading}
          title="Sign Up"
          buttonLabel="Create Account"
          nameFloatingLabelText="Name"
          nameHintText="Enter your full name..."
          name={this.state.displayName}
          emailFloatingLabelText="Email"
          emailHintText="Enter your email..."
          email={this.state.email}
          passwordFloatingLabelText="Password"
          passwordHintText="Create a password..."
          password={this.state.password}
          signupError={this.state.signupError}
          handleChangeDisplayName={(event) => this.handleChangeDisplayName(event)}
          handleChangeEmail={(event) => this.handleChangeEmail(event)}
          handleChangePassword={(event) => this.handleChangePassword(event)}
          submit={(e) => this.createUser(e)}
        />
      </div>
    )
  }
}

export default Signup
