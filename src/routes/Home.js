import React, {Component} from 'react'
import PropTypes from 'prop-types'

const defaultProps = {
  title: 'Bitt Book',
  slogan: 'Write a Bitt.'
}

const propTypes = {
  title: PropTypes.string,
  slogan: PropTypes.string
}

class Home extends Component {
  render() {
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

    return(
      <div
        id="home-container"
        style={styles.homeContainer}
      >
        <div
          id="slogan-container"
          style={styles.sloganContainer}
        >
          <img
            src="favicon.ico"
            alt="Bitt Book Logo"
            height="200"
            width="200"
          />

          <h1
            style={styles.sloganHeading}
          >
            {this.props.slogan}
          </h1>
        </div>
      </div>
    )
  }
}

Home.defaultProps = defaultProps

Home.propTypes = propTypes

export default Home
