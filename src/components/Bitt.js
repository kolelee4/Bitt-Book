import React, {Component} from 'react'
import PropTypes from 'prop-types'

// Helpers
import Moment from '../helpers/react-moment'

// Component
import {Card, CardHeader, CardText} from 'material-ui/Card'
import Divider from 'material-ui/Divider'
import IconButton from 'material-ui/IconButton'
import ActionDelete from 'material-ui/svg-icons/action/delete'
import RaisedButton from './RaisedButton'
// import BittEditor from './BittEditor'

class Bitt extends Component {
  constructor() {
    super()

    this.state = {
      isExpanded:       false,
      isShowingOptions: false,
      zDepth:   1,
      titleBackground: 'transparent'
    }

    this.updateBitt = this.updateBitt.bind(this)

    this.handleKeyPressUpdateBitt = this.handleKeyPressUpdateBitt.bind(this)

    this.deleteBitt = this.deleteBitt.bind(this)

    this.showOptions = this.showOptions.bind(this)

    this.hideOptions = this.hideOptions.bind(this)

    this.toggleExpand = this.toggleExpand.bind(this)

    this.highlightTitleBackground = this.highlightTitleBackground.bind(this)

    this.unhighlightTitleBackground = this.unhighlightTitleBackground.bind(this)

    this.persistZDepth = this.persistZDepth.bind(this)
  }

  updateBitt(e, details) {
    e.preventDefault()

    const timestamp = Date.now()

    const bitt = details

    if (this.state.isExpanded === false) {
      const bittTitle = this.title.value

      bittTitle.length === 0 ?
      bitt.title = 'Untitled Bitt' :
      bitt.title = this.title.value.trim()

      bitt.updatedAt = timestamp

      bitt.isFirstSubmit = false

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

      bitt.isFirstSubmit = false

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

  showOptions() {
    this.state.isExpanded === false ?
    this.setState({
      isShowingOptions: true,
      zDepth: 2
    }) :
    this.setState({
      isShowingOptions: true,
      zDepth: 3
    })
  }

  hideOptions() {
    this.setState({
      isShowingOptions: false,
      zDepth: 1
    })
  }

  toggleExpand(e) {
    e.stopPropagation()

    this.setState({
      isExpanded: !this.state.isExpanded
    })

    this.state.zDepth === 2 && this.state.isExpanded === false ?
    this.setState({
      zDepth: 3
    }) :
    this.setState({
      zDepth: 2
    })
  }

  highlightTitleBackground() {
    this.setState({
      titleBackground: '#f5f5f5'
    })
  }

  unhighlightTitleBackground() {
    this.setState({
      titleBackground: 'transparent'
    })
  }

  persistZDepth() {
    this.setState({
      zDepth: 3
    })
  }

  render() {
    const styles = {
      bittCard: {
        overflow: 'hidden',
        margin: '20px 6.9vw 0 6.9vw',
        transitionDuration: '200ms'
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
        padding: '1px',
        background: this.state.titleBackground,
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#146D8F',
        textOverflow: 'ellipsis',
        transition: '200ms'
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

      bittDoneButton: {
        float: 'right',
        margin: '20px 4px 20px 0'
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

    if (this.state.isExpanded === false) {
      isShowingBittBody =
      <div
        id="bitt-body-preview"
        style={styles.bittBodyPreview}
      >
        {details.body}
      </div>
    } else {
      isShowingBittBody =
      null
    }

    let bittState

    if (details.isFirstSubmit) {
      bittState =
      <Card
        id="bitt-card"
        style={styles.bittCard}
        zDepth={this.state.zDepth}
      >
        <CardHeader
          style={styles.bittHeader}
          title={
            <input
              id="bitt-title-input"
              style={styles.bittTitleInput}
              placeholder="Bitt Title..."
              defaultValue=''
              autoFocus={true}
              autoComplete="off"
              ref={(input) => this.title = input}
              onTouchTap={e => e.stopPropagation()}
              onKeyPress={(e) => this.handleKeyPressUpdateBitt(e, details)}
              onBlur={(e) => this.updateBitt(e, details)}
            />
          }
        />
      </Card>
    } else {
      bittState =
      <Card
        id="bitt-card"
        style={styles.bittCard}
        zDepth={this.state.zDepth}
        expanded={this.state.isExpanded}
        onMouseEnter={this.showOptions}
        onMouseLeave={this.hideOptions}
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
              placeholder="Bitt Title..."
              defaultValue={details.title}
              autoComplete="off"
              ref={(input) => this.title = input}
              onMouseEnter={this.highlightTitleBackground}
              onMouseLeave={this.unhighlightTitleBackground}
              onTouchTap={e => e.stopPropagation()}
              onChange={(e) => this.updateBitt(e, details)}
              onKeyPress={(e) => this.handleKeyPressUpdateBitt(e, details)}
              onBlur={(e) => this.updateBitt(e, details)}
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
            defaultValue={details.body === 'Write a bitt...' || details.body === 'Click here to edit...' ? '' : details.body}
            autoFocus="true"
            ref={(input) => this.body = input}
            onTouchTap={e => e.stopPropagation()}
            onChange={(e) => this.updateBitt(e, details)}
          />

          <RaisedButton
            style={styles.bittDoneButton}
            label="Done"
            primary={true}
          />
        </CardText>
      </Card>
    }

    return (
      bittState
    )
  }
}

Bitt.propTypes = {
  id:         PropTypes.string.isRequired,
  details:    PropTypes.object.isRequired,
  bittAmount: PropTypes.number.isRequired,
  updateBitt: PropTypes.func.isRequired,
  deleteBitt: PropTypes.func.isRequired
}

export default Bitt
