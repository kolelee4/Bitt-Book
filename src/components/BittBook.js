import React, {Component} from 'react'

// Helpers
import Moment from '../helpers/react-moment'

// Components
import {Card, CardHeader} from 'material-ui/Card'

class BittBook extends Component {
  editBittBook(event) {
    event.preventDefault()

    const timestamp = Date.now()

    const bittBook = this.props.details

    bittBook.title = this.title.value || 'Bitt Book Title'
    bittBook.updatedAt = timestamp
    bittBook.isEditing = false
    this.props.editBittBook(bittBook)

    this.bittBookForm.reset()
  }

  toggleEdit(event) {
    const bittBook = this.props.details

    bittBook.isEditing = true

    this.props.toggleEdit(bittBook)
  }

  render() {
    const styles = {
      main: {
        display: 'inline-block',
        margin: '16px 16px 0 16px'
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
        margin: '16px 0 16px 0',
        color: '#146D8F',
        textAlign: 'center'
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
      },

      cardActions: {
        border: 'none',
        margin: '0',
        padding: '0 0 0 8px'
      }
    }

    const {details} = this.props
    const bittAmount = Object.keys(details.bitts).length

    let bittAmountMessage
    if (bittAmount === 0 || bittAmount > 1) {
      bittAmountMessage = <div style={styles.bittAmountMessage}>{bittAmount} Bitts</div>
    } else {
      bittAmountMessage = <div style={styles.bittAmountMessage}>{bittAmount} Bitt</div>
    }

    let bittBookState
    if (details.isEditing === true) {
      bittBookState =
        <form
          id="bitt-book-edit"
          onSubmit={(e) => this.editBittBook(e)}
          ref={(input) => this.bittBookForm = input}
        >
          <input
            type="text"
            placeholder="Bitt Book Title"
            ref={(input) => this.title = input}
          />
        <button type="submit">Submit</button>
        </form>
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
              onTouchTap={(e) => this.toggleEdit(e)}
            >
              {details.title}
            </div>
          }
          subtitle={
            <div
              id="subtitle-container"
              style={styles.subtitle}
            >
              <Moment
                format="MM/DD/YYYY"
                style={styles.momentDate}
              >
                {details.createdAt}
              </Moment>
              {bittAmountMessage}
            </div>
          }
          style={styles.cardHeader}
        />
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
