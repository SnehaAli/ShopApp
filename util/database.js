const mongobd = require('mongodb');
const MongoClient = mongobd.MongoClient;

let _db;

//connecting
const mongoConnect = callback => {
    MongoClient.connect(
        'mongodb+srv://nehaakhatoon72:gGPKUGwHP1Y1nBO2@cluster0.5il7znj.mongodb.net/shop?retryWrites=true&w=majority&appName=AtlasApp'
    ) 
    //storing the connection to database ,keep on running
    .then(client => {
        console.log('Connected');
        _db = client.db();
        callback(client);
    })
    .catch(err => {
        console.log(err);
        throw err;
    });
};

//return access to that connection database if it exist
const getDb = () => {
    if(_db) {
        return _db;
    }
    throw 'No Database Found!';
};


exports.mongoConnect = mongoConnect;
exports.getDb = getDb;