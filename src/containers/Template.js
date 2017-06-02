import React from 'react'
import {
  Switch,
  Route
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
      <NavBar/>

      <Layout>
        <Switch>
          <Route
            exact path="/"
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
