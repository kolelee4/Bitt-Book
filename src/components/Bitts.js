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
      title: 'Untitled',
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
      bittsOutlet: {
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

      bittsCard: {
        zIndex: '9999',
        minHeight: '85vh',
        margin: '84px 96px 16px 96px',
        padding: '0 0 32px 0',
        backgroundColor: '#e0e0e0'
      },

      bittsHeader: {
        margin: '0 72px 0 72px'
      },

      noBitts: {
        fontWeight: '500'
      },

      bittsTitle: {
        fontSize: '20px',
        fontWeight: '700',
        color: '#146D8F'
      }
    }

    const {details} = this.props

    const {bitts} = details

    const bittAmount = Object.keys(details.bitts).length
    let bittsState

    if (bittAmount === 0) {
      bittsState =
      <h4
        style={styles.noBitts}
      >
        {this.props.noBitts}
      </h4>
    } else {
      bittsState =
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

    return (
      <div
        id="bitts-card"
        style={styles.bittsOutlet}
      >
        <Card
          id="bitts-card"
          style={styles.bittsCard}
          zDepth={0}
        >
          <CardHeader
            title={
              <div
                style={styles.bittsTitle}
              >
                {this.props.details.title}
              </div>
            }
            subtitle={
              <div
                id="subtitle-container"
              >
                <div
                >
                  {
                    bittAmount === 1 ?
                    bittAmount + ' Bitt' :
                    bittAmount + ' Bitts'
                  }
                </div>
              </div>
            }
            style={styles.bittsHeader}
          />

          {bittsState}
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
