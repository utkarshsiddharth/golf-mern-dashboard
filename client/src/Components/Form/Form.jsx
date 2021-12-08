import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { useHistory } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

// components //
import Input from '../FormElements/input/Input';
import Button from '../FormElements/Button';

// Material ui components //
import { useMediaQuery, useTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Grid } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import nodeCCAvenue from 'node-ccavenue';

import './Form.css';
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: '1rem',
    marginBottom: '0',
    minWidth: 220,
    color: 'red',
    background: '#fff',
    display: 'flex',
  },
  selectEmpty: {
    marginTop: '2rem',
  },
}));

const Form = ({ event, handleAlert }) => {
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  const history = useHistory();
  const classes = useStyles();
  const [playerAge, setPlayerAge] = useState('Category');
  const [tshirt, setTshirt] = useState('T-Shirt Size');

  const handleAgeChange = (event) => {
    setPlayerAge(event.target.value);
    console.log(playerAge);
  };

  const handleTshirtChange = (event) => {
    setTshirt(event.target.value);
  };

  const [btnValue, setBtnValue] = useState('submit');
  const [state, setState] = useState({
    name: '',
    phone: '',
    email: '',
    dob: '',
    club: '',
    school: '',
    address: '',
    event: '',
    age: '',
    city: '',
    country: 'INDIA',
    id: `${uuid()}`,
  });

  const { name, phone, email, dob, address, club, school, age, city, country } =
    state;
  // handle change in form //
  const onChange = (e) => {
    setState((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    if (
      name === '' ||
      email === '' ||
      phone === '' ||
      dob === '' ||
      country === '' ||
      city === ''
    ) {
      handleAlert('error', 'please fill out the required fileds');
    } else {
      setBtnValue('sending...');
      emailjs
        .sendForm(
          'service_cdwntzr',
          'template_x559izv',
          e.target,
          'user_cCJ8H8kQzYxH159FuhANN'
        )
        .then(
          (result) => {
            setBtnValue('Submit');
            console.log(result);
            handleAlert('success', 'your form has been submitted successfully');
          },
          (error) => {
            console.log(error.text);
            handleAlert('error', error.text);
          }
        );
      setState({
        name: '',
        phone: '',
        email: '',
        dob: '',
        club: '',
        school: '',
        address: '',
        age: '',
        country: '',
        city: '',
        id: '',
      });
      history.push(`/payment?id=${state.id}`);
      localStorage.setItem('paymentId', `${state.id}`);
    }
  };

  useEffect(() => {
    setState((prevState) => {
      return {
        ...prevState,
        event: event,
      };
    });
  }, [event]);

  return (
    <>
      <h3 className='form-heading' style={{ marginTop: 60, fontSize: 18 }}>
        Fields with <span className='astrisk'>*</span> are required!!
      </h3>
      <h4 className='form-price'>
        Tournament Fees: <span>3500</span>
      </h4>
      <form className='event-form' onSubmit={sendEmail}>
        <input type='hidden' name='id' value={state.id} />
        <Grid container justify='space-between'>
          <Grid xs={12} item style={{ width: '25%' }}>
            <Input
              label='Name'
              className='required-input'
              type='text'
              id='name'
              value={name}
              name='name'
              placeholder='Name'
              handleChange={onChange}
              required
            />
          </Grid>
          <Grid item xs={8} style={{ width: '25%' }}>
            <Input
              label='Your DOB'
              className='required-input'
              type='date'
              id='dob'
              value={dob}
              name='dob'
              placeholder='DOB'
              handleChange={onChange}
              required
            />
          </Grid>
          <Grid
            item
            style={{ width: '25%', flexDirection: 'column', margin: '20px 0' }}
            alignItems='flex-start'
          >
            <label className='age-dropdown-label required-input' htmlFor='age'>
              Your Age
            </label>
            <FormControl
              style={{ paddingTop: 20 }}
              className={classes.formControl}
            >
              <Select
                labelId='age'
                id='age'
                value={playerAge}
                name='age'
                onChange={handleAgeChange}
                className='form-dropdown'
              >
                <MenuItem value={'Category'}>Category</MenuItem>
                <MenuItem value={'Amateur'}>Amateur</MenuItem>
                <MenuItem value={'Cat A'}>Category A</MenuItem>
                <MenuItem value={'Cat B'}>Category B</MenuItem>
                <MenuItem value={'Cat C'}>Category C</MenuItem>
                <MenuItem value={'Cat D'}>Category D</MenuItem>
                <MenuItem value={'Cat E'}>Category E</MenuItem>
                <MenuItem value={'Cat F'}>Category F</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container justify='space-between'>
          <Grid xs={12} item style={{ width: '25%' }}>
            <Input
              label='Your City'
              className='required-input'
              type='text'
              id='city'
              value={city}
              name='city'
              placeholder='Chandigarh'
              handleChange={onChange}
              required
            />
          </Grid>
          <Grid xs={8} item style={{ width: '25%' }}>
            <Input
              label='Your Country'
              className='required-input'
              type='text'
              id='country'
              value={country}
              name='country'
              placeholder='INDIA'
              handleChange={onChange}
              required
            />
          </Grid>
          <Grid
            item
            style={{ width: '25%', flexDirection: 'column', margin: '20px 0' }}
            justify='flex-end'
          >
            <label className='age-dropdown-label' htmlFor='age'>
              T - Shirt
            </label>
            <FormControl className={classes.formControl}>
              <Select
                labelId='tshirt'
                id='tshirt'
                value={tshirt}
                name='tshirt'
                onChange={handleTshirtChange}
                className='form-dropdown'
                style={{ paddingTop: 20 }}
              >
                <MenuItem value={'T-Shirt Size'}>T-Shirt Size</MenuItem>
                <MenuItem value={'XXXL'}>XXXL</MenuItem>
                <MenuItem value={'XXL'}>XXL</MenuItem>
                <MenuItem value={'XL'}>XL</MenuItem>
                <MenuItem value={'Large'}>Large</MenuItem>
                <MenuItem value={'Medium'}>Medium</MenuItem>
                <MenuItem value={'Small'}>Small</MenuItem>
                <MenuItem value={'X Small'}>X Small</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Grid container justify='space-between'>
          <Grid md={3} xs={12} item style={{ width: '30%' }}>
            <Input
              label='Your Email'
              className='required-input'
              type='email'
              id='email'
              value={email}
              name='email'
              placeholder='Your Email'
              handleChange={onChange}
              required
            />
          </Grid>
          <Grid md={3} xs={12} item style={{ width: '30%' }}>
            <Input
              label='Phone No.'
              className='required-input'
              type='tel'
              id='phone'
              value={phone}
              name='phone'
              placeholder='Phone No.'
              handleChange={onChange}
              required
            />
          </Grid>
          <Grid md={3} xs={12} item style={{ width: '30%' }}>
            <Input
              label='Handicap & Golfclub '
              type='text'
              id='club'
              value={club}
              name='club'
              placeholder='Handicap & Golfclub'
              handleChange={onChange}
            />
          </Grid>
        </Grid>

        <Grid container justify='space-between'>
          <Grid md={4} xs={12} item>
            <Input
              label='Name Of School'
              type='text'
              id='school'
              value={school}
              name='school'
              placeholder='Name Of School'
              handleChange={onChange}
            />
          </Grid>
          <Grid item md={4} xs={12}>
            <Input
              label='Your Address'
              type='text'
              id='address'
              value={address}
              name='address'
              placeholder='Your Address'
              handleChange={onChange}
            />
          </Grid>
        </Grid>

        <input type='hidden' id='event' name='event' value={event} />

        <Grid
          container
          style={{
            justifyContent: 'space-between',
            flexDirection: xs ? 'column' : 'row',
            gap: 20,
            alignItems: 'center',
          }}
        >
          <Grid item>
            <button type='submit' className='btn btn-primary'>
              {btnValue}
            </button>
          </Grid>
          <Grid item>
            <button
              type='button'
              className='btn btn-ghost'
              onClick={() => history.push('/events')}
            >
              Go Back
            </button>
          </Grid>
        </Grid>

        {/* <Button type='submit' value='Submit' className='btn btn-primary' /> */}
      </form>
    </>
  );
};

Form.propTypes = {};

export default Form;
