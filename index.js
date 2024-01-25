const { nextISSTimesForMyLocation } = require('./iss');

const printPassTimes = function(passTimes) { // function makes the passTimes returned from nextISSTimeForMyLocation more human readable
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => { // function returns ISS pass over times at my location
  if (error) {
    return console.log("It didn't work!", error);
  }
  
  printPassTimes(passTimes);
});

module.exports = { printPassTimes };