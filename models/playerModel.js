import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please Add A Name'],
      trim: true,
    },
    country: {
      type: String,
      trim: true,
      required: [true, 'Please Add A Country'],
    },
    city: {
      type: String,
      trim: true,
      required: [true, 'Please Add A City'],
    },
    age: {
      type: Number,
      required: [true, 'Please Add Your Age.'],
      trim: true,
    },
    birthPlace: {
      type: String,
    },
    gender: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// reverse populate with virtuals //
playerSchema.virtual('tournaments', {
  ref: 'tournament',
  localField: '_id',
  foreignField: 'player',
  justOne: false,
});

const Player = new mongoose.model('player', playerSchema);

export default Player;
