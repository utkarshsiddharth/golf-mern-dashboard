import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please Enter A Name'],
    },
    email: {
      type: String,
      required: [true, 'Please Add An Email'],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w)*(\.\w{2,3})+$/,
        'Please Add A Valid Email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please Add A Password'],
      minLength: [6, 'Please Enter A Password With 6 Character Or More'],
      select: false,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    lastActive: Date,
    deletedAt: Date,
  },
  { timestamps: true }
);

// hash password //
UserSchema.pre('save', async function (next) {
  console.log(this.password);
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// send token //
UserSchema.methods.getToken = async function () {
  const token = await jwt.sign({ user: this.id }, `${process.env.JWT_SECRET}`, {
    expiresIn: `${process.env.JWT_EXPIRE}`,
  });
  return token;
};

// match user entered password to hashed password in the database //
UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', UserSchema);

export default User;
