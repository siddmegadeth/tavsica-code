(function() {



    // validate token
    app.post("/post/validate/token", ensureAuthenticated, function(req, resp) {
        resp.send({ message: 'Token Are Valid', status: true, isTokenValid: true });
    });


    // Generate OTP 
    app.get("/auth/mobile", function(req, resp) {
        log("/auth/mobile");
        var mobile = req.query.mobile || req.body.mobile || req.params["mobile"];
        log(mobile);
        nexmo.verify.request({
            number: mobile,
            brand: "Prodeas"
        }, (err, result) => {
            if (err) {
                log("Error In Nexmo");
                log(err);
                resp.send({
                    error: 'error Occured',
                    err: err
                });
            }
            if (result.status == 0) {
                log(result);
                result.message = 'OTP Is generated And Is Valid For 5 Mins';
                result.isVerified = true;
                const verifyRequestId = result.request_id;
                console.log('request_id', verifyRequestId);
                resp.send(result);
            } else {
                log(result);
                result.message = result.error_text;
                result.isVerified = false;
                const verifyRequestId = result.request_id;
                console.log('request_id', verifyRequestId);
                resp.send(result);

            }
        });
    });


    // Validate OTP
    app.get("/auth/validate/otp", function(req, resp) {
        log("/auth/validate/otp");
        var request_id = req.query.request_id || req.body.request_id || req.params["request_id"];
        var otp = req.query.otp || req.body.otp || req.params["otp"];
        var mobile = req.query.mobile || req.body.mobile || req.params["mobile"];
        var email = req.query.email || req.body.mobile || req.params["email"];


        log("Received Params :");
        log(request_id);
        log(otp);
        log(mobile);

        nexmo.verify.check({
            request_id: request_id,
            code: parseInt(otp)
        }, function(errOtp, result) {

            if (errOtp) {
                resp.send({
                    message: 'error Occured While Validating OTP',
                    err: errOtp,
                    status: false
                });
            }

            log("OTP Validation Result : ");
            log(result);

            if (result) {
                if (result.status == 0) {

                    log("OTP Validated :");
                    ProfileModel.findOne({ mobile: mobile }, function(err, found) {
                        log("Result For Current Query Search")
                        log(found);

                        if (err) {
                            resp.send({ error: err, message: 'Some Error Occured Updating Documents', status: false });

                        }
                        if (found) {
                            // since mobile number is verified now then update Database
                            // create jwt toekn as access token
                            var token = createJWT(found);

                            resp.send({ message: "Welcome " + found.fullname, status: true, profile: found, isOTPVerified: true, isExistingUser: true, access_token: token });

                        } else {
                            resp.send({ message: "Kindly Register To Continue", status: true, isOTPVerified: true, isExistingUser: false });

                        }

                    });

                    // check if user is exisiting user or new user
                } else {
                    resp.send({ message: "Could Not Verify Mobile Number OTP", status: true, isOTPVerified: false, isExistingUser: false });

                }
            } else {
                resp.send({ message: "Generate New OTP", status: true, isOTPVerified: false, isExistingUser: false });

            }

        });

    });


    // Cancel If Reuest Is Underway And Not Completed for Mobiel Number OTP
    app.get("/auth/cancel/request", function(req, resp) {

        var request_id = req.query.request_id || req.body.request_id || req.params["request_id"];

        nexmo.verify.control({
            request_id: request_id,
            cmd: 'cancel'
        }, function(err, result) {

            if (err) {
                resp.send({
                    error: 'error Occured While Cancelling Request',
                    err: err
                });
            } else {
                log(result);
                resp.send(result);
            }

        });


    });


    // USed for Signup
    // If oAuth Login is also enabled then email become primary for registration
    app.post("/post/auth/signup/", function(req, resp) {
        log("/post/auth/signup/");
        var mobile = req.query.mobile || req.body.mobile || req.params["mobile"];
        var fullname = req.query.fullname || req.body.fullname || req.params["fullname"];
        var email = req.query.email || req.body.email || req.params["email"];


        log("Received Mobile, FullName And Email");
        log(mobile);
        log(fullname);
        log(email);

        ProfileModel.findOne({
            $or: [
                { mobile: mobile },
                { email: email },
            ]
        }, function(err, found) {
            log("Result For Current Query Search")
            log(found);

            if (err) {
                resp.send({ error: err, message: 'Some Error Occured Finding Documents', status: false });

            }
            if (found) {

                log("Found Registered User:");
                log(found);

                if (found.login_type == 'mobile') {
                    resp.send({ message: "Login Using OTP. Exisiting User Found", status: true, isUserSignedUp: false });
                }
                if (found.login_type == 'facebook') {
                    resp.send({ message: "Login using Your Social Account. Exisiting User Found", status: true, isUserSignedUp: false });
                }

            } else {

                // user does not exist . creating anew user
                var tuple = new ProfileModel({
                    mobile: mobile,
                    email: email,
                    fullname: fullname,
                    login_type: 'mobile'
                });
                tuple.save(function(errSave, saved) {
                    if (errSave) {
                        resp.send({ error: err, message: 'Some Error Occured Saving Documents', status: false });

                    }

                    if (saved) {

                        resp.send({ message: "Account Signed Up. Please Login", status: true, isUserSignedUp: true });
                    } else {
                        resp.send({ message: "Some Issue Occured Signing Up. Try Again later", status: true, isUserSignedUp: false });

                    }
                });



            }

        });



    });


})()