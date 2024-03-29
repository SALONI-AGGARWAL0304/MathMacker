const express = require("express");
const app = express();
const mysql2 = require("mysql2");
const fileuploader = require("express-fileupload");
const e = require("express");
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
  let filepath = process.cwd() + "/public/Index page/index2.html";
  resp.sendFile(filepath);
});
// app.get("/loginsignup", function (req, resp) {
//   resp.contentType("text/html");
//   let filepath = process.cwd() + "/public/LOGIN/signup.html";
//   resp.sendFile(filepath);
// });
app.get("/userprofile", function (req, resp) {
  let filepath = process.cwd() + "/public/display profiles/showprofiles.html";
  resp.sendFile(filepath);
});
//connecting to database
// const configobj = {
//   host: "127.0.0.1",
//   user: "root",
//   password: "Saloni##2004",
//   database: "loginsign",
//   dateStrings: true,
// };
const configobj = {
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database:  process.env.DB_DBNAME,
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
app.post("/signup-collector", function (req, resp) {
  let Email = req.body.email;
  let pass = req.body.pwd;
  mysql.query("insert into logindetails values (?,?)",[Email , pass] , function(err )
  {
    if(err==null)
    {
      resp.send("Record saved successfully");
    }
    else
    {
      console.log(err.message);
    }
  })
});
app.get("/login-collector", function (req, resp) {
  const Email = req.query.email;
  const pass = req.query.pwd;
   console.log("hey");
  mysql.query("select *from logindetails where emailid=?  and pwd =?",[Email, pass], function(err)
  {
    if(err==null)
    {
      console.log(Email);
      console.log(pass);
      resp.send("Logged in successfully");
    }
    else{
      console.log(err.message);
    }
  })
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
  const mail = req.body.email;
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
    "insert into register3 values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [
     
      mail,
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
app.get("/signin1", function (req, resp) {
  let email = req.query.logmail;
  let pass = req.query.logpass;
  mysql.query(
    "SELECT * FROM logindetails WHERE emailid = ? AND pwd = ?",
    [email, pass],
    function (error, results, fields) {
      if (error) {
        // Handle database error
        console.error(error);
        return resp.send("Internal Server Error");
      }
      if (results.length > 0) {
        // User authentication successful
        resp.send("Authentication successful");
      } else {
        // User authentication failed
        resp.send("Invalid credentials");
      }
    }
  );
});
app.get("/fetch-data", function (req, resp) {
  let Sex = req.query.sexx;
  let Marriage = req.query.martialstat;
  let State = req.query.states;
  let Religion = req.query.religions;
  mysql.query(
    "select *from register3 where sex=? and marriage=? and state=? and religion=?",
    [Sex, Marriage, State, Religion],
    function (err, resultJson) {
      if (err == null) {
        resp.send(resultJson);
      } else resp.send(err.message);
      //console.log(resultJson);
    }
  );
});

// search page

app.get("/angular-fetch-distinct", function (req, resp) {
  mysql.query(
    "select distinct sex from register3",
    function (err, resulSexAry) {
      if (err) {
        console.log(err);
      }
      mysql.query(
        "select distinct marriage from register3",
        function (err, resultMarriageAry) {
          if (err) {
            console.log(err);
          }
          mysql.query(
            "select distinct state from register3",
            function (err, resultStateAry) {
              if (err) {
                console.log(err);
              }
              mysql.query(
                "select distinct religion from register3",
                function (err, resultRelAry) {
                  if (err) {
                    console.log(err);
                  }
                  resp.send({
                    states: resultStateAry,
                    genders: resulSexAry,
                    statuses: resultMarriageAry,
                    religions: resultRelAry,
                  });
                }
              );
            }
          );
        }
      );
    }
  );
});
app.get("/fetch-one-record", function (req, resp) {
  mysql.query(
    "select * from register3 where sex=? and state=? and religion = ? and marriage=?",
    [req.query.gender, req.query.state, req.query.religion, req.query.status],
    function (err, resultJsonAry) {
      if (resultJsonAry != []) {
        console.log(resultJsonAry);
        resp.send(resultJsonAry);
      } else {
        resp.send("no record");
      }
    }
  );
});
app.post("/fetch-one", function (req, resp) {
  mysql.query(
    "select * from register3 where emailid=?",
    [req.body.kuchMail],
    function (err, resultJsonAry) {
      // console.log(req.body);
      if (resultJsonAry.length === 0) {
         resp.send("Please create your profile first.");
      }
      else
     { resp.send(resultJsonAry);}
    }
  );
});
app.post("/delete-user", function (req, resp) {
  const mailid = req.body.Kuchmail;
  mysql.query("delete from register3 where emailid=?", [mailid], function (err, result) {
    if (err == null) {
      if (result.affectedRows == 1) resp.send("Record Deleted Successfullyyy");
      else resp.send("Invalid Id");
    } else resp.send(err.message);
  });
});

