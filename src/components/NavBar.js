import React from 'react'
import {NavLink} from 'react-router-dom'

// Components
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import Avatar from 'material-ui/Avatar'

const styles = {
  titleStyle: {
    marginLeft: '-4px'
  },

  titleLinkStyle: {
    textDecoration: 'none',
    color: 'white'
  },

  accountSettings: {
    margin: '-2px 8px 0 0'
  }
}

const titleLink = (
  <NavLink
    to="/bitt-books"
    style={styles.titleLinkStyle}
  >
    Bitt Book
  </NavLink>
)

const NavBar = () => {
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
          <IconMenu
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            iconButtonElement={
              <IconButton
                style={styles.accountSettings}
              >
                <Avatar
                  id="avatar"
                  // color='#146D8F'
                  // backgroundColor='#e0e0e0'
                  size={30}
                >
                  KL
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
            />
          </IconMenu>
        }
      />
    </div>
  )
}

export default NavBar
