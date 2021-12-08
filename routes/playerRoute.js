import express from 'express';

import {
  getAllPlayers,
  addPlayer,
  getPlayerById,
  updatePlayer,
  deletePlayer,
} from '../controllers/playerController.js';

import advancedResults from '../middleware/advancedResults.js';
import Player from '../models/playerModel.js';

// include other routes //
import tournamentRoutes from './tournamentRoutes.js';

const router = express.Router();

// re-route to other resources //
router.use('/:playerId/tournaments', tournamentRoutes);

router
  .route('/')
  .get(advancedResults(Player, 'tournaments'), getAllPlayers)
  .post(addPlayer);

router.route('/:id').get(getPlayerById).put(updatePlayer).delete(deletePlayer);

export default router;
