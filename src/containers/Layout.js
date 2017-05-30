import React from 'react'

const styles = {
  main: {
    height: '90vh',
    overflow: 'auto'
  }
}

const Layout = (props) => {
  return (
    <div
      id="layout"
      style={styles.main}
    >
      {props.children}
    </div>
  )
}

export default Layout
