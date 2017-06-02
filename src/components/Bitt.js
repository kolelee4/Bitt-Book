import React, {Component} from 'react'
import PropTypes from 'prop-types'

// Helpers
import Moment from '../helpers/react-moment'

// Component
import {Card, CardHeader, CardText} from 'material-ui/Card'
import Divider from 'material-ui/Divider'
import IconButton from 'material-ui/IconButton'
import ActionDelete from 'material-ui/svg-icons/action/delete'
// import BittEditor from './BittEditor'

class Bitt extends Component {
  constructor() {
    super()

    this.state = {
      expanded: false,
      bittCardZDepth: 1,
      isShowingOptions: false
    }
  }

  updateBitt(e, details) {
    e.preventDefault()

    const timestamp = Date.now()

    const bitt = details

    if (this.state.expanded === false) {
      const bittTitle = this.title.value

      bittTitle.length === 0 ?
      bitt.title = 'Untitled Bitt' :
      bitt.title = this.title.value.trim()

      bitt.updatedAt = timestamp

      this.props.updateBitt(bitt)
    } else {
      const bittTitle = this.title.value

      bittTitle.length === 0 ?
      bitt.title = 'Untitled Bitt' :
      bitt.title = this.title.value.trim()

      const bittBody = this.body.value

      bittBody.length === 0 ?
      bitt.body = 'Write a bitt...' :
      bitt.body = this.body.value

      bitt.updatedAt = timestamp

      this.props.updateBitt(bitt)
    }
  }

  handleKeyPressUpdateBitt(e, details) {
    if (e.key === 'Enter') {
      this.updateBitt(e, details)

      this.title.blur()
    }
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

  toggleExpand(e) {
    e.stopPropagation()

    this.state.expanded === false ?
    this.setState({
      expanded: true
    }) :
    this.setState({
      expanded: false
    })

    this.changeBittZDepth(e)
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

      bittTitleInput: {
        width: '88%',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        margin: '0',
        outline: 'none',
        border: 'none',
        padding: '0',
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#146D8F',
        textOverflow: 'ellipsis'
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
        minHeight: '45vh',
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

    const {id, details, bittAmount} = this.props

    let isShowingOptions

    if (this.state.isShowingOptions) {
      isShowingOptions =
      <IconButton
        id="bitt-delete-button"
        style={styles.bittDeleteButton}
        onTouchTap={(e) => this.deleteBitt(e, id)}
      >
        <ActionDelete
          color='#757575'
          hoverColor='#424242'
        />
      </IconButton>
    } else {
      isShowingOptions =
      null
    }

    let isShowingBittBody

    if (this.state.expanded === false) {
      isShowingBittBody =
      <div
        style={styles.bittBodyPreview}
      >
        {details.body}
      </div>
    } else {
      isShowingBittBody =
      null
    }

    return (
      <Card
        id="bitt-card"
        style={styles.bittCard}
        zDepth={this.state.bittCardZDepth}
        expanded={this.state.expanded}
        onMouseEnter={(e) => this.showOptions(e)}
        onMouseLeave={(e) => this.hideOptions(e)}
        onTouchTap={(e) => this.toggleExpand(e)}
      >
        {bittAmount > 1 ? isShowingOptions : null}

        <CardHeader
          style={styles.bittHeader}
          actAsExpander={true}
          title={
            <input
              id="bitt-title-input"
              style={styles.bittTitleInput}
              placeholder="Untitled Bitt"
              defaultValue={details.title}
              autoComplete="off"
              ref={(input) => this.title = input}
              onTouchTap={e => e.stopPropagation()}
              onChange={(e) => this.updateBitt(e, details)}
              onKeyPress={(e) => this.handleKeyPressUpdateBitt(e, details)}
            />
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
              {isShowingBittBody}
            </div>
          }
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
            placeholder="Write a bitt..."
            defaultValue={details.body}
            autoFocus={true}
            ref={(input) => this.body = input}
            onTouchTap={e => e.stopPropagation()}
            onChange={(e) => this.updateBitt(e, details)}
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
