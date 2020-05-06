(function() {


    app.post("/auth/instagram", function(req, resp) {
        log("/auth/instagram");
        log(req.body);
        var accessTokenUrl = 'https://api.instagram.com/oauth/access_token';
        var user = {};

        var params = {
            client_id: "eae0c204f0a44f58a09bebb7e21ad8c2",
            redirect_uri: req.body.redirectUri,
            client_secret: "6f3ba049775048aebf0d294a7b9ef854",
            code: req.body.code,
            grant_type: 'authorization_code'
        };

        log("Instagram Params :");
        log(params);

        // Step 1. Exchange authorization code for access token.
        request.post({ url: accessTokenUrl, form: params, json: true }, function(error, response, body) {


            log("Retrieved Profile From Instagram :");
            log(body);

            if (body.user) {
                ProfileModel.findOne({ instaid: body.user.id }, function(err, existUser) {

                    if (err) {
                        resp.send({ message: 'Some Error Occured', status: false });
                    }

                    log("Value on findOne Query :");
                    log(existUser);

                    if (existUser) {
                        log("Exisiting User Found :");
                        var token = createJWT(existUser);
                        log("Token :");
                        log(token);
                        existUser.isNewProfile = false;
                        var token = createJWT(existUser);
                        log("Token :");
                        log(token);
                        existUser.isNewProfile = false;
                        resp.send({ message: 'Existing User Found', profile: existUser, access_token: token, status: true, isNewUser: false });

                    } else {

                        log("New User Found :");
                        var user = new ProfileModel();
                        user.picture = body.user.profile_picture;
                        user.fullname = body.user.username;
                        user.isNewProfile = true;
                        user.isProfileCompleted = false;
                        user.login_type = 'instagram';

                
                        user.save(function(errSave, saved) {

                            if (errSave) {
                                log("Error Occured :");
                                log(errSave);
                                resp.status(200).send({ message: 'Error Saving Profile', token: undefined, error: errSave, status: false, isNewUser: false });
                            }


                            log("User Saved Successfully Instagram:");
                            var token = createJWT(user);
                            resp.status(200).send({ message: 'New Profile Created', access_token: token, profile: user, status: true, isNewUser: true });

                        });
                    }

                });
            } else {
                resp.status(200).send({ message: 'Some Error Occured While Fetching API from Instagram', access_token: undefined, status: false });

            }
        });
    });


})()