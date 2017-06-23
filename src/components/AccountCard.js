import React, {Component} from 'react'
import PropTypes from 'prop-types'

// Components
import Radium from 'radium'
import {Card, CardHeader, CardText, /* CardActions */} from 'material-ui/Card'
import Divider from 'material-ui/Divider'
// import Form from './Form'
import IconButton from 'material-ui/IconButton'
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit'

const defaultProps = {
  title: 'Account'
}

const propTypes = {
  title:       PropTypes.string,
  displayName: PropTypes.string,
  email:       PropTypes.string
}

class AccountCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      zDepth: 1,
      userInfo: props.userInfo,
      isEditing: false,
      newName: '',
      newEmail: '',
      newPassword: ''
    }

    this.raiseAccountCard = this.raiseAccountCard.bind(this)
    this.lowerAccountCard = this.lowerAccountCard.bind(this)
  }

  raiseAccountCard() {
    this.setState({
      zDepth: 2
    })
  }

  lowerAccountCard() {
    this.setState({
      zDepth: 1
    })
  }

  render() {
    const styles = {
      accountCardContainer: {
        width: '450px',
        height: '500px',
        margin: '60px auto 0 auto',

        '@media (max-width: 599px)': {
          width: '100%'
        }
      },

      accountCard: {
        height: '100%'
      },

      accountCardHeader: {
        margin: '0 20px 0 20px'
      },

      accountCardDivider: {
        color: '#e0e0e0'
      },

      userInfoContainer: {
        margin: '0 20px 0 20px'
      },

      accountDisplayNameContainer: {
        height: '50px'
      },

      accountEmailContainer: {
        height: '50px'
      },

      accountDisplayNameText: {
        width: '100%',
        margin: '16px 0 0 0',
        fontSize: '16px'
      },

      accountEmailText: {
        width: '100%',
        margin: '16px 0 0 0',
        fontSize: '16px'
      },

      accountModeEdit: {
        float: 'right',
        margin: '-16px 0 0 0',
        padding: '0'
      }
    }

    return(
      <div
        id="account-card-container"
        style={styles.accountCardContainer}
      >
        <Card
          id="account-card"
          style={styles.accountCard}
          zDepth={this.state.zDepth}
          onMouseEnter={this.raiseAccountCard}
          onMouseLeave={this.lowerAccountCard}
        >
          <CardHeader
            id="account-card-header"
            style={styles.accountCardHeader}
            title={
              <h2>{this.props.title}</h2>
            }
          />

          <CardText>
            <div
              id="user-info-container"
              style={styles.userInfoContainer}
            >
              <div
                id="account-display-name-container"
                style={styles.accountDisplayNameContainer}
              >
                <div
                  id="account-display-name-text"
                  style={styles.accountDisplayNameText}
                >
                  {this.props.displayName}

                  <IconButton
                    style={styles.accountModeEdit}
                  >
                    <EditorModeEdit/>
                  </IconButton>
                </div>
              </div>

              <Divider
                style={styles.accountCardDivider}
              />

              <div
                id="account-email-container"
                style={styles.accountEmailContainer}
              >
                <div
                  id="account-email-text"
                  style={styles.accountEmailText}
                >
                  {this.props.email}

                  <IconButton
                    style={styles.accountModeEdit}
                  >
                    <EditorModeEdit/>
                  </IconButton>
                </div>
              </div>
            </div>
          </CardText>
        </Card>
      </div>
    )
  }
}

AccountCard.defaultProps = defaultProps

AccountCard.propTypes = propTypes

export default Radium(AccountCard)
