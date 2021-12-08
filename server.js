import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
import cors from 'cors';
import nodeCCAvenue from 'node-ccavenue';

import connectDB from './config/db.js';
import ErrorHandler from './middleware/errorHandler.js';

// routes //
import authRoutes from './routes/authRoute.js';
import tournamentRoutes from './routes/tournamentRoutes.js';
import playerRoutes from './routes/playerRoute.js';

dotenv.config({ path: './config/config.env' });
console.log(process.env.NODE_ENV);

const app = express();
connectDB();

// middlewares //

// middleware to accept json content //
app.use(express.json());
// access from diff url //
app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// routes //
app.use('/api/auth', authRoutes);
app.use('/api/tournament', tournamentRoutes);
app.use('/api/players', playerRoutes);
app.use(ErrorHandler);

// ccavenue payment integration //
const ccav = new nodeCCAvenue.Configure({
  merchant_id: process.env.MERCHANT_ID,
  working_key: process.env.TEST_WORKING_KEY || process.env.PROD_WORKING_KEY,
});
const orderParams = {
  order_id: 87654321,
  currency: 'INR',
  amount: '100',
  redirect_url: encodeURIComponent(`http://localhost:3000/`),
  billing_name: 'Sahil Sharma',
};
const encryptedOrderData = ccav.getEncryptedOrder(orderParams);
// const encryptedData = ccav.encrypt(orderParams);
app.post('/api/orders', (req, res) => {
  console.log(req.body);
  const { encResp } = req.body;
  const decryptedJsonResponse = ccav.redirectResponseToJson(encryptedOrderData);
  // To check order_status: -
  console.log({ decryptedJsonResponse });
  res.json({
    sucess: true,
    data: decryptedJsonResponse.order_status,
  });
});

// Server Static Assets In Production //
if (process.env.NODE_ENV === 'production') {
  // set a static folder //
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
  );
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(
    `App is running in ${process.env.NODE_ENV} mode on port: ${PORT}`.yellow
      .bold
  )
);
