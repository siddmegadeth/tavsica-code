(function() {

    // test Function
  

    //Pass Comparison Function
    ProfileSchema.methods.comparePassword = function(password, cb) {
        log("Compare Password with HASHED pass");
        log(password);
        log("HASHED");
        log(this.password);
        bcrypt.compare(password, this.password, function(err, isMatch) {
            if (err) return cb(err);

            log("Return Status:");
            log(isMatch);
            cb(null, isMatch);
        });
    };


})()