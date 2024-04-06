const express = require("express");
const app = express();
const path = require("path");
const dotenv = require('dotenv').config()

const twilio = require('twilio')
const accountSid = process.env.SID;
const authToken = process.env.TOKEN;
const twilioClient = new twilio.Twilio(accountSid, authToken);

const ejsMate = require("ejs-mate");
app.engine('ejs', ejsMate);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.static(path.join(__dirname, "/img")));
app.use(express.urlencoded({ extended: true }));

app.get("/contact", (req, res) => {
    res.render("./pages/contact.ejs");
})

app.post("/contact", (req, res) => {
    const {name, number, message} = req.body;
    console.log(name, number, message);
    let Number = number;
    let Message = message;
    twilioClient.messages.create({
        from: "+12512999521",
        to: "+916354809704",
        body: `the Detail of User is: ${name}, his mobile number is: ${Number} his giving Awesome Feedback is: ${Message}`
    }) .then((res) => {
        console.log(res);
    }) .catch((err) => {
        console.log(err);
    })
    res.redirect("/");
})


app.get("/", (req, res) => {
    res.render("./pages/index.ejs");
})
app.listen(3000, () => {
    console.log("server listing on the port number 3000");
})