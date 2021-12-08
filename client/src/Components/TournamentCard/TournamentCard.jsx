import React from 'react'

// css //
import './TournamentCard.css'

const TournamentCard = ({ tName, tDate, tWinner }) => {
  console.log(tName, tDate, tWinner)
  return (
    <div className='tour_card'>
      <div className='tour_container'>
        <div className='tour_image'>
          <img
            src='https://menatour.golf/img/uploaded/tournament/original/17ba9f9848de07fbb7435481fa65e433.jpg'
            alt=''
          />
        </div>
        <div className='text_container'>
          <h1 className='tour_col tour_name'>
            {' '}
            <span className='tour_field'>Tournament Name: </span>
            <span>{tName}</span>
          </h1>
          <h1 className='tour_col tour_venue'>
            {' '}
            <span className='tour_field'>Tournament Venue: </span>
            <span>{tName}</span>
          </h1>
          <p className='tour_date'>
            <h1 className='tour_col'>
              <span className='tour_field'>Date: </span>
              <span>{tDate}</span>
            </h1>
          </p>
          <p className='tour_win_con'>
            <h1 className='tour_col'>
              <span className='tour_field'>Tourname Winner: </span>
              <span className='tour_won'> {tWinner}</span>
            </h1>
          </p>
        </div>
      </div>
    </div>
  )
}

export default TournamentCard
