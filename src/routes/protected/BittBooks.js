import React, {Component} from 'react'
import PropTypes from 'prop-types'

// Database
import {base} from '../../config/base'

// Helpers
import {getCurrentUser} from '../../helpers/auth'
import {getFirstName} from '../../helpers/string-manipulator'

// Components
import Radium from 'radium'
import EmailNotVerified from '../../components/EmailNotVerified'
import CircularProgress from 'material-ui/CircularProgress'
import FABContainer from '../../components/FABContainer'
import BittBook from '../../components/BittBook'
import ItemDeletedAlert from '../../components/ItemDeletedAlert'

const defaultProps = {
  noBittBooksMessage: 'You have 0 Bitt Books...'
}

const propTypes = {
  noBittBooksMessage: PropTypes.string
}

class BittBooks extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isEmailVerified: getCurrentUser().emailVerified ? true : false,
      loading:         true,
      userInfo:        {},
      bittBooks:       {},
      isShowingBitts:  false,
      snackbarOpen:    false
    }

    this.reloadPage = this.reloadPage.bind(this)
    this.createBittBook = this.createBittBook.bind(this)
    this.updateBittBook = this.updateBittBook.bind(this)
    this.deleteBittBook = this.deleteBittBook.bind(this)
    this.toggleBittsState = this.toggleBittsState.bind(this)
    this.snackBarHandleRequestClose = this.snackBarHandleRequestClose.bind(this)
  }

  componentWillMount() {
    const user = getCurrentUser()

    this.refs = (
      base.syncState(`users/${user.uid}/bittBooks`, {
        context: this,
        state:   'bittBooks'
      }),

      base.syncState(`users/${user.uid}/info`, {
        context: this,
        state:   'userInfo'
      })
    )
  }

  componentDidMount() {
    this.setState({
      loading: false
    })
  }

  reloadPage() {
    location.reload()
  }

  createBittBook() {
    const bittBooks = {...this.state.bittBooks}

    const timestamp = Date.now()

    const bittBook = {
      owner:         getCurrentUser().uid,
      title:         'Untitled',
      createdAt:     timestamp,
      updatedAt:     timestamp,
      isFirstSubmit: true,
      bitts:         {}
    }

    const bitt = {
      title:     'Default Bitt',
      createdAt: timestamp,
      updatedAt: timestamp,
      body:      'Click here to edit...'
    }

    bittBooks[`bittBook-${timestamp}`] = bittBook

    bittBook.bitts[`bitt-${timestamp}`] = bitt

    this.setState({
      bittBooks
    })
  }

  updateBittBook(updatedBittBook) {
    const bittBooks = {...this.state.bittBooks}

    // eslint-disable-next-line
    bittBooks[updatedBittBook]

    this.setState({
      bittBooks
    })
  }

  deleteBittBook(e, id) {
    e.stopPropagation()

    const bittBooks = {...this.state.bittBooks}

    bittBooks[id] = null

    this.setState({
      bittBooks
    })

    this.setState({
      isShowingBitts: false,
      snackbarOpen: true
    })
  }

  toggleBittsState() {
    this.setState({
      isShowingBitts: !this.state.isShowingBitts
    })
  }

  snackBarHandleRequestClose() {
    this.setState({
      snackbarOpen: false
    })
  }

  componentWillUnmount() {
    base.removeBinding(this.refs)
  }

  render() {
    const styles = {
      bittBooksRoute: {
        height: '88vh',
        overflow: 'auto',
        padding: '20px 0 0 15vw',

        '@media (max-width: 599px)': {
          height: '88vh',
          padding: '20px 20px 0 20px'
        }
      },

      circularProgressContainerBittBooks: {
        width: '80px',
        margin: '42vh auto 0 auto',
        padding: '0 15vw 0 0',

        '@media (max-width: 599px)': {
          padding: '0'
        }
      },

      noBittBooksMessage: {
        margin: '0',
        fontWeight: '500'
      }
    }

    const {noBittBooksMessage} = this.props

    const bittBookAmount = Object.keys(this.state.bittBooks).length

    const displayName = this.state.userInfo.displayName

    let bittBooksState
    if (bittBookAmount === 0) {
      bittBooksState = (
        <h4
          id="no-bitt-books-message"
          style={styles.noBittBooksMessage}
        >
          {
            displayName === undefined ? (
              <div
                id="circular-progress-container-bitt-books"
                style={styles.circularProgressContainerBittBooks}
              >
                <CircularProgress
                  size={80}
                  thickness={6}
                />
              </div>
            ) : (
              'Hello, ' +
              getFirstName(
                getCurrentUser().displayName === null ? displayName :
                getCurrentUser().displayName
              ) + '. ' + noBittBooksMessage
            )
          }
        </h4>
      )
    } else {
      bittBooksState = (
        Object
          .keys(this.state.bittBooks)
          .map(key =>
            <BittBook
              key={key}
              id={key}
              ref={instance => this.bittBook = instance}
              details={this.state.bittBooks[key]}
              updateBittBook={this.updateBittBook}
              deleteBittBook={this.deleteBittBook}
              toggleBittsState={this.toggleBittsState}
            />
          )
      )
    }

    let floatingActionButtonState
    if (this.state.isShowingBitts) {
      floatingActionButtonState = null
    } else {
      floatingActionButtonState = (
        <div
          className="tooltip"
          data-tooltip="Add Bitt Book"
        >
          <FABContainer
            id="fab-container-bitt-books"
            addItem={this.createBittBook}
          />
        </div>
      )
    }

    return this.state.isEmailVerified ? (
      <div
        id="bitt-books-route"
        style={styles.bittBooksRoute}
      >
        {bittBooksState}

        {floatingActionButtonState}

        <ItemDeletedAlert
          message="Bitt Book Deleted"
          isOpen={this.state.snackbarOpen}
          close={this.onActionTouchTapSnackbar}
          requestClose={this.snackBarHandleRequestClose}
        />
      </div>
    ) : (
      <EmailNotVerified/>
    )
  }
}

BittBooks.defaultProps = defaultProps

BittBooks.propTypes = propTypes

export default Radium(BittBooks)
