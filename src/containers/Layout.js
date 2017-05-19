import React, { Component } from 'react'

class Layout extends Component {
  render() {
    const styles = {
      main: {
        height: '90.5vh',
        overflow: 'auto',
        margin: '0 16px 0 16px'
      }
    }

    return (
      <div
        id="layout"
        style={styles.main}
      >
        {this.props.children}
      </div>
    )
  }
}

export default Layout
