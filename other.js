const MongoClient = require('mongodb').MongoClient;

async function other(){
    const url = 'mongodb+srv://onceonceonce11:onceonceonce11@nemo-rkcm5.mongodb.net/test?retryWrites=true&w=majority';

    const client = await MongoClient.connect(url,{ 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    })

    let allCollections=[];

    const db = await client.db("sample_mflix");
    db.listCollections().toArray(function(err, collections) {
        if(err) console.log(err);

        collections.forEach( e => allCollections.push(e.name))
        console.log(allCollections)
        client.close();
    });
}

other()
