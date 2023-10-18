const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;
const mongoose= require('mongoose');
// const User=require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//   User.findById('651911a3d08a49d13d2c0c70')
//     .then(user => {
//       req.user = new User(user.name,user.email,user.cart,user._id);
//       next();
//     })
//     .catch(err => console.log(err));
 
// });

app.use('/admin', adminRoutes);
// console.log("Reached admin");
 app.use('/',shopRoutes);

app.use(errorController.get404);


mongoose
.connect(
  'mongodb://127.0.0.1:27017/shop'
)
.then(result=>{
  app.listen(3000);
})
.catch(err=>{
  console.log(err);
})
  

  // app.listen(3000);

