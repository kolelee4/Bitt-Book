import React from 'react'
import {NavLink} from 'react-router-dom'
import PropTypes from 'prop-types'

// Helpers
import {logout} from '../helpers/auth'

// Components
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'

const styles = {
  titleStyle: {
    marginLeft: '-4px'
  },

  titleLinkStyle: {
    textDecoration: 'none',
    color: 'white'
  },

  authLink: {
    margin: '6px 0 0 0',
    color: 'white'
  },

  accountSettings: {
    margin: '-2px 8px 0 0'
  }
}

const signinLink = (
  <NavLink
    to="/signin"
  />
)

const NavigationBar = (props) => {
  const titleLink = (
    <NavLink
      to={props.authenticated ? "/bitt-books" : "/"}
      style={styles.titleLinkStyle}
    >
      Bitt Book
    </NavLink>
  )

  return (
    <div
      id="app-bar-container"
    >
      <AppBar
        id="app-bar"
        zDepth={2}
        title={titleLink}
        titleStyle={styles.titleStyle}
        showMenuIconButton={false}
        iconElementRight={
          props.authenticated === false ?
          <div
            id="auth-links-container"
          >
            <FlatButton
              label="Sign In"
              style={styles.authLink}
              containerElement={signinLink}
            />
          </div> :
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
                >
                  JD
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
              primaryText="Logout"
              onTouchTap={() => {logout()}}
            />
          </IconMenu>
        }
      />
    </div>
  )
}

NavigationBar.propTypes = {
  authenticated: PropTypes.bool.isRequired
}

export default NavigationBar
