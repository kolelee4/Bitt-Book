import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Home extends Component {
  render() {
    return(
      <h3>{this.props.title}</h3>
    )
  }
}

Home.defaultProps = {
  title: 'Home'
}

Home.propTypes = {
  title: PropTypes.string.isRequired
}

export default Home
