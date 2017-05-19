import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

// Material Design Theme
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import MuiTheme from '../style/MuiTheme'

// Containers
import Template from '../containers/Template'

// Components
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
