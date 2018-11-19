var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var CONST = require("./const");
var userCreation = require("./query/userCreation");
var validUser = require("./query/findUser");
var { upload } = require("./s3/index");
var app = express();

app.use(
  session({
    secret: "cpe_273_secure_string",
    resave: false,
    saveUninitialized: true
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

//set the view engine to ejs
app.set("view engine", "ejs");
//set the directory of views
app.set("views", "./views");
//specify the path of static directory
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  if (req.session.user) {
    res.render("proverDashboard");
  } else {
    res.render("signup");
  }
});

app.post("/signup", (req, res) => {
  console.log(
    "============================In of the rest request signup ====================="
  );
  console.log("Request body:" + JSON.stringify(req.body));

  userCreation.createUser(req.body, (err, result) => {
    if (err) {
      res.sendStatus(404);
      res.end();
    } else {
      res.render("login");
      res.end();
    }
    console.log(
      "============================Out of the rest request signup ====================="
    );
  });
});

app.post("/login", (req, res) => {
  if (req.session.user) {
    res.render("proverDashboard");
  } else {
    console.log(
      "============================In of the rest request login ====================="
    );
    console.log("Request body:" + JSON.stringify(req.body));
    validUser.isValidUser(req.body, (err, result) => {
      if (err) {
        res.end("Error occured");
      } else {
        console.log("Result :" + JSON.stringify(result));
        req.session.user = { username: result.username };
        res.render("proverDashboard");
        res.end("Successful login");
      }
      console.log(
        "============================Out of the rest request login ====================="
      );
    });
  }
});

///////////////////File upload/////////////////////////
//Setup for Aws S3

app.post("/submit-document", upload.single("file"), (req, res) => {
  console.log(
    "============================In of the rest request submit document ====================="
  );
  console.log("Request body:" + JSON.stringify(req.body));
  console.log("Request body:" + JSON.stringify(req.file.key));
  var filename = req.file.key;
  var uniqueId = "";
  if (filename) {
    uniqueId = filename.split("_", 1);
  }
  console.log("Unique ID :" + uniqueId);

  ////////////////////Use this unique id to send request to server///////////////////////

  ///////////////////////////////////////////
  console.log(
    "============================Out of the rest request document ====================="
  );

  res.render("uniqueIdGen", { uniqueId: uniqueId });
  res.end();
});

///////////////////File upload/////////////////////////

app.listen(CONST.PORT, () => {
  console.log("Server is up at " + CONST.PORT + "...");
});
