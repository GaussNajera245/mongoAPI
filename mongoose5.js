const mongoose = require('mongoose');

const URL = 'mongodb+srv://onceonceonce11:onceonceonce11@nemo-rkcm5.mongodb.net/dev_api?retryWrites=true&w=majority';
mongoose.connect(URL, {useNewUrlParser: true, useUnifiedTopology: true});

let schema = new mongoose.Schema({
    item: String,
    quantity: Number,
    size: {
        height: Number,
        width: Number,
        unit: String
    },
    lastChecked: Date, 
    onStock: Boolean
});

const db = mongoose.connection;

db.on('error', console.error.bind(console,'connection error'))
db.once('open', ()=> {
    console.log("WE'RE CONNECTED");
    
    let InventoryItem = mongoose.model('Inventory', schema, 'inventory');

    let Dummy = new InventoryItem({
        item: 'Potato Chips',
        quantity: 6,
        size:{
            height: 30,
            width: 17,
            unit: 'cm'
        },
        onStock: true
    });

    Dummy.save()
        .then( () => console.log('Correctly saved;)') )
        .catch( (e) => console.log('Something went wrong:(', e) )
});