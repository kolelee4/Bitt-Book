import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import PropTypes from 'prop-types'

// Components
import {Card, CardHeader} from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import RaisedButton from './RaisedButton'

class Form extends Component {
  constructor() {
    super()
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

    return (
      <div
        id="form-container"
        style={styles.formContainer}
      >
        <form
          onSubmit={this.props.submit}
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
                  {this.props.title}
                </h2>
              }
            />

            <div
              id="text-field-container"
              style={styles.textFieldContainer}
            >
              <TextField
                // hintText="Enter your email..."
                floatingLabelText="Email"
                fullWidth={true}
                value={this.props.email}
                onChange={this.props.handleChangeEmail}
              />

              <TextField
                // hintText="Create a password..."
                type="password"
                floatingLabelText="Password"
                errorText={this.props.loginMessage}
                fullWidth={true}
                value={this.props.password}
                onChange={this.props.handleChangePassword}
              />
            </div>

            <div
              id="form-message"
              style={styles.formMessage}
            >
              {
                this.props.loginMessage ?
                <div>
                  <a
                    id="forgot-password-link"
                    style={styles.forgotPasswordLink}
                    href="#"
                    onClick={this.props.resetPassword}
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
                    {this.props.noAccountMessage}
                  </NavLink>
                </div> :
                this.props.noAccountMessage ?
                <NavLink
                  id="signup-link"
                  to="/signup"
                  style={styles.signupLink}
                >
                  {this.props.noAccountMessage}
                </NavLink> :
                null
              }
            </div>

            <RaisedButton
              id="form-submit-button"
              style={styles.formSubmitButton}
              primary={true}
              label={this.props.buttonLabel}
              onTouchTap={this.props.submit}
            />

          </Card>
        </form>
      </div>
    )
  }
}

Form.propTypes = {
  loginMessage:     PropTypes.string,
  title:            PropTypes.string.isRequired,
  noAccountMessage: PropTypes.string || null,
  buttonLabel:      PropTypes.string.isRequired,
  submit:           PropTypes.func.isRequired
}

export default Form
