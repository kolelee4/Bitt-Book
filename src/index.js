import React from 'react'
import {render} from 'react-dom'

// Style
import './style/index.css'

// Containers
import App from './containers/App'

// Components
import {StyleRoot} from 'radium'

render(
  <StyleRoot>
    <App/>
  </StyleRoot>,
  document.getElementById('root')
)
