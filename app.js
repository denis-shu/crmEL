const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const analyticsRoutes = require('./routes/analytics');
const categotyRoutes = require('./routes/category');
const orderRoutes = require('./routes/order');
const positionRoutes = require('./routes/position');
const authRoutes = require('./routes/auth');
const app = express();
const keys = require('./config/keys');

mongoose.connect(keys.mongoURI, {
        useCreateIndex: true,
        useNewUrlParser: true
    })
    .then(() => {
        console.log("Connected mongo")
    })
    .catch(err => {
        console.log(err)
    })

app.use(passport.initialize());
require('./middleware/passport')(passport);
app.use(require('morgan')('dev'));
app.use(require('cors')());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/position', positionRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/category', categotyRoutes);
app.use('/api/analytics', analyticsRoutes);

module.exports = app;