import React, {Component} from 'react'
import PropTypes from 'prop-types'

// Database
import base from '../base'

// Components
import FABContainer from '../components/FABContainer'
import BittBook from '../components/BittBook'

class BittBooks extends Component {
  constructor() {
    super()

    this.state = {
      bittBooks: {},
      isShowingBitts: false
    }

    this.createBittBook = this.createBittBook.bind(this)

    this.updateBittBook = this.updateBittBook.bind(this)

    this.deleteBittBook = this.deleteBittBook.bind(this)

    this.toggleBitts = this.toggleBitts.bind(this)
  }

  componentWillMount() {
    this.ref = base.syncState('bitt-books', {
      context: this,
      state: 'bittBooks'
    })
  }

  createBittBook() {
    const bittBooks = {...this.state.bittBooks}

    const timestamp = Date.now()

    const bittBook = {
      title: 'Untitled',
      createdAt: timestamp,
      updatedAt: timestamp,
      isFirstSubmit: true,
      bitts: {}
    }

    const bitt = {
      title: 'First Bitt',
      createdAt: timestamp,
      updatedAt: timestamp,
      body: 'Write a bitt...'
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
  }

  toggleBitts() {
    this.state.isShowingBitts === true ?
    this.setState({
      isShowingBitts: false
    }) :
    this.setState({
      isShowingBitts: true
    })
  }

  componentWillUnmount() {
    base.removeBinding(this.ref)
  }

  render() {
    const styles = {
      bittBooksRoute: {
        padding: '0 0 0 7.6vw' // 96px
      },

      noBittBooksMessage: {
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
            toggleBitts={this.toggleBitts}
          />
        )
    }

    let floatingActionButtonState

    if (this.state.isShowingBitts) {
      floatingActionButtonState =
      null
      /*
      <div
        className="tooltip-bitt"
        data-tooltip="Add Bitt"
      >
        <FABContainer
          id="fab-container"
          fabColor='#529bbf'
          addItem={(e) => this.bittBook.bitts.createBitt(e)}
        />
      </div>
      */
    } else {
      floatingActionButtonState =
      <div
        className="tooltip"
        data-tooltip="Add Bitt Book"
      >
        <FABContainer
          id="fab-container"
          addItem={this.createBittBook}
        />
      </div>
    }

    return (
      <div
        id="bitt-books-route"
        style={styles.bittBooksRoute}
      >
        {bittBooksState}

        {floatingActionButtonState}
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
