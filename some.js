const MongoClient = require('mongodb').MongoClient

const url = 'mongodb+srv://onceonceonce11:onceonceonce11@nemo-rkcm5.mongodb.net/test?retryWrites=true&w=majority';

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) return console.log(err)
    console.log(`Connected MongoDB: ${url}`)

    let allCollections = [];
    // Storing a reference to the database so you can use it later
    db = client.db('sample_mflix');
    db.listCollections().toArray(function(err, collections) {
        if(err) console.log(err);
        //iterate to each collection detail and push just name in array
        collections.forEach(eachCollectionDetails => {
            allCollections.push(eachCollectionDetails.name);
        });
        console.log(allCollections)
        client.close();
     });

})