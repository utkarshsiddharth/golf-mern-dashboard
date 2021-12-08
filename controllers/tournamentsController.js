import Tournament from '../models/tournamentModel.js';
import asyncHandler from 'express-async-handler';
import ErrorResponse from '../utils/errorResponse.js';
import colors from 'colors';

// @desc        Get tournaments - all & Player
// @route       GET   /api/tournaments
// @route       GET   /api/players/:playerId/tournaments
// @access      Public
export const getTournaments = asyncHandler(async (req, res, next) => {
  if (req.params.playerId) {
    const tournaments = await Tournament.find({ player: req.params.playerId });

    return res.status(200).json({
      success: true,
      count: tournaments.length,
      data: tournaments,
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// @desc        Add A Tournament
// @route       POST   /api/tournaments/:id
// @access      Public
export const addTournament = asyncHandler(async (req, res, next) => {
  req.body.player = req.params.id;
  const tournament = await Tournament.create(req.body);
  if (!tournament) {
    return next(new ErrorResponse(`Tournament Can't Be Added`, 400));
  }
  res.status(200).json({
    status: 200,
    success: true,
    data: tournament,
  });
});

// @desc        Update A Tournament By ID
// @route       PUT   /api/tournaments
// @access      Public
export const updateTournament = asyncHandler(async (req, res, next) => {
  const tournament = await Tournament.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!tournament) {
    return next(
      new ErrorResponse(`Tournament With Provided ID Not Found`, 404)
    );
  }
  res.status(200).json({
    status: 200,
    success: true,
    data: tournament,
  });
});

// @desc        Delete A Tournament By ID
// @route       DELETE   /api/tournaments
// @access      Public
export const deleteTournament = asyncHandler(async (req, res, next) => {
  const tournament = await Tournament.findByIdAndRemove(req.params.id);

  if (!tournament) {
    return next(
      new ErrorResponse(`Tournament With Provided ID Not Found`, 404)
    );
  }
  res.status(200).json({
    status: 200,
    success: true,
    data: {},
  });
});
