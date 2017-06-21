import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import PropTypes from 'prop-types'

// Helpers
import {logout, getCurrentUser} from '../helpers/auth'
import {nameToInitials} from '../helpers/string-manipulator'

// Components
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'

const propTypes = {
  authenticated: PropTypes.bool.isRequired
}

class  NavigationBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      displayName: null
    }
  }

  render() {
    const styles = {
      bittBookLogoIconButton: {
        cursor: 'pointer',
        margin: '-4px 0 0 0'
      },

      authButton: {
        margin: '6px 0 0 0',
        color: 'white'
      },

      accountSettings: {
        margin: '-2px 8px 0 0'
      },

      avatarTextContainer: {
        fontWeight: '500',
        color: '#146D8F'
      }
    }

    return (
      <div
        id="app-bar-container"
      >
        <AppBar
          id="app-bar"
          zDepth={2}
          title="Bitt Book"
          iconElementLeft={
            <IconButton
              id="bitt-book-logo"
              style={styles.bittBookLogoIconButton}
              containerElement={
                <NavLink
                  to={this.props.authenticated ? '/bitt-books' : '/'}
                />
              }
            >
              <img
                src="icons/bitt-book.png"
                alt="Bitt Book Logo"
                height="32"
                width="32"
              />
            </IconButton>
          }
          iconElementRight={
            this.props.authenticated === false ? (
              <div
                id="auth-links-container"
              >
                <FlatButton
                  label="Sign In"
                  style={styles.authButton}
                  containerElement={
                    <NavLink
                      to="/sign-in"
                    />
                  }
                />

                <FlatButton
                  label="Sign Up"
                  style={styles.authButton}
                  containerElement={
                    <NavLink
                      to="/sign-up"
                    />
                  }
                />
              </div>
            ) : (
              <IconMenu
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                iconButtonElement={
                  <IconButton
                    style={styles.accountSettings}
                  >
                    <Avatar
                      id="avatar"
                      size={30}
                      backgroundColor="white"
                    >
                      <div
                        id="avatar-text-container"
                        style={styles.avatarTextContainer}
                      >
                        {
                          this.state.displayName === (undefined || null) ?
                          nameToInitials(localStorage.getItem(`${getCurrentUser().email}-display-name`)) :
                          nameToInitials(this.state.displayName)
                        }
                      </div>
                    </Avatar>
                  </IconButton>
                }
              >
                <MenuItem
                  value="1"
                  primaryText="Account"
                  containerElement={
                    <NavLink
                      to="/account"
                    />
                  }
                />

                <MenuItem
                  value="2"
                  primaryText="Bitt Books"
                  containerElement={
                    <NavLink
                      to="/bitt-books"
                    />
                  }
                />

                <MenuItem
                  value="3"
                  primaryText="Sign Out"
                  onTouchTap={() => {logout()}}
                />
              </IconMenu>
            )
          }
        />
      </div>
    )
  }
}

NavigationBar.propTypes = propTypes

export default NavigationBar
