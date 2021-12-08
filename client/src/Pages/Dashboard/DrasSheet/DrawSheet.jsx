import React, { useState, useEffect, Fragment } from 'react'
import '../../../index.css'
import './drawsheet.css'
import { useHistory } from 'react-router-dom'

// components //
import Sidebar from '../../Dashboard/Sidebar'
import DrawSheetTable from './DrawSheetTable'
import NewDrawsheetTable from './NewDrawsheetTable'

// import NewData from './drawsheetData';
// import NewData from './Event2drawsheetData';

// import NewData from './event3Data'

import NewData from './Event4Data'

// material ui components //
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Container from '@material-ui/core/Container'
import {
  useMediaQuery,
  useTheme,
  makeStyles,
  withStyles,
} from '@material-ui/core'
import { Grid, Typography, Button } from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl'
import InputBase from '@material-ui/core/InputBase'
import ImageSlider from '../../../Components/Slider/ImageSlider'

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

const DrawSheet = () => {
  const [draw, setDraw] = useState([])
  const [tournamentNames, setTournamentNames] = useState([])
  const [currentTournament, setCurrentTournament] = useState(
    'Event 2, Chandigarh'
  )
  const history = useHistory()
  const classes = useStyles()
  const theme = useTheme()
  const sm = useMediaQuery(theme.breakpoints.down('sm'))

  // handlers //
  const handleCurrentTournament = async (e) => {
    if (e) {
      setCurrentTournament(e.target.value)
    }
    // fetch tournament for current value //
    try {
      // const res = await axios.get(
      //   `${URL}/api/tournament?tournament=${
      //     e ? e.target.value : currentTournament
      //   }&sort=rank`
      // );
      // console.log(res.data.data);
      // setDraw(res.data.data);
    } catch (err) {
      console.error(err.response.data)
    }
  }

  const fetchTournamentDrawData = async () => {
    try {
      // const drawData = await axios.get(
      //   `${URL}/api/tournament?select=draw,tournament&tournament=${currentTournament}`
      // );
      // if (drawData) {
      //   setDraw(drawData.data.data);
      // }
    } catch (err) {
      console.error(err.message)
    }
  }

  const fetchTournaments = async () => {
    try {
      // const res = await axios.get(
      //   `${URL}/api/tournament?select=tournament,-player`
      // );
      // const tournamentNamesArr = res.data.data.map((item) => item.tournament);
      setTournamentNames([
        'Event 1-Bogey Sport NCR Open, Delhi',
        'Event 2, Chandigarh',
        'Event 1, Delhi',
        'Event 2, Delhi',
        'Event 5 Finale, Chandigarh',
      ])
    } catch (err) {
      console.error(err.response.data)
    }
  }

  useEffect(() => {
    fetchTournaments()
    fetchTournamentDrawData()
  }, [])

  return (
    <Fragment>
      <div className='dashboard-area draw-sheet-area'>
        <div className='dasboard-slider'>
          <ImageSlider currentSlide={currentTournament} />
        </div>
        <div className='dashboard-header-bar'>
          <div className='bar-container'>
            <div className='bar-main-content'>
              <h4 className='main-title dashboard-title'>
                {' '}
                Tournament Drawsheet
              </h4>
              {/* <div className='two'>
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
              </div> */}
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
            <Container style={{ marginTop: '2rem' }}>
              <Grid container>
                <Grid item container>
                  <Button
                    style={{ margin: '2rem 0 0.5rem 0' }}
                    variant='contained'
                    color='primary'
                    className={'round1 btn-active'}
                    style={{ margin: '2rem 2rem' }}
                  >
                    Event 3
                  </Button>
                </Grid>
                <Grid item container justify='center'>
                  {/* <DrawSheetTable allTournaments={draw} /> */}
                  <NewDrawsheetTable allTournaments={NewData} />
                  {/* <div className='temp-table-container'>
                    <Button
                      variant='contained'
                      color='primary'
                      className={`round1 btn-active`}
                    >
                      Round 1
                    </Button>
                    <div className='drawsheet-table-image'>
                      <img
                        src='https://images.unsplash.com/photo-1606787947360-4181fe0ab58c?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60'
                        alt=''
                      />
                    </div>
                  </div> */}
                </Grid>
              </Grid>
            </Container>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default DrawSheet
