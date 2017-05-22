import React from 'react'
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

// Containers
import RouteContainer from '../containers/RouteContainer'
import Layout from '../containers/Layout'

// Routes
import BittBooks from '../routes/BittBooks'
import Account from '../routes/Account'
// import NotFound from '../routes/NotFound'

// Components
import NavBar from '../components/NavBar'

const Template = () => {
  return (
    <RouteContainer>
      <NavBar/>

      <Layout>
        <Switch>
          <Redirect
            exact from="/"
            to="/bitt-books"
          />
          <Route
            path="/bitt-books"
            component={BittBooks}
          />
          <Route
            path="/account"
            component={Account}
          />
        </Switch>
      </Layout>
    </RouteContainer>
  )
}

export default Template
