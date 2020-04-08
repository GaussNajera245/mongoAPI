const express = require('express');
const app = express();
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const URL = 'mongodb+srv://onceonceonce11:onceonceonce11@nemo-rkcm5.mongodb.net/inventory?retryWrites=true&w=majority';

const schema = new mongoose.Schema({
    item: { type: String, required: true },
    quantity: { type: Number, required: true },
    size: {
        height: { type: Number, required: true },
        width: { type: Number, required: true },
        unit: { type: String, required: true }
    },
    lastChecked: { type: Date, required: true, default: Date.now()}, 
    onStock: { type: Boolean, required: true }
}, { versionKey: false });

app.use( express.json() );

app.get('/', (req, res) => {
    MongoClient.connect( URL, { useUnifiedTopology: true }, (err, client) => {
        assert.equal(null, err);
        
        const db = client.db('inventory');
        const cursor = db.collection('items').find({}).toArray( 
            function(err, result) {
                if (err) throw err;
                console.log(result);
                res.send(result)
                client.close();
            }
        );

    });
});

app.post('/', (req, res) => {
    mongoose.connect(URL, {useNewUrlParser: true, useUnifiedTopology: true});
    const InventoryItem = mongoose.model('Inventory', schema, 'items');
    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', () => {
        let Dummy = new InventoryItem( {...req.body} );
        
        Dummy.save()
            .then( () => res.send({ uploaded: true, ...req.body}) )
            .catch( (err) => res.send({ uploaded: false, ...err }) )
    });
});


app.listen(3000, ()=>{
    console.log('Server on port 3000');
})