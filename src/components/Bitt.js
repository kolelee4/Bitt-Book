import React, {Component} from 'react'
import PropTypes from 'prop-types'

// Helpers
import Moment from '../helpers/react-moment'

// Component
import {Card, CardHeader, CardText} from 'material-ui/Card'

class Bitt extends Component {
  constructor() {
    super()

    this.state = {
      bittCardZDepth: 1
    }
  }

  updateBitt() {
    const timestamp = Date.now()

    const bitt = this.props.details

    bitt.body = this.body.value

    const bittBody = this.body.value
    bittBody.length === 0 ?
    bitt.body = 'Write a bitt...' :
    bitt.body = this.body.value

    bitt.updatedAt = timestamp

    this.props.updateBitt(bitt)
  }

  changeBittZDepth(e) {
    e.stopPropagation()

    if (this.state.bittCardZDepth === 1) {
      this.setState({
        bittCardZDepth: 3
      })
    } else {
      this.setState({
        bittCardZDepth: 1
      })
    }
  }

  render() {
    const styles = {
      main: {
        margin: '0 64px 16px 64px',
        transitionDuration: '0.25s'
      },

      bittTitle: {
        color: '#146D8F'
      },

      bittBodyPreview: {
        width: '74vw',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        margin: '12px 0 0 0'
      },

      bittTextarea: {
        resize: 'none',
        width: '71.2vw',
        outline: 'none',
        border: 'none',
        borderTop: '1px solid #ECEDEE',
        margin: '-16px 0 0 0',
        padding: '16px 16px 0 16px',
        fontSize: '13px'
      }
    }

    const {details} = this.props

    return (
      <Card
        style={styles.main}
        zDepth={this.state.bittCardZDepth}
        onTouchTap={(e) => this.changeBittZDepth(e)}
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
        />

        <CardText
          expandable={true}
          style={styles.bittCardText}
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
