import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import EventsBanner from '../assets/images/3.jpg';
import Alert from '@material-ui/lab/Alert';

import eventBookingDesktop from '../assets/images/header/events-desktop.jpg';
import eventBookingTablet from '../assets/images/header/events-tablet.jpg';
import eventBookingMobile from '../assets/images/header/events-mobile.jpg';

// css //
import './payment.css';

// components //
import Form from '../Components/Form/Form';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useEffect } from 'react';

const Payments = () => {
  const history = useHistory();
  const id = localStorage.getItem('paymentId');
  console.log('payment id', id);

  if (!id) {
    history.push('/events');
  }

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
              <h4 className='main-title event-booking-title'> Payment</h4>
            </div>
          </div>
        </div>

        <div className='main-container'>
          <div className='go-back-arrow' onClick={() => history.goBack()}>
            <ArrowBackIcon fontSize='large' />
          </div>
          <div className='main-content payment'>
            <h1 className='payment-heading'>
              Please choose the payment method to complete your tournament
              registration.
            </h1>
            <h3 className='paymentId'>
              Payment ID: <span>{id ? id : ''} </span>
            </h3>
            <h3 className='paymentId'>
              Tournament Fees: <span> 3500 </span>
            </h3>
            <hr />
            <div className='payment-container'>
              <h3>
                For payment with Google Pay or Paytm use the provided number.
              </h3>
              <h4> 9888711047</h4>
              <hr />
              <div className='bank-payment'>
                <h3>
                  For bank payment use the information provied below to complete
                  your tournament registration.
                </h3>
                <h4>Name: TWOZEROTWENTYONE SPORTS MANAGEMENT LLP</h4>
                <br />
                <h4>Account No: 2121238433725781</h4>
                <br />

                <h4>IFSC CODE: AUBL0002384</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payments;
