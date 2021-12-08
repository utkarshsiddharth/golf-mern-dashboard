import React, { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
// import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
// import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
// import { Button, ButtonGroup } from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/Remove'
import AddIcon from '@material-ui/icons/Add'

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
})

function createData(
  id,
  rank,
  name,
  sumOfEvent1,
  sumOfEvent2,
  sumOfEvent3,
  sumOfEvent4,
  sumOfEvent5,
  score,
  total,
  points
) {
  return {
    id,
    rank,
    name,
    sumOfEvent1,
    sumOfEvent2,
    sumOfEvent3,
    sumOfEvent4,
    sumOfEvent5,
    score,
    total,
    points,
  }
}

function Row({ row, setRound, className }) {
  const roundSection = (rowScore, round, scoreStat) => (
    <>
      <Typography
        key={uuid()}
        variant='h6'
        gutterBottom
        component='div'
        className='round-heading'
      >
        Event {round} Score of {row.name}
      </Typography>
      <Table
        className='rounds-table'
        size='small'
        key={uuid()}
        aria-label='purchases'
      >
        <TableHead>
          <TableRow className='tournament-table-row-head-hole'>
            <TableCell>Hole</TableCell>
            {new Array(21).fill(1).map((item, index) => (
              <TableCell align='center'>
                {index + 1 === 10
                  ? 'OUT'
                  : index + 1 < 10
                  ? index + 1
                  : index === 19
                  ? 'IN'
                  : index === 20
                  ? 'TOTAL'
                  : index}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow key={uuid()} style={{ cursor: 'pointer' }}>
            <TableCell component='th' scope='row'>
              Par
            </TableCell>
            {Object.values(row.par).map((item, index) => (
              <TableCell key={uuid()} align='center'>
                {item}
              </TableCell>
            ))}
          </TableRow>
          <TableRow key={uuid()} style={{ cursor: 'pointer' }}>
            <TableCell component='th' scope='row'>
              Score
            </TableCell>
            {rowScore.map((item, index) => (
              <TableCell key={uuid()} align='center'>
                <div
                  data-tooltip={scoreStat[index]}
                  className={`round-score ${
                    item <= 6 ? 'round-score-tooltip' : undefined
                  }`}
                  style={
                    item <= 6
                      ? {
                          backgroundColor:
                            scoreStat[index] === 'bogey'
                              ? 'purple'
                              : scoreStat[index] === 'birdy'
                              ? 'slateblue'
                              : '#000',
                          borderRadius: '100px',
                          color: '#fff',
                          height: '20px',
                          width: '20px',
                          display: 'grid',
                          placeContent: 'center',
                          margin: 'auto',
                        }
                      : undefined
                  }
                >
                  {item}
                </div>
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </>
  )

  const [open, setOpen] = React.useState(false)
  const classes = useRowStyles()

  return (
    <React.Fragment>
      <TableRow
        className={`${classes.root} ${className}`}
        style={{ cursor: 'pointer' }}
      >
        <TableCell>
          {/* <IconButton
            aria-label='expand row'
            size='small'
            onClick={() => {
              setOpen(!open);
              setRound('');
            }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton> */}
        </TableCell>
        <TableCell component='th' scope='row'>
          {row.rank}
        </TableCell>
        <TableCell component='th' scope='row'>
          {row.name.split(',')[0] ?? row.name}
        </TableCell>
        <TableCell align='right'>
          {row.score > 0 ? (
            <div style={{ fontWeight: 'bold' }}>
              {/* <AddIcon
                style={{
                  fontSize: '18px',
                  color: 'green',
                  paddingTop: '8px',

                  marginRight: '-5px',
                }}
              /> */}
              {Math.abs(row.score)}
            </div>
          ) : (
            <div style={{ fontWeight: 'bold' }}>
              <RemoveIcon
                style={{
                  fontSize: '18px',
                  color: 'red',
                  paddingTop: '8px',
                  marginRight: '-5px',
                }}
              />
              {Math.abs(row.score)}
            </div>
          )}
        </TableCell>
        <TableCell align='right' component='th' scope='row'>
          {row.sumOfEvent1}
        </TableCell>
        <TableCell align='right'>{row.sumOfEvent2}</TableCell>
        <TableCell align='right'>{row.sumOfEvent3}</TableCell>
        <TableCell align='right'>{row.sumOfEvent4 ?? 0}</TableCell>
        <TableCell align='right'>{row.sumOfEvent5 ?? 0}</TableCell>

        <TableCell align='right' style={{ fontWeight: 'bold' }}>
          {row.total}
        </TableCell>
        <TableCell align='right' style={{ fontWeight: 'bold' }}>
          {row.points}
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}
export default function TournamentTableDashboard({ LeaderboardPlayers }) {
  const allPlayers = LeaderboardPlayers
  const [rows, setRows] = useState([])
  const [round, setRound] = useState('')
  // functions //
  const getSumOfRound = (round, half) => {
    const valuesArr = Object.values(round)
    let sumOfRound
    if (half) {
      sumOfRound = valuesArr
        .slice(0, valuesArr.length / 2)
        .reduce((sum, acc) => (sum += +acc), 0)
    } else {
      sumOfRound = valuesArr.reduce((sum, acc) => (sum += +acc), 0)
    }
    return sumOfRound
  }

  useEffect(() => {
    let rowsArr = []
    allPlayers.map((p, i) => {
      const { tournaments } = p
      if (tournaments.length > 0) {
        p.sumOfEvent1 = 0
        p.sumOfEvent2 = 0
        p.sumOfEvent3 = 0
        p.sumOfEvent4 = 0
        p.sumOfEvent5 = 0

        p.sumOfPar1 = 0
        p.sumOfPar2 = 0
        p.sumOfPar3 = 0
        p.sumOfPar4 = 0
        p.sumOfPar5 = 0

        // check if played 1 Events //
        if (
          tournaments[0]?.tournament === 'Event 1-Bogey Sport NCR Open, Delhi'
        ) {
          p.sumOfEvent1 = getSumOfRound(tournaments[0].score.round1)
          if (p.age <= 8) {
            p.sumOfPar1 = getSumOfRound(tournaments[0].par, true)
          } else {
            p.sumOfPar1 = getSumOfRound(tournaments[0].par)
          }
        }

        if (
          tournaments[0]?.tournament === 'Event 2-Bogey Sport Chandigarh Open'
        ) {
          p.sumOfEvent2 = getSumOfRound(tournaments[0].score.round1)
          if (p.age <= 8) {
            p.sumOfPar2 = getSumOfRound(tournaments[0].par, true)
          } else {
            p.sumOfPar2 = getSumOfRound(tournaments[0].par)
          }
        }
        if (
          tournaments[0]?.tournament === 'Event 3-Bogey Sport NCR Open, Delhi'
        ) {
          p.sumOfEvent2 = getSumOfRound(tournaments[0].score.round1)
          if (p.age <= 8) {
            p.sumOfPar2 = getSumOfRound(tournaments[0].par, true)
          } else {
            p.sumOfPar2 = getSumOfRound(tournaments[0].par)
          }
        }

        // check if played 2 Events //
        if (
          tournaments[1]?.tournament === 'Event 1-Bogey Sport NCR Open, Delhi'
        ) {
          p.sumOfEvent2 = getSumOfRound(tournaments[1].score.round1)
          if (p.age <= 8) {
            p.sumOfPar2 = getSumOfRound(tournaments[1].par, true)
          } else {
            p.sumOfPar2 = getSumOfRound(tournaments[1].par)
          }
        }

        if (
          tournaments[1]?.tournament === 'Event 2-Bogey Sport Chandigarh Open'
        ) {
          p.sumOfEvent2 = getSumOfRound(tournaments[1].score.round1)
          if (p.age <= 8) {
            p.sumOfPar2 = getSumOfRound(tournaments[1].par, true)
          } else {
            p.sumOfPar2 = getSumOfRound(tournaments[1].par)
          }
        }

        if (
          tournaments[1]?.tournament === 'Event 3-Bogey Sport NCR Open, Delhi'
        ) {
          p.sumOfEvent2 = getSumOfRound(tournaments[1].score.round1)
          if (p.age <= 8) {
            p.sumOfPar2 = getSumOfRound(tournaments[1].par, true)
          } else {
            p.sumOfPar2 = getSumOfRound(tournaments[1].par)
          }
        }

        // Check if played 3 Events
        if (
          tournaments[2]?.tournament === 'Event 1-Bogey Sport NCR Open, Delhi'
        ) {
          p.sumOfEvent3 = getSumOfRound(tournaments[2].score.round1)
          if (p.age <= 8) {
            p.sumOfPar3 = getSumOfRound(tournaments[2].par, true)
          } else {
            p.sumOfPar3 = getSumOfRound(tournaments[2].par)
          }
        }

        if (
          tournaments[2]?.tournament === 'Event 2-Bogey Sport Chandigarh Open'
        ) {
          p.sumOfEvent3 = getSumOfRound(tournaments[2].score.round1)
          if (p.age <= 8) {
            p.sumOfPar3 = getSumOfRound(tournaments[2].par, true)
          } else {
            p.sumOfPar3 = getSumOfRound(tournaments[2].par)
          }
        }

        if (
          tournaments[2]?.tournament === 'Event 3-Bogey Sport NCR Open, Delhi'
        ) {
          p.sumOfEvent3 = getSumOfRound(tournaments[2].score.round1)
          if (p.age <= 8) {
            p.sumOfPar3 = getSumOfRound(tournaments[2].par, true)
          } else {
            p.sumOfPar3 = getSumOfRound(tournaments[2].par)
          }
        }

        p.par = [
          p.sumOfPar1,
          p.sumOfPar2,
          p.sumOfPar3,
          p.sumOfPar4,
          p.sumOfPar5,
        ]
        let score1 = p.sumOfEvent1 - p.sumOfPar1 ?? 0
        let score2 = p.sumOfEvent2 - p.sumOfPar2 ?? 0

        let score3 = p.sumOfEvent3 - p.sumOfPar3 ?? 0
        p.score1 = score1
        p.score2 = score2
        p.score3 = score3
        p.score = score1 + score2 + score3

        p.total =
          p.sumOfEvent1 +
          p.sumOfEvent2 +
          p.sumOfEvent3 +
          p.sumOfEvent4 +
          p.sumOfEvent5
      }
    })
    const points = [60, 50, 40, 35, 30, 25, 20, 15, 10, 5]
    allPlayers
      .sort((a, b) => (a.score > b.score ? 1 : -1))
      .slice(0, 10)
      .map((p, i) => {
        p.rank = Number(i + 1)
        rowsArr.push(
          createData(
            `${p._id}`,
            p.rank,
            p.name,
            p.sumOfEvent1,
            p.sumOfEvent2,
            p.sumOfEvent3,
            p.sumOfEvent4,
            p.sumOfEvent5,
            p.score,
            (p.total = p.sumOfEvent1 + p.sumOfEvent2 + p.sumOfEvent3),
            points[i]
          )
        )
      })
    setRows(rowsArr)
    return () => setRows([])
  }, [LeaderboardPlayers])

  return (
    <TableContainer component={Paper}>
      <Table className='tournament-table' aria-label='collapsible table'>
        <TableHead>
          <TableRow className='tournament-table-row-head'>
            <TableCell />
            <TableCell>Pos</TableCell>
            <TableCell align='left'>Name</TableCell>
            <TableCell align='right'>Score</TableCell>
            <TableCell align='right'>E1</TableCell>
            <TableCell align='right'>E2</TableCell>
            <TableCell align='right'>E3</TableCell>
            <TableCell align='right'>E4</TableCell>
            <TableCell align='right'>E5</TableCell>
            <TableCell align='right'>Total</TableCell>
            <TableCell align='right'>Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length > 0 &&
            rows.map((row, index) => {
              return (
                <Row
                  key={row.id}
                  row={row}
                  setRound={setRound}
                  className={index % 2 === 0 ? 'even-row' : 'odd-row'}
                />
              )
            })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
