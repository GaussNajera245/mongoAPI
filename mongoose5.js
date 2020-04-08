const mongoose = require('mongoose');

const URL = 'mongodb+srv://onceonceonce11:onceonceonce11@nemo-rkcm5.mongodb.net/test?retryWrites=true&w=majority';
// const URL = 'mongodb+srv://onceonceonce11:onceonceonce11@nemo-rkcm5.mongodb.net/inventory?retryWrites=true&w=majority';
mongoose.connect(URL, {useNewUrlParser: true, useUnifiedTopology: true});

const schema = new mongoose.Schema({
    item: { type: String, required: true },
    quantity: { type: Number, required: true },
    size: {
        height: { type: Number, required: true },
        width: { type: Number, required: true },
        unit: { type: String, required: true }
    },
    lastChecked: { type: Date, required: true }, 
    onStock: { type: Boolean, required: true }
}, { versionKey: false });

const InventoryItem = mongoose.model('Inventory', schema, 'items');

const db = mongoose.connection;

db.on('error', console.error.bind(console,'connection error'))
db.once('open', ()=> {
    console.log("WE'RE CONNECTED");

    let Dummy = new InventoryItem({
        item: 'Potato Chips',
        quantity: 6,
        size:{
            height: 30,
            width: 17,
            unit: 'cm'
        },
        lastChecked: Date.now(),
        onStock: true
    });

    Dummy.save()
        .then( () => console.log('Correctly saved;)') )
        .catch( (e) => console.log('Something went wrong:(', e) )
});