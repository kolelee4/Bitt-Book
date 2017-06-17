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
        with: '100vw',
        height: '90.5vh',
        overflow: 'auto'
      },

      sloganContainer: {
        verticalAlign: 'middle',
        textAlign: 'center'
      },

      titleHeading: {
        padding: '25vh 0 0 0',
        fontSize: '60px',
        fontWeight: '600'
      },

      sloganSubHeading: {
        fontWeight: '500'
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
          <h1
            id="title-heading"
            style={styles.titleHeading}
          >
            {this.props.title}
          </h1>
          <h3
            id="slogan-sub-heading"
            style={styles.sloganSubHeading}
          >
            {this.props.slogan}
          </h3>
        </div>
      </div>
    )
  }
}

Home.defaultProps = defaultProps

Home.propTypes = propTypes

export default Home
