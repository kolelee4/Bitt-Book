import React, {Component} from 'react'

// Components
import FloatingActionButton from './FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

class FABContainer extends Component {
  render() {
    const styles = {
      main: {
        position: 'absolute',
        right: '0',
        bottom: '0',
        width: '56px',
        margin: '0 24px 24px 0'
      }
    }

    return (
      <div
        id="FABContainer"
        style={styles.main}
      >
        <FloatingActionButton
          onTouchTap={this.props.createBittBook}
        >
          <ContentAdd/>
        </FloatingActionButton>
      </div>
    )
  }
}

export default FABContainer
