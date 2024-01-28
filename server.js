const express = require("express");
const app = express();
const mysql2 = require("mysql2");
const fileuploader = require("express-fileupload");
app.use(express.static("public"));
app.listen("3000", function () {
  console.log(`Server is running on http://localhost:${3000}`);
});
app.get("/", function (req, resp) {
  resp.contentType("text/html");
  let filepath = process.cwd() + "/public/Index page/index.html";
  resp.sendFile(filepath);
});
app.get("/contactss", function (req, resp) {
  resp.contentType("text/html");
  let filepath = process.cwd() + "/public/Contact Page/contact.html";
  resp.sendFile(filepath);
});
app.get("/searchesss", function (req, resp) {
  resp.contentType("text/html");
  let filepath = process.cwd() + "/public/Search profiles/search.html";
  resp.sendFile(filepath);
});
app.get("/aboutss", function (req, resp) {
  resp.contentType("text/html");
  let filepath = process.cwd() + "/public/Index page/index.html";
  resp.sendFile(filepath);
});
app.get("/Homiee", function (req, resp) {
  resp.contentType("text/html");
  let filepath = process.cwd() + "/public/Index page/index.html";
  resp.sendFile(filepath);
});
app.get("/loginsignup", function (req, resp) {
  resp.contentType("text/html");
  let filepath = process.cwd() + "/public/LOGIN/signup.html";
  resp.sendFile(filepath);
});
//connecting to database
const configobj = {
  host: "127.0.0.1",
  user: "root",
  password: "Saloni##2004",
  database: "loginsign",
  dateStrings: true,
};
const mysql = mysql2.createConnection(configobj);
mysql.connect(function (err) {
  if (err == null) {
    console.log("connected ");
  } else {
    console.log("err.message");
  }
});
app.use(express.urlencoded({ extended: true }));
// create table logindetails(emailid varchar(255) , pwd varchar(255) , PRIMARY KEY (emailid));
app.post("/login1", function (req, resp) {
  let email = req.body.txtEmail;
  let pass = req.body.txtPass;
  mysql.query(
    "insert into logindetails values(?,?)",
    [email, pass],
    function (err) {
      if (err == null) {
        // resp.send("logged in");
        // resp.redirect("/register.html");
        let filepath = process.cwd() + "/public/LOGIN/register.html";
        resp.sendFile(filepath);
      } else {
        resp.send(err);
      }
    }
  );
});
app.get("/check-email", function (req, resp) {
  let email = req.query.kuchEmail;
  mysql.query(
    "select *from logindetails where emailid=?",
    [email],
    function (err, resultJsonAry) {
      if (resultJsonAry.length === 1) {
        resp.send("Not Available");
      } else {
        resp.send("Available");
      }
    }
  );
});

app.use(fileuploader());

app.post("/form-register", function (req, resp) {
  // create table register1(picname varchar(255) ,Name varchar(255) ,  Fname varchar(255) , Mname varchar(255) , state varchar(255) , city varchar(255) ,
  // sex varchar(255) , dob date  ,height int ,  religion varchar(255)  ,marriage varchar(255) , manglik varchar(255) , prof varchar(255) , quali varchar(255)); 
  const name = req.body.inputname;
  const fname = req.body.inputFName;
  const mname = req.body.inputMName;
  const state = req.body.state;
  const city = req.body.city;
  const sex = req.body.sex;
  const dobb = req.body.dob;
  const height = req.body.height;
  const reli = req.body.religion;
  const marr = req.body.marriagestat;
  const mang = req.body.manglik;
  const profesion = req.body.proffession;
  const qualific = req.body.qualification;
  let filename;
  if (req.files == null) {
    filename = "nopic.jpg";
  } else {
    filename = req.files.ppic.name;
    let path = process.cwd() + "/public/uploads/" + filename;
    req.files.ppic.mv(path);
  }
  req.body.ppic = filename;
  // resp.send(req.body);
  mysql.query(
    "insert into register1 values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      filename,
      name,
      fname,
      mname,
      state,
      city,
      sex,
      dobb,
      height,
      reli,
      marr,
      mang,
      profesion,
      qualific,
    ],
    function (err) {
      if (err == null) {
        resp.send("successfully record data");
      } else {
        resp.send(err.message);
      }
    }
  );
});

app.get("/signin", function (req, resp) {
  let filepath = process.cwd() + "/public/LOGIN/signin.html";
  resp.sendFile(filepath);
});
app.post("/signin1", function (req, resp) {
  let email = req.body.txtEmail;
  let pass = req.body.txtPass;
  mysql.query(
    "SELECT * FROM logindetails WHERE emailid = ? AND pwd = ?",
    [email, pass],
    function (error, results, fields) {
      if (error) {
        // Handle database error
        console.error(error);
        return resp.status(500).send("Internal Server Error");
      }

      if (results.length > 0) {
        // User authentication successful
        resp.status(200).send("Authentication successful");
      } else {
        // User authentication failed
        resp.status(401).send("Invalid credentials");
      }
    }
  );
});
