import React, {Component} from 'react'
import PropTypes from 'prop-types'

// Helpers
import {getCurrentUser} from '../../helpers/auth'
import Moment from '../../helpers/react-moment'

// Component
import CircularProgress from 'material-ui/CircularProgress'
import {Card, CardHeader} from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import ActionDelete from 'material-ui/svg-icons/action/delete'
import AlertModal from '../dialogs/AlertModal'
import Bitts from './Bitts'

const propTypes = {
  id:               PropTypes.string.isRequired,
  details:          PropTypes.object.isRequired,
  updateBittBook:   PropTypes.func.isRequired,
  deleteBittBook:   PropTypes.func.isRequired,
  toggleBittsState: PropTypes.func.isRequired
}

class BittBook extends Component {
  constructor() {
    super()

    this.state = {
      loading:                          true,
      viewport:                         {},
      isShowingBitts:                   false,
      isShowingOptions:                 false,
      zDepth:                           1,
      position:                         '',
      width:                            '164px',
      height:                           '172px',
      bittBookTitleContainerVisibility: 'visible',
      background:                       'white',
      alertModalIsOpen:                 false,
      isDeletingBittBook:               false
    }

    this.resize = this.resize.bind(this)
    this.updateBittBook = this.updateBittBook.bind(this)
    this.handleKeyPressUpdateBittBook = this.handleKeyPressUpdateBittBook.bind(this)
    this.showOptions = this.showOptions.bind(this)
    this.hideOptions = this.hideOptions.bind(this)
    this.handleOpenAlertModal = this.handleOpenAlertModal.bind(this)
    this.handleCloseAlertModal = this.handleCloseAlertModal.bind(this)
    this.toggleBitts = this.toggleBitts.bind(this)
    this.updateBitt = this.updateBitt.bind(this)
  }

  componentDidMount() {
    this.setState({
      loading: false
    })

    window.addEventListener('resize', this.resize)
  }

