const request = require('request');

let weatherFunction = (latitude, longitude, address, weatherResultFunction) => {
    request({url: `https://api.darksky.net/forecast/YOUR_API_KEY_HERE/${latitude},${longitude}`, json: true}, 
    (error, response, body) => {
        let stringifyBody = JSON.stringify(body, undefined, 2);
        if(error) {
            weatherResultFunction('You could not connect to darksky.net servers');
        }
        else if(stringifyBody.code === 400) {
            weatherResultFunction('This location does not exist in darksky.net api');
        }
        else{
            weatherResultFunction(0, {
                address: address,
                latitude: latitude,
                longitude: longitude,
                temperature: (body.currently.temperature-32)/1.8,
                apparentTemperature: (body.currently.apparentTemperature-32)/1.8
              });
        }
    }
    );
};


module.exports.weatherFunction = weatherFunction