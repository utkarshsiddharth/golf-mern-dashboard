import React, { Fragment, useEffect, useState } from 'react';
import Sidebar from '../Sidebar';
import '../index.css';
import axios from 'axios';

import PlayerTable from './PlayerTable';

// Material ui components //
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 1, 2),
  },
  alert: {
    marginBottom: theme.spacing(1),
  },
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
}));

const URL = process.env.REACT_APP_API_URL;

export default function Player({ loading, players, setPlayers }) {
  if (!loading) {
    setPlayers(players);
  }
  const classes = useStyles();
  const [showPlayers, setShowPlayer] = useState(false);
  const [playerToUpdate, setPlayerToUpdate] = useState(null);
  const [updateState, setUpdateState] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    country: 'INDIA',
    city: 'Chandigarh',
    birthPlace: 'Chandigarh',
    age: '',
    gender: '',
  });

  const [message, setMessage] = useState([]);

  const handleChanges = (e) => {
    let newFormData = { ...formData };
    newFormData[e.target.name] = e.target.value;
    setFormData(newFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.birthPlace || !formData.city) {
      setMessage([
        ...message,
        { message: `Please Fill All Field`, type: 'error' },
      ]);
      setTimeout(() => {
        setMessage([]);
      }, 3000);
    } else {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      if (updateState) {
        // update player //
        try {
          console.log(playerToUpdate._id);
          const res = await axios.put(
            `${URL}/api/players/${playerToUpdate._id}`,
            formData
          );
          clearState();
          setUpdateState(false);
        } catch (err) {
          setMessage([...message, { message: `Invalid Fields` }]);
          setTimeout(() => {
            setMessage([]);
          }, 3000);
        }
      } else {
        // add player //
        try {
          const res = await axios.post(`${URL}/api/players`, formData, config);
          clearState();
          setPlayers([...players, res.data.data]);
        } catch (err) {
          setMessage([
            ...message,
            { message: err.response.data.message, type: 'error' },
          ]);
        }
      }
    }
  };
  // deletePlayerHandler //
  const deletePlayerHandler = async () => {
    try {
      await axios.delete(`${URL}/api/players/${playerToUpdate._id}`);
      clearState();
      setPlayers(players.map((p) => p._id !== playerToUpdate._id));
    } catch (err) {
      setMessage([
        ...message,
        { message: err.response.data.message, type: 'error' },
      ]);
    }
  };
  // handle player visibility //
  const handlePlayerVisibility = () => {
    setShowPlayer(!showPlayers);
    setMessage([
      ...message,
      {
        message: showPlayers ? 'Hide Players' : 'Show All Players',
        type: showPlayers ? 'warning' : 'success',
      },
    ]);
    setTimeout(() => {
      setMessage([]);
    }, 1000);
  };

  const clearState = () => {
    setFormData({
      name: '',
      country: 'INDIA',
      city: 'Chandigarh',
      birthPlace: 'Chandigarh',
      age: '',
      gender: '',
    });
    setUpdateState(false);
  };

  // effect; //
  useEffect(() => {
    if (playerToUpdate) {
      setFormData({
        name: playerToUpdate.name,
        age: playerToUpdate.age,
        country: playerToUpdate.country,
        city: playerToUpdate.city,
        birthPlace: playerToUpdate.birthPlace,
        gender: playerToUpdate.gender,
      });
      setUpdateState(true);
    }
  }, [playerToUpdate]);

  return (
    <div className='dashboard-area'>
      <main className='main-content'>
        <Container
          maxWidth='md'
          style={{ marginTop: '2rem', marginBottom: '5rem' }}
        >
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
          <Typography variant='h4' style={{ marginTop: '2rem' }}>
            Add New Player
          </Typography>
          <form
            onChange={handleChanges}
            onSubmit={handleSubmit}
            className={classes.form}
            noValidate
          >
            <TextField
              variant='outlined'
              margin='normal'
              type='text'
              required
              fullWidth
              id='name'
              label='Name'
              name='name'
              autoComplete='name'
              autoFocus
              value={formData.name}
            />

            <TextField
              variant='outlined'
              margin='normal'
              type='number'
              required
              fullWidth
              id='age'
              label='Age'
              name='age'
              autoComplete='age'
              autoFocus
              value={formData.age}
            />

            <TextField
              variant='outlined'
              margin='normal'
              type='text'
              required
              fullWidth
              id='gender'
              label='Gender'
              name='gender'
              autoComplete='gender'
              autoFocus
              value={formData.gender}
            />

            <TextField
              variant='outlined'
              margin='normal'
              type='text'
              required
              fullWidth
              id='country'
              label='Country'
              name='country'
              autoComplete='country'
              autoFocus
              value={formData.country}
            />

            <TextField
              variant='outlined'
              margin='normal'
              type='text'
              required
              fullWidth
              id='city'
              label='City'
              name='city'
              autoComplete='city'
              value={formData.city}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='birthPlace'
              label='Birth Place'
              type='text'
              id='birthPlace'
              value={formData.birthPlace}
            />

            {updateState ? (
              <Fragment>
                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  className={classes.submit}
                >
                  Update Player
                </Button>
                <Button
                  type='button'
                  variant='outlined'
                  onClick={() => {
                    clearState();
                  }}
                  className={classes.submit}
                >
                  Clear Player
                </Button>
                <Button
                  type='submit'
                  variant='contained'
                  color='secondary'
                  onClick={deletePlayerHandler}
                  className={classes.submit}
                >
                  Delete Player
                </Button>
              </Fragment>
            ) : (
              <>
                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  className={classes.submit}
                >
                  Add Player
                </Button>
                <Button
                  type='button'
                  variant='contained'
                  color={showPlayers ? 'secondary' : 'primary'}
                  onClick={handlePlayerVisibility}
                  className={classes.submit}
                >
                  {showPlayers ? 'Hide Players' : 'Show All Player'}
                </Button>
              </>
            )}

            <div style={{ marginTop: '3rem' }} />
          </form>
          <hr />
          {/* Player Table */}
          {showPlayers && (
            <PlayerTable
              setPlayerToUpdate={setPlayerToUpdate}
              allPlayers={players}
            />
          )}
        </Container>
      </main>
    </div>
  );
}
