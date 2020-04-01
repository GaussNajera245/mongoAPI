const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

//Connection URL
const url = 'mongodb+srv://onceonceonce11:onceonceonce11@nemo-rkcm5.mongodb.net/test?retryWrites=true&w=majority';


async function hi() {
MongoClient.connect(url,{ useUnifiedTopology: true }, (err, client) => {
    // /READ 
    const db = client.db("test");
    let cursor = await db.collection('inventory').find({});

    const iteratefunc = doc => {
        console.log(JSON.stringify(doc, null, 4));
    };
    const errorfunc = err => {
        console.log(err);
    };
    cursor.forEach( iteratefunc, errorfunc );

    assert.equal(null, err);
    client.close();
})
}


hi
