import React from 'react';
import { Link } from 'react-router-dom';

import bogeySportsLogo from '../../assets/images/BogeySportLogo.svg';
import appStore from '../../assets/images/app-store.svg';
import GoogleApp from '../../assets/images/GoogleApp.png';
import Cross from '../../assets/images/cross.png';

import styles from './footer.module.css';

// material ui components //
import { Grid } from '@material-ui/core';

const Footer = () => {
  const quickLinks = [
    { label: 'About Us', path: 'https://bogeysport.com/#about' },
    { label: 'What We Do', path: 'https://bogeysport.com/#wahtwedo' },
    { label: 'Founding Team', path: 'https://bogeysport.com/#founding' },
    { label: 'Reward', path: 'https://bogeysport.com/#rewards' },
    { label: 'Connect', path: 'https://bogeysport.com/#connect' },
    { label: 'Help', path: 'https://bogeysport.com/help.php' },
    { label: 'Blog', path: 'https://bogeysport.com' },
  ];
  const impLinks = [
    { label: 'Book Caddie', path: 'https://bogeysport.com/#learning' },

    { label: 'Golf Tour', path: 'https://bogeysport.com/dashboard' },

    { label: 'Tournaments', path: 'https://bogeysport.com/#tournaments' },
    { label: 'Book Professional', path: 'https://bogeysport.com' },
    { label: 'Travels', path: 'https://bogeysport.com/#travels' },
    { label: 'Bogey TV', path: 'https://bogeysport.com/#learning' },
    { label: 'Shop Now', path: 'https://bogeysport.com/' },
  ];
  return (
    <>
      <footer>
        <div className={styles.footer_container}>
          {/* footer logo group */}
          <div className={`${styles.logo_group}`}>
            <Grid container>
              <Grid item container justify='center'>
                <a
                  href='https://bogeysport.com'
                  className={`${styles.logo_one}`}
                >
                  <img
                    src={bogeySportsLogo}
                    className={styles.bogeysportslogo}
                    alt='bogey sports logo'
                  />
                </a>
              </Grid>
              <Grid
                item
                container
                justify='center'
                style={{ marginBottom: '3rem' }}
              >
                <Grid item>
                  <a href='https://apps.apple.com/in/app/bogey-sports/id1575761978'>
                    <img
                      src={appStore}
                      className={styles.appstorelogo}
                      alt='bogey sport app store application logo'
                    />
                  </a>
                </Grid>
                <Grid item>
                  <a href='https://play.google.com/store/apps/details?id=com.bogey.sport'>
                    <img
                      src={GoogleApp}
                      className={styles.playstorelogo}
                      alt='bogey sports play store app logo'
                    />
                  </a>
                </Grid>
              </Grid>
            </Grid>
          </div>

          {/* footer links */}
          <div className={`${styles.footer_links}`}>
            <h3>Quick Links</h3>
            <div className={`${styles.link_group}`}>
              <ul>
                {quickLinks.map((link) => (
                  <li>
                    <a href={link.path}>{link.label}</a>
                  </li>
                ))}
              </ul>

              <ul>
                {impLinks.map((link) => (
                  <li>
                    <a href={link.path}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* footer cta */}
          <div className={`${styles.footer_cta}`}>
            <div className={`${styles.footer_cta_box}`}>
              <h3>Contact Us</h3>
              <div className={`${styles.cta_mail}`}>
                <i className='fas fa-envelope'></i>
                <a href='mailto:connect@bogeysport.com'>
                  connect@bogeysport.com
                </a>
              </div>
            </div>
            <div className={`${styles.footer_cta_box} ${styles.cta_followus}`}>
              <h3>Follow us on</h3>
              <div className={`${styles.icon_group}`}>
                <a href='https://facebook.com'>
                  <i className='fab fa-facebook-f'></i>
                </a>
                <a href='https://twitter.com'>
                  <i className='fab fa-twitter'></i>
                </a>
                <a href='https://instagram.com'>
                  <i className='fab fa-instagram'></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className={styles.footer_bottom}>
        <div className={styles.footer_row}>
          <h4>
            BogeySport.com &copy; 2021 All Rights Reserved |
            <a href='https://bogeysport.com/privacy-policy.php'>
              <span> Privacy Policy</span>
            </a>{' '}
            |
            <a href='https://bogeysport.com/terms-of-use.php'>
              <span> Terms of Use</span>
            </a>
          </h4>
        </div>
        <div className={styles.footer_row_mobile}>
          <h4> BogeySport.com &copy; 2021 All Rights Reserved</h4>
          <div className={styles.footer_row_links}>
            <a href='https://bogeysport.com/privacy-policy.php'>
              <span> Privacy Policy</span>
            </a>{' '}
            <a href='https://bogeysport.com/terms-of-use.php'>
              <span> Terms of Use</span>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
