import React, { useState } from 'react'

import bogeySportsLogo from '../../assets/images/BogeySportLogo.svg'
import appStore from '../../assets/images/app-store.svg'
import GoogleApp from '../../assets/images/GoogleApp.png'
import Cross from '../../assets/images/cross.png'

import { Hidden, useMediaQuery, useTheme } from '@material-ui/core'

// components //
import Drawer from './Drawer'

import styles from './NewHeader.module.css'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

import tournamentPDF from '../../assets/pdf/tour-info-1.pdf'

const NewHeader = ({ isAuth }) => {
  const [showBackdrop, setShowBackdrop] = useState(false)
  const [links, setLinks] = useState([])

  const theme = useTheme()
  const lg = useMediaQuery(theme.breakpoints.down('lg'))

  const bogeytourlinks = [
    { label: 'Events Booking', path: '/events' },
    { label: 'Draw Sheet', path: '/drawsheet' },
    { label: 'Tour Leaderboard', path: '/leaderboard' },
    { label: 'Score', path: '/' },
    { label: 'Tournaments', path: '/all-tournaments' },
    { label: 'Bogey News', path: '/bogey-news' },
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
    { label: 'BookCaddie', path: 'https://bogeysport.com/#tournaments' },
    { label: 'Tournaments', path: 'https://bogeysport.com/dashboard' },
    { label: 'Travels', path: 'https://bogeysport.com/#travels' },
    { label: 'Shopping', path: 'https://bogeysport.com/#Shopping' },
    { label: 'BogeyTV', path: 'https://bogeysport.com/#watch' },
  ]

  const mainNavLinks = [
    { path: '#', label: 'Golf Tour', backdrop: true },
    { path: '#', label: 'Company', backdrop: true },
    { path: 'https://bogeysport.com/#about', label: 'About' },

    { path: '#', label: 'Products', backdrop: true },
    { path: 'https://bogeysport.com/#rewards', label: 'Reward' },
    { path: 'https://bogeysport.com/#connect', label: 'Connect' },
    { path: 'https://bogeysport.com/help.php', label: 'Help' },
    { path: 'https://bogeysport.com', label: 'Blog' },
  ]

  const variant = {
    hidden: { transform: 'scaleY(0)', opacity: 0 },
    visible: {
      top: '90px',
      transform: 'scaleY(1)',
      transformOrigin: 'top center',
      opacity: 1,
    },
  }

  if (showBackdrop) {
    document.body.classList.add('stop-scrolling')
  } else {
    document.body.classList.remove('stop-scrolling')
  }

  // functions //
  const printLinks = (links) => {
    setShowBackdrop(!showBackdrop)
    setLinks(links)
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
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
                alt='bogey sports play store app logo'
              />
            </a>
          </div>
          <Hidden mdDown>
            <nav className={styles.main_nav}>
              <ul className={styles.nav_list}>
                {mainNavLinks.map((link) => (
                  <li>
                    {!link.backdrop ? (
                      <>
                        <a href={link.path}>{link.label}</a>
                      </>
                    ) : (
                      <Link
                        to={link.path}
                        onClick={
                          link.backdrop && link.label === 'Golf Tour'
                            ? () => <>{printLinks(bogeytourlinks)}</>
                            : link.backdrop && link.label === 'Products'
                            ? () => printLinks(productLinks)
                            : link.backdrop && link.label === 'Company'
                            ? () => printLinks(companyLinks)
                            : null
                        }
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </Hidden>
          <Hidden lgUp>
            <div
              style={{
                margin: 'auto 3rem auto auto',
              }}
            >
              <Drawer isAuth={isAuth} />
            </div>
          </Hidden>
        </div>
      </header>

      {showBackdrop === true && (
        <motion.div
          initial='hidden'
          animate='visible'
          variants={variant}
          transition={{ duration: 0.3 }}
          className={styles.backdrop}
        >
          <div className={`${styles.container} ${styles.backdrop_container}`}>
            <ul className={styles.backdrop_list}>
              {links.map((link, index) => (
                <li key={index}>
                  <Link to={link.path} onClick={() => setShowBackdrop(false)}>
                    {link.label}
                  </Link>
                </li>
              ))}
              {links[0].label === 'Events Booking' && (
                <li>
                  {/* <a href={tournamentPDF} download='Tournament Info'>
                    Tournament Info
                  </a> */}
                  <a
                    href='https://drive.google.com/file/d/1gCzRh8GDj-nodmjeBittog6qYxa2ZwIE/view?usp=sharing'
                    target='_blank'
                  >
                    Tournament Info
                  </a>
                </li>
              )}
            </ul>
            <img
              src={Cross}
              className={styles.cross_icon}
              alt='cross png'
              onClick={() => setShowBackdrop(false)}
            />
          </div>
        </motion.div>
      )}
    </>
  )
}

export default NewHeader
