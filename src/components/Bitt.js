import React, {Component} from 'react'
import PropTypes from 'prop-types'

// Helpers
import Moment from '../helpers/react-moment'

// Component
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'

class Bitt extends Component {
  updateBitt() {
    const timestamp = Date.now()

    const bitt = this.props.details

    bitt.body = this.body.value

    bitt.updatedAt = timestamp

    this.props.updateBitt(bitt)
  }

  render() {
    const styles = {
      main: {
        margin: '0 0 8px 0'
      },

      bittHeader: {
        //
      },

      bittTitle: {
        color: '#146D8F'
      },

      bittMomentDate: {
        //
      },

      bittBodyPreview: {
        width: '74vw',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        margin: '12px 0 0 0'
      },

      bittTextarea: {
        width: '100%',
        outline: 'none',
        border: 'none',
        resize: 'none',
        fontSize: '13px'
      }
    }

    const {details} = this.props

    return (
      <Card
        onTouchTap={e => e.stopPropagation()}
        style={styles.main}
      >
        <CardHeader
          title={
            <div
              style={styles.bittTitle}
            >
              {details.title}
            </div>
          }
          subtitle={
            <div>
              <Moment
                format="MM/DD/YY"
                style={styles.bittMomentDate}
              >
                {details.createdAt}
              </Moment>
              <div
                style={styles.bittBodyPreview}
              >
                {details.body}
              </div>
            </div>
          }
          actAsExpander={true}
          style={styles.bittHeader}
        >

        </CardHeader>

        <CardText
          expandable={true}
        >
          <textarea
            id="bitt-edit-textarea"
            style={styles.bittTextarea}
            defaultValue={details.body}
            autoFocus={true}
            autoComplete="false"
            ref={(input) => this.body = input}
            onChange={() => this.updateBitt()}
          />
        </CardText>
      </Card>
    )
  }
}

Bitt.propTypes = {
  details: PropTypes.object.isRequired,
  updateBitt: PropTypes.func.isRequired
}

export default Bitt
