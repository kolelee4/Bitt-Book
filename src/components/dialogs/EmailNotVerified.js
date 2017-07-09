import React from 'react'

const reloadPage = () => {
  location.reload()
}

const styles = {
  emailNotVerifiedMessage: {
    width: '80vw',
    margin: '45vh auto 0 auto',
    textAlign: 'center'
  },

  reloadLink: {
    cursor: 'pointer',
    color: '#146D8F'
  }
}

const EmailNotVerified = (props) => {
  return (
    <div
      id="email-not-verified-message"
      style={styles.emailNotVerifiedMessage}
    >
      <h3>Please verify your email address then <a style={styles.reloadLink} onTouchTap={() => reloadPage()}>refresh</a> this page.</h3>
    </div>
  )
}

export default EmailNotVerified
