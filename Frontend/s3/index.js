const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
const multer = require("multer");
const uniqid = require("uniqid");
var CONST = require("../const");

aws.config.update({
  secretAccessKey: CONST.awsS3Key,
  accessKeyId: CONST.awsS3Id,
  region: CONST.awsS3Region
});

var s3 = new aws.S3();
var uniqueId = "";
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: CONST.ResumesBucket,
    key: function(req, file, cb) {
      console.log("req ", JSON.stringify(req.body));
      console.log(file);
      uniqueId = uniqid();
      var filename = uniqueId + "_" + req.body.docType + "_" + Date.now();
      console.log("Filename:" + filename);

      cb(null, filename); //use Date.now() for unique file keys
    }
  })
});

module.exports = { upload };
