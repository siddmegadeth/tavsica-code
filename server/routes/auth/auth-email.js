(function() {

 


    app.post("/post/user/auth", function(req, resp) {
        log("/post/user/auth");
        var profile = req.query.profile || req.body.profile || req.param["profile"];
        profile = JSON.parse(profile);
        log(profile);
        // perform database search 
        ProfileModel.findOne({ email: profile.email }, function(err, found) {
            if (err) {
                resp.send({ error: err, message: 'Some Error Occured', status: false });
            }
            if (found) {
                log("Existing User Found :");
                log(found);
                var token = createJWT(found);
                log("Token Generated :");
                log(token);
                log("Password Comparison ");
                log("Encrpt Password:");
                log(found.password);
                log("Received Password :");
                log(profile.password);

                if (found.login_type == 'email') {
                    found.comparePassword(profile.password, function(passErr, isMatch) {

                        if (passErr) {
                            resp.send({ error: err, message: 'Some Error Occured Comparing Password', status: false });
                        }

                        if (isMatch) {
                            log("Password Match");
                            resp.send({ message: "Welcome Back " + found.fullname, isPasswordCorrect: true, status: true, access_token: token, profile: found });

                        } else {
                            log("Password Did Not Match");
                            resp.send({ message: "Password Incorect", isPasswordCorrect: false, status: true });
                        }


                    });
                } else {
                    resp.send({ message: "Please Use Social Login", isPasswordCorrect: false, status: true });

                }

            } else {
                log('User Does Not Exist');
                resp.send({ message: 'Sign Up Before Login ', status: true, isNewUser: true });
            }

        });
    });


    app.post("/post/user/signup", function(req, resp) {
        log("/user/signup");
        var profile = req.query.profile || req.body.profile || req.param["profile"];
        profile = JSON.parse(profile);
        log(profile);
        var emailProfile;

        // $or: [{
        //        'email': profile.email
        //    }, {
        //        'username': profile.username
        //    }]

        // perform database search 
        ProfileModel.findOne({ email: profile.email }, function(err, found) {

            log("Resuts From Searching For Profile");
            log(found);

            if (err) {
                resp.send({ error: err, message: 'Some Error Occured', status: false });
            }

            if (found) {
                log('User Exist');
                log(found);
                resp.send({ message: 'Login Using Correct Credentials/Social Login', status: true, isNewUser: false });

            } else {

                log("User Does Not Exist. Creating A New Profile");

                if (profile.middlename) {
                    emailProfile = {
                        fullname: profile.fullName,
                        firstname: profile.firstname,
                        middlename: profile.middlename,
                        lastname: profile.lastname,
                        fullname: profile.fullName,
                        email: profile.email,
                        password: profile.password,
                        isProfileCompleted: false,
                        login_type: 'email',
                        isNewUser: true,
                        isMobileVerified: false
                    };
                } else {
                    emailProfile = {
                        fullname: profile.fullName,
                        firstname: profile.firstname,
                        lastname: profile.lastname,
                        fullname: profile.fullName,
                        email: profile.email,
                        password: profile.password,
                        isProfileCompleted: false,
                        login_type: 'email',
                        isNewUser: true,
                        isMobileVerified: false
                    };
                }


                var tuple = new ProfileModel(emailProfile);
                log(tuple);
                log(tuple._id);
                var token = createJWT(tuple);

                tuple.save(function(errSaved, saved) {
                    log("Saving Profile Data");
                    log(saved);
                    if (errSaved) {
                        log(errSaved);
                        resp.send({ error: errSaved, message: 'Not Able To Save. Error Occured', status: false });
                    }

                    if (saved) {
                        resp.send({ message: 'Created New Profile', status: true, access_token: token, profile: emailProfile });
                    } else {
                        resp.send({ message: 'Unable To Create New Profile', status: false, isNewUser: false });
                    }

                });

            }

        });
    });

})()