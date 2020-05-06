(function() {


    ProfileSchema.pre('save', function(next) {
        now = new Date();
        this.updated_at = now;
        if (!this.created_at) {
            this.created_at = now
        }

        log("System generated Global Unique ID (profileId) :" + this._id);
        this.profile = this._id;;
        log(this.profile);

        if (!this.freemium_subscription_start_date) {

            log("Subscription Start And End Date ");
            this.freemium_subscription_start_date = now;
            // also add end data to freemium subscription ends
            this.freemium_subscription_end_date = moment(now).add(1, 'M');
        }



        next();
    });

    // ProfileSchema.pre("save", function(next) {
    //     var user = this;

    //     // only hash the password if it has been modified (or is new)
    //     if (!user.isModified('password')) return next();

    //     // generate a salt
    //     bcrypt.genSalt(10, function(err, salt) {
    //         if (err) return next(err);

    //         // hash the password using our new salt
    //         bcrypt.hash(user.password, salt, function(err, hash) {
    //             if (err) return next(err);

    //             // override the cleartext password with the hashed one
    //             user.password = hash;
    //             next();
    //         });
    //     });

    // });



})()