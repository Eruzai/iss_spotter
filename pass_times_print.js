const printPassTimes = function(passTimes) { // function makes the passTimes returned from nextISSTimeForMyLocation more human readable
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

module.exports = { printPassTimes };