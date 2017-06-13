import React, {Component} from 'react'
import PropTypes from 'prop-types'

// Database
import {base} from '../../config/base'

// Helpers
import {currentUserId} from '../../helpers/auth'

// Components
import FABContainer from '../../components/FABContainer'
import BittBook from '../../components/BittBook'
import ItemDeletedAlert from '../../components/ItemDeletedAlert'

class BittBooks extends Component {
  constructor() {
    super()

    this.state = {
      loading:        true,
      bittBooks:      {},
      isShowingBitts: false,
      snackbarOpen:   false
    }

    this.createBittBook = this.createBittBook.bind(this)
    this.updateBittBook = this.updateBittBook.bind(this)
    this.deleteBittBook = this.deleteBittBook.bind(this)
    this.toggleBittsState = this.toggleBittsState.bind(this)
    this.onActionTouchTapSnackbar = this.onActionTouchTapSnackbar.bind(this)
    this.snackBarHandleRequestClose = this.snackBarHandleRequestClose.bind(this)
  }

  componentWillMount() {
    this.ref = base.syncState('bitt-books', {
      context: this,
      state:   'bittBooks'
    })
  }

  componentDidMount() {
    this.setState({
      loading: false
    })
  }

  createBittBook() {
    const bittBooks = {...this.state.bittBooks}

    const timestamp = Date.now()

    const bittBook = {
      owner:         currentUserId(),
      title:         'Untitled',
      createdAt:     timestamp,
      updatedAt:     timestamp,
      isFirstSubmit: true,
      bitts:         {}
    }

    const bitt = {
      title:     'First Bitt',
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

  onActionTouchTapSnackbar() {
    this.setState({
      snackbarOpen: false
    })
  }

  snackBarHandleRequestClose() {
    this.setState({
      snackbarOpen: false
    })
  }

  componentWillUnmount() {
    base.removeBinding(this.ref)

    this.setState({
      loading: true
    })
  }

  render() {
    const styles = {
      bittBooksRoute: {
        height: '90.5vh',
        overflow: 'auto',
        padding: '20px 0 0 7.6vw'
      },

      noBittBooksMessage: {
        margin: '0',
        fontWeight: '500'
      }
    }

    const {bittBooks} = this.state

    const bittBookAmount = Object.keys(bittBooks).length

    let bittBooksState
    if (bittBookAmount === 0) {
      bittBooksState =
      <h4
        style={styles.noBittBooksMessage}
      >
        {this.props.noBittBooks}
      </h4>
    } else {
      bittBooksState =
      Object
        .keys(bittBooks)
        .map(key =>
          <BittBook
            key={key}
            id={key}
            ref={instance => this.bittBook = instance}
            details={bittBooks[key]}
            updateBittBook={this.updateBittBook}
            deleteBittBook={this.deleteBittBook}
            toggleBittsState={this.toggleBittsState}
          />
        )
    }

    let floatingActionButtonState
    if (this.state.isShowingBitts) {
      floatingActionButtonState =
      null
    } else {
      floatingActionButtonState =
      <div
        className="tooltip"
        data-tooltip="Add Bitt Book"
      >
        <FABContainer
          id="fab-container-bitt-books"
          addItem={this.createBittBook}
        />
      </div>
    }

    return this.state.loading ? <h2>Loading...</h2> : (
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
    )
  }
}

BittBooks.defaultProps = {
  noBittBooks: `You have 0 Bitt Books...`
}

BittBooks.propTypes = {
  noBittBooks: PropTypes.string.isRequired
}

export default BittBooks
