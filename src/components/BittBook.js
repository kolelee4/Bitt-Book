import React, {Component} from 'react'
import PropTypes from 'prop-types'

// Animations
// import CSSTransitionGroup from 'react-addons-css-transition-group'

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
      isShowingBitts:   false,
      isShowingOptions: false,
      position: '',
      zDepth: 1,
      width: '164px',
      height: '172px',
      background: 'white'
    }

    this.updateBittBook = this.updateBittBook.bind(this)

    this.handleKeyPressUpdateBittBook = this.handleKeyPressUpdateBittBook.bind(this)

    this.showOptions = this.showOptions.bind(this)

    this.hideOptions = this.hideOptions.bind(this)

    this.toggleBitts = this.toggleBitts.bind(this)

    this.updateBitt = this.updateBitt.bind(this)
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

  showOptions() {
    this.setState({
      isShowingOptions: true,
      zDepth: 2
    })
  }

  hideOptions() {
    this.setState({
      isShowingOptions: false,
      zDepth: 1
    })
  }

  toggleBitts() {
    this.state.width === '164px' ?
    this.setState({
      position: 'absolute',
      zDepth: 0,
      width: '85vw',
      height: '85vh',
      background: '#e0e0e0'
    }) :
    this.setState({
      position: '',
      zDepth: 1,
      width: '164px',
      height: '172px',
      background: 'white'
    })

    setTimeout(() => {
      this.setState({
        isShowingBitts: !this.state.isShowingBitts,
        isShowingOptions: false
      })
    }, 80)

    setTimeout(() => {
      this.props.toggleBittsState()
    }, 80)
  }

  updateBitt(updatedBittBook) {
    this.props.updateBittBook(updatedBittBook)
  }

  render() {
    const styles = {
      bittBook: {
        bittBookCardPosition: this.state.position
      },

      bittBookCard: {
        cursor: 'pointer',
        position: this.state.position,
        overflow: 'hidden',
        float: 'left',
        width: this.state.width,
        height: this.state.height,
        margin: '20px 20px 0 0',
        background: this.state.background,
        transition: 'all 100ms'
      },

      bittBookHeader: {
        height: '156px'
      },

      bittBookTitleContainer: {
        width: '132px',
        overflow: 'hidden',
        margin: '20px 0 4px 0'
      },

      bittBookTitleInput: {
        width: '132px',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        outline: 'none',
        border: 'none',
        background: 'transparent',
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#146D8F',
        textOverflow: 'ellipsis'
      },

      bittBookSubtitleContainer: {
        display: 'inline-block',
        width: '100%',
        height: '100%',
        margin: '0 0 0 0'
      },

      bittBookMomentDate: {
        //
      },

      bittAmountMessage: {
        //
      },

      bittBookDeleteContainer: {
        width: '100%',
        height: '100%',
        float: 'right',
        margin: '56px 0 0 0',
        cursor: 'pointer'
      },

      deleteIconButton: {
        float: 'right',
        margin: '-20px -20px 0 0'
      },

      bittBookDeleteIcon: {
        //
      }
    }

    const {id, details} = this.props

    const bittAmount = Object.keys(details.bitts).length

    let subtitleState

    if (this.state.isShowingOptions) {
      subtitleState =
      <div>
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
                  id="bitt-book-title-input"
                  style={styles.bittBookTitleInput}
                  placeholder="Bitt Book Title..."
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
      bittBookState =
      <Card
        id="bitt-book-card"
        style={styles.bittBookCard}
        onMouseEnter={this.showOptions}
        onMouseLeave={this.hideOptions}
        zDepth={this.state.zDepth}
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
                placeholder='Bitt Book Title...'
                defaultValue={details.title}
                autoComplete="off"
                ref={(input) => this.title = input}
                onTouchTap={e => e.stopPropagation()}
                onChange={(e) => this.updateBittBook(e, details)}
                onKeyPress={(e) => this.handleKeyPressUpdateBittBook(e, details)}
                onBlur={(e) => this.updateBittBook(e, details)}
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
        onTouchTap={this.toggleBitts}
      >
        {bittBookState}
      </div>
    )
  }
}

BittBook.propTypes = {
  id:               PropTypes.string.isRequired,
  details:          PropTypes.object.isRequired,
  updateBittBook:   PropTypes.func.isRequired,
  deleteBittBook:   PropTypes.func.isRequired,
  toggleBittsState: PropTypes.func.isRequired
}

export default BittBook
