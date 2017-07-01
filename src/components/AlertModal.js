import React, {Component} from 'react'
import PropTypes from 'prop-types'

// Components
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from './RaisedButton'

const propTypes = {
  isOpen:      PropTypes.bool.isRequired,
  message:     PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  action:      PropTypes.func.isRequired
}

class AlertModal extends Component {
  render() {
    const styles = {
      cancelFlatButton: {
        margin: '0 8px 0 0'
      }
    }

    const {
      isOpen,
      isDeletingBittBook,
      message,
      handleClose,
      action
    } = this.props

    const actions = [
      <FlatButton
        label="Cancel"
        style={styles.cancelFlatButton}
        onTouchTap={handleClose}
      />,

      <RaisedButton
        label={isDeletingBittBook ? 'Delete' : 'Confirm'}
        labelColor={isDeletingBittBook ? 'white' : null}
        primary={isDeletingBittBook ? false : true}
        backgroundColor={isDeletingBittBook ? '#d32f2f' : null}
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
