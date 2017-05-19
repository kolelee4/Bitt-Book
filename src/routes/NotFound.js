import React, {Component} from 'react'

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

export default NotFound
