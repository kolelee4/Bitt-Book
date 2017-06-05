import React from 'react'

const styles = {
  main: {
    width: '100vw',
    height: '100vh',
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
