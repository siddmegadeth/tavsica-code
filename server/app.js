(function() {
    // require('dotenv').config();

    require("./init/index");
    require("./schema/index"); // Import Schema
    require("./routes/index"); // Import Routes
    // Enable Multi Cluster App (Master Slave Architecture)
    require("./multi-cluster"); // Import Routes

})()