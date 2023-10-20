const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
// const mongoConnect = require('./util/database').mongoConnect;
const mongoose= require('mongoose');

const User=require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('6530e4c32200029fdbfe161c')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
 
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);


mongoose
.connect(
  'mongodb://127.0.0.1:27017/shop'
)
.then(result=>{
  User.findOne().then(user=>
    {
      if(!user)
      {
        const user=new User({
          name: 'rak',
          email: 'rak@gmail.com',
          cart: {
            items: []
          }
        });
        user.save();
      }
    }
  )

  
  
  app.listen(3000);
})
.catch(err=>{
  console.log(err);
})
  

  // app.listen(3000);

