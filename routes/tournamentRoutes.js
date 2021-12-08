import express from 'express';

import {
  getTournaments,
  addTournament,
  updateTournament,
  deleteTournament,
} from '../controllers/tournamentsController.js';

import advancedResults from '../middleware/advancedResults.js';
import Tournament from '../models/tournamentModel.js';

const router = express.Router({ mergeParams: true });

router.route('/').get(advancedResults(Tournament, 'player'), getTournaments);
router
  .route('/:id')
  .post(addTournament)
  .put(updateTournament)
  .delete(deleteTournament);

export default router;
