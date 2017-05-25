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
      title: 'First Bitt',
      createdAt: timestamp,
      updatedAt: timestamp,
      body: 'Write a bitt...'
    }

    bittBook.bitts[`bitt-${timestamp}`] = bitt

    const updatedBittBook = bittBook.bitts[bitt]

    this.props.updateBitt(updatedBittBook)
  }

  updateBitt(bitt) {
    const timestamp = Date.now()

    const bittBook = this.props.details

    bittBook.updatedAt = timestamp

    const updatedBittBook = bittBook.bitts[bitt]

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
        backgroundColor: '#F2F2F3',
        cursor: 'pointer'
      },

      bittsCard: {
        zIndex: '9999',
        margin: '84px 96px 16px 96px',
        padding: '0 0 32px 0',
        backgroundColor: '#E4E5E5'
      },

      bittsHeader: {
        margin: '0 72px 0 72px'
      },

      bittsTitle: {
        fontSize: '20px',
        fontWeight: '700',
        color: '#146D8F'
      }
    }

    const {details} = this.props

    const {bitts} = details

    const bittAmount = Object.keys(this.props.details.bitts).length

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
                {this.props.details.title + `'s Bitts`}
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

          {
            Object
            .keys(bitts)
            .map(key =>
              <Bitt
                key={key}
                id={key}
                details={bitts[key]}
                updateBitt={(bitt) => this.updateBitt(bitt)}
              />
            )
          }

          <button onTouchTap={(e) => this.createBitt(e)}>Add Bitt</button>
        </Card>
      </div>
    )
  }
}

Bitts.propTypes = {
  details: PropTypes.object.isRequired,
  updateBitt: PropTypes.func.isRequired
}

export default Bitts
