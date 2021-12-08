import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  HashRouter as Router,
  Switch,
  Route,
  useParams,
} from 'react-router-dom'

// Components //
import Navigation from './Components/Navigation/Navigation'
import NewHeader from './Components/Header/NewHeader'
import Footer from './Components/Footer/Footer'

import ProtectedRoute from './utils/ProtectedRoute'
// Pages //
import Login from './Pages/Auth'
import Dashboard from './Pages/Dashboard/Dashboard'
import Player from './Pages/Dashboard/Players/Player'
import Tournament from './Pages/Dashboard/Tournaments/Tournaments'
import DrawSheet from './Pages/Dashboard/DrasSheet/DrawSheet'
import Leaderboard from './Pages/Dashboard/Leaderboard/Leaderboard'
import Events from './Pages/Events'
import EventBooking from './Pages/EventBooking'
import Payments from './Pages/payment'
import GolfTournaments from './Pages/Dashboard/GolfTournaments/GolfTournaments'
import ImageGallery from './Pages/Dashboard/ImageGallery/ImageGallery'

// material ui components //
import CircularProgress from '@material-ui/core/CircularProgress'

// css //
import './App.css'
import { Grid } from '@material-ui/core'
const App = () => {
  const [players, setPlayers] = useState([])
  const [loading, setLoading] = useState(true)

  const [isAuth, setIsAuth] = useState(false)
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'))
    if (token) {
      setIsAuth(true)
    } else {
      setIsAuth(false)
    }
  }, [isAuth])

  useEffect(() => {
    const getAllPlayers = async () => {
      const URL = process.env.REACT_APP_API_URL
      const res = await axios.get(`${URL}/api/players?limit=500`)
      setPlayers(res.data.data)
      setLoading(false)
    }
    getAllPlayers()
  }, [setPlayers])

  return (
    <Router>
      <NewHeader isAuth={isAuth} setIsAuth={setIsAuth} />
      {loading ? (
        <Grid
          container
          justify='center'
          alignItems='center'
          style={{ height: '100vh' }}
        >
          <CircularProgress />
        </Grid>
      ) : (
        <Switch>
          <Route exact path='/login'>
            <Login isAuth={isAuth} setIsAuth={setIsAuth} />
          </Route>

          <ProtectedRoute exact path='/players'>
            <Player players={players} setPlayers={setPlayers} />
          </ProtectedRoute>
          <Route exact path='/drawsheet'>
            <DrawSheet />
          </Route>
          <Route exact path='/leaderboard'>
            <Leaderboard />
          </Route>
          <Route exact path='/events'>
            <Events />
          </Route>
          <Route exact path='/event-booking'>
            <EventBooking />
          </Route>
          <Route exact path='/payment'>
            <Payments />
          </Route>
          <Route exact path='/all-tournaments'>
            <GolfTournaments />
          </Route>
          <Route exact path='/bogey-news'>
            <ImageGallery />
          </Route>
          <ProtectedRoute exact path='/tournaments'>
            <Tournament
              players={players}
              setPlayers={setPlayers}
              setIsAuth={setIsAuth}
            />
          </ProtectedRoute>

          <Route path='/' component={Dashboard} />
        </Switch>
      )}
      <Footer />
    </Router>
  )
}

export default App
