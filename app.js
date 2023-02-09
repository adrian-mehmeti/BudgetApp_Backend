const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const connectDB = require('./db/connectDB');
const cors = require('cors');
require('dotenv').config();

const app = express();

const incomeRoute = require('./routes/incomes');
const outcomeRoute = require('./routes/outcomes');
const savingsRoute = require('./routes/savings');
const fundsRoute = require('./routes/funds');
const usersRoute = require('./routes/dashboard.users');
const authRoute = require('./routes/auth');

//middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

//Database connection
connectDB.connect();

//route
app.use('/incomes', incomeRoute);
app.use('/outcomes', outcomeRoute);
app.use('/savings', savingsRoute);
app.use('/funds', fundsRoute);
app.use('/users', usersRoute);
app.use('/auth', authRoute);

//App listing port
app.listen(process.env.PORT, () => {
  console.log(`App is listing in port ${process.env.PORT}`);
});
