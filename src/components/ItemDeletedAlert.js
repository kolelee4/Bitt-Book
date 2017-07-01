import React from 'react'
import PropTypes from 'prop-types'

// Components
import Snackbar from 'material-ui/Snackbar'

const propTypes = {
  message:      PropTypes.string.isRequired,
  isOpen:       PropTypes.bool,
  requestClose: PropTypes.func
}

const styles = {
  snackbarBittBooks: {
    color: 'white'
  }
}

const ItemDeletedAlert = (props) => {
  return (
    <div
      id="snackbar-container"
    >
      <Snackbar
        id="bitt-books-snackbar"
        bodyStyle={styles.snackbarBittBooks}
        message={props.message}
        autoHideDuration={4000}
        open={props.isOpen}
        onRequestClose={props.requestClose}
      />
    </div>
  )
}

Snackbar.propTypes = propTypes

export default ItemDeletedAlert
