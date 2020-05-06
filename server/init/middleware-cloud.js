(function() {
    storage = module.exports = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, 'uploads')
        },
        filename: function(req, file, cb) {
            log("####################");
            log("Multer Name :");
            log(file);
            log("####################");

            cb(null, Date.now() + file.originalname);

        }
    });

    upload = module.exports = multer({
        storage: storage
    });




    // Add Upload Display Pictures Middleware
    storageDiskStorageClodinary = module.exports = cloudinaryStorage({
        cloudinary: cloudinary,
        folder: 'display_pictures',
        allowedFormats: ['jpg', 'png', 'jpeg', 'pdf'],
        filename: function(req, file, cb) {
            log("Cloudinary Push Service For Prodeas")
            log(file);
            //get original file name
            var result = file.mimetype.split("/");
            ext = "." + result[1];
            log(null, file.fieldname + '-' + Date.now() + ext);
            cb(null, file.fieldname + '-' + Date.now());
        }
    });

    // Add Upload Display Pictures Middleware

    storageDiskStorageMedicalClodinary = module.exports = cloudinaryStorage({
        cloudinary: cloudinary,
        folder: 'medical_records',
        allowedFormats: ['jpg', 'png', 'jpeg', 'pdf'],
        filename: function(req, file, cb) {
            log("Cloudinary Push Service For Prodeas medical_records")
            log(file);
            var result = file.mimetype.split("/");
            ext = "." + result[1];
            log(null, file.fieldname + '-' + Date.now() + ext);
            cb(null, file.fieldname + '-' + Date.now());
        }
    });


    // Below Storage is For gender Verification Upload
    //mutlerUpload = module.exports = multer({ storage: storageDiskStorage });
    //mutlerUpload = module.exports = multer({});
    displayPictureUpload = module.exports = multer({ storage: storageDiskStorageClodinary });
    medicalPictureUpload = module.exports = multer({ storage: storageDiskStorageMedicalClodinary });

})()