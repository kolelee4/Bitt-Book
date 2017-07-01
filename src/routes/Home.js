import React from 'react'
import PropTypes from 'prop-types'

const defaultProps = {
  title: 'Bitt Book',
  slogan: 'Write a Bitt.'
}

const propTypes = {
  title: PropTypes.string,
  slogan: PropTypes.string
}

const styles = {
  homeContainer: {
    display: 'table',
    with: '100vw',
    height: '90.5vh',
    textAlign: 'center',
    overflow: 'auto'
  },

  sloganContainer: {
    display: 'table-cell',
    width: '100vw',
    verticalAlign: 'middle'
  },

  sloganHeading: {
    fontSize: '60px',
    fontWeight: '600'
  }
}

const Home = (props) => {
  return (
    <div
      id="home-container"
      style={styles.homeContainer}
    >
      <div
        id="slogan-container"
        style={styles.sloganContainer}
      >
        <img
          src="icons/bitt-book-home.png"
          alt="Bitt Book Logo"
          height="240"
          width="240"
        />

        <h1
          style={styles.sloganHeading}
        >
          {props.slogan}
        </h1>
      </div>
    </div>
  )
}

Home.defaultProps = defaultProps

Home.propTypes = propTypes

export default Home
