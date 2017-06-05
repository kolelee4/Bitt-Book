import React, {Component} from 'react'
import PropTypes from 'prop-types'

// Helpers
import Moment from '../helpers/react-moment'

// Components
import {Card, CardHeader} from 'material-ui/Card'
import FloatingActionButton from './FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import Bitt from './Bitt'

class Bitts extends Component {
  constructor() {
    super()

    this.createBitt = this.createBitt.bind(this)

    this.updateBitt = this.updateBitt.bind(this)

    this.deleteBitt = this.deleteBitt.bind(this)
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
    }, 100)
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

  render() {
    const styles = {
      bittsOutletCover: {
        zIndex: '999',
        height: '100vh',
        position: 'absolute',
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
        minHeight: '84.5vh',
        margin: '20px 7.6vw 20px 7.6vw',
        padding: '0 0 20px 0',
        backgroundColor: '#e0e0e0'
      },

      bittsHeader: {
        margin: '0 7.6vw -20px 7.6vw'
      },

      noBitts: {
        margin: '0 7.6vw 0 7.6vw',
        fontWeight: '500'
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

      bittBookTitle: {
        margin: '0 0 -16px 0',
        padding: '0',
        color: '#146D8F'
      },

      bittBookBittsMomentDate: {
        //
      },

      bittCount: {
        //
      }
    }

    const {details} = this.props

    const {bitts} = details

    const bittAmount = Object.keys(details.bitts).length

    return (
      <div
        id="bitts-outlet-cover"
        style={styles.bittsOutletCover}
      >
        <div
          id="bitts-container"
          style={styles.bittsContainer}
        >
          <Card
            id="bitts-card"
            style={styles.bittsCard}
            zDepth={0}
          >
            <CardHeader
              style={styles.bittsHeader}
              title={
                <div
                  style={styles.bittBookTitle}
                >
                  <h2>{details.title}</h2>
                </div>
              }
              subtitle={
                <div>
                  <Moment
                    format="MM/DD/YY"
                    style={styles.bittBookBittsMomentDate}
                  >
                    {details.createdAt}
                  </Moment>

                  <div
                    id="bitt-count"
                    style={styles.bittCount}
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
          </Card>
        </div>
      </div>
    )
  }
}

Bitts.propTypes = {
  details:    PropTypes.object.isRequired,
  updateBitt: PropTypes.func.isRequired
}

export default Bitts
