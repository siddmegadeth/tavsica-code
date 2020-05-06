(function() {

    app.post('/post/email/mobile/signup', function(req, resp) {

    });

    app.post("/auth/signin/otp", function(req, resp) {
        log("/auth/validate/otp");
        var request_id = req.query.request_id || req.body.request_id || req.params["request_id"];
        var otp = req.query.otp || req.body.otp || req.params["otp"];
        var mobile = req.query.mobile || req.body.mobile || req.params["mobile"];


        log("Received Params :");
        log(request_id);
        log(otp);
        log(mobile);

        nexmo.verify.check({
            request_id: request_id,
            code: parseInt(otp)
        }, function(err, result) {

            if (err) {
                resp.send({
                    error: 'error Occured While Validating OTP',
                    err: err
                });
            } else {

                ProfileModel.findOne({ mobile_number: mobile }, function(err, found) {
                    if (err) {
                        resp.send({ error: err, message: 'Some Error Occured', status: false });
                    }
                    if (found) {
                        log("Existing User Found :");
                        log("Create JWT");
                        var token = createJWT(found);

                        resp.send({ message: "Found User", isUserFound: true, status: true, profile: found, access_token: token });
                    } else {
                        log('User Does Not Exist');
                        resp.send({ message: 'Sign Up Before Login ', status: true, isUserFound: false });
                    }

                });

                // check if user is exisiting user or new user
            }

        });

    });

    app.post('/post/mobile/login', function(req, resp) {
        log('/post/mobile/login');
        var mobile = req.query.mobile || req.body.mobile || req.param["mobile"];
        var email = req.query.email || req.body.email || req.param["email"];

        log(mobile);
        ProfileModel.findOne({
            $or: {
                mobile: mobile,
                email: email,
            }
        }, function(err, found) {
            if (err) {
                resp.send({ error: err, message: 'Some Error Occured', status: false });
            }
            if (found) {
                log("Existing User Found :");
                log("Create JWT");
                var token = createJWT(found);

                resp.send({ message: "Found User", isUserFound: true, status: true, profile: found, access_token: token });
            } else {
                log('User Does Not Exist');
                resp.send({ message: 'Sign Up Before Login ', status: true, isUserFound: false });
            }

        });

    });


})()