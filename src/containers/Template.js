import React from 'react'
import {
  Switch,
  Route,
  // Redirect
} from 'react-router-dom'

// Containers
import RouteContainer from '../containers/RouteContainer'
import Layout from '../containers/Layout'

// Routes
import BittBooks from '../routes/BittBooks'
import Account from '../routes/Account'

// Components
import NavBar from '../components/NavBar'

const Template = () => {
  return (
    <RouteContainer>
      <Layout>
        <NavBar/>

        <Switch>
          {/* <Redirect
            from="/"
            exact to="/bitt-books"
          /> */}

          <Route
            exact path="/bitt-books"
            component={BittBooks}
          />

          <Route
            exact path="/account"
            component={Account}
          />
        </Switch>
      </Layout>
    </RouteContainer>
  )
}

export default Template
