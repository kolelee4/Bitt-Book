import React, {Component} from 'react'
import PropTypes from 'prop-types'

// Components
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'

const propTypes = {
  isOpen:      PropTypes.string.isRequired,
  message:     PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  action:      PropTypes.func.isRequired
}

class AlertModal extends Component {
  render() {
    const {
      isOpen,
      message,
      handleClose,
      action
    } = this.props
    
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={handleClose}
      />,

      <FlatButton
        label="Delete"
        primary={true}
        onTouchTap={action}
      />,
    ]

    return (
      <div
        id="raised-button-container-alert-modal"
      >
        <Dialog
          actions={actions}
          modal={false}
          open={isOpen}
          onRequestClose={handleClose}
        >
          {message}
        </Dialog>
      </div>
    )
  }
}

AlertModal.propTypes = propTypes

export default AlertModal
