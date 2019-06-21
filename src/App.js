import React from 'react'
import { Route, Switch } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import movieDetailsPage from './pages/MovieDetailsPage'

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route path="/movie/:id" component={movieDetailsPage} />
    </Switch>
  )
}