const { nextISSTimesForMyLocation } = require('./iss_promised');
const { printPassTimes } = require('./pass_times_print');

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });