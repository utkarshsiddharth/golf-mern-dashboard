import React, { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'

import RemoveIcon from '@material-ui/icons/Remove'
import AddIcon from '@material-ui/icons/Add'
import { capitalize } from '@material-ui/core'

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

function Row({ row, className }) {
  const classes = useRowStyles()

  return (
    <React.Fragment>
      <TableRow
        className={`${classes.root} ${className}`}
        style={{ cursor: 'pointer' }}
        key={row.id}
      >
        <TableCell></TableCell>
        <TableCell component='th' scope='row'>
          {row.rank}
        </TableCell>
        <TableCell component='th' scope='row'>
          <span style={{ textTransform: 'capitalize' }}>
            {row.name.split(',')[0] ?? row.name}
          </span>
        </TableCell>
        {/* <TableCell align='right'>
          {row.score > 0 ? (
            <div style={{ fontWeight: 'bold' }}>{Math.abs(row.score)}</div>
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
        </TableCell> */}
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
export default function ManualLeaderboard({ allPlayers }) {
  console.log('All Players', allPlayers)
  const [rows, setRows] = useState([])
  useEffect(() => {
    let rowsArr = []
    allPlayers
      .sort((a, b) => (a.points > b.points ? -1 : 1))
      .slice(0, 10)
      .map((p, i) => {
        p.rank = Number(i + 1)
        rowsArr.push(
          createData(
            `${p._id}`,
            p.rank,
            p.name,
            p.e1,
            p.e2,
            p.e3,
            p.e4,
            p.e5,
            p.score,
            p.total,
            p.points
          )
        )
      })
    setRows(rowsArr)
    return () => setRows([])
  }, [allPlayers])

  return (
    <TableContainer component={Paper}>
      <Table className='tournament-table' aria-label='collapsible table'>
        <TableHead>
          <TableRow className='tournament-table-row-head'>
            <TableCell />
            <TableCell>Pos</TableCell>
            <TableCell align='left'>Name</TableCell>
            {/* <TableCell align='right'>Score</TableCell> */}
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
                  className={index % 2 === 0 ? 'even-row' : 'odd-row'}
                />
              )
            })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
