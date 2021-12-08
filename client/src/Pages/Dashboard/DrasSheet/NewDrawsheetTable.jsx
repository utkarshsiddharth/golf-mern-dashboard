import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

import './drawsheet.css';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';

const useStyles = makeStyles({});

function createData(time, tee, player1, player2, player3, player4) {
  return { time, tee, player1, player2, player3, player4 };
}

export default function BasicTable({ allTournaments }) {
  const [rowsDataForRound, setRowsDataForRound] = useState([]);
  const [round, setRound] = useState('round1');

  useEffect(() => {
    const newData = [];
    allTournaments.forEach((item) => {
      console.log(item);
      newData.push(
        createData(
          item.time,
          item.tee,
          item.player1,
          item.player2,
          item.player3,
          item.player4
        )
      );
    });
    setRowsDataForRound(newData);
  }, [allTournaments]);

  const getDrawPlayer = (data) => {
    return (
      <>
        <TableCell component='th' scope='row' align='right'>
          {data.time}
        </TableCell>
        <TableCell align='center'>{data.tee}</TableCell>
        <TableCell align='right'>{data.player1}</TableCell>
        <TableCell align='right'>{data.player2}</TableCell>
        <TableCell align='right'>{data.player3}</TableCell>
        <TableCell align='right'>{data.player4}</TableCell>
      </>
    );
  };

  const classes = useStyles();
  return (
    <>
      {/* <div style={{ width: '73%' }}>
        <Button
          style={{ margin: '2rem 0 0.5rem 0' }}
          variant='contained'
          color='primary'
          className={'round1 btn-active'}
        >
          Round 1
        </Button>
      </div> */}
      <div className='drawsheet-table-container'>
        <TableContainer component={Paper}>
          <Table className={`${classes.table}`} aria-label='simple table'>
            <TableHead>
              <TableRow className='drawsheet-table-row-head'>
                <TableCell>No.</TableCell>
                <TableCell align='right'>Time</TableCell>
                <TableCell align='center'>Tee</TableCell>
                <TableCell align='right'>Player 1</TableCell>
                <TableCell align='right'>Player 2</TableCell>
                <TableCell align='right'>Player 3</TableCell>
                <TableCell align='right'>Player 4</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rowsDataForRound.map((row, i) => (
                <TableRow className={i % 2 === 0 ? 'even' : 'odd'} key={uuid()}>
                  <TableCell align='left'>{i + 1}</TableCell>

                  {getDrawPlayer(row)}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
