import asyncHandler from 'express-async-handler';
import Player from '../models/playerModel.js';

// @desc        Get players
// @route       GET /api/players
// @access      Public
export const getAllPlayers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

export const getPlayerById = asyncHandler(async (req, res, next) => {
  const player = await Player.findById(req.params.id).populate('tournaments');
  if (!player) {
    res.status(404);
    throw new Error(`Player Not Found!!`);
  }
  res.status(200).json({
    success: true,
    status: 200,
    data: player,
  });
});

// @desc        Add players
// @route       POST /api/players
// @access      Public

export const addPlayer = asyncHandler(async (req, res, next) => {
  const player = await Player.create(req.body);

  res.status(201).json({
    status: 201,
    success: true,
    data: player,
  });
});

// @desc        Update players
// @route       PUT /api/players
// @access      Public
export const updatePlayer = asyncHandler(async (req, res, next) => {
  const player = await Player.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!player) {
    res.status(404);
    throw new Error(`Player Not Found To Update`);
  }
  res.status(200).json({
    success: true,
    status: 200,
    data: player,
  });
});

// @desc        Delete players
// @route       DELETE /api/players
// @access      Public
export const deletePlayer = asyncHandler(async (req, res, next) => {
  const player = await Player.findByIdAndUpdate(req.params.id);
  if (!player) {
    res.status(404);
    throw new Error(`Player Not Found To Update`);
  }
  await player.remove();
  res.status(200).json({
    success: true,
    status: 200,
    data: {},
  });
});
