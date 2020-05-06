(function() {



    app.use(function(req, res, next) { //allow cross origin requests
        res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
        res.header("Access-Control-Allow-Origin", "http://localhost");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    app.use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
        res.setHeader(
            "Access-Control-Allow-Methods",
            "GET, POST, OPTIONS, PUT, PATCH, DELETE"
        );
        res.setHeader(
            "Access-Control-Allow-Headers",
            "Authorization, Origin, Content-Type, Accept"
        );
        res.setHeader("Access-Control-Allow-Credentials", "true");
        next();
    });


    //app.use(cors());
    // parse application/json
    app.use(bodyParser.json())
    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({
        extended: false
    }))
    //app.use(bodyParser({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
    app.set("PORT", 3001 || process.env.PORT);
    app.set('host', process.env.NODE_IP || 'localhost');
    app.use('/app', express.static("public/app/www"));
    app.use('/', express.static("public/app/www"));

    // security Path
    app.use(helmet());
    // app.use(helmet({
    //     frameguard: false
    // }))
    app.use(helmet({
        frameguard: {
            action: 'deny'
        }
    }));






})()