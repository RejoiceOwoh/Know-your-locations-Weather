const express = require("express");
const https = require("https");
const fs = require("fs");
const bodyParser = require("body-parser")

const app = express();


app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser());
// app.use(bodyParser.json())

app.get("/", function (req, res) {
   // res.send(req.body)
   res.sendFile(__dirname + "/index.html")
})

app.post("/", function (req, res) { 
   // res.send(req.body.cityName); 
   console.log(req.body.cityName); 

   const query = req.body.cityName;
   const apiKey = "afcfbaf5db06e162b8ad91ae5c61ee9f";
   const units = "metric"
   const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units;
   https.get(url, function (response) { 
   console.log(response);
   console.log(response.statusCode);

   response.on("data", function (data) { 
      const weatherData = JSON.parse(data)
      console.log(weatherData);
      const temp = weatherData.main.temp
      const description = weatherData.weather[0].description
      console.log(description);
      console.log(temp);

      const icon = weatherData.weather[0].icon;
      const imageUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png"

      res.set("Content-Type", "text/html")
      res.write("<img alt='icon' src=" + imageUrl + ">");
      console.log(icon);
      res.write("<h3> The description of the weather is also " + description + " Do you want more details </h3>")
      res.write("<h1>The temperature in "+ query + " is " + temp + " (degree celcius) </h1>")
      res.send()
    })
 })
 })



app.listen(3000, function () { 
   console.log("App is running on port 3000");
 })