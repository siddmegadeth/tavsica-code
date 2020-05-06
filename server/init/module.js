(function() {

    log = module.exports = console.log.bind(console);
    express = module.exports = require("express");
    app = module.exports = express();
    http = module.exports = require('http').createServer(app);
    cors = module.exports = require('cors');
    cluster = module.exports = require('cluster');
    mongoose = module.exports = require("mongoose");
    multer = module.exports = require('multer');
    bodyParser = module.exports = require('body-parser')
    fs = module.exports = require('fs');
    bcrypt = module.exports = require("bcryptjs");
    jwt = module.exports = require('jwt-simple');
    cors = module.exports = require('cors');
    moment = module.exports = require('moment');
    saltRounds = module.exports = 20;
    request = module.exports = require('request');
    // Nexmo Module For Phore Number Authentication
    Nexmo = module.exports = require('nexmo');
    nexmo = module.exports = new Nexmo({
        apiKey: '93d42cfd',
        apiSecret: 'JhPVWe43VwMxLw07'
    });
    cloudinary = module.exports = require('cloudinary');
    //  Configure Cloudinary :
    cloudinary.config({
        cloud_name: 'hookup',
        api_key: '657836838377537',
        api_secret: '7LDSjY60yP7IjdeyXUjIx8VmzbU',
    });
    helmet = module.exports = require('helmet');
    cloudinaryStorage = module.exports = require('multer-storage-cloudinary');
    Tesseract = module.exports = require('tesseract.js');
    FitbitApiClient = module.exports = require("fitbit-node");
    fitClient = module.exports = new FitbitApiClient({ clientId: "22BPVS", clientSecret: "21ea02e2c2bed33df9e5e0900a5e24ae", apiVersion: "1.2" })
    dateFormat = module.exports = require('dateformat');

})();