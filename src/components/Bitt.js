import React, {Component} from 'react'
import PropTypes from 'prop-types'

// Helpers
import Moment from '../helpers/react-moment'

// Component
import {Card, CardHeader, CardText} from 'material-ui/Card'
import Divider from 'material-ui/Divider'
import IconButton from 'material-ui/IconButton'
import ActionDelete from 'material-ui/svg-icons/action/delete'

class Bitt extends Component {
  constructor() {
    super()

    this.state = {
      bittCardZDepth: 1,
      isShowingOptions: false
    }
  }

  updateBitt(details) {
    const timestamp = Date.now()

    const bitt = details

    const bittBody = this.body.value

    bittBody.length === 0 ?
    bitt.body = 'Write a bitt...' :
    bitt.body = this.body.value

    bitt.updatedAt = timestamp

    this.props.updateBitt(bitt)
  }

  deleteBitt(e, id) {
    e.stopPropagation()

    this.props.deleteBitt(id)
  }

  showOptions(e) {
    e.stopPropagation()

    this.setState({
      isShowingOptions: true
    })
  }

  hideOptions(e) {
    e.stopPropagation()

    this.setState({
      isShowingOptions: false
    })
  }

  changeBittZDepth(e) {
    e.stopPropagation()

    this.state.bittCardZDepth === 1 ?
    this.setState({
      bittCardZDepth: 3
    }) :
    this.setState({
      bittCardZDepth: 1
    })
  }

  render() {
    const styles = {
      bittCard: {
        overflow: 'hidden',
        margin: '0 6.9vw 20px 6.9vw', // 88px
        transitionDuration: '0.25s'
      },

      bittTitle: {
        color: '#146D8F'
      },

      bittBodyPreview: {
        width: '68vw',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        margin: '12px 0 0 0'
      },

      bittDivider: {
        color: '#e0e0e0'
      },

      bittTextarea: {
        resize: 'none',
        width: '95%',
        outline: 'none',
        border: 'none',
        margin: '0 0 0 0',
        padding: '20px 20px 0 20px',
        fontSize: '13px',
        fontWeight: '500'
      },

      bittDeleteButton: {
        float: 'right'
      }
    }

    const {details, id} = this.props

    let isShowingOptions

    if (this.state.isShowingOptions) {
      isShowingOptions =
      <IconButton
        id="bitt-delete-button"
        style={styles.bittDeleteButton}
        onTouchTap={(e) => this.deleteBitt(e, id)}
      >
        <ActionDelete
          hoverColor='#d32f2f'
        />
      </IconButton>
    } else {
      isShowingOptions =
      null
    }

    return (
      <Card
        id="bitt-card"
        style={styles.bittCard}
        zDepth={this.state.bittCardZDepth}
        onMouseEnter={(e) => this.showOptions(e)}
        onMouseLeave={(e) => this.hideOptions(e)}
        onTouchTap={(e) => this.changeBittZDepth(e)}
      >
        {isShowingOptions}

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
                fromNow
                style={styles.bittMomentDate}
              >
                {details.updatedAt}
              </Moment>
              ...
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
          <Divider
            style={styles.bittDivider}
          />

          <textarea
            id="bitt-textarea"
            style={styles.bittTextarea}
            defaultValue={details.body}
            autoFocus={true}
            autoComplete="false"
            ref={(input) => this.body = input}
            onChange={() => this.updateBitt(details)}
            onTouchTap={e => e.stopPropagation()}
          />
        </CardText>
      </Card>
    )
  }
}

Bitt.propTypes = {
  updateBitt: PropTypes.func.isRequired,
  deleteBitt: PropTypes.func.isRequired,
  details: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired
}

export default Bitt
