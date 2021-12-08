import React, { useState, useEffect } from 'react'
import { useHistory, withRouter } from 'react-router-dom'

import axios from 'axios'

import ImageSlider from '../../Components/Slider/ImageSlider'
import './index.css'

import { makeStyles, withStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import { Container, Typography } from '@material-ui/core'
import TournamentTable from './TournamentTableDashboard'
import NewTournamentTable from './NewTournamentTable'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'

import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'

import ArrowBackIcon from '@material-ui/icons/ArrowBack'

import { useMediaQuery, useTheme } from '@material-ui/core'
import { Fragment } from 'react'

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  formControl: {
    minWidth: 150,
    color: '#fff',
  },
  selectEmpty: {
    marginTop: '1rem',
  },
}))
const URL = process.env.REACT_APP_API_URL

function Dashboard(props) {
  // redirect to another page if page query is passed in url //

  const history = useHistory()
  const [tournaments, setTournaments] = useState([])
  const [tournamentNames, setTournamentNames] = useState([])
  const [gender, setGender] = useState('Male')

  const [currentTournament, setCurrentTournament] = useState(
    'Event 1-Bogey Sport NCR Open, Delhi'
  )
  const [ageFilter, setAgeFilter] = useState('Category')
  const theme = useTheme()
  const classes = useStyles()
  const sm = useMediaQuery(theme.breakpoints.down('sm'))

  // handlers //
  const handleGenderChange = (e) => {
    setGender(e.target.value)
  }

  const handleCurrentTournament = async (e) => {
    let current = ''
    if (e) {
      setCurrentTournament(e.target.value)
      current = e.target.value
    }
    // fetch tournament for current value //
    try {
      const res = await axios.get(
        `${URL}/api/tournament?tournament=${
          e ? current : currentTournament
        }&sort=rank&limit=500`
      )

      const data = res.data.data.filter((data) => data.player.gender === gender)

      // const res = await axios.get(`${URL}/api/players?limit=200`);

      // const data = res.data.data.filter((p) => p.gender === gender);

      setTournaments(data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleAgeChange = (e) => {
    setAgeFilter(e.target.value)
  }

  const filterTournaments = () => {
    if (tournaments) {
      if (ageFilter === 'Category') {
        return tournaments
      }
      if (ageFilter === 'Amateur') {
        return tournaments.filter((player) => player.player.age >= 18)
      }
      if (ageFilter === 'Cat A') {
        return tournaments.filter(
          (player) => player.player.age >= 15 && player.player.age <= 17
        )
      }
      if (ageFilter === 'Cat B') {
        return tournaments.filter(
          (player) => player.player.age >= 13 && player.player.age <= 14
        )
      }
      if (ageFilter === 'Cat C') {
        return tournaments.filter(
          (player) => player.player.age >= 11 && player.player.age <= 12
        )
      }
      if (ageFilter === 'Cat D') {
        return tournaments.filter(
          (player) => player.player.age >= 9 && player.player.age <= 10
        )
      }
      if (ageFilter === 'Cat E') {
        return tournaments.filter(
          (player) => player.player.age >= 7 && player.player.age <= 8
        )
      }
      if (ageFilter === 'Cat F') {
        return tournaments.filter((player) => player.player.age <= 6)
      }
    }
    return tournaments
  }

  const filterdTournaments = filterTournaments()

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        // const res = await axios.get(
        //   `${URL}/api/tournament?select=tournament,-player`
        // );
        // const tournamentNamesArr = res.data.data.map((item) => item.tournament);
        handleCurrentTournament()
        setTournamentNames([
          'Event 1-Bogey Sport NCR Open, Delhi',
          'Event 2-Bogey Sport Chandigarh Open',
          'Event 3-Bogey Sport NCR Open, Delhi',
          'Event 4-Jayepee Greens Wishtown, Noida, Delhi',
          'Event 5-Finale',
        ])
      } catch (err) {
        console.error(err.response.data)
      }
    }
    fetchTournaments()
  }, [currentTournament, gender, ageFilter])

  return (
    <Fragment>
      <div className='dashboard-area main-dashboard-area'>
        <div className='dasboard-slider'>
          <ImageSlider currentSlide={currentTournament} />
        </div>
        <div className='dashboard-header-bar'>
          <div className='bar-container'>
            <div className='bar-main-content'>
              <h4 className='main-title dashboard-title'> Score Card</h4>
              <div className='two'>
                <FormControl className={classes.formControl}>
                  <Select
                    id='tournament'
                    value={currentTournament}
                    name='tourament'
                    onChange={handleCurrentTournament}
                  >
                    {tournamentNames.length > 0 &&
                      tournamentNames.map((t, i) => (
                        <MenuItem value={t}>{t}</MenuItem>
                      ))}
                  </Select>
                </FormControl>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <FormControl className={classes.formControl}>
                  <Select
                    labelId='age'
                    id='age'
                    value={ageFilter}
                    name='age'
                    onChange={handleAgeChange}
                  >
                    <MenuItem value={'Category'}>Category</MenuItem>
                    <MenuItem value={'Amateur'}>Amateur</MenuItem>
                    <MenuItem value={'Cat A'}>Category A</MenuItem>
                    <MenuItem value={'Cat B'}>Category B</MenuItem>
                    <MenuItem value={'Cat C'}>Category C</MenuItem>
                    <MenuItem value={'Cat D'}>Category D</MenuItem>
                    <MenuItem value={'Cat E'}>Category E</MenuItem>
                    <MenuItem value={'Cat F'}>Category F</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className='three'>
                <FormControl className={classes.formControl}>
                  <Select
                    id='tournament'
                    value={gender}
                    name='tourament'
                    onChange={handleGenderChange}
                  >
                    <MenuItem value='Male'>Male</MenuItem>
                    <MenuItem value='Female'>Female</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
          </div>
        </div>

        <div className='main-container blur-bg'>
          <div className='main-content'>
            <div
              style={{
                marginBottom: 20,
                cursor: 'pointer',
                width: '20%',
                marginLeft: 20,
              }}
              onClick={() => history.goBack()}
            >
              <ArrowBackIcon style={{ color: 'white' }} fontSize='large' />
            </div>
            <Container maxWidth={sm ? 'sm' : 'xl'}>
              <div className='dashboard_table'>
                {tournaments.length > 0 ? (
                  <>
                    <TournamentTable
                      allTournaments={filterdTournaments}
                      tournament={currentTournament}
                    />

                    {/* <NewTournamentTable allPlayers={filterdTournaments} /> */}
                  </>
                ) : (
                  <Grid
                    container
                    justify='center'
                    alignItems='center'
                    style={{ height: '50vh' }}
                  >
                    <CircularProgress />
                  </Grid>
                )}
              </div>
            </Container>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default withRouter(Dashboard)
