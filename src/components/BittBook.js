import React, {Component} from 'react'

// Helpers
import Moment from '../helpers/react-moment'

// Components
import {Card, CardHeader} from 'material-ui/Card'

class BittBook extends Component {
  updateBittBook(e) {
    e.preventDefault()

    const timestamp = Date.now()

    const bittBook = this.props.details

    const bittBookTitle = this.title.value
    bittBookTitle.length === 0 ?
    bittBook.title = 'Bitt Book Title' :
    bittBook.title = this.title.value.trim()

    bittBook.updatedAt = timestamp

    bittBook.isFirstSubmit = false

    this.props.updateBittBook(bittBook)
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.updateBittBook(e)

      this.title.blur()
    }
  }

  render() {
    const styles = {
      main: {
        display: 'inline-block',
        margin: '20px 0 0 20px'
      },

      bittBook: {
        display: 'inline-block',
        float: 'left',
        width: '164px',
        height: '172px'
      },

      cardHeader: {
        height: '156px'
      },

      title: {
        width: '128px',
        height: '100px',
        overflow: 'auto',
        margin: '16px 0 16px 0'
      },

      titleInputSubmitting: {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        width: '90%',
        margin: '0 0 0 8px',
        outline: 'none',
        border: 'none',
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#96A2AD',
        textAlign: 'center'
      },

      titleInput: {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        width: '90%',
        margin: '0 0 0 8px',
        outline: 'none',
        border: 'none',
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#146D8F',
        textAlign: 'center',
        textOverflow: 'ellipsis'
      },

      subtitle: {
        display: 'inline-block',
        width: '132px'
      },

      bittAmountMessage: {
        float: 'right'
      },

      momentDate: {
        float: 'left'
      }
    }

    const {id} = this.props

    const {details} = this.props

    const bittAmount = Object.keys(details.bitts).length

    let bittAmountMessage
    if (bittAmount === 0 || bittAmount > 1) {
      bittAmountMessage =
      <div
        style={styles.bittAmountMessage}
      >
        {bittAmount} Bitts
      </div>
    } else {
      bittAmountMessage =
      <div
        style={styles.bittAmountMessage}
      >
        {bittAmount} Bitt
      </div>
    }

    let bittBookState
    if (details.isFirstSubmit === true) {
      bittBookState =
      <Card
        id="bitt-book-card"
        style={styles.bittBook}
      >
        <CardHeader
          title={
            <div
              id="title-container"
              style={styles.title}
            >
              <form
                onSubmit={(e) => this.updateBittBook(e)}
              >
                <input
                  id="title-input-submitting"
                  style={styles.titleInputSubmitting}
                  autoFocus="true"
                  autoComplete="false"
                  ref={(input) => this.title = input}
                  onBlur={(e) => this.updateBittBook(e)}
                />
              </form>
            </div>
          }
        />
      </Card>
    }
    else {
      bittBookState =
      <Card
        id="bitt-book-card"
        style={styles.bittBook}
      >
        <CardHeader
          title={
            <div
              id="title-container"
              style={styles.title}
            >
              <input
                id="title-input"
                style={styles.titleInput}
                defaultValue={details.title}
                autoComplete="false"
                ref={(input) => this.title = input}
                onChange={(e) => this.updateBittBook(e)}
                onKeyPress={(e) => this.handleKeyPress(e)}
              />
            </div>
          }
          subtitle={
            <div
              id="subtitle-container"
              style={styles.subtitle}
            >
              <Moment
                format="MM/DD/YY"
                style={styles.momentDate}
              >
                {details.createdAt}
              </Moment>
              {bittAmountMessage}
            </div>
          }
          style={styles.cardHeader}
        />
        <button
          onTouchTap={() => this.props.deleteBittBook(id)}
        >
          Delete Bitt Book
        </button>
      </Card>
    }

    return (
      <div
        id="bitt-book"
        style={styles.main}
      >
        {bittBookState}
      </div>
    )
  }
}

export default BittBook
