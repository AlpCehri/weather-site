const request = require("request");

const forecast = (lat, lng, callback) => {
    const url = "https://api.darksky.net/forecast/444675ac6603d0e1efe3fc24636dc7c8/" + lat + "," + lng + "?units=si&lang=de";
    request({url, json: true}, (error, {body}) => {
        if(error){
                            callback("Unable to connect to service! Check your connection", undefined);
                    }else if(body.error){
                            callback(body.error + " " + body.code, undefined);
                    }else{
                            var degree = body.currently.temperature;
                            var rain = body.currently.precipProbability;
                            callback(undefined, "It is currently " + degree + " outside and there is a " + rain + "% chance of rain");
                    }
    })
}

module.exports = forecast;