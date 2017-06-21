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
      loading:     false,
      signupError: null,
      displayName: '',
      email:       '',
      password:    ''
    }

    this.handleChangeName = this.handleChangeDisplayName.bind(this)
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

  createUser(e) {
    e.preventDefault()

    this.setState({
      loading: true
    })

    auth(this.state.email, this.state.password)
      .catch(e => this.setState(setErrorMsg(e)))

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
          name={this.state.displayName}
          email={this.state.email}
          password={this.state.password}
          passwordHint="Create a password..."
          signupError={this.state.signupError}
          handleChangeName={(event) => this.handleChangeDisplayName(event)}
          handleChangeEmail={(event) => this.handleChangeEmail(event)}
          handleChangePassword={(event) => this.handleChangePassword(event)}
          submit={(e) => this.createUser(e)}
        />
      </div>
    )
  }
}

export default Signup
