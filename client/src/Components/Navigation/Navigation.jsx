import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import LoginIcon from '@material-ui/icons/AccountCircle';

// Logo //
import Logo from '../../logo.png';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar({ isAuth, setIsAuth }) {
  const classes = useStyles();
  const history = useHistory();

  // handlers //
  const handleLogout = () => {
    // remove token from storage //
    localStorage.removeItem('token');
    setIsAuth(false);
    history.push('/login');
  };
  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
            component={Link}
            to='/'
          >
            {/* <img src={Logo} alt='' width='100px' height='auto' /> */}
            Logo
          </IconButton>
          <Typography variant='h6' className={classes.title}></Typography>
          {isAuth ? (
            <Button
              color='inherit'
              startIcon={<LoginIcon />}
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            <Button
              component={Link}
              to='/login'
              color='inherit'
              startIcon={<LoginIcon />}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
