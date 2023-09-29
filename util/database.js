const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
  MongoClient.connect(
    'mongodb+srv://rakeshprasadyaday:sXmmjMBxMLHJja19@cluster0.89hm7c7.mongodb.net/?retryWrites=true&w=majority'
    
  )
    .then(client => {
      console.log('Connected!');
      _db = client.db();
      callback();
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

// const mongoConnect =(callback) =>{

//   MongoClient.connect(
//     'mongodb+srv://rakeshprasadyaday:sXmmjMBxMLHJja19@cluster0.89hm7c7.mongodb.net/shop?retryWrites=true&w=majority'
//   )
//   .then(client =>{
//     console.log('Connected !');
//     callback(client);
//   })
//   .catch(err =>{
//     console.log(err);
//   })
// }

// module.exports= mongoConnect;
