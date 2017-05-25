import React, {Component} from 'react'
import PropTypes from 'prop-types'

// Helpers
// import Moment from '../helpers/react-moment'

// Components
import {Card, CardHeader} from 'material-ui/Card'
import Bitt from './Bitt'

class Bitts extends Component {
  updateBitt(bitt) {
    const timestamp = Date.now()

    const bittBook = this.props.details

    bittBook.updatedAt = timestamp

    const updatedBittBook = bittBook.bitts[bitt]

    this.props.updateBitt(updatedBittBook)
  }

  render() {
    const styles = {
      bittsCard: {
        width: '85.1vw',
        height: '85vh',
        position: 'absolute',
        top: '12.2vh',
        right: '0',
        bottom: '0',
        left: '7.3vw',
        padding: '0 40px 0 40px',
        backgroundColor: '#E8EAEC',
        cursor: 'pointer'
      },

      bittsHeader: {
        //
      },

      bittsTitle: {
        fontSize: '16px',
        color: '#146D8F'
      }
    }

    const {details} = this.props

    const {bitts} = details

    const bittAmount = Object.keys(this.props.details.bitts).length

    return (
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
      </Card>
    )
  }
}

Bitts.propTypes = {
  details: PropTypes.object.isRequired,
  updateBitt: PropTypes.func.isRequired
}

export default Bitts
