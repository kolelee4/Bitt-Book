import React, {Component} from 'react'
import PropTypes from 'prop-types'

// Helpers
import Moment from '../helpers/react-moment'

// Components
import {Card, CardHeader} from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import Bitts from './Bitts'
import ActionDelete from 'material-ui/svg-icons/action/delete'

class BittBook extends Component {
  constructor() {
    super()

    this.state = {
      isShowingBitts: false,
      isShowingOptions: false,
      bittBooksDisplay: 'inline-block'
    }
  }

  updateBittBook(e) {
    e.preventDefault()

    const timestamp = Date.now()

    const updatedBittBook = this.props.details

    const bittBookTitle = this.title.value
    bittBookTitle.length === 0 ?
    updatedBittBook.title = 'Bitt Book Title' :
    updatedBittBook.title = this.title.value.trim()

    updatedBittBook.updatedAt = timestamp

    updatedBittBook.isFirstSubmit = false

    this.props.updateBittBook(updatedBittBook)
  }

  handleKeyPressUpdate(e) {
    if (e.key === 'Enter') {
      this.updateBittBook(e)

      this.title.blur()
    }
  }

  showBitts() {
    if (this.state.isShowingBitts) {
      this.setState({
        isShowingBitts: false,
        bittBookDisplay: 'inline-block'
      })
    } else {
      this.setState({
        isShowingBitts: true,
        bittBookDisplay: 'hidden'
      })
    }

    document.querySelector('#layout').scrollTop = 0

    this.props.showBitts()
  }

  showOptions() {
    if (this.state.isShowingOptions) {
      this.setState({
        isShowingOptions: false
      })
    } else {
      this.setState({
        isShowingOptions: true
      })
    }
  }

  updateBitt(updatedBittBook) {
    this.props.updateBittBook(updatedBittBook)
  }

  render() {
    const styles = {
      main: {
        display: 'inline-block'
      },

      bittBook: {
        display: this.state.bittBooksDisplay,
        overflow: 'hidden',
        float: 'left',
        width: '164px',
        height: '172px',
        margin: '20px 0 0 20px',
        cursor: 'pointer'
      },

      bittBookHeader: {
        height: '156px'
      },

      bittBookTitle: {
        width: '128px',
        height: '100px',
        overflow: 'auto',
        margin: '16px 0 16px 0'
      },

      bittBookTitleInputSubmitting: {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        width: '90%',
        margin: '0 0 0 8px',
        outline: 'none',
        border: 'none',
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#5A6268',
        textAlign: 'center'
      },

      bittBookTitleInput: {
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

      bittBookSubtitle: {
        display: 'inline-block',
        width: '100%',
        height: '100%'
      },

      bittAmountMessage: {
        float: 'right'
      },

      bittBookMomentDate: {
        float: 'left'
      },

      bittBookDelete: {
        width: '100%',
        height: '100%',
        float: 'left',
        margin: '-4px 0 0 0',
        cursor: 'pointer'
      },

      deleteIconButton: {
        float: 'left',
        margin: '-12px 0 0 -16px'
      },

      bittBookDeleteIcon: {
        margin: '0',
        padding: '0'
      }
    }

    const {details, id} = this.props

    const bittAmount = Object.keys(details.bitts).length

    let bittBookState

    if (details.isFirstSubmit) {
      bittBookState =
      <Card
        id="bitt-book-card"
        style={styles.bittBook}
      >
        <CardHeader
          title={
            <div
              id="bitt-book-title-container"
              style={styles.bittBookTitle}
            >
              <form
                onSubmit={(e) => this.updateBittBook(e)}
              >
                <input
                  id="bitt-book-title-input-submitting"
                  style={styles.bittBookTitleInputSubmitting}
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
    } else if (this.state.isShowingOptions) {
      bittBookState =
      <Card
        id="bitt-book-card"
        style={styles.bittBook}
      >
        <CardHeader
          title={
            <div
              id="bitt-book-title-container"
              style={styles.bittBookTitle}
            >
              <input
                id="bitt-book-title-input"
                style={styles.bittBookTitleInput}
                defaultValue={details.title}
                autoComplete="false"
                ref={(input) => this.title = input}
                onTouchTap={e => e.stopPropagation()}
                onChange={(e) => this.updateBittBook(e)}
                onKeyPress={(e) => this.handleKeyPressUpdate(e)}
              />
            </div>
          }
          subtitle={
            <div
              id="bitt-book-delete"
              style={styles.bittBookDelete}
              onMouseLeave={() => this.showOptions()}
            >
              <IconButton
                onTouchTap={() => this.props.deleteBittBook(id)}
                style={styles.deleteIconButton}
              >
                <ActionDelete
                  style={styles.bittBookDeleteIcon}
                />
              </IconButton>
            </div>
          }
          style={styles.bittBookHeader}
        />
      </Card>
    } else if (this.state.isShowingBitts) {
      bittBookState =
      <Bitts
        details={details}
        updateBitt={(updatedBittBook) => this.updateBitt(updatedBittBook)}
      />
    } else {
      bittBookState=
      <Card
        id="bitt-book-card"
        style={styles.bittBook}
      >
        <CardHeader
          title={
            <div
              id="bitt-book-title-container"
              style={styles.bittBookTitle}
            >
              <input
                id="bitt-book-title-input"
                style={styles.bittBookTitleInput}
                defaultValue={details.title}
                autoComplete="false"
                ref={(input) => this.title = input}
                onTouchTap={e => e.stopPropagation()}
                onChange={(e) => this.updateBittBook(e)}
                onKeyPress={(e) => this.handleKeyPressUpdate(e)}
              />
            </div>
          }
          subtitle={
            <div
              id="bitt-book-subtitle-container"
              style={styles.bittBookSubtitle}
              onMouseEnter={() => this.showOptions()}
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
          style={styles.bittBookHeader}
        />
      </Card>
    }

    return (
      <div
        id="bitt-book"
        style={styles.main}
        onTouchTap={() => this.showBitts()}
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
  showBitts: PropTypes.func.isRequired
}

export default BittBook
