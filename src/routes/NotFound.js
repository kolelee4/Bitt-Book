import React, {Component} from 'react'
import PropTypes from 'prop-types'

class NotFound extends Component {
  render() {
    return (
      <h2>{this.props.title}</h2>
    )
  }
}

NotFound.defaultProps = {
  title: 'Not Found'
}

NotFound.propTypes = {
  title: PropTypes.string.isRequired
}

export default NotFound
