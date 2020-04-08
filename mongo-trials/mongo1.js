const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/test';
const URL = 'mongodb+srv://onceonceonce11:onceonceonce11@nemo-rkcm5.mongodb.net/inventory?retryWrites=true&w=majority';

MongoClient.connect( URL, { useUnifiedTopology: true }, (err, client) => {
    assert.equal(null, err);
    const db = client.db('inventory');

        db.collection('items').find({})
        .then(function(result) {
            console.log('SUCEEESSSS')
            client.close();
        })
    });

// MongoClient.connect(url,{ useUnifiedTopology: true }, (err, client) => {
//   assert.equal(null, err);
//   const db = client.db('test');

//   let obj = [
//             { name: "Company Inc", address: "Highway 37" },
//             { name: 'OXXO', address: "Calle P. Walaby, 242 Sydney"},
//             { name:'Krusty Krab', address:"Bikini's Bottom"}
//     ];

//     db.collection('customers').insertMany(obj)
//     .then(function(result) {
//         console.log('SUCEEESSSS')
//         client.close();
//     })


//     // db.inventory.remove( { qty1: { $exists: true } } )  REMOVES ALL DOCUMENTS WITH THE FIELD QTY1 
//     // $unset para borrar fields 
 
// });