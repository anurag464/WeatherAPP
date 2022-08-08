
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));



app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");

})

app.post("/",function(req,res){
 
    const query = req.body.cityName;
    const apiKey = "2fccf37389bd102fbea5b9b8fb281217";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units ;

    https.get(url, function(response){
        console.log(response.statusCode);
                                                        
        response.on("data", function(data){               //Using JSON.parse the data becomes a JS object
           const weatherData = JSON.parse(data);             
           const temp = weatherData.main.temp
           const description = weatherData.weather[0].description;
           const icon = weatherData.weather[0].icon;
           const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
           res.write("<h1>The temperature in" + query + " is: " + temp + " degrees Celsius</h1>")
           res.write("<h2>The weather is currently " + description + " </h3>");
           res.write("<img src= " + imageURL + " >");
           res.send();
                                                               
        })
   })
})





app.listen(3000, function(){
    console.log("Server started on port 3000");
})