const express = require("express");
const app=express();
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