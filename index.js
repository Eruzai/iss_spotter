const { nextISSTimesForMyLocation } = require('./iss');
const { printPassTimes } = require('./pass_times_print');

nextISSTimesForMyLocation((error, passTimes) => { // function returns ISS pass over times at my location
  if (error) {
    return console.log("It didn't work!", error);
  }
  
  printPassTimes(passTimes);
});