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
    if (req.session.user.type.toUpperCase() == "PROVER")
      res.render("proverDashboard");
    else if (req.session.user.type.toUpperCase() == "VERIFIER")
      res.render("verifiersDashboard");
  } else {
    res.render("home");
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
        req.session.user = {
          username: result.username,
          id: result.id,
          type: result.type
        };
        console.log(" type:" + result.type);
        if (result.type.toUpperCase() == "PROVER")
          res.render("proverDashboard");
        else if (result.type.toUpperCase() == "VERIFIER")
          res.render("verifiersDashboard");

        res.end("Successful login");
      }
      console.log(
        "============================Out of the rest request login ====================="
      );
    });
  }
});

///////////////////File upload/////////////////////////

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

  ////////////////////Use this unique id to send request to JAVA server///////////////////////

  ////////////////////END///////////////////////
  console.log(
    "============================Out of the rest request document ====================="
  );

  res.render("uniqueIdGen", { uniqueId: uniqueId });
  res.end();
});
///////////////////End of file upload/////////////////////////



///////////////////Verification/////////////////////////

app.post("/verify", (req, res) => {
  console.log(
    "============================In of the rest request for verifiction ====================="
  );
  console.log("Request body:" + JSON.stringify(req.body));

  ////////////////////Use this unique id to send request to JAVA server///////////////////////

  ////////////////////END///////////////////////
  console.log(
    "============================Out of the rest request verifiction ====================="
  );

  res.end("DONE");
});
///////////////////End of Verification/////////////////////////

app.get("/signupPage", function(req, res) {
  res.render("signup");
});

app.get("/loginPage", function(req, res) {
  req.session.user = undefined;
  res.render("login");
});

app.listen(CONST.PORT, () => {
  console.log("Server is up at " + CONST.PORT + "...");
});