  resize() {
    this.setState({
      viewport: {
        width: document.documentElement.clientWidth
      }
    })
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

  deleteBittBook(e, id) {
    e.stopPropagation()

    this.props.deleteBittBook(e, id)

    this.setState({
      snackBarOpen: true
    })
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

  handleOpenAlertModal(e) {
    e.stopPropagation()

    this.setState({
      alertModalIsOpen: true,
      isDeletingBittBook: true
    })
  }

  handleCloseAlertModal() {
    this.setState({
      alertModalIsOpen: false,
      isDeletingBittBook: false
    })
  }

  toggleBitts() {
    this.state.width === '164px' ?
    this.setState({
      zDepth: 3,
      position: 'absolute',
      width: '70vw',
      height: '84.5vh',
      bittBookTitleContainerVisibility: 'hidden',
      background: '#e0e0e0'
    }) :
    this.setState({
      zDepth: 1,
      position: '',
      width: '164px',
      height: '172px',
      bittBookTitleContainerVisibility: 'visible',
      background: 'white'
    })

    setTimeout(() => {
      this.setState({
        isShowingBitts: !this.state.isShowingBitts,
        isShowingOptions: false
      })
    }, 100)

    setTimeout(() => {
      this.props.toggleBittsState()
    }, 100)
  }

  updateBitt(updatedBittBook) {
    this.props.updateBittBook(updatedBittBook)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize)
  }

  render() {
    const styles = {
      circularProgressContainer: {
        width: '32px',
        margin: '60px auto'
      },

      noBittBooksMessage: {
        margin: '0',
        fontWeight: '500'
      },

      bittBookCard: {
        cursor: 'pointer',
        position: this.state.position,
        float: 'left',
        width: this.state.width,
        height: this.state.height,
        overflow: 'hidden',
        margin: '0 20px 20px 0',
        background: this.state.background,
        transition: '100ms'
      },

      bittBookCardSmall: {
        cursor: 'pointer',
        position: 'block',
        width: this.state.width,
        height: this.state.height,
        overflow: 'hidden',
        margin: '0 auto 20px auto',
        background: this.state.background,
        transition: '100ms'
      },

      bittBookHeader: {
        height: '156px'
      },

      bittBookTitleContainer: {
        visibility: this.state.bittBookTitleContainerVisibility,
        width: '132px',
        overflow: 'hidden',
        margin: '20px 0 0 0',
        border: 'none',
        borderRadius: '3px',
        transition: '100ms'
      },

      bittBookTitleInput: {
        width: '132px',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        margin: '0',
        outline: 'none',
        border: 'none',
        padding: '0',
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
      }
    }

    const {
      id,
      details
    } = this.props

    const bittAmount = Object.keys(details.bitts).length

    let subtitleState
    if (this.state.isShowingOptions) {
      subtitleState = (
        <div
          id="bitt-book-subtitle-state-container"
        >
          <div
            id="bitt-book-subtitle-container"
            style={styles.bittBookSubtitleContainer}
          >
            <Moment
              id="bitt-book-create-at"
              format="MM/DD/YY"
            >
              {details.createdAt}
            </Moment>

            <br/>

            {bittAmount === 1 ? bittAmount + ' Bitt' : bittAmount + ' Bitts'}
          </div>

          <div
            id="bitt-book-delete-container"
            style={styles.bittBookDeleteContainer}
          >
            <IconButton
              style={styles.deleteIconButton}
              onTouchTap={(e) => this.handleOpenAlertModal(e)}
            >
              <ActionDelete
                color="#757575"
                hoverColor="#424242"
              />
            </IconButton>
          </div>
        </div>
      )
    } else {
      subtitleState = (
        <div
          id="bitt-book-subtitle-container"
          style={styles.bittBookSubtitleContainer}
        >
          <Moment
            id="bitt-book-create-at"
            format="MM/DD/YY"
          >
            {details.createdAt}
          </Moment>

          <div
            id="bitt-count"
          >
            {bittAmount === 1 ? bittAmount + ' Bitt' : bittAmount + ' Bitts'}
          </div>
        </div>
      )
    }

    let bittBookState
    if (this.state.loading) {
      bittBookState = (
        <Card
          id="bitt-book-card"
          style={
            (this.state.viewport.width <= 999 || window.innerWidth <= 999) ?
            styles.bittBookCardSmall : styles.bittBookCard
          }
        >
          <div
            id="circular-progress-container"
            style={styles.circularProgressContainer}
          >
            <CircularProgress
              size={30}
              thickness={4}
            />
          </div>
        </Card>
      )
    } else if (details.isFirstSubmit) {
      bittBookState = (
        <Card
          id="bitt-book-card"
          style={
            (this.state.viewport.width <= 999 || window.innerWidth <= 999) ?
            styles.bittBookCardSmall : styles.bittBookCard
          }
        >
          <CardHeader
            id="bitt-book-card-header"
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
      )
    } else if (this.state.isShowingBitts) {
      bittBookState = (
        <Bitts
          ref={instance => this.bitts = instance}
          details={details}
          updateBittBook={(updatedBittBook) => this.props.updateBittBook(updatedBittBook)}
          deleteBittBook={(e) => this.props.deleteBittBook(e, id)}
          updateBitt={(updatedBittBook) => this.updateBitt(updatedBittBook)}
          toggleBitts={this.toggleBitts}
        />
      )
    } else {
      bittBookState = (
        <Card
          id="bitt-book-card"
          style={
            (this.state.viewport.width <= 999 || window.innerWidth <= 999) ?
            styles.bittBookCardSmall : styles.bittBookCard
          }
          onMouseEnter={this.showOptions}
          onMouseLeave={this.hideOptions}
          zDepth={this.state.zDepth}
        >
          <CardHeader
            id="bitt-book-card-header"
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
      )
    }

    return details.owner !== getCurrentUser().uid ? (
      <Card
        id="bitt-book-card"
        style={styles.bittBookCard}
      >
        <div
          id="circular-progress-container"
          style={styles.circularProgressContainer}
        >
          <CircularProgress
            size={30}
            thickness={4}
          />
        </div>
      </Card>
    ) : (
      <div
        id="bitt-book"
        onTouchTap={this.toggleBitts}
      >
        {bittBookState}

        <AlertModal
          isOpen={this.state.alertModalIsOpen}
          isDeletingBittBook={this.state.isDeletingBittBook}
          message={`Delete ${details.title}? All Bitts will also be deleted...`}
          handleOpen={this.handleOpenAlertModal}
          handleClose={this.handleCloseAlertModal}
          action={(e) => this.deleteBittBook(e, id)}
        />
      </div>
    )
  }
}

BittBook.propTypes = propTypes

export default BittBook
