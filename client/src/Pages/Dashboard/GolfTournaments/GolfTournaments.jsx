import React, { Fragment, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { motion } from 'framer-motion'

import ArrowBackIcon from '@material-ui/icons/ArrowBack'

import leaderBoardDesktop from '../../../assets/images/header/event-booking/desktop.jpg'
import leaderBoardTablet from '../../../assets/images/header/event-booking/tablet.jpg'
import leaderBoardMobile from '../../../assets/images/header/event-booking/mobile.jpg'
import { FormControl, MenuItem, Select } from '@material-ui/core'
import { useTheme } from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import TournamentCard from '../../../Components/TournamentCard/TournamentCard'

// css //
import './GolfTournament.css'
// tournament data //

const arrowVariants = {
  initial: {
    x: -1,
  },
  animate: {
    x: 1,
    transition: {
      yoyo: Infinity,
    },
  },
}

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

const GolfTournaments = ({ tournaments }) => {
  const theme = useTheme()
  const classes = useStyles()
  const [tourYear, setTourYear] = useState(2021)
  const [curTournaments, setCurTournaments] = useState([])
  const history = useHistory()

  const handleTourYear = (e) => {
    setTourYear(e.target.value)
  }

  useEffect(() => {
    setCurTournaments(
      tournaments.filter((t) => {
        return t.tour_year == tourYear
      })
    )
    console.log(curTournaments)
  }, [tourYear])

  return (
    <>
      <div className='dashboard-area events-area'>
        <div className='dasboard-slider'>
          <picture>
            <source
              className='image'
              srcSet={leaderBoardMobile}
              className='image'
              media='(max-width: 600px)'
            />
            <source
              className='tab-image'
              srcSet={leaderBoardTablet}
              className='image'
              media='(max-width: 1200px)'
            />
            <img className='image' src={leaderBoardDesktop} alt='' />
          </picture>
        </div>
        <div className='dashboard-header-bar'>
          <div className='bar-container'>
            <div className='bar-main-content '>
              <h4 className='main-title events-title'> Golf Tournaments</h4>
              <FormControl className={classes.formControl}>
                <Select
                  labelId='age'
                  id='age'
                  value={tourYear}
                  name='age'
                  onChange={handleTourYear}
                >
                  <MenuItem value={'2021'}>2021</MenuItem>
                  <MenuItem value={'2022'}>2022</MenuItem>
                  <MenuItem value={'2023'}>2023</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        </div>

        <div className='main-container blur-bg'>
          <motion.div
            variants={arrowVariants}
            initial='initial'
            animate='animate'
            className='go-back-arrow'
            onClick={() => history.goBack()}
          >
            <ArrowBackIcon fontSize='large' style={{ color: 'white' }} />
          </motion.div>
          <div className='main-content'>
            <div className='events-container golf_container'>
              {curTournaments.map((t) => (
                <Fragment>
                  <TournamentCard
                    key={t.tour_name}
                    tName={t.tour_name}
                    tDate={t.tour_date}
                    tWinner={t.tour_winner}
                  />
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

GolfTournaments.defaultProps = {
  tournaments: [
    {
      tour_year: 2021,
      tour_name: 'Bogey Sport NCR Open.',
      tour_venue: 'Jaypee Greens Wishtown  Golf Club, Noida.',
      tour_date: '13th August - 15th August',
      tour_winner: 'Karan Mehto',
    },
    {
      tour_year: 2021,
      tour_name: 'Bogey Sport Chandigarh Open.',
      tour_venue: 'Chandigarh Golf Club.',
      tour_date: '133th August - 15th August',
      tour_winner: 'Karan Mehto',
    },
    {
      tour_year: 2021,
      tour_name: 'Bogey Sport Chandigarh Open.',
      tour_venue: ' Chandigarh Golf Club.',
      tour_date: '313th August - 15th August',
      tour_winner: 'Karan Mehto',
    },
    {
      tour_year: 2021,
      tour_name: 'Bogey Sport NCR Open. ',
      tour_venue: 'Jaypee Greens Wishtown  Golf Club, Noida.',
      tour_date: '313th August - 15th August',
      tour_winner: 'Karan Mehto',
    },
    {
      tour_year: 2021,
      tour_name: 'Bogey Sport Final Tour Championship. ',
      tour_venue: 'Panchkula Golf Club.',
      tour_date: '313th August - 15th August',
      tour_winner: 'Karan Mehto',
    },
  ],
}

export default GolfTournaments
