var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const flash = require('connect-flash');
const session = require('express-session');
const mongoose = require("mongoose");
const methodOverride = require("method-override");
mongoose.connect("mongodb://localhost:27017/db_manajemen_apotek", {
  useNewUrlParser: true,
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const apotekRouter = require('./routes/apotek');
const userRouter = require('./routes/user');
const customerRouter = require('./routes/customer');
const mitraRouter = require('./routes/mitra');
const loginRouter = require('./routes/login');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//menggunakan method-override
app.use(methodOverride("_method"));
//menggunakan session
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 6000}, 
  })
);
//menggunakan flash
app.use(flash());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const checkLoggedIn = (req, res, next) => {
  if (req.session.loggedIn) {
    // Jika pengguna sudah login, lanjutkan ke rute berikutnya
    next();
  } else {
    // Jika pengguna belum login, redirect ke halaman login
    res.redirect("/");
  }
};

app.use('/', loginRouter);
app.use('/users', usersRouter);
app.use('/apotek', apotekRouter);
app.use('/user', userRouter);
app.use('/customer', customerRouter);
app.use('/mitra', mitraRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
