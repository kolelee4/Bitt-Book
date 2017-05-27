import React from 'react'
import PropTypes from 'prop-types'

// Components
import FloatingActionButton from './FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

const styles = {
  main: {
    zIndex: '999',
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
        onTouchTap={props.addItem}
      >
        <ContentAdd/>
      </FloatingActionButton>
    </div>
  )
}

FABContainer.propTypes = {
  addItem: PropTypes.func.isRequired
}

export default FABContainer
