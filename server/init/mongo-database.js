(function() {

    mongoDbURI = module.exports = process.env.MONGOLAB_URI;
    //mongoDbURI = module.exports = process.env.MONGOLAB_URI || 'mongodb://localhost:27017';
    mongoDB = module.exports = mongoDbURI;
    // Set up mongoose connection
    mongoose.connect(mongoDB);
    mongoose.Promise = global.Promise;
    db = module.exports = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));

    db.once('open', function() {
        log("Database Connected");
        log(mongoDbURI);
    });
})()