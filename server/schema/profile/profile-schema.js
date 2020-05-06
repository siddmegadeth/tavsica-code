(function() {

    ProfileSchema = module.exports = mongoose.Schema({

        profile: {
            type: String,
            unique: true,
            index: true,
        },
        mobile: {
            type: String,
            index: true,
            unique: true,
        },
        email: {
            type: String,
            unique: true,
            index: true,
            required: true,
        },
        fullname: {
            type: String,
        },
        picture: {
            type: String
        },
        countryCode: {
            type: String,
        },
        login_type: {
            type: String,
            enum: ['email', 'google', 'facebook', 'mobile', 'instagram']
        },
        dob: {
            type: Date,
        },
        location: {
            type: Object,
            properties: {
                type: {
                    type: String,
                    enum: ['Point', 'LineString', 'Polygon'],
                    default: 'Point'
                },
                coordinates: {
                    type: [Number],
                    default: [0, 0]
                }
            }
        },
        isNewUser: {
            type: Boolean,
            default: true
        },
        isMobileVerified: {
            type: Boolean,
            default: false
        },
        isProfileCompleted: {
            type: Boolean,
            default: false
        },
        subscription_type: {
            type: String,
            default: 'freemium',
            enum: ['freemium', 'gold', 'silver', 'platinum']
        },
        freemium_subscription_start_date: { // add this in hooks when user register for 30 Days
            type: Date
        },
        freemium_subscription_end_date: {
            type: Date
        },
        created_at: { type: Date, default: Date.now },
        updated_at: { type: Date, default: Date.now }
    });

    require("./profile-hooks");
    require("./profile-methods");

    ProfileModel = module.exports = mongoose.model("ProfileModel", ProfileSchema);

})()