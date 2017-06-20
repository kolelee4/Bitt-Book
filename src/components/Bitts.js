import React, {Component} from 'react'
import PropTypes from 'prop-types'

// Helpers
import Moment from '../helpers/react-moment'

// Components
import {Card, CardHeader} from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import ActionDelete from 'material-ui/svg-icons/action/delete'
import FloatingActionButton from './FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import ItemDeletedAlert from './ItemDeletedAlert'
import Bitt from './Bitt'

const propTypes = {
  details:        PropTypes.object.isRequired,
  updateBittBook: PropTypes.func.isRequired,
  updateBitt:     PropTypes.func.isRequired,
  toggleBitts:    PropTypes.func.isRequired
}

class Bitts extends Component {
  constructor(props) {
    super(props)

    this.updateBittBook = this.updateBittBook.bind(this)
    this.handleKeyPressUpdateBittBook = this.handleKeyPressUpdateBittBook.bind(this)
    this.createBitt = this.createBitt.bind(this)
    this.updateBitt = this.updateBitt.bind(this)
    this.deleteBitt = this.deleteBitt.bind(this)
    this.animateClosing = this.animateClosing.bind(this)
    this.snackBarHandleRequestClose = this.snackBarHandleRequestClose.bind(this)

    this.state = {
      bittsCardHeight:                    '85vh',
      bittsCardMargins:                   '20px 7.6vw 0 7.6vw',
      bittsCardBackground:                'white',
      bittBookTitleContainerBittsDisplay: 'block',
      bittsHeaderDisplay:                 'block',
      bittCardContainerDisplay:           'block',
      snackbarOpen:                       false
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

  createBitt(e) {
    e.stopPropagation()

    const timestamp = Date.now()

    const bittBook = this.props.details

    const bitt = {
      title:         'Untitled Bitt',
      createdAt:     timestamp,
      updatedAt:     timestamp,
      isFirstSubmit: true,
      body:          'Write a bitt...'
    }

    bittBook.bitts[`bitt-${timestamp}`] = bitt

    const updatedBittBook = bittBook.bitts[bitt]

    this.props.updateBitt(updatedBittBook)

    const bittsContainer = document.getElementById('bitts-container')

    setTimeout(() => {
      bittsContainer.scrollTop = bittsContainer.scrollHeight - bittsContainer.clientHeight
    }, 10)
  }

  updateBitt(id, details) {
    const timestamp = Date.now()

    const bittBook = details

    bittBook.updatedAt = timestamp

    const updatedBittBook = bittBook.bitts[id]

    this.props.updateBitt(updatedBittBook)
  }

  deleteBitt(id, details) {
    const timestamp = Date.now()

    const updatedBittBook = details

    updatedBittBook.updatedAt = timestamp

    updatedBittBook.bitts[id] = null

    this.props.updateBitt(updatedBittBook)

    this.setState({
      snackbarOpen: true
    })
  }

  animateClosing() {
    this.setState({
      bittsCardHeight: '164px',
      bittsCardMargins: '20px 80vw 0 80vw',
      bittsCardBackground: 'transparent',
      bittBookTitleContainerBittsDisplay: 'none',
      bittsHeaderDisplay: 'none',
      bittCardContainerDisplay: 'none'
    })

    this.props.toggleBitts()
  }

  snackBarHandleRequestClose() {
    this.setState({
      snackbarOpen: false
    })
  }

  render() {
    const styles = {
      bittsOutletCover: {
        zIndex: '999',
        position: 'absolute',
        maxHeight: '100vh',
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
        backgroundColor: '#f5f5f5',
        cursor: 'pointer'
      },

      bittsContainer: {
        zIndex: '1000',
        height: '90vh',
        overflow: 'hidden',
        margin: '64px 0 0 0'
      },

      bittsCard: {
        height: this.state.bittsCardHeight,
        margin: this.state.bittsCardMargins,
        backgroundColor: this.state.bittsCardBackground,
        transition: '300ms'
      },

      bittsHeader: {
        display: this.state.bittsHeaderDisplay,
        boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.13)',
        background: 'white'
      },

      navigationCloseBittsContainer: {
        position: 'absolute',
        top: '0',
        right: '0',
        float: 'right'
      },

      bittsOptionsContainer: {
        position: 'absolute',
        top: '72px',
        right: '0',
        float: 'right'
      },

      bittBookTitleContainerBitts: {
        display: this.state.bittBookTitleContainerBittsDisplay
      },

      bittBookTitleInputBitts: {
        width: '80vw',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        margin: '20px 0 0 0',
        outline: 'none',
        border: 'none',
        borderRadius: '3px',
        background: 'transparent',
        fontSize: '32px',
        fontWeight: 'bold',
        color: '#146D8F',
        textOverflow: 'ellipsis'
      },

      bittCardContainer: {
        display: this.state.bittCardContainerDisplay,
        overflow: 'auto',
        margin: 'auto',
        border: '1px solid #e0e0e0',
        padding: '20px 0 0 0',
        width: '85%',
        height: '58vh',
        background: '#e0e0e0'
      },

      FABContainer: {
        zIndex: '999',
        position: 'absolute',
        right: '0',
        bottom: '0',
        width: '40px',
        height: '40px',
        margin: '0 9vw 40px 0'
      },
    }

    const {details} = this.props

    const {bitts} = details

    const bittAmount = Object.keys(details.bitts).length

    return (
      <div
        id="bitts-outlet-cover"
        style={styles.bittsOutletCover}
        onTouchTap={e => e.stopPropagation()}
      >
        <div
          id="bitts-container"
          style={styles.bittsContainer}
          onTouchTap={e => e.stopPropagation()}
        >
          <Card
            id="bitts-card"
            style={styles.bittsCard}
            zDepth={3}
            onTouchTap={e => e.stopPropagation()}
          >
            <CardHeader
              id="bitts-card-header"
              style={styles.bittsHeader}
              title={
                <div
                  id="bitt-book-title-container-bitts"
                  style={styles.bittBookTitleContainerBitts}
                >
                  <input
                    id="bitt-book-title-input-bitts"
                    style={styles.bittBookTitleInputBitts}
                    placeholder="Bitt Book Title..."
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
                <div
                  id="bitt-book-create-at-bitts"
                >
                  <Moment
                    format="MM/DD/YY"
                  >
                    {details.createdAt}
                  </Moment>

                  <div
                    id="bitt-count-bitts"
                  >
                    <div>
                      {
                        bittAmount === 1 ? bittAmount + ' Bitt' : bittAmount + ' Bitts'
                      }
                    </div>
                  </div>
                </div>
              }
            >
              <div
                id="navigation-close-bitts-container"
                style={styles.navigationCloseBittsContainer}
              >
                <IconButton>
                  <NavigationClose
                    color="#757575"
                    hoverColor="#424242"
                    onTouchTap={this.animateClosing}
                  />
                </IconButton>
              </div>

              <div
                id="bitts-options-container"
                style={styles.bittsOptionsContainer}
              >
                <IconButton>
                  <ActionDelete
                    color="#757575"
                    hoverColor="#424242"
                    onTouchTap={(e) => this.props.deleteBittBook(e)}
                  />
                </IconButton>
              </div>
            </CardHeader>

            <div
              id="fab-container-bitts"
              style={styles.FABContainer}
              className="tooltip-bitt"
              data-tooltip="Add Bitt"
            >
              <FloatingActionButton
                mini={true}
                onTouchTap={(e) => this.createBitt(e)}
              >
                <ContentAdd/>
              </FloatingActionButton>
            </div>

            <div
              id="bitt-card-container"
              style={styles.bittCardContainer}
            >
              {
                Object
                  .keys(bitts)
                  .map(key =>
                    <Bitt
                      key={key}
                      id={key}
                      details={bitts[key]}
                      bittAmount={Object.keys(details.bitts).length}
                      updateBitt={(id) => this.updateBitt(id, details)}
                      deleteBitt={(id) => this.deleteBitt(id, details)}
                    />
                  )
              }
            </div>
          </Card>

          <ItemDeletedAlert
            message="Bitt Deleted"
            isOpen={this.state.snackbarOpen}
            close={(e) => this.onActionTouchTapSnackbar(e)}
            requestClose={this.snackBarHandleRequestClose}
          />
        </div>
      </div>
    )
  }
}

Bitts.propTypes = propTypes

export default Bitts
