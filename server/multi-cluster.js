(function() {



    if (cluster.isMaster) {
        var numWorkers = require('os').cpus().length;

        console.log('Master cluster setting up ' + numWorkers + ' workers...');
        // numWorkers
        for (var i = 0; i < 4; i++) {
            cluster.fork();
        }

        cluster.on('online', function(worker) {
            console.log('Worker ' + worker.process.pid + ' is online');
        });

        cluster.on('exit', function(worker, code, signal) {
            console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
            console.log('Starting a new worker');
            cluster.fork();
        });
    } else {

        //local
        http.listen(process.env.PORT||app.get("PORT"), function(req, resp) {
            log("Tavisca  Server Core  Started :" + app.get("PORT") || process.env.PORT);
            log(process.env.PORT);
        });

        //prod
        // http.listen(process.env.PORT, function(req, resp) {
        //     log("Prodeas Server Core  Started :" + process.env.PORT);
        //     log(process.env.PORT);
        // });

    }


})();