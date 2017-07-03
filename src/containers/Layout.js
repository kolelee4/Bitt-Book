import React from 'react'

const styles = {
  main: {
    width: '100vw',
    maxWidth: '100%',
    height: '100vh',
    maxHeight: '100%',
    overflow: 'hidden'
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
