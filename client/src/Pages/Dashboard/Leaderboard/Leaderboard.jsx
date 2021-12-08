import React, { useEffect, useState, Fragment } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

import leaderBoardDesktop from '../../../assets/images/header/leaderboard/desktop.jpg'
import leaderBoardTablet from '../../../assets/images/header/leaderboard/tablet.jpg'
import leaderBoardMobile from '../../../assets/images/header/leaderboard/mobile.jpg'

// data //
import LeaderboardData from '../ManualLeaderboard/LeaderboardData'

// components //
// import TournamentTable from '../TournamentTableDashboard';
import NewTournamentTable from '../NewTournamentTable'
import ManualLeaderboard from '../ManualLeaderboard/ManualLeaderboard'

// material ui components //
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import {
  useTheme,
  useMediaQuery,
  Typography,
  FormControl,
  Select,
  MenuItem,
  makeStyles,
} from '@material-ui/core'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'

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

const Leaderboard = () => {
  const [tournaments, setTournaments] = useState([])
  const [filteredTournaments, setFilteredTournaments] = useState([])

  const [gender, setGender] = useState('Male')
  const [age, setAge] = useState('Category')
  const history = useHistory()
  const theme = useTheme()
  const sm = useMediaQuery(theme.breakpoints.down('sm'))
  const classes = useStyles()

  const handleGenderChange = (e) => {
    setGender(e.target.value)
  }

  const handleAgeChange = (e) => {
    setAge(e.target.value)
  }

  const filterByAge = (tournaments) => {
    if (tournaments) {
      if (age === 'Category') {
        return tournaments
      }
      if (age === 'Amateur') {
        return tournaments.filter((player) => player.age >= 18)
      }
      if (age === 'Cat A') {
        return tournaments.filter(
          (player) => player.age >= 15 && player.age <= 17
        )
      }
      if (age === 'Cat B') {
        return tournaments.filter(
          (player) => player.age >= 13 && player.age <= 14
        )
      }
      if (age === 'Cat C') {
        return tournaments.filter(
          (player) => player.age >= 11 && player.age <= 12
        )
      }
      if (age === 'Cat D') {
        return tournaments.filter(
          (player) => player.age >= 9 && player.age <= 10
        )
      }
      if (age === 'Cat E') {
        return tournaments.filter(
          (player) => player.age >= 7 && player.age <= 8
        )
      }
      if (age === 'Cat F') {
        return tournaments.filter((player) => player.age <= 6)
      }
    } else {
      return tournaments
    }
  }

  // effects //
  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        // for ManulaLeaderbaord //
        const filterPlayerDataByAge = (players) => {
          if (players) {
            if (age === 'Category') {
              return players
            }

            if (age === 'Amateur') {
              return players.filter((player) => player.age >= 18)
            }

            if (age === 'Cat A') {
              return players.filter(
                (player) => player.age >= 15 && player.age <= 17
              )
            }
            if (age === 'Cat B') {
              return players.filter(
                (player) => player.age >= 13 && player.age <= 14
              )
            }
            if (age === 'Cat C') {
              return players.filter(
                (player) => player.age >= 11 && player.age <= 12
              )
            }
            if (age === 'Cat D') {
              return players.filter(
                (player) => player.age >= 9 && player.age <= 10
              )
            }
            if (age === 'Cat E') {
              return players.filter(
                (player) => player.age >= 7 && player.age <= 8
              )
            }
            if (age === 'Cat F') {
              return players.filter((player) => player.age <= 6)
            }
          } else {
            return players
          }
        }
        //const res = await axios.get(`${URL}/api/players?limit=500`)
        //const data = res.data.data.filter((p) => p.gender === gender)

        // const filteredData = filterByAge(LeaderboardData)
        const filteredData = filterPlayerDataByAge(LeaderboardData).filter(
          (p) => p.gender === gender
        )
        setTournaments(filteredData)
        setFilteredTournaments(filteredData)
      } catch (err) {
        console.error(err.response.data)
      }
    }
    fetchTournaments()
  }, [age, gender])

  return (
    <Fragment>
      <div className='dashboard-area leaderboard-area'>
        <div className='img-container'>
          <picture>
            <source
              srcSet={leaderBoardMobile}
              className='image'
              media='(max-width: 600px)'
            />
            <source
              srcSet={leaderBoardTablet}
              className='image'
              media='(max-width: 1000px)'
            />
            <img className='image' src={leaderBoardDesktop} alt='' />
          </picture>
        </div>
        <div className='dashboard-header-bar'>
          <div className='bar-container'>
            <div className='bar-main-content'>
              <h4 className='main-title dashboard-title'> Tour Leaderboard </h4>
              <FormControl className={classes.formControl}>
                <Select
                  labelId='age'
                  id='age'
                  value={age}
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
              <ArrowBackIcon fontSize='large' style={{ color: 'white' }} />
            </div>
            <Container maxWidth='md'>
              {tournaments.length > 0 ? (
                <div className='table-fix-height leaderboard_table'>
                  {/* <TournamentTable
                    allTournaments={filteredTournaments.slice(0, 9)}
                  /> */}
                  {/* {tournaments.length > 0 && (
                    <NewTournamentTable
                      LeaderboardPlayers={
                        gender === 'Male'
                          ? filteredTournaments.filter(
                              (p) => p.tournaments.length > 0
                            )
                          : filteredTournaments.filter(
                              (p) => p.tournaments.length > 0
                            )
                      }
                    />
                  )} */}

                  {filteredTournaments.length > 0 && (
                    <ManualLeaderboard allPlayers={filteredTournaments} />
                  )}
                </div>
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
            </Container>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Leaderboard
