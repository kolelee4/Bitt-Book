import React from 'react'
import PropTypes from 'prop-types'

// Components
import FloatingActionButton from './FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

const styles = {
  main: {
    zIndex: '9999',
    position: 'absolute',
    right: '0',
    bottom: '0',
    width: '56px',
    margin: '0 24px 24px 0'
  }
}

const FABContainer = (props) => {
  return (
    <div
      id="FABContainer"
      style={styles.main}
    >
      <FloatingActionButton
        onTouchTap={props.createBittBook}
      >
        <ContentAdd/>
      </FloatingActionButton>
    </div>
  )
}

FABContainer.propTypes = {
  createBittBook: PropTypes.func.isRequired
}

export default FABContainer
