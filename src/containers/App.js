import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

// Containers
import Template from '../containers/Template'

// Components
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import MuiTheme from '../style/custom-material-ui/MuiTheme'
import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin()

const App = () => {
  return (
    <Router>
      <MuiThemeProvider
        muiTheme={MuiTheme}
      >
        <Route
          path="/"
          component={Template}
        />
      </MuiThemeProvider>
    </Router>
  )
}

export default App
