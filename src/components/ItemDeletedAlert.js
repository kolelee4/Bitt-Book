import React, {Component} from 'react'
import PropTypes from 'prop-types'

// Components
import Snackbar from 'material-ui/Snackbar'

const propTypes = {
  message:      PropTypes.string.isRequired,
  isOpen:       PropTypes.bool,
  requestClose: PropTypes.func
}

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
          autoHideDuration={4000}
          open={this.props.isOpen}
          onRequestClose={this.props.requestClose}
        />
      </div>
    )
  }
}

Snackbar.propTypes = propTypes

export default ItemDeletedAlert
