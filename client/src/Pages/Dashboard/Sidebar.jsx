import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import GolfCourse from '@material-ui/icons/GolfCourse';
import AccessAlarm from '@material-ui/icons/AccessAlarm';
import Assesment from '@material-ui/icons/Assessment';
import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
  const location = useLocation();

  const sidebarLinks = [
    { label: 'Dashboard', path: '/', icon: <HomeIcon /> },
    { label: 'Draw Sheet', path: '/drawsheet', icon: <AccessAlarm /> },
    { label: 'Leaderboard', path: '/leaderboard', icon: <Assesment /> },
  ];
  return (
    <div className='sidebar'>
      {sidebarLinks.map((link, i) => (
        <Link
          key={`${i}`}
          to={link.path}
          style={{
            margin: '1rem .6rem 0 .6rem',
          }}
        >
          <div
            className={
              link.path === location.pathname
                ? 'sidebar-link active'
                : 'sidebar-link'
            }
          >
            {link.icon}
            <h6>{link.label}</h6>
          </div>
        </Link>
      ))}
      {localStorage.getItem('token') && (
        <>
          <Link to='/players'>
            <div
              className={
                '/players' === location.pathname
                  ? 'sidebar-link active'
                  : 'sidebar-link'
              }
            >
              <PeopleAltIcon />
              <h6>Players</h6>
            </div>
          </Link>
          <Link to='/tournaments'>
            <div
              className={
                '/tournaments' === location.pathname
                  ? 'sidebar-link active'
                  : 'sidebar-link'
              }
            >
              <GolfCourse />
              <h6>Tournaments</h6>
            </div>
          </Link>
        </>
      )}
    </div>
  );
}

export default Sidebar;
