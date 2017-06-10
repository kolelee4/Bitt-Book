import React, {Component} from 'react'
import PropTypes from 'prop-types'

// Components
import Snackbar from 'material-ui/Snackbar'

class ItemDeletedAlert extends Component {
  render() {
    const styles = {
      snackbarBittBooks: {
        color: 'white'
      }
    }

    return (
      <div
        id="snackbar-container"
      >
        <Snackbar
          id="bitt-books-snackbar"
          bodyStyle={styles.snackbarBittBooks}
          message={this.props.message}
          action="Close"
          autoHideDuration={4000}
          open={this.props.isOpen}
          onActionTouchTap={this.props.close}
          onRequestClose={this.props.requestClose}
        >
          Close
        </Snackbar>
      </div>
    )
  }
}

Snackbar.propTypes = {
  message:      PropTypes.string.isRequired,
  isOpen:       PropTypes.bool,
  close:        PropTypes.func,
  requestClose: PropTypes.func
}

export default ItemDeletedAlert
