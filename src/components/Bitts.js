import React, {Component} from 'react'
import PropTypes from 'prop-types'

// Components
import {Card, CardHeader} from 'material-ui/Card'
import Bitt from './Bitt'

class Bitts extends Component {
  createBitt(e) {
    e.stopPropagation()

    const timestamp = Date.now()

    const bittBook = this.props.details

    const bitt = {
      title: 'Untitled Bitt',
      createdAt: timestamp,
      updatedAt: timestamp,
      body: 'Write a bitt...'
    }

    bittBook.bitts[`bitt-${timestamp}`] = bitt

    const updatedBittBook = bittBook.bitts[bitt]

    this.props.updateBitt(updatedBittBook)
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
        width: '100vw',
        height: '100vh',
        position: 'absolute',
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
        overflow: 'auto',
        backgroundColor: '#f5f5f5',
        cursor: 'pointer'
      },

      bittsContainer: {
        zIndex: '1000',
        minHeight: '84vh',
        margin: '84px 7.6vw 16px 7.6vw', // 96px
        backgroundColor: '#e0e0e0'
      },

      bittsHeader: {
        margin: '0 7.6vw 0 7.6vw' // 96px
      },

      noBitts: {
        margin: '0 7.6vw 0 7.6vw', // 96px
        fontWeight: '500'
      },

      bittBookTitle: {
        margin: '0',
        padding: '0',
        color: '#146D8F'
      },

      bittCount: {
        margin: '-16px 0 0 0'
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
        <Card
          id="bitts-container"
          style={styles.bittsContainer}
          zDepth={0}
        >
          <CardHeader
            style={styles.bittsHeader}
            title={
              <div
                style={styles.bittBookTitle}
              >
                <h2>{this.props.details.title}</h2>
              </div>
            }
            subtitle={
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
            }
          />

          {
            Object
              .keys(bitts)
              .map(key =>
                <Bitt
                  key={key}
                  id={key}
                  details={bitts[key]}
                  updateBitt={(id) => this.updateBitt(id, details)}
                  deleteBitt={(id) => this.deleteBitt(id, details)}
                />
              )
          }
        </Card>
      </div>
    )
  }
}

Bitts.defaultProps = {
  noBitts: `You currently have 0 Bitts.`
}

Bitts.propTypes = {
  noBitts: PropTypes.string.isRequired,
  details: PropTypes.object.isRequired,
  updateBitt: PropTypes.func.isRequired
}

export default Bitts
