const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/test';

MongoClient.connect(url,{ useUnifiedTopology: true }, (err, client) => {
  assert.equal(null, err);
  const db = client.db('test');

  let obj = [
            { name: "Company Inc", address: "Highway 37" },
            { name: 'OXXO', address: "Calle P. Walaby, 242 Sydney"},
            { name:'Krusty Krab', address:"Bikini's Bottom"}
    ];

    db.collection('customers').insertMany(obj)
    .then(function(result) {
        console.log('SUCEEESSSS')
        client.close();
    })

    // db.inventory.remove( { qty1: { $exists: true } } )  REMOVES ALL DOCUMENTS WITH THE FIELD QTY1 
    // $unset para borrar fields 
 
});


// const MongoClient =  require('mongodb').MongoClient;

// const URL = 'mongodb://localhost:27017/test';

// MongoClient.connect(URL,{ useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
//     const db = client.db('test');

//     const cursor = db.collection('customers').find({})
//     function iterateFunc(doc) {
//         console.log(JSON.stringify(doc, null, 4));
//         client.close();
//      }
//      function errorFunc(error) {
//         console.log(error);
//         client.close();
//      }
//      cursor.forEach(iterateFunc, errorFunc);
    
// });
