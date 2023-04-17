var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors=require('cors');
var passport=require('passport');
var mongoose= require('mongoose');
require('dotenv').config();

const connect=mongoose.connect('mongodb+srv://root:root@cluster0.g9gqqdk.mongodb.net/?retryWrites=true&w=majority',{
  useCreateIndex:true,
  useNewUrlParser:true,
  useUnifiedTopology:true
});
connect.then((db)=>{
  console.log('connection On');
},(err)=>console.log(err));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productRouter=require('./routes/productRouter');
var cartRouter=require('./routes/cartRouter');
var saveRouter=require('./routes/saveRouter');
var orderRouter=require('./routes/orderRouter');
var planRouter=require('./routes/PlanRouter');
var UserDataRouter=require('./routes/UserDataRouter');
var tempRouter=require("./routes/temp");
var commentRouter=require('./routes/commentRouter');
var app = express();

app.use(passport.initialize());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/product',productRouter);
app.use('/cart',cartRouter);
app.use('/order',orderRouter);
app.use('/save',saveRouter);
app.use('/plan',planRouter);
app.use('/userdata',UserDataRouter);
app.use('/temp',tempRouter);
app.use('/comments',commentRouter);
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
