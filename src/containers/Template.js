import React, {Component} from 'react'
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

// Containers
import RouteContainer from '../containers/RouteContainer'
import Layout from '../containers/Layout'

// Routes
import Home from '../routes/Home'
import BittBooks from '../routes/protected/BittBooks'
import Account from '../routes/protected/Account'

// Components
import NavBar from '../components/NavBar'

const Template = () => {
  return (
    <RouteContainer>
      <Layout>
        <NavBar/>

        <Switch>
          <Route
            exact path="/"
            component={Home}
          />

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
