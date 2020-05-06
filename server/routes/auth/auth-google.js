(function() {

    app.post('/auth/google', function(req, res) {
        log('/auth/google');
        var accessTokenUrl = 'https://accounts.google.com/o/oauth2/token';
        var peopleApiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';
        log(req.body.redirectUri);
        var params = {
            code: req.body.code,
            client_id: req.body.clientId,
            client_secret: 'KAwNUVO2UwBfdJ7Hq6mwXo7Q',
            redirect_uri: req.body.redirectUri,
            grant_type: 'authorization_code'
        };

        // Step 1. Exchange authorization code for access token.
        request.post(accessTokenUrl, { json: true, form: params }, function(err, response, token) {
            var accessToken = token.access_token;
            var headers = { Authorization: 'Bearer ' + accessToken };

            // Step 2. Retrieve profile information about the current user.
            request.get({ url: peopleApiUrl, headers: headers, json: true }, function(err, response, profile) {
                if (profile.error) {
                    return res.status(500).send({ message: profile.error.message });
                }

                var user = {};
                user.picture = user.picture || profile.picture.replace('sz=50', 'sz=200');
                user.fullname = profile.name;
                user.email = profile.email;
                res.send(user);
            });
        });
    });

})();