// server.js

const express = require('express');
const session = require('express-session');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const indexRoutes = require('./routes/index');
const authRoutes = require('./controllers/auth');
const foodsRoutes = require('./controllers/foods');
const usersRoutes = require('./controllers/users');
const isSignedIn = require('./middleware/is-signed-in');
const passUserToView = require('./middleware/pass-user-to-view');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Could not connect to MongoDB:', error.message);
  });

  //set EJS as the view engine
app.set('view engine', 'ejs');

//middleware setup
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);


// Custom middleware to pass user data to views
app.use(passUserToView);

app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use(isSignedIn); // Middleware to check if user is signed in
app.use('/users/:userId/foods', foodsRoutes); // Foods routes need a signed-in user
app.use('/users', usersRoutes); // Users routes

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
