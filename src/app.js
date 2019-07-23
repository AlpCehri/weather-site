const path = require("path");
const express = require("express");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");



const app = express();
const port = process.env.PORT || 3000

//define paths for express config
const publicDirectory = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views")
const partialPath = path.join(__dirname, "../templates/partials")

//setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialPath);

//Setup static directory to serve
app.use(express.static(publicDirectory));

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Alp Cehri"
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        title: "help",
        message: "Sushi",
        name: "Alp Cehri"
    })
})

app.get("/weather", (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "You must have an address"
        })
    }

    geocode(req.query.address , (error, {lat, lng, location} = {})=> {
        if(error) {
            return res.send({ error })
        }

        forecast(lat, lng, (error, forecastData) => {
                if(error) {
                    return res.send({ error })
                }

                res.send({
                        location,
                        weather: forecastData,
                        address: req.query.address
                    })
                
            })
        
    })

})


app.get("/about", (req, res) => {
    res.render("about", {
        title: "About",
        name: "Alp Cehri",
        message: "dude"
    })
})

app.get("/products", (req, res) => {
    if(!req.query.search){
        return res.send({
            error: "You must provide a search term"
        })
    }

    console.log(req.query);
    res.send({
        products: []
    
    })
})

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "error page",
        message: "couldn finde the site in help",
        name: "Alp Cehri"
    })
})

//404 error
app.get("*", (req, res) => {
    res.render("404", {
        title: "error page",
        message: "couldn finde the site",
        name: "alp"
    })
})

app.listen(port, () => {
    console.log("Server is up on " + port) 
})