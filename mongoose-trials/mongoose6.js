const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', ()=>{
    console.log("WE'RE CONNECTED");

    let kittySchema = new mongoose.Schema({
        name: String
    });
    
    kittySchema.methods.speak = function(){
        let greeting = 
            this.name 
            ? `Meow name is ${this.name}`
            : "I don't have a name";
        
        console.log(greeting);
    };

    let Kitten = mongoose.model('Kitten', kittySchema);
    let silence = new Kitten({name: 'Silence'});

    Kitten.find(function (err, kittens) {
        if (err) return console.error(err);
        console.log(kittens);
      })
});




