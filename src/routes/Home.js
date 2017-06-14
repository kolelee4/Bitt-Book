import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Home extends Component {
  render() {
    const styles = {
      homeContainer: {
        margin: '0 20px 0 20px',
        textAlign: 'center'
      },

      slogan: {
        margin: '20px 0 0 0',
        fontWeight: '500'
      }
    }

    return(
      <div
        id="home-container"
        style={styles.homeContainer}
      >
        <h4
          id="slogan"
          style={styles.slogan}
        >
          {this.props.slogan}
        </h4>
      </div>
    )
  }
}

Home.defaultProps = {
  title: 'Home',
  slogan: 'A simple journal, note, and organization app.'
}

Home.propTypes = {
  title: PropTypes.string,
  slogan: PropTypes.string
}

export default Home
