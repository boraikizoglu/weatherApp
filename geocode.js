const request = require('request');


let geoCodeAdress = (locationName, resultFunction) => {

    request({url: `https://maps.googleapis.com/maps/api/geocode/json?address=${locationName}&key=YOUR_API_KEY_HERE`, json: true}, 
    (error, response, body) => {
        let bodyStringify = JSON.stringify(body, undefined, 2);
        if(error) {
            resultFunction('You could not connect to google servers.', 0);
        }
        else if(body.status === 'ZERO_RESULTS') {
            resultFunction('There is no such an adress.', 0);
        }
        else if(body.status === 'OK'){
            resultFunction(0,{
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            });
        }
    }
    );

};

module.exports.geoCodeAdress = geoCodeAdress;

