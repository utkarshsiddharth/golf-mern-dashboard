import React from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'

import bogeySportsLogo from '../../assets/images/BogeySportLogo.svg'
import appStore from '../../assets/images/app-store.svg'
import GoogleApp from '../../assets/images/GoogleApp.png'

import styles from './Drawer.module.css'

import tournamentPDF from '../../assets/pdf/tour-info-1.pdf'

const useStyles = makeStyles({})

export default function BogeyDrawer({ isAuth }) {
  const classes = useStyles()
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  })

  const bogeytourlinks = [
    { label: 'Events Booking', path: '/events' },
    { label: 'Draw Sheet', path: '/drawsheet' },
    { label: 'Tour Leaderboard', path: '/leaderboard' },
    { label: 'Score', path: '/' },
    { label: 'Tournaments', path: '/all-tournaments' },
    { label: 'Bogey News', path: '/image-gallery' },
  ]
  if (isAuth) {
    bogeytourlinks.push({ label: 'New Tournaments', path: '/tournaments' })
    bogeytourlinks.push({ label: 'New Players', path: '/players' })
  }
  const companyLinks = [
    { label: 'About Us', path: 'https://bogeysport.com/#about' },
    { label: 'What We Do', path: 'https://bogeysport.com/#whatwedo' },
    { label: 'Founding Team', path: 'https://bogeysport.com/#founding' },
  ]
  const productLinks = [
    { label: 'BookCaddie', path: 'https://bogeysport.com/#learning' },
    { label: 'Tournaments', path: 'https://bogeysport.com/#tournaments' },
    { label: 'Travels', path: 'https://bogeysport.com/#travels' },
    { label: 'Shopping', path: 'https://bogeysport.com/#Shopping' },
    { label: 'BogeyTV', path: 'https://bogeysport.com/#watch' },
  ]

  const mainNavLinks = [
    // {
    //   path: 'https://bogeysport.com/#company',
    //   label: 'Company',
    //   backdrop: true,
    // },
    // { path: 'https://bogeysport.com/#about', label: 'About' },

    // { path: '#', label: 'Products', backdrop: true },
    { path: 'https://bogeysport.com/#reward', label: 'Reward' },
    { path: 'https://bogeysport.com/#connect', label: 'Connect' },
    { path: 'https://bogeysport.com/help.php', label: 'Help' },
    { path: 'https://bogeysport.com', label: 'Blog' },
  ]

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    setState({ ...state, [anchor]: open })
  }

  const list = (anchor) => (
    <div
      className={`${styles.drawer_container}`}
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className={`${styles.list_container}`}>
        <div className={styles.logo_group}>
          <a href='https://bogeysport.com'>
            <img
              src={bogeySportsLogo}
              className={styles.bogeysportslogo}
              alt='bogey sports logo'
            />
          </a>
          <a
            href='https://apps.apple.com/in/app/bogey-sports/id1575761978'
            target='_blank'
          >
            <img
              src={appStore}
              className={styles.appstorelogo}
              alt='bogey sport app store application logo'
            />
          </a>
          <a
            href='https://play.google.com/store/apps/details?id=com.bogey.sport'
            target='_blank'
          >
            <img
              src={GoogleApp}
              className={styles.playstorelogo}
              alt='bogey sports playstore app logo'
            />
          </a>
        </div>
        {/* list group Bogey Tour */}
        <div className={`${styles.list_group}`}>
          <h3>Golf Tour</h3>
          <ul className={`${styles.drawer_list}`}>
            {bogeytourlinks.map((link) => (
              <Link to={link.path}>
                <li>{link.label}</li>
              </Link>
            ))}

            <li>
              <a
                href='https://drive.google.com/file/d/1gCzRh8GDj-nodmjeBittog6qYxa2ZwIE/view?usp=sharing'
                target='_blank'
              >
                Tournament Info
              </a>
            </li>
          </ul>
        </div>
        {/* list group  */}
        <div className={`${styles.list_group}`}>
          <h3>Company</h3>
          <ul className={`${styles.drawer_list}`}>
            {companyLinks.map((link) => (
              <a href={link.path}>
                <li>{link.label}</li>
              </a>
            ))}
          </ul>
        </div>
        {/* list group products */}
        <div className={`${styles.list_group}`}>
          <h3>Products</h3>
          <ul className={`${styles.drawer_list}`}>
            {productLinks.map((link) => (
              <a href={link.path}>
                <li>{link.label}</li>
              </a>
            ))}
          </ul>
        </div>
        <div className={`${styles.main_links}`}>
          {mainNavLinks.map((link, index) => (
            <a href={link.path}>
              <h3>{link.label}</h3>
            </a>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div>
      <React.Fragment key={'left'}>
        <button
          className={`${styles.toggle_btn}`}
          onClick={toggleDrawer('left', true)}
        >
          <i className={`${styles.toggle_icon} fas fa-bars`}></i>
        </button>

        <Drawer open={state['left']} onClose={toggleDrawer('left', false)}>
          {list('left')}
        </Drawer>
      </React.Fragment>
    </div>
  )
}
