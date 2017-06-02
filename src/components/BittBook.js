import React, {Component} from 'react'
import PropTypes from 'prop-types'

// Helpers
import Moment from '../helpers/react-moment'

// Components
import {Card, CardHeader} from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import ActionDelete from 'material-ui/svg-icons/action/delete'
import Bitts from './Bitts'

class BittBook extends Component {
  constructor() {
    super()

    this.state = {
      isShowingBitts: false,
      isShowingOptions: false,
      bittBooksDisplay: 'inline-block'
    }
  }

  updateBittBook(e, details) {
    e.preventDefault()

    const timestamp = Date.now()

    const updatedBittBook = details

    const bittBookTitle = this.title.value

    bittBookTitle.length === 0 ?
    updatedBittBook.title = 'Untitled' :
    updatedBittBook.title = this.title.value.trim()

    updatedBittBook.updatedAt = timestamp

    updatedBittBook.isFirstSubmit = false

    this.props.updateBittBook(updatedBittBook)
  }

  handleKeyPressUpdateBittBook(e, details) {
    if (e.key === 'Enter') {
      this.updateBittBook(e, details)

      this.title.blur()
    }
  }

  updateBitt(updatedBittBook) {
    this.props.updateBittBook(updatedBittBook)
  }

  showOptions() {
    this.setState({
      isShowingOptions: true
    })
  }

  hideOptions() {
    this.setState({
      isShowingOptions: false
    })
  }

  toggleBitts() {
    this.state.isShowingBitts === true ?
    this.setState({
      isShowingBitts: false,
      isShowingOptions: false
    }) :
    this.setState({
      isShowingBitts: true,
      isShowingOptions: false
    })

    this.props.toggleBitts()
  }

  render() {
    const styles = {
      bittBook: {
        display: 'inline-block'
      },

      bittBookCard: {
        display: this.state.bittBooksDisplay,
        overflow: 'hidden',
        float: 'left',
        width: '164px',
        height: '172px',
        margin: '20px 20px 0 0',
        cursor: 'pointer'
      },

      bittBookHeader: {
        height: '156px'
      },

      bittBookTitleContainer: {
        width: '128px',
        height: '100px',
        overflow: 'auto',
        margin: '20px 0 12px 0'
      },

      bittBookTitleInputSubmitting: {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        width: '90%',
        margin: '0 0 0 9px',
        outline: 'none',
        border: 'none',
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#424242',
        textAlign: 'center'
      },

      bittBookTitleInput: {
        width: '92%',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        margin: '0 0 0 8px',
        outline: 'none',
        border: 'none',
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#146D8F',
        textAlign: 'center',
        textOverflow: 'ellipsis'
      },

      bittBookSubtitleContainer: {
        display: 'inline-block',
        width: '100%',
        height: '100%',
        margin: '-4px 0 0 0'
      },

      bittBookMomentDate: {
        float: 'left'
      },

      bittAmountMessage: {
        float: 'right'
      },

      bittBookDeleteContainer: {
        width: '100%',
        height: '100%',
        float: 'right',
        margin: '-4px 0 0 0',
        cursor: 'pointer'
      },

      deleteIconButton: {
        float: 'right',
        margin: '-20px -20px 0 0'
      },

      bittBookDeleteIcon: {
        margin: '0',
        padding: '0'
      }
    }

    const {details, id} = this.props

    const bittAmount = Object.keys(details.bitts).length

    let subtitleState

    if (this.state.isShowingOptions) {
      subtitleState =
      <div
        id="bitt-book-delete-container"
        style={styles.bittBookDeleteContainer}
      >
        <IconButton
          style={styles.deleteIconButton}
          onTouchTap={(e) => this.props.deleteBittBook(e, id)}
        >
          <ActionDelete
            style={styles.bittBookDeleteIcon}
            color='#757575'
            hoverColor='#424242'
          />
        </IconButton>
      </div>
    } else {
      subtitleState =
      <div
        id="bitt-book-subtitle-container"
        style={styles.bittBookSubtitleContainer}
      >
        <Moment
          format="MM/DD/YY"
          style={styles.bittBookMomentDate}
        >
          {details.createdAt}
        </Moment>

        <div
          style={styles.bittAmountMessage}
        >
          {
            bittAmount === 1 ?
            bittAmount + ' Bitt' :
            bittAmount + ' Bitts'
          }
        </div>
      </div>
    }

    let bittBookState

    if (details.isFirstSubmit) {
      bittBookState =
      <Card
        id="bitt-book-card"
        style={styles.bittBookCard}
      >
        <CardHeader
          title={
            <div
              id="bitt-book-title-container"
              style={styles.bittBookTitleContainer}
            >
              <form
                onSubmit={(e) => this.updateBittBook(e, details)}
              >
                <input
                  id="bitt-book-title-input-submitting"
                  style={styles.bittBookTitleInputSubmitting}
                  autoFocus="true"
                  autoComplete="off"
                  ref={(input) => this.title = input}
                  onBlur={(e) => this.updateBittBook(e, details)}
                />
              </form>
            </div>
          }
        />
      </Card>
    } else if (this.state.isShowingBitts) {
      bittBookState =
      <Bitts
        ref={instance => this.bitts = instance}
        details={details}
        updateBitt={(updatedBittBook) => this.updateBitt(updatedBittBook)}
      />
    } else {
      bittBookState=
      <Card
        id="bitt-book-card"
        style={styles.bittBookCard}
        onMouseEnter={() => this.showOptions()}
        onMouseLeave={() => this.hideOptions()}
      >
        <CardHeader
          style={styles.bittBookHeader}
          title={
            <div
              id="bitt-book-title-container"
              style={styles.bittBookTitleContainer}
            >
              <input
                id="bitt-book-title-input"
                style={styles.bittBookTitleInput}
                placeholder="Untitled"
                defaultValue={details.title}
                autoComplete="off"
                ref={(input) => this.title = input}
                onTouchTap={e => e.stopPropagation()}
                onChange={(e) => this.updateBittBook(e, details)}
                onKeyPress={(e) => this.handleKeyPressUpdateBittBook(e, details)}
              />
            </div>
          }
          subtitle={
            subtitleState

          }
        />
      </Card>
    }

    return (
      <div
        id="bitt-book"
        style={styles.bittBook}
        onTouchTap={() => this.toggleBitts()}
      >
        {bittBookState}
      </div>
    )
  }
}

BittBook.propTypes = {
  details: PropTypes.object.isRequired,
  updateBittBook: PropTypes.func.isRequired,
  deleteBittBook: PropTypes.func.isRequired,
  toggleBitts: PropTypes.func.isRequired
}

export default BittBook
