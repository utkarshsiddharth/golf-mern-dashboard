import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, ButtonGroup } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(time, tee, draw) {
  return { time, tee, draw };
}

export default function BasicTable({ allTournaments }) {
  const [rowsDataForRound, setRowsDataForRound] = useState([]);
  const [round, setRound] = useState('round1');

  const getDrawPlayer = (draw, row, num) => {
    return (
      <>
        {round === 'round1' || round === '' ? (
          <TableCell component='th' scope='row' align='right'>
            {row.time.time1}
          </TableCell>
        ) : round === 'round2' ? (
          <TableCell component='th' scope='row' align='right'>
            {row.time.time2}
          </TableCell>
        ) : (
          round === 'round3' && (
            <TableCell component='th' scope='row' align='right'>
              {row.time.time3}
            </TableCell>
          )
        )}
        {round === 'round1' || round === '' ? (
          <TableCell align='center'>{row.tee.tee1}</TableCell>
        ) : round === 'round2' ? (
          <TableCell align='center'>{row.tee.tee2}</TableCell>
        ) : (
          round === 'round3' && (
            <TableCell align='center'>{row.tee.tee3}</TableCell>
          )
        )}
        <TableCell align='right'>{draw[num][0]}</TableCell>
        <TableCell align='right'>{draw[num][1]}</TableCell>
        <TableCell align='right'>{draw[num][2]}</TableCell>
      </>
    );
  };

  useEffect(() => {
    if (allTournaments.length > 0) {
      if (allTournaments[0].draw.round1.length !== 0) {
        console.log(allTournaments[0].draw.round1.length === 0);
        const rowsArrForRound = [];
        allTournaments.forEach((tour) => {
          const { time, tee, round1, round2, round3 } = tour.draw;
          let draw = [round1, round2, round3];

          rowsArrForRound.push(createData(time, tee, draw));
        });
        setRowsDataForRound(rowsArrForRound);
      } else {
        setRowsDataForRound([]);
      }
    }
  }, [allTournaments]);

  const classes = useStyles();
  return (
    <>
      <ButtonGroup style={{ margin: '2rem 0 0.5rem 0' }}>
        <Button
          variant='contained'
          color='primary'
          className={round === 'round1' && 'btn-active'}
          onClick={() => setRound('round1')}
        >
          Round 1
        </Button>
        <Button
          variant='contained'
          color='primary'
          className={round === 'round2' && 'btn-active'}
          style={{ margin: '0 1rem' }}
          onClick={() => setRound('round2')}
        >
          Round 2
        </Button>
        <Button
          variant='contained'
          color='primary'
          className={round === 'round3' && 'btn-active'}
          onClick={() => setRound('round3')}
        >
          Round 3
        </Button>
      </ButtonGroup>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='simple table'>
          <TableHead>
            <TableRow className='drawsheet-table-row-head'>
              <TableCell>No.</TableCell>
              <TableCell align='right'>Time</TableCell>
              <TableCell align='center'>Tee</TableCell>
              <TableCell align='right'>Player 1</TableCell>
              <TableCell align='right'>Player 2</TableCell>
              <TableCell align='right'>Player 3</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rowsDataForRound.map((row, i) => (
              <TableRow className={i % 2 === 0 ? 'even' : 'odd'} key={uuid()}>
                <TableCell align='left'>{i + 1}</TableCell>

                {round === 'round1' || round === ''
                  ? getDrawPlayer(row.draw, row, 0)
                  : round === 'round2'
                  ? getDrawPlayer(row.draw, row, 1)
                  : round === 'round3' && getDrawPlayer(row.draw, row, 2)}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
