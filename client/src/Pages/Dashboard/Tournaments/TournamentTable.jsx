import React, { useEffect, useState } from 'react';
import moment from 'moment';

import { makeStyles } from '@material-ui/core/styles';
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

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function createData(id, name, age, city, birthPlace, tournaments) {
  return {
    id,
    name,
    age,
    city,
    birthPlace,
    tournaments,
  };
}

function Row({
  row,
  setPlayer,
  setActiveTournament,
  tournaments,
  clearFormState,
}) {
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  return (
    <React.Fragment>
      <TableRow
        className={classes.root}
        style={{ cursor: 'pointer' }}
        onClick={() => {
          setPlayer(row);
          clearFormState();
        }}
      >
        <TableCell>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row'>
          {row.name}
        </TableCell>
        <TableCell component='th' scope='row'>
          {row.age}
        </TableCell>
        <TableCell component='th' scope='row' align='right'>
          {row.city}
        </TableCell>
        <TableCell align='right'>{row.birthPlace}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box margin={1}>
              <Typography variant='h6' gutterBottom component='div'>
                Tournament
              </Typography>
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell align='right'>Place</TableCell>
                    <TableCell align='right'>Rank</TableCell>
                    <TableCell align='right'>Points</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tournaments.length > 0 ? (
                    tournaments.map((t) => (
                      <TableRow
                        key={t._id}
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          setActiveTournament(t);
                        }}
                      >
                        <TableCell component='th' scope='row'>
                          {moment(t.createdAt).format('MMM Do YY')}
                        </TableCell>
                        <TableCell>{`${t.tournament}`.split('=')[0]}</TableCell>
                        <TableCell align='right'>{t.place}</TableCell>
                        <TableCell align='right'>{t.rank}</TableCell>
                        <TableCell align='right'>{t.points}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell>No Tournamets Found</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable({
  allPlayers,
  setPlayer,
  setActiveTournament,
  clearFormState,
}) {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    allPlayers.map((p) => {
      rows.push(
        createData(
          `${p._id}`,
          `${p.name}`,
          `${p.age}`,
          `${p.city}`,
          `${p.birthPlace}`,
          p.tournaments
        )
      );
    });
    return () => setRows([]);
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label='collapsible table'>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Player Name</TableCell>
            <TableCell>Player Age</TableCell>
            <TableCell align='right'>Player city</TableCell>
            <TableCell align='right'>Player BirthPlace&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length > 0 &&
            rows.map((row) => (
              <Row
                key={row.id}
                row={row}
                setPlayer={setPlayer}
                setActiveTournament={setActiveTournament}
                tournaments={row.tournaments}
                clearFormState={clearFormState}
              />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
