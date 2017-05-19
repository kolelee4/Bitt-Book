import React, { Component } from 'react'

class RouteContainer extends Component {
  render() {
    return (
      <div
        id="route-container"
      >
        {this.props.children}
      </div>
    )
  }
}

export default RouteContainer
