import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../index.css'
import { useHistory } from 'react-router-dom'

import TournamentTable from './TournamentTable'

import { makeStyles } from '@material-ui/core/styles'
import { Container, TextField, Typography } from '@material-ui/core'
import { useMediaQuery, useTheme } from '@material-ui/core'

import Alert from '@material-ui/lab/Alert'
import Sidebar from '../Sidebar'
import Button from '@material-ui/core/Button'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  alert: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
}))

const URL = process.env.REACT_APP_API_URL

export default function Tournament({ players, setPlayers, setIsAuth }) {
  const history = useHistory()
  const classes = useStyles()
  const theme = useTheme()
  const sm = useMediaQuery(theme.breakpoints.down('sm'))

  const [showPlayers, setShowPlayer] = useState(false)
  const [message, setMessage] = useState([])
  const [player, setPlayer] = useState({})
  const [activeTournament, setActiveTournament] = useState({})

  const logmeout = () => {
    localStorage.removeItem('token')
    history.push('/')
    setIsAuth(false)
  }

  const [tournament, setTournament] = useState({
    name: 'Event 4-Jayepee Greens Wishtown, Noida, Delhi',
    place: 'Delhi',
    rank: '',
    points: '',
    r1Time: '',
    r2Time: '',
    r3Time: '',
    r1Tee: '|',
    r2Tee: '|',
    r3Tee: '|',
    r4Tee: '|',
    r1p1: '',
    r1p2: '',
    r1p3: '',
    r2p1: '',
    r2p2: '',
    r2p3: '',
    r3p1: '',
    r3p2: '',
    r3p3: '',
    r4p1: '',
    r4p2: '',
    r4p3: '',
  })
  const {
    name,
    place,
    rank,
    points,
    r1p1,
    r1p2,
    r1p3,
    r2p1,
    r2p2,
    r2p3,
    r3p1,
    r3p2,
    r3p3,
    r4p1,
    r4p2,
    r4p3,
    r1Time,
    r2Time,
    r3Time,
    r4Time,
    r1Tee,
    r2Tee,
    r3Tee,
    r4Tee,
  } = tournament

  const [par, setPar] = useState({
    hole1: '4',
    hole2: '3',
    hole3: '4',
    hole4: '4',
    hole5: '3',
    hole6: '4',
    hole7: '4',
    hole8: '3',
    hole9: '4',
    hole10: '4',
    hole11: '5',
    hole12: '3',
    hole13: '4',
    hole14: '3',
    hole15: '3',
    hole16: '3',
    hole17: '5',
    hole18: '4',
  })

  const [round1, setRound1] = useState({
    r1_hole1: '',
    r1_hole2: '',
    r1_hole3: '',
    r1_hole4: '',
    r1_hole5: '',
    r1_hole6: '',
    r1_hole7: '',
    r1_hole8: '',
    r1_hole9: '',
    r1_hole10: '',
    r1_hole11: '',
    r1_hole12: '',
    r1_hole13: '',
    r1_hole14: '',
    r1_hole15: '',
    r1_hole16: '',
    r1_hole17: '',
    r1_hole18: '',
  })
  const [round2, setRound2] = useState({
    r2_hole1: '',
    r2_hole2: '',
    r2_hole3: '',
    r2_hole4: '',
    r2_hole5: '',
    r2_hole6: '',
    r2_hole7: '',
    r2_hole8: '',
    r2_hole9: '',
    r2_hole10: '',
    r2_hole11: '',
    r2_hole12: '',
    r2_hole13: '',
    r2_hole14: '',
    r2_hole15: '',
    r2_hole16: '',
    r2_hole17: '',
    r2_hole18: '',
  })
  const [round3, setRound3] = useState({
    r3_hole1: '',
    r3_hole2: '',
    r3_hole3: '',
    r3_hole4: '',
    r3_hole5: '',
    r3_hole6: '',
    r3_hole7: '',
    r3_hole8: '',
    r3_hole9: '',
    r3_hole10: '',
    r3_hole11: '',
    r3_hole12: '',
    r3_hole13: '',
    r3_hole14: '',
    r3_hole15: '',
    r3_hole16: '',
    r3_hole17: '',
    r3_hole18: '',
  })
  const [round4, setRound4] = useState({
    r4_hole1: '',
    r4_hole2: '',
    r4_hole3: '',
    r4_hole4: '',
    r4_hole5: '',
    r4_hole6: '',
    r4_hole7: '',
    r4_hole8: '',
    r4_hole9: '',
    r4_hole10: '',
    r4_hole11: '',
    r4_hole12: '',
    r4_hole13: '',
    r4_hole14: '',
    r4_hole15: '',
    r4_hole16: '',
    r4_hole17: '',
    r4_hole18: '',
  })
  // Destucture properties to make an array of properties //
  const {
    hole1,
    hole2,
    hole3,
    hole4,
    hole5,
    hole6,
    hole7,
    hole8,
    hole9,
    hole10,
    hole11,
    hole12,
    hole13,
    hole14,
    hole15,
    hole16,
    hole17,
    hole18,
  } = par

  const {
    r1_hole1,
    r1_hole2,
    r1_hole3,
    r1_hole4,
    r1_hole5,
    r1_hole6,
    r1_hole7,
    r1_hole8,
    r1_hole9,
    r1_hole10,
    r1_hole11,
    r1_hole12,
    r1_hole13,
    r1_hole14,
    r1_hole15,
    r1_hole16,
    r1_hole17,
    r1_hole18,
  } = round1
  const {
    r2_hole1,
    r2_hole2,
    r2_hole3,
    r2_hole4,
    r2_hole5,
    r2_hole6,
    r2_hole7,
    r2_hole8,
    r2_hole9,
    r2_hole10,
    r2_hole11,
    r2_hole12,
    r2_hole13,
    r2_hole14,
    r2_hole15,
    r2_hole16,
    r2_hole17,
    r2_hole18,
  } = round2
  const {
    r3_hole1,
    r3_hole2,
    r3_hole3,
    r3_hole4,
    r3_hole5,
    r3_hole6,
    r3_hole7,
    r3_hole8,
    r3_hole9,
    r3_hole10,
    r3_hole11,
    r3_hole12,
    r3_hole13,
    r3_hole14,
    r3_hole15,
    r3_hole16,
    r3_hole17,
    r3_hole18,
  } = round3
  const {
    r4_hole1,
    r4_hole2,
    r4_hole3,
    r4_hole4,
    r4_hole5,
    r4_hole6,
    r4_hole7,
    r4_hole8,
    r4_hole9,
    r4_hole10,
    r4_hole11,
    r4_hole12,
    r4_hole13,
    r4_hole14,
    r4_hole15,
    r4_hole16,
    r4_hole17,
    r4_hole18,
  } = round4

  // Array of destructured properties //
  const parArray = [
    hole1,
    hole2,
    hole3,
    hole4,
    hole5,
    hole6,
    hole7,
    hole8,
    hole9,
    hole10,
    hole11,
    hole12,
    hole13,
    hole14,
    hole15,
    hole16,
    hole17,
    hole18,
  ]
  const r1_holesArr = [
    r1_hole1,
    r1_hole2,
    r1_hole3,
    r1_hole4,
    r1_hole5,
    r1_hole6,
    r1_hole7,
    r1_hole8,
    r1_hole9,
    r1_hole10,
    r1_hole11,
    r1_hole12,
    r1_hole13,
    r1_hole14,
    r1_hole15,
    r1_hole16,
    r1_hole17,
    r1_hole18,
  ]
  const r2_holesArr = [
    r2_hole1,
    r2_hole2,
    r2_hole3,
    r2_hole4,
    r2_hole5,
    r2_hole6,
    r2_hole7,
    r2_hole8,
    r2_hole9,
    r2_hole10,
    r2_hole11,
    r2_hole12,
    r2_hole13,
    r2_hole14,
    r2_hole15,
    r2_hole16,
    r2_hole17,
    r2_hole18,
  ]
  const r3_holesArr = [
    r3_hole1,
    r3_hole2,
    r3_hole3,
    r3_hole4,
    r3_hole5,
    r3_hole6,
    r3_hole7,
    r3_hole8,
    r3_hole9,
    r3_hole10,
    r3_hole11,
    r3_hole12,
    r3_hole13,
    r3_hole14,
    r3_hole15,
    r3_hole16,
    r3_hole17,
    r3_hole18,
  ]
  const r4_holesArr = [
    r4_hole1,
    r4_hole2,
    r4_hole3,
    r4_hole4,
    r4_hole5,
    r4_hole6,
    r4_hole7,
    r4_hole8,
    r4_hole9,
    r4_hole10,
    r4_hole11,
    r4_hole12,
    r4_hole13,
    r4_hole14,
    r4_hole15,
    r4_hole16,
    r4_hole17,
    r4_hole18,
  ]

  // handlers //
  const handleTournamentChange = (e) => {
    setTournament({
      ...tournament,
      [e.target.name]: e.target.value,
    })
  }
  const par_handleChange = (e) => {
    setPar({
      ...par,
      [e.target.name]: e.target.value,
    })
  }
  const r1_handleChange = (e) => {
    setRound1({
      ...round1,
      [e.target.name]: e.target.value,
    })
  }
  const r2_handleChange = (e) => {
    setRound2({
      ...round2,
      [e.target.name]: e.target.value,
    })
  }
  const r3_handleChange = (e) => {
    setRound3({
      ...round3,
      [e.target.name]: e.target.value,
    })
  }
  const r4_handleChange = (e) => {
    setRound4({
      ...round4,
      [e.target.name]: e.target.value,
    })
  }

  const handlePlayerVisibility = () => {
    setShowPlayer(!showPlayers)
    setMessage([
      ...message,
      {
        message: showPlayers ? 'Hide All Players' : 'Show All Players',
        type: 'success',
      },
    ])
    setTimeout(() => {
      setMessage([])
    }, 3000)
  }

  const validateFormSubmission = () => {
    if (
      tournament.name === '' ||
      tournament.place === '' ||
      tournament.points === '' ||
      tournament.rank === ''
    ) {
      console.log(tournament)
      // setMessage([
      //   ...message,
      //   { message: 'Please Fill Out All Fields', type: 'error' },
      // ]);
      // setTimeout(() => {
      //   setMessage([]);
      // }, 5000);
      // return;
    }
  }
  const getDrawObject = () => {
    let draw = {}
    draw.time = { time1: r1Time, time2: r2Time, time3: r3Time, time4: r4Time }
    draw.tee = { tee1: r1Tee, tee2: r2Tee, tee3: r3Tee, tee4: r4Tee }
    draw.round1 = [r1p1, r1p2, r1p3]
    draw.round2 = [r2p1, r2p2, r2p3]
    draw.round3 = [r3p1, r3p2, r3p3]
    draw.round4 = [r4p1, r4p2, r4p3]
    return draw
  }
  const getTournamentObject = () => {
    const drawObject = getDrawObject()
    let score = {}
    score = {
      round1: { ...round1 },
      round2: { ...round2 },
      round3: { ...round3 },
      round4: { ...round4 },
    }
    const tournamentFields = {
      tournament: tournament.name,
      rank: tournament.rank,
      place: tournament.place,
      points: tournament.points,
      par,
      score,
      draw: drawObject,
    }
    return tournamentFields
  }

  const clearFormState = () => {
    setTournament({
      name: 'Event 4-Jayepee Greens Wishtown, Noida, Delhi',
      place: 'Delhi',
      rank: '',
      points: '',
      r1Time: '',
      r2Time: '',
      r3Time: '',
      r4Time: '',
      r1Tee: '|',
      r2Tee: '|',
      r3Tee: '|',
      r4Tee: '|',
      r1p1: '',
      r1p2: '',
      r1p3: '',
      r2p1: '',
      r2p2: '',
      r2p3: '',
      r3p1: '',
      r3p2: '',
      r3p3: '',
      r4p1: '',
      r4p2: '',
      r4p3: '',
    })
    // setPar({
    //   hole1: '',
    //   hole2: '',
    //   hole3: '',
    //   hole4: '',
    //   hole5: '',
    //   hole6: '',
    //   hole7: '',
    //   hole8: '',
    //   hole9: '',
    //   hole10: '',
    //   hole11: '',
    //   hole12: '',
    //   hole13: '',
    //   hole14: '',
    //   hole15: '',
    //   hole16: '',
    //   hole17: '',
    //   hole18: '',
    // });
    setRound1({
      r1_hole1: '',
      r1_hole2: '',
      r1_hole3: '',
      r1_hole4: '',
      r1_hole5: '',
      r1_hole6: '',
      r1_hole7: '',
      r1_hole8: '',
      r1_hole9: '',
      r1_hole10: '',
      r1_hole11: '',
      r1_hole12: '',
      r1_hole13: '',
      r1_hole14: '',
      r1_hole15: '',
      r1_hole16: '',
      r1_hole17: '',
      r1_hole18: '',
    })
    setRound2({
      r2_hole1: '',
      r2_hole2: '',
      r2_hole3: '',
      r2_hole4: '',
      r2_hole5: '',
      r2_hole6: '',
      r2_hole7: '',
      r2_hole8: '',
      r2_hole9: '',
      r2_hole10: '',
      r2_hole11: '',
      r2_hole12: '',
      r2_hole13: '',
      r2_hole14: '',
      r2_hole15: '',
      r2_hole16: '',
      r2_hole17: '',
      r2_hole18: '',
    })
    setRound3({
      r3_hole1: '',
      r3_hole2: '',
      r3_hole3: '',
      r3_hole4: '',
      r3_hole5: '',
      r3_hole6: '',
      r3_hole7: '',
      r3_hole8: '',
      r3_hole9: '',
      r3_hole10: '',
      r3_hole11: '',
      r3_hole12: '',
      r3_hole13: '',
      r3_hole14: '',
      r3_hole15: '',
      r3_hole16: '',
      r3_hole17: '',
      r3_hole18: '',
    })
    setRound4({
      r4_hole1: '',
      r4_hole2: '',
      r4_hole3: '',
      r4_hole4: '',
      r4_hole5: '',
      r4_hole6: '',
      r4_hole7: '',
      r4_hole8: '',
      r4_hole9: '',
      r4_hole10: '',
      r4_hole11: '',
      r4_hole12: '',
      r4_hole13: '',
      r4_hole14: '',
      r4_hole15: '',
      r4_hole16: '',
      r4_hole17: '',
      r4_hole18: '',
    })
    setActiveTournament({})
  }

  const addTournamentHandler = async () => {
    validateFormSubmission()
    const tournamentFields = getTournamentObject()
    console.log('tournamentFields', tournamentFields)

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const res = await axios.post(
        `${URL}/api/tournament/${player.id}`,
        tournamentFields,
        config
      )
      if (res) {
        clearFormState()
      }
    } catch (err) {
      console.log(err.response.data.error)
      setMessage([
        ...message,
        { message: err.response.data.error, type: 'error' },
      ])
      setTimeout(() => {
        setMessage([])
      }, 3000)
    }
  }
  const updateTournamentHandler = async () => {
    validateFormSubmission()
    const tournamentFields = getTournamentObject()

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const res = await axios.put(
        `${URL}/api/tournament/${activeTournament._id}`,
        tournamentFields,
        config
      )
      console.log(res)
      if (res) {
        clearFormState()
      }
    } catch (err) {
      console.log(err.response.data.error)
      setMessage([
        ...message,
        { message: err.response.data.error, type: 'error' },
      ])
      setTimeout(() => {
        setMessage([])
      }, 3000)
    }
  }

  const deleteTournamentHandler = async () => {
    try {
      await axios.delete(`${URL}/api/tournament/${activeTournament._id}`)
      clearFormState()
      setMessage([...message, { message: 'Tournament Delete', type: 'error' }])
      setTimeout(() => {
        setMessage([])
      }, 5000)
    } catch (err) {
      console.log(err.response.data.error)
      setMessage([
        ...message,
        { message: err.response.data.error, type: 'error' },
      ])
      setTimeout(() => {
        setMessage([])
      }, 3000)
    }
  }

  useEffect(() => {
    if (Object.keys(activeTournament).length) {
      // populate the form fields //
      const { par, draw, points, place, tournament, rank, score } =
        activeTournament
      setPar(par)

      console.log('active tournament', activeTournament)

      setTournament({
        points: points,
        place: place,
        name: tournament,
        rank: rank,
        points: points,
        r1Time: draw['time'].time1,
        r2Time: draw['time'].time2,
        r3Time: draw['time'].time3,
        r4Time: draw['time'].time4,
        r1Tee: draw['tee'].tee1,
        r2Tee: draw['tee'].tee2,
        r3Tee: draw['tee'].tee3,
        r4Tee: draw['tee'].tee4,
        r1p1: draw['round1'][0],
        r1p2: draw['round1'][1],
        r1p3: draw['round1'][2],
        r2p1: draw['round2'][0],
        r2p2: draw['round2'][1],
        r2p3: draw['round2'][2],
        r3p1: draw['round3'][0],
        r3p2: draw['round3'][1],
        r3p3: draw['round3'][2],
        r4p1: draw['round4'][0],
        r4p2: draw['round4'][1],
        r4p3: draw['round4'][2],
      })

      score.round1 && setRound1(score.round1)
      score.round2 && setRound2(score.round2)
      score.round3 && setRound3(score.round3)
      score.round4 && setRound4(score.round4)
    }
  }, [activeTournament])

  return (
    <div className='dashboard-area'>
      <main className='main-content'>
        <Container maxWidth={sm ? 'sm' : undefined}>
          {message.length !== 0 &&
            message.map((err, i) => (
              <Alert
                key={`${i}`}
                className={classes.alert}
                severity={`${err.type}`}
              >
                {err.message}
              </Alert>
            ))}
          <Grid
            container
            justify='space-between'
            alignItems='center'
            style={{ margin: '2rem 0' }}
          >
            <Grid item>
              <Typography variant='h4' style={{ marginTop: '1rem' }}>
                {player && player.name}
              </Typography>
            </Grid>
            <Grid item>
              <Button
                variant='contained'
                color='primary'
                style={{
                  padding: '.5rem 2rem',
                }}
                onClick={handlePlayerVisibility}
              >
                {showPlayers ? 'Hide Players' : 'Show Players'}
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant='contained'
                color='primary'
                style={{
                  padding: '.5rem 2rem',
                }}
                onClick={logmeout}
              >
                Logout
              </Button>
            </Grid>
          </Grid>

          {/* Tournament Table */}
          {showPlayers && (
            <TournamentTable
              allPlayers={players}
              setPlayer={setPlayer}
              setActiveTournament={setActiveTournament}
              clearFormState={clearFormState}
            />
          )}
          <hr style={{ marginBottom: '2rem' }} />
          <form onChange={handleTournamentChange}>
            <Grid container justify='space-between'>
              <Grid item style={{ width: '45%' }}>
                <TextField
                  variant='outlined'
                  margin='normal'
                  type='text'
                  required
                  fullWidth
                  id='name'
                  label='Tournament Name'
                  name='name'
                  autoComplete='name'
                  autoFocus
                  value={name}
                />
              </Grid>
              <Grid item style={{ width: '45%' }}>
                <TextField
                  variant='outlined'
                  margin='normal'
                  required
                  fullWidth
                  name='place'
                  label='Tournament Place'
                  type='text'
                  id='place'
                  value={place}
                />
              </Grid>
            </Grid>

            {/* Draw Time Start Here */}
            <Grid container justify='space-between'>
              <Grid item style={{ width: '20%' }}>
                <TextField
                  variant='outlined'
                  margin='normal'
                  type='text'
                  required
                  fullWidth
                  id='r1Time'
                  label='Time For Draw'
                  name='r1Time'
                  value={r1Time}
                />
              </Grid>
              <Grid item style={{ width: '20%' }}>
                <TextField
                  variant='outlined'
                  margin='normal'
                  type='text'
                  required
                  fullWidth
                  id='r2Time'
                  label='Time For Draw'
                  name='r2Time'
                  value={r2Time}
                />
              </Grid>
              <Grid item style={{ width: '20%' }}>
                <TextField
                  variant='outlined'
                  margin='normal'
                  type='text'
                  required
                  fullWidth
                  id='r3Time'
                  label='Time For Draw'
                  name='r3Time'
                  value={r3Time}
                />
              </Grid>
              <Grid item style={{ width: '20%' }}>
                <TextField
                  variant='outlined'
                  margin='normal'
                  type='text'
                  required
                  fullWidth
                  id='r4Time'
                  label='Time For Draw'
                  name='r4Time'
                  value={r4Time}
                />
              </Grid>
            </Grid>
            {/* Draw Tee Start Here */}
            <Grid container justify='space-between'>
              <Grid item style={{ width: '20%' }}>
                <TextField
                  variant='outlined'
                  margin='normal'
                  type='text'
                  required
                  fullWidth
                  id='r1Tee'
                  label='Tee For Draw'
                  name='r1Tee'
                  value={r1Tee}
                />
              </Grid>
              <Grid item style={{ width: '20%' }}>
                <TextField
                  variant='outlined'
                  margin='normal'
                  type='text'
                  required
                  fullWidth
                  id='r2Tee'
                  label='Tee For Draw'
                  name='r2Tee'
                  value={r2Tee}
                />
              </Grid>
              <Grid item style={{ width: '20%' }}>
                <TextField
                  variant='outlined'
                  margin='normal'
                  type='text'
                  required
                  fullWidth
                  id='r3Tee'
                  label='Tee For Draw'
                  name='r3Tee'
                  value={r3Tee}
                />
              </Grid>
              <Grid item style={{ width: '20%' }}>
                <TextField
                  variant='outlined'
                  margin='normal'
                  type='text'
                  required
                  fullWidth
                  id='r4Tee'
                  label='Tee For Draw'
                  name='r4Tee'
                  value={r4Tee}
                />
              </Grid>
            </Grid>
            {/* Draw Round Starts Here */}
            <Grid container justify='space-between'>
              <Grid item style={{ width: '30%' }}>
                <TextField
                  variant='outlined'
                  margin='normal'
                  type='text'
                  required
                  fullWidth
                  id='r1p1'
                  label='Draw R1 Player 1'
                  name='r1p1'
                  value={r1p1}
                />
              </Grid>
              <Grid item style={{ width: '30%' }}>
                <TextField
                  variant='outlined'
                  margin='normal'
                  type='text'
                  required
                  fullWidth
                  id='r1p2'
                  label='Draw R1 Player 2'
                  name='r1p2'
                  value={r1p2}
                />
              </Grid>
              <Grid item style={{ width: '30%' }}>
                <TextField
                  variant='outlined'
                  margin='normal'
                  type='text'
                  required
                  fullWidth
                  id='r1p3'
                  label='Draw R1 Player 3'
                  name='r1p3'
                  value={r1p3}
                />
              </Grid>
            </Grid>
            <Grid container justify='space-between'>
              <Grid item style={{ width: '30%' }}>
                <TextField
                  variant='outlined'
                  margin='normal'
                  type='text'
                  required
                  fullWidth
                  id='r2p1'
                  label='Draw R2 Player 1'
                  name='r2p1'
                  value={r2p1}
                />
              </Grid>
              <Grid item style={{ width: '30%' }}>
                <TextField
                  variant='outlined'
                  margin='normal'
                  type='text'
                  required
                  fullWidth
                  id='r2p2'
                  label='Draw R2 Player 2'
                  name='r2p2'
                  value={r2p2}
                />
              </Grid>
              <Grid item style={{ width: '30%' }}>
                <TextField
                  variant='outlined'
                  margin='normal'
                  type='text'
                  required
                  fullWidth
                  id='r2p3'
                  label='Draw R2 Player 3'
                  name='r2p3'
                  value={r2p3}
                />
              </Grid>
            </Grid>
            <Grid container justify='space-between'>
              <Grid item style={{ width: '30%' }}>
                <TextField
                  variant='outlined'
                  margin='normal'
                  type='text'
                  required
                  fullWidth
                  id='r3p1'
                  label='Draw R3 Player 1'
                  name='r3p1'
                  value={r3p1}
                />
              </Grid>
              <Grid item style={{ width: '30%' }}>
                <TextField
                  variant='outlined'
                  margin='normal'
                  type='text'
                  required
                  fullWidth
                  id='r3p2'
                  label='Draw R3 Player 2'
                  name='r3p2'
                  value={r3p2}
                />
              </Grid>
              <Grid item style={{ width: '30%' }}>
                <TextField
                  variant='outlined'
                  margin='normal'
                  type='text'
                  required
                  fullWidth
                  id='r3p3'
                  label='Draw R3 Player 3'
                  name='r3p3'
                  value={r3p3}
                />
              </Grid>
            </Grid>
            <Grid container justify='space-between'>
              <Grid item style={{ width: '30%' }}>
                <TextField
                  variant='outlined'
                  margin='normal'
                  type='text'
                  required
                  fullWidth
                  id='r4p1'
                  label='Draw R4 Player 1'
                  name='r4p1'
                  value={r4p1}
                />
              </Grid>
              <Grid item style={{ width: '30%' }}>
                <TextField
                  variant='outlined'
                  margin='normal'
                  type='text'
                  required
                  fullWidth
                  id='r4p2'
                  label='Draw R4 Player 2'
                  name='r4p2'
                  value={r4p2}
                />
              </Grid>
              <Grid item style={{ width: '30%' }}>
                <TextField
                  variant='outlined'
                  margin='normal'
                  type='text'
                  required
                  fullWidth
                  id='r4p3'
                  label='Draw R4 Player 3'
                  name='r4p3'
                  value={r4p3}
                />
              </Grid>
            </Grid>
          </form>
          {/* par table */}
          <Typography variant='h6' style={{ margin: '1rem 0' }}>
            Par
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {new Array(18).fill(1).map((cell, i) => (
                    <TableCell key={`${i}`}>h{i + 1}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  {parArray.map((hole, i) => (
                    <TableCell key={`${i}`}>
                      <TextField
                        name={`hole${i + 1}`}
                        value={hole}
                        onChange={par_handleChange}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          {/* round 1 */}
          <Typography variant='h6' style={{ margin: '1rem 0' }}>
            Round 1
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {new Array(18).fill(1).map((cell, i) => (
                    <TableCell key={`${i}`}>h{i + 1}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  {r1_holesArr.map((hole, i) => (
                    <TableCell key={`r1_${i}`}>
                      <TextField
                        name={`r1_hole${i + 1}`}
                        value={hole}
                        onChange={r1_handleChange}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          {/* round 2 */}
          <Typography variant='h6' style={{ margin: '1rem 0' }}>
            Round 2
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {new Array(18).fill(1).map((cell, i) => (
                    <TableCell key={`${i}`}>h{i + 1}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  {r2_holesArr.map((hole, i) => (
                    <TableCell key={`r2_${i}`}>
                      <TextField
                        name={`r2_hole${i + 1}`}
                        value={hole}
                        onChange={r2_handleChange}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          {/* round 3 */}
          <Typography variant='h6' style={{ margin: '1rem 0' }}>
            Round 3
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {new Array(18).fill(1).map((cell, i) => (
                    <TableCell key={`${i}`}>h{i + 1}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  {r3_holesArr.map((hole, i) => (
                    <TableCell key={`r3_${i}`}>
                      <TextField
                        name={`r3_hole${i + 1}`}
                        value={hole}
                        onChange={r3_handleChange}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          {/* round 4 */}
          <Typography variant='h6' style={{ margin: '1rem 0' }}>
            Round 4
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {new Array(18).fill(1).map((cell, i) => (
                    <TableCell key={`${i}`}>h{i + 1}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  {r4_holesArr.map((hole, i) => (
                    <TableCell key={`r4_${i}`}>
                      <TextField
                        name={`r4_hole${i + 1}`}
                        value={hole}
                        onChange={r4_handleChange}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <div
            className='btn-group'
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            {Object.keys(activeTournament).length === 0 ? (
              <Button
                variant='contained'
                color='secondary'
                style={{
                  margin: '1rem 0 1rem',
                  padding: '.5rem 2rem',
                }}
                disabled={Object.keys(player).length === 0}
                onClick={addTournamentHandler}
              >
                Add
              </Button>
            ) : (
              <>
                <Button
                  variant='contained'
                  color='primary'
                  style={{
                    margin: '1rem 0 1rem',
                    padding: '.5rem 2rem',
                  }}
                  onClick={updateTournamentHandler}
                >
                  Update
                </Button>
                <Button
                  variant='contained'
                  color='secondary'
                  style={{
                    margin: '1rem 0 1rem',
                    padding: '.5rem 2rem',
                  }}
                  onClick={deleteTournamentHandler}
                >
                  Delete
                </Button>
                <Button
                  variant='contained'
                  style={{
                    margin: '1rem 0',
                    padding: '.5rem 2rem',
                  }}
                  onClick={clearFormState}
                >
                  Clear
                </Button>
              </>
            )}
          </div>
        </Container>
        <div style={{ marginBottom: '5rem' }}></div>
      </main>
    </div>
  )
}
