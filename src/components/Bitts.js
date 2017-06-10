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
import Bitt from './Bitt'

class Bitts extends Component {
  constructor() {
    super()

    this.updateBittBook = this.updateBittBook.bind(this)
    this.handleKeyPressUpdateBittBook = this.handleKeyPressUpdateBittBook.bind(this)
    this.createBitt = this.createBitt.bind(this)
    this.updateBitt = this.updateBitt.bind(this)
    this.deleteBitt = this.deleteBitt.bind(this)
    this.animateClosing = this.animateClosing.bind(this)

    this.state = {
      bittsCardHeight:                    '84.5vh',
      bittsCardMargins:                   '20px 7.6vw 20px 7.6vw',
      bittsCardBackground:                '#e0e0e0',
      bittBookTitleContainerBittsDisplay: 'block',
      bittsHeaderDisplay:                 'block',
      bittCardContainerDisplay:           'block'
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
  }

  animateClosing() {
    this.setState({
      bittsCardHeight: '172px',
      bittsCardMargins: '20px 100vw 0 100vw',
      bittsCardBackground: 'transparent',
      bittBookTitleContainerBittsDisplay: 'none',
      bittsHeaderDisplay: 'none',
      bittCardContainerDisplay: 'none'
    })
  }

  render() {
    const styles = {
      bittsOutletCover: {
        zIndex: '999',
        position: 'absolute',
        height: '100vh',
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
        overflow: 'hidden',
        backgroundColor: '#f5f5f5',
        cursor: 'pointer'
      },

      bittsContainer: {
        zIndex: '1000',
        height: '90.5vh',
        overflow: 'auto',
        margin: '64px 0 0 0'
      },

      bittsCard: {
        minHeight: this.state.bittsCardHeight,
        margin: this.state.bittsCardMargins,
        padding: '0 0 20px 0',
        backgroundColor: this.state.bittsCardBackground,
        transition: '200ms'
      },

      bittBookTitleContainerBitts: {
        display: this.state.bittBookTitleContainerBittsDisplay
      },

      bittsHeader: {
        display: this.state.bittsHeaderDisplay,
        margin: '0 7.6vw -20px 7.6vw'
      },

      bittsExitContainer: {
        float: 'right',
        margin: '20px 7.7vw 0 0',
      },

      bittBookTitleInputBitts: {
        width: '66vw',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        margin: '20px 0 0 0',
        outline: 'none',
        border: 'none',
        borderRadius: '3px',
        background: 'transparent',
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#146D8F',
        textOverflow: 'ellipsis',
      },

      bittsOptionsContainer: {
        float: 'right',
        margin: '-38px -2vw 0 0'
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

      bittCardContainer: {
        display: this.state.bittCardContainerDisplay
      }
    }
    
    const {details} = this.props

    const {bitts} = details

    const bittAmount = Object.keys(details.bitts).length

    return (
      <div
        id="bitts-outlet-cover"
        style={styles.bittsOutletCover}
        onTouchTap={this.animateClosing}
      >
        <div
          id="bitts-container"
          style={styles.bittsContainer}
        >
          <div
            id="bitts-exit-container"
            style={styles.bittsExitContainer}
          >
            <IconButton>
              <NavigationClose
                color='#757575'
                hoverColor='#424242'
              />
            </IconButton>
          </div>

          <Card
            id="bitts-card"
            style={styles.bittsCard}
            zDepth={0}
            onTouchTap={this.animateClosing}
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
                    placeholder='Bitt Book Title...'
                    defaultValue={details.title}
                    autoComplete="off"
                    ref={(input) => this.title = input}
                    onTouchTap={e => e.stopPropagation()}
                    onChange={(e) => this.updateBittBook(e, details)}
                    onKeyPress={(e) => this.handleKeyPressUpdateBittBook(e, details)}
                    onBlur={(e) => this.updateBittBook(e, details)}
                  />

                  <div
                    id="bitts-options-container"
                    style={styles.bittsOptionsContainer}
                  >
                    <IconButton>
                      <ActionDelete
                        color='#757575'
                        hoverColor='#424242'
                        onTouchTap={(e) => this.props.deleteBittBook(e)}
                      />
                    </IconButton>
                  </div>
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
                        bittAmount === 1 ?
                        bittAmount + ' Bitt' :
                        bittAmount + ' Bitts'
                      }
                    </div>
                  </div>
                </div>
              }
            />

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
        </div>
      </div>
    )
  }
}

Bitts.propTypes = {
  details:                 PropTypes.object.isRequired,
  updateBittBook: PropTypes.func.isRequired,
  updateBitt:              PropTypes.func.isRequired
}

export default Bitts
