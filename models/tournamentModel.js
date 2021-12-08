import mongoose from 'mongoose';

const TournamentSchema = new mongoose.Schema(
  {
    player: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'player',
      required: true,
    },
    tournament: {
      type: String,
      required: [true, 'Please Add A Name'],
      trim: true,
    },
    place: {
      type: String,
      required: true,
    },
    par: {},
    score: {
      round1: {},
      round2: {},
      round3: {},
      round4: {},
    },
    draw: {
      time: {
        type: {},
        required: [true, 'Please Add The Time'],
      },
      tee: {
        type: {},
        required: [true, 'Please Add The Tee'],
      },
      round1: {
        type: [],
        required: [true, 'Please Add Draw For Round 1'],
      },
      round2: {
        type: [],
        required: [true, 'Please Add Draw For Round 2'],
      },
      round3: {
        type: [],
        required: [true, 'Please Add Draw For Round 3'],
      },
      round4: {
        type: [],
        required: [true, 'Please Add Draw For Round 4'],
      },
    },
  },
  {
    timestamps: true,
  }
);

const Tournament = mongoose.model('tournament', TournamentSchema);

export default Tournament;
