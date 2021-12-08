import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Button, ButtonGroup } from '@material-ui/core';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function createData(
  id,
  rank,
  tournament,
  par,
  r1,
  r2,
  r3,
  r4,
  r5,
  total,
  score,
  name,
  country,
  tournamentName
) {
  return {
    id,
    rank: +rank,
    tournament,
    par,
    r1,
    r2,
    r3,
    r4,
    r5,
    total,
    score,
    name,
    country,
    tournamentName,
  };
}

function Row({ row, score, setRound, round, className }) {
  const roundSection = (rowScore, round, scoreStat) => (
    <>
      <Typography
        key={uuid()}
        variant='h6'
        gutterBottom
        component='div'
        className='round-heading'
      >
        Round {round} Score of {row.name.split(',')[0] ?? row.name}
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
  );
  const addValueForSum = (arr) => {
    const sum1 = arr.slice(0, 9).reduce((sum, acc) => (sum += +acc), 0);
    const sum2 = arr.slice(9, 18).reduce((sum, acc) => (sum += +acc), 0);
    if (arr.length === 18) {
      arr.splice(9, 0, sum1);
      arr.push(sum2);
      arr.push(sum1 + sum2);
    }
    return arr;
  };

  row.par = addValueForSum(Object.values(row.par));
  row.score[0] = addValueForSum(Object.values(row.score[0]));
  row.score[1] = addValueForSum(Object.values(row.score[1]));
  row.score[2] = addValueForSum(Object.values(row.score[2]));

  const scoreStat1 = [];
  const scoreStat2 = [];
  const scoreStat3 = [];

  setStats(0, scoreStat1);
  setStats(1, scoreStat2);
  setStats(2, scoreStat3);

  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  // functions //
  function setStats(num, arr) {
    Array(21)
      .fill(1)
      .forEach((item, i) => {
        if (+row.score[num][i] == +row.par[i]) {
          arr[i] = 'par';
        } else if (+row.score[num][i] > +row.par[i]) {
          arr[i] = 'bogey';
        } else if (+row.score[num][i] < +row.par[i]) {
          arr[i] = 'birdy';
        }
      });
  }

  return (
    <React.Fragment>
      <TableRow
        className={`${classes.root} ${className}`}
        style={{ cursor: 'pointer' }}
      >
        <TableCell>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={() => {
              setOpen(!open);
              setRound('');
            }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row'>
          {row.rank}
        </TableCell>
        <TableCell component='th' scope='row'>
          {row.name.split(',')[0] ?? row.name}
        </TableCell>
        <TableCell align='right' component='th' scope='row'>
          {row.country}
        </TableCell>
        <TableCell align='right'>
          {row.tournamentName === 'Event 1-Bogey Sport NCR Open, Delhi'
            ? row.r1
            : 0}
        </TableCell>
        <TableCell align='right'>
          {row.tournamentName === 'Event 2-Bogey Sport Chandigarh Open'
            ? row.r1
            : 0}
        </TableCell>
        <TableCell align='right'>
          {row.tournamentName === 'Event 3-Bogey Sport NCR Open, Delhi'
            ? row.r1
            : 0}
        </TableCell>
        <TableCell align='right'>
          {row.tournamentName === 'Event 4-Bogey Sport NCR Open, Delhi'
            ? row.r1
            : 0}
        </TableCell>
        <TableCell align='right'>
          {row.tournamentName === 'Event 5-Finale' ? row.r1 : 0}
        </TableCell>
        <TableCell align='right'>{row.total}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <ButtonGroup>
              <Button
                className={round === 'round1' && 'btn-active'}
                variant='contained'
                color='primary'
                onClick={() => setRound('round1')}
              >
                Round 1
              </Button>
              <Button
                className={round === 'round2' && 'btn-active'}
                variant='contained'
                color='primary'
                style={{ margin: '0 1rem' }}
                onClick={() => setRound('round2')}
              >
                Round 2
              </Button>
              <Button
                className={round === 'round3' && 'btn-active'}
                variant='contained'
                color='primary'
                onClick={() => setRound('round3')}
              >
                Round 3
              </Button>
            </ButtonGroup>
            <Box margin={1}>
              {round === 'round1' ? (
                roundSection(row.score[0], 1, scoreStat1)
              ) : round === 'round2' ? (
                roundSection(row.score[1], 2, scoreStat2)
              ) : round === 'round3' ? (
                roundSection(row.score[2], 3, scoreStat3)
              ) : (
                <>
                  {roundSection(row.score[0], 1, scoreStat1)}
                  {roundSection(row.score[1], 2, scoreStat2)}
                  {roundSection(row.score[2], 3, scoreStat3)}
                </>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function TournamentTableDashboard({
  allTournaments,
  tournament: tournamentName,
}) {
  const [rows, setRows] = useState([]);
  const [round, setRound] = useState('');
  // functions //
  const getSumOfRound = (round) => {
    const sumOfRound = Object.values(round).reduce(
      (sum, acc) => (sum += +acc),
      0
    );
    return sumOfRound;
  };
  useEffect(() => {
    let rowsArr = [];
    console.log('all tournaments', allTournaments);
    allTournaments.map((p) => {
      const { score } = p;
      p.sumOfRound1 = getSumOfRound(score.round1);
      p.sumOfRound2 = getSumOfRound(score.round2);
      p.sumOfRound3 = getSumOfRound(score.round3);
      p.total = p.sumOfRound1 + p.sumOfRound2 + p.sumOfRound3;
      p.scoreArr = [score.round1, score.round2, score.round3];
    });

    allTournaments
      .sort((a, b) => (a.total > b.total ? 1 : -1))
      .map((p, i) => {
        p.rank = Number(i + 1);
        rowsArr.push(
          createData(
            `${p._id}`,
            `${p.rank}`,
            `${p.tournament}`,
            p.par,
            p.sumOfRound1,
            p.sumOfRound2,
            p.sumOfRound3,
            p.sumOfRound4 ?? 0,
            p.sumOfRound5 ?? 0,
            p.total,
            p.scoreArr,
            p.player.name,
            p.player.country,
            tournamentName
          )
        );
      });
    setRows(rowsArr);
    return () => setRows([]);
  }, [allTournaments]);

  return (
    <TableContainer component={Paper}>
      <Table className='tournament-table' aria-label='collapsible table'>
        <TableHead>
          <TableRow className='tournament-table-row-head'>
            <TableCell />
            <TableCell>Pos</TableCell>
            <TableCell align='left'>Name</TableCell>
            <TableCell align='right'>Country</TableCell>
            <TableCell align='right'>E1</TableCell>
            <TableCell align='right'>E2</TableCell>
            <TableCell align='right'>E3</TableCell>
            <TableCell align='right'>E4</TableCell>
            <TableCell align='right'>E5</TableCell>
            <TableCell align='right'>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length > 0 &&
            rows.map((row, index) => {
              return (
                <Row
                  key={row.id}
                  row={row}
                  score={row.score}
                  setRound={setRound}
                  round={round}
                  className={index % 2 === 0 ? 'even-row' : 'odd-row'}
                />
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
