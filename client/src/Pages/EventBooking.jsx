import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import EventsBanner from '../assets/images/3.jpg';
import Alert from '@material-ui/lab/Alert';

import eventBookingDesktop from '../assets/images/header/events-desktop.jpg';
import eventBookingTablet from '../assets/images/header/events-tablet.jpg';
import eventBookingMobile from '../assets/images/header/events-mobile.jpg';

// components //
import Form from '../Components/Form/Form';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const Events = () => {
  const location = useLocation();
  const history = useHistory();
  // const title = location.search.split('?')[1];
  const name =
    localStorage.getItem('tournament-name') &&
    localStorage.getItem('tournament-name');
  const [message, setMessage] = useState({
    show: false,
    type: '',
    message: '',
  });

  const handleAlert = (type, message) => {
    console.log({ type, message });
    setMessage({
      show: true,
      type,
      message,
    });

    setTimeout(() => {
      setMessage({
        show: false,
        type: '',
        message: '',
      });
    }, 3000);
  };

  return (
    <>
      <div className='dashboard-area event-booking-area'>
        <div className='dasboard-slider'>
          <picture>
            <source
              className='image'
              srcSet={eventBookingMobile}
              className='image'
              media='(max-width: 600px)'
            />
            <source
              className='tab-image'
              srcSet={eventBookingTablet}
              className='image'
              media='(max-width: 1200px)'
            />
            <img className='image' src={eventBookingDesktop} alt='' />
          </picture>
        </div>
        <div className='event-booking-header-bar'>
          <div className='bar-container'>
            <div className='bar-main-content'>
              <h4 className='main-title event-booking-title'> Event Booking</h4>
            </div>
          </div>
        </div>

        <div className='main-container'>
          <div className='go-back-arrow' onClick={() => history.goBack()}>
            <ArrowBackIcon fontSize='large' />
          </div>
          <div className='main-content'>
            {message.show && (
              <Alert style={{ marginBottom: '20px' }} severity={message.type}>
                {message.message}
              </Alert>
            )}
            <div className='event-booking-container'>
              <div className='event-title'>
                <h2>{name.split(',')[0]},</h2>
                <h2>{name.split(',')[1]}</h2>
              </div>
              <div className='form-container'>
                <Form event={name} handleAlert={handleAlert} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Events;
