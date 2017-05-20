import React, {Component} from 'react'

// Components
import FABContainer from '../components/FABContainer'
import BittBook from '../components/BittBook'

class BittBooks extends Component {
  constructor(props) {
    super(props)

    this.state = {
      bittBooks: {}
    }

    this.createBittBook = this.createBittBook.bind(this)

    this.editBittBook = this.editBittBook.bind(this)
  }

  createBittBook() {
    const bittBooks = {...this.state.bittBooks}

    const timestamp = Date.now()

    const bittBook = {
      title: 'Bitt Book Title',
      createdAt: timestamp,
      updatedAt: timestamp,
      isEditing: true,
      bitts: {}
    }

    const bitt = {
      title: 'First Bitt',
      createdAt: timestamp,
      updatedAt: timestamp,
      isEditing: false
    }

    bittBooks[`bittBook-${timestamp}`] = bittBook

    bittBook.bitts[`bitt-${timestamp}`] = bitt

    this.setState({
      bittBooks
    })
  }

  editBittBook(bittBook) {
    const bittBooks = {...this.state.bittBooks}

    bittBooks[bittBook] = bittBook

    this.setState({
      bittBook: bittBooks.bittBook
    })
  }

  render() {
    const styles = {
      main: {
        margin: '0 0 0 28px'
      }
    }

    const {bittBooks} = this.state

    const bittBookAmount = Object.keys(bittBooks).length

    let bittBooksState
    if (bittBookAmount === 0) {
      bittBooksState = <h4>{this.props.noBittBooks}</h4>
    } else {
      bittBooksState =
      Object
        .keys(bittBooks)
        .map(key =>
          <BittBook
            key={key}
            id={key}
            details={bittBooks[key]}
            submitBittBook={this.editBittBook}
            editBittBook={this.editBittBook}
          />
        )
    }

    return (
      <div
        id="bitt-books-route"
        style={styles.main}
      >
        {bittBooksState}

        <FABContainer
          createBittBook={this.createBittBook}
        />
      </div>
    )
  }
}

BittBooks.defaultProps = {
  noBittBooks: `You currently have 0 bitt books.`
}

export default BittBooks
