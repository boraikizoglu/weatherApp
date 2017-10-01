const geocode = require('./geocode.js'); 
const weather = require('./weather.js');
const yargs = require('yargs')
/*
Axios library is a better and easier option for this application
but I wanted to code promises on my own
*/

const argv = yargs.options({
    a: {
        demand: true,
        alias: 'adress',
        describe: 'adress to fetch',
        string: true
    }
})
.help()
.alias('help', 'h')
.argv;

const sendDate = (new Date()).getTime();
geocode.geoCodeAdress(argv.adress, 

    (errorMessage, results) => {
        if(errorMessage) {
            console.log(errorMessage);
        }
        else {
            weather.weatherFunction(results.latitude, results.longitude,results.address, (weatherErrorMessage, weatherResults) => {
                if(weatherErrorMessage) {
                    console.log(weatherErrorMessage);
                }
                else{
                    console.log(weatherResults)
                    console.log(`Total process time is --> ${(new Date()).getTime() - sendDate}ms`);
                }
            });
        }
    }

);
