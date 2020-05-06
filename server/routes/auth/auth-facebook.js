(function() {

    app.post('/auth/facebook', function(req, resp) {
        log('/auth/facebook');
        var fields = ['id', 'email', 'first_name', 'last_name', 'link', 'name'];
        var accessTokenUrl = 'https://graph.facebook.com/v2.5/oauth/access_token';
        var graphApiUrl = 'https://graph.facebook.com/v2.5/me?fields=' + fields.join(',');
        var params = {
            code: req.body.code,
            client_id: req.body.clientId,
            client_secret: '40df295bea4b4a3869ec1c45d8e3223f',
            redirect_uri: req.body.redirectUri
        };

        // Step 1. Exchange authorization code for access token.
        request.get({ url: accessTokenUrl, qs: params, json: true }, function(err, response, accessToken) {
            if (response.statusCode !== 200) {
                return resp.status(500).send({ message: accessToken.error.message });
            }

            // Step 2. Retrieve profile information about the current user.
            request.get({ url: graphApiUrl, qs: accessToken, json: true }, function(err, response, profile) {
                if (response.statusCode !== 200) {
                    return resp.status(500).send({ message: profile.error.message });
                }
                log("Facebook Profile Retrieved :");
                log(profile);

                // search if user exist 
                ProfileModel.findOne({ email: profile.email }, function(err, found) {
                    if (err) {
                        resp.status(401).send({ status: false, error: err })
                    }
                    if (found) {
                        var token = createJWT(found);
                        resp.status(200).send({ status: true, profile: found, message: 'Welcome Back ' + found.fullname || found.firstname, access_token: token, isAuth: true, isNewProfile: false });

                    } else {
                        log("User Does Not Exist. Creating A New Profile");

                        var fbProfile = {
                            fullname: profile.name,
                            picture: 'https://graph.facebook.com/v2.3/' + profile.id + '/picture?type=large',
                            email: profile.email,
                            login_type: 'facebook',
                            isNewUser: true,
                            isMobileVerified: false
                        };

                        var tuple = new ProfileModel(fbProfile);
                        log(tuple);
                        log(tuple._id);
                        var token = createJWT(tuple);

                        tuple.save(function(errSaved, saved) {

                            log("Saved Profile Data");
                            log(saved);
                            if (errSaved) {
                                log(errSaved);
                                resp.send({ error: errSaved, message: 'Not Able To Save. Error Occured', status: false });
                            }

                            if (saved) {
                                resp.send({ message: 'Created New Profile', status: true, access_token: token, profile: fbProfile, isAuth: true, isNewProfile: true });
                            } else {
                                resp.send({ message: 'Unable To Create New Profile', status: false, isAuth: false, isNewProfile: false });
                            }

                        });
                    }

                });


            });
        });
    });


    // This Is USed For Cordova Login
    app.post("/post/auth/facebook", function(req, res) {

        var profile = req.body.profile || req.query.profile || req.param("profile");


        log("Profile Recived For Authentication :");
        log(profile);

        profile = JSON.parse(profile);
        var _profile = profile.id || profile.profile || profile.userID;

        log("Profile ID :");
        log(_profile);


        ProfileModel.findOne({
            email: profile.email
        }, function(err, existUser) {

            if (err) {
                res.send({ message: 'Some Error Occured Authenticating Facebook', token: undefined, status: false });
            }

            log("Value on findOne Query :");
            log(existUser);

            if (existUser) {
                log("Exisiting User Found :");

                if (!existUser.login_type) {
                    log("Updating List If login_type Not Found");

                    var user = new ProfileModel();
                    user.login_type = 'facebook';
                    user.save(function() {

                    });
                }

                var token = createJWT(existUser);
                log("Token :");
                log(token);
                existUser.isNewProfile = false;
                res.send({ message: 'Existing User', profile: existUser, access_token: token, status: true, isAuth: true, isNewProfile: false });

            } else {

                log("New User Found :");
                var user = new ProfileModel();
                user.picture = profile.picture;
                user.fullName = profile.name || profile.fullName;
                user.email = profile.email;
                user.isNewProfile = true;
                user.isProfileCompleted = false;
                user.login_type = 'facebook';
                user.isMobileVerified = false;

                user.save(function(errSave, saved) {

                    if (errSave) {
                        log("Error Occured :");
                        log(errSave);
                        res.status(200).send({ message: 'Error Saving Profile', error: errSave, status: false, isAuth: false, isNewProfile: false });
                    }

                    if (saved) {
                        log("User Saved Successfully Facebook:");
                        var token = createJWT(user);
                        res.status(200).send({ message: 'New Profile Created', access_token: token, profile: user, status: true, isAuth: true, isNewProfile: true });
                    } else {

                        res.send({ message: 'Unable To Create New Profile', status: false, isAuth: false, isNewProfile: false });
                    }
                });


            }

        });
    });




})()