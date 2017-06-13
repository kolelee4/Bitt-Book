import React, {Component} from 'react'
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

// Auth
import {firebaseAuth} from '../config/base'

// Containers
import RouteContainer from '../containers/RouteContainer'
import Layout from '../containers/Layout'

// Routes
import Signup from '../routes/Signup'
import Login from '../routes/Login'
import Home from '../routes/Home'
import BittBooks from '../routes/protected/BittBooks'
import Account from '../routes/protected/Account'

// Components
import NavBar from '../components/NavBar'

const PrivateRoute  = ({component: Component, authed, ...rest}) => {
  return (
    <Route
      {...rest}
      render={
        (props) => authed === true ?
        <Component {...props} /> :
        <Redirect
          to={{pathname: '/login', state: {from: props.location}}}
        />
      }
    />
  )
}

const PublicRoute = ({component: Component, authed, ...rest}) => {
  return (
    <Route
      {...rest}
      render={
        (props) => authed === false ?
        <Component {...props} /> :
        <Redirect
          to='/bitt-books'
        />
      }
    />
  )
}

class Template extends Component {
  constructor() {
    super()

    this.state = {
      authed: false,
      loading: true
    }
  }

  componentDidMount() {
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          loading: false
        })
      } else {
        this.setState({
          authed: false,
          loading: false
        })
      }
    })
  }

  componentWillUnmount() {
    this.removeListener()
  }

  render() {
    return this.state.loading === true ?
    <RouteContainer>
      <Layout>
        <NavBar
          authed={this.state.authed}
        />

        <h2>Loading...</h2>
      </Layout>
    </RouteContainer> :
    (
      <RouteContainer>
        <Layout>
          <NavBar
            authed={this.state.authed}
          />

          <Switch>
            <Route
              exact path='/'
              component={Home}
            />

            <PublicRoute
              authed={this.state.authed}
              exact path='/signup'
              component={Signup}
            />

            <PublicRoute
              authed={this.state.authed}
              exact path='/login'
              component={Login}
            />

            <PrivateRoute
              authed={this.state.authed}
              exact path='/bitt-books'
              component={BittBooks}
            />

            <PrivateRoute
              authed={this.state.authed}
              exact path='/account'
              component={Account}
            />

            <Route
              render={() => <h3>No Match</h3>}
            />
          </Switch>
        </Layout>
      </RouteContainer>
    )
  }
}

export default Template
