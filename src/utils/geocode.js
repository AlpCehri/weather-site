const request = require("request");

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1IjoiZGVmYXUwbHQiLCJhIjoiY2p5NTFwYmRwMDJucDNsbGVreHk2OHZteCJ9.vhD1lEkv7NAXNfGpi9V1yA&limit=1";
    request({url, json: true}, (error, {body}) => {
            if(error){
                    callback("No connection!", undefined);
            }else if(body.message){
                    callback(response.body.message, undefined);
            }else if(body.features.length === 0){
                    callback("Unable to find location", undefined);
            }else{
                    callback(undefined, {
                            lat: body.features[0].center[1],
                            lng: body.features[0].center[0],
                            location: body.features[0].place_name
                    })
            }      
    });
}

module.exports = geocode;