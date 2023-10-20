const Product = require('../models/product');
const User=require('../models/user');
const Order=require('../models/order');

// exports.getLogin = (req, res, next) => {
//      res.render('auth/login', {
//           path: '/login',
//           pageTitle: 'Login'
         
//         });

    
//   };

  exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
      pageTitle: 'Login',
      path: '/login'
      
    });
  };
  