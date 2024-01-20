const express = require("express");
const app=express();
const mysql2= require("mysql2");
app.use(express.static("public"));
app.listen("3000" , function()
{
    console.log(`Server is running on http://localhost:${3000}`);  
})
app.get("/" , function(req , resp)
{
    resp.contentType("text/html");
    let filepath = process.cwd()+"/public/Index page/index.html";
    resp.sendFile(filepath);
})
app.get("/contactss" , function(req , resp)
{
    resp.contentType("text/html");
    let filepath = process.cwd()+"/public/Contact Page/contact.html";
    resp.sendFile(filepath);
})
app.get("/searchesss" , function(req , resp)
{
    resp.contentType("text/html");
    let filepath = process.cwd() + "/public/Search profiles/search.html"
    resp.sendFile(filepath);
})
app.get("/aboutss" , function(req , resp)
{
    resp.contentType("text/html");
    let filepath = process.cwd()+"/public/Index page/index.html"
    resp.sendFile(filepath);
})
app.get("/Homiee" , function(req , resp)
{
    resp.contentType("text/html");
    let filepath = process.cwd()+"/public/Index page/index.html"
    resp.sendFile(filepath);
})
app.get("/loginsignup" , function(req , resp)
{
    resp.contentType("text/html");
    let filepath = process.cwd()+"/public/LOGIN/login/signup.html"
    resp.sendFile(filepath);
})
//connecting to database 
const configobj={
    host:"127.0.0.1",
    user:"root",
    password:"Saloni##2004",
    database:"loginsign"
}
const mysql = mysql2.createConnection(configobj);
mysql.connect(function(err)
{
    if(err==null)
    {
        console.log("connected ");
    }
    else
    {
        console.log("err.message");
    }
})
app.use(express.urlencoded({ extended: true }));
// create table logindetails(emailid varchar(255) , pwd varchar(255) , PRIMARY KEY (emailid));
app.post("/login1" , function(req , resp)
{
    let email = req.body.txtEmail;
    let pass = req.body.txtPass;
    mysql.query("insert into logindetails values(?,?)" , [email , pass] , function(err)
    {
        if(err==null)
        {
            // resp.send("logged in");
            // resp.redirect("/register.html");
            let filepath = process.cwd()+"/public/LOGIN/register.html";
            resp.sendFile(filepath);
        }
        else
        {
            resp.send("error");
        }
    })
})
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
  