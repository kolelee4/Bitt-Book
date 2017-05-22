import React from 'react'

const styles = {
  main: {
    height: '90.5vh',
    overflow: 'auto',
    margin: '0 16px 0 16px'
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
