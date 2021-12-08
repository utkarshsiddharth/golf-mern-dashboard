import { React, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

// material ui components //
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/Lock';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import banner from '../assets/images/leaderboard.png';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '90vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  alert: {
    marginBottom: theme.spacing(1),
  },
}));

const URL = process.env.REACT_APP_API_URL;

export default function Login({ isAuth, setIsAuth }) {
  const classes = useStyles();
  const history = useHistory();
  const [loginState, setLoginState] = useState(true);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: '',
  });
  const [errors, setErrors] = useState([]);

  const handleChanges = (e) => {
    let newFormData = { ...formData };
    newFormData[e.target.name] = e.target.value;
    setFormData(newFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //attempt login
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    if (loginState) {
      try {
        let res = await axios.post(`${URL}/api/auth/login`, formData, options);
        localStorage.setItem('token', JSON.stringify(res.data.token));
        setIsAuth(true);
        history.push('/');
      } catch (err) {
        console.error(err.response.data.error);
        setErrors([...errors, { message: err.response.data.error }]);
        setTimeout(() => {
          setErrors([]);
        }, 3000);
      }
    } else {
      try {
        let res = await axios.post(
          `${URL}/api/auth/register`,
          formData,
          options
        );
        localStorage.setItem('token', JSON.stringify(res.data.token));
        setIsAuth(true);
        history.push('/');
      } catch (err) {
        console.error(err.response.data.error);
        setErrors([...errors, { message: err.response.data.error }]);
        setTimeout(() => {
          setErrors([]);
        }, 3000);
      }
    }
  };

  // check if user is already logged in //
  useEffect(() => {
    if (isAuth) {
      history.push('/');
    }
  }, [isAuth]);
  return (
    <Grid container component='main' className={classes.root}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        style={{
          backgroundImage: `url(${banner})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            {loginState ? 'Sign In' : 'Sign Up'}
          </Typography>
          {errors &&
            errors.map((error) => (
              <Alert className={classes.alert} severity='error'>
                {error.message}
              </Alert>
            ))}

          <form
            onChange={handleChanges}
            onSubmit={handleSubmit}
            className={classes.form}
            noValidate
          >
            {!loginState && (
              <TextField
                error={errors.includes((er) => er.path[0] === 'name')}
                variant='outlined'
                margin='normal'
                type='text'
                required
                fullWidth
                id='email'
                label='Name'
                name='name'
                autoComplete='name'
                autoFocus
                value={formData.name}
              />
            )}
            <TextField
              error={errors.includes((er) => er.path[0] === 'email')}
              variant='outlined'
              margin='normal'
              type='email'
              required
              fullWidth
              id='email'
              label='Email'
              name='email'
              autoComplete='email'
              autoFocus
              value={formData.email}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              value={formData.password}
            />

            {!loginState && (
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                name='role'
                label='Role'
                type='text'
                id='role'
                autoComplete='role'
                value={formData.role}
              />
            )}

            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              {loginState ? 'Sign In' : 'Sign Up'}
            </Button>
            <div style={{ marginTop: '3rem' }} />
            {/* <Typography component='h1' variant='h5'>
              {loginState ? (
                <Button
                  variant='contained'
                  color='secondary'
                  onClick={() => setLoginState(!loginState)}
                >
                  Sign Up
                </Button>
              ) : (
                <Button
                  variant='contained'
                  color='primary'
                  onClick={() => setLoginState(!loginState)}
                >
                  Sign In
                </Button>
              )}
            </Typography> */}
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
