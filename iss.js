const request = require('request');

// const fetchMyIP = function(callback) {
//   request('https://api.ipify.org?format=json', (error, response, body) => {
//     if (error) {
//       callback(error, null);
//       return;
//     }
//
//     if (response.statusCode !== 200) { // if non-200 status, assume server error
//       const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
//       callback(Error(msg), null);
//       return;
//     }
//     const data = JSON.parse(body).ip;
    
//     callback(null, data);
//   });
// };

const fetchCoordsByIP = function(ip, callback) {
  request('http://ipwho.is/' + ip, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (JSON.parse(body).success === false) { // checks for failure message and if found sends a message as to what happened
      callback(JSON.parse(body).message, null);
      return;
    }

    const data = {};
    data.latitude = JSON.parse(body).latitude.toString();
    data.longitude = JSON.parse(body).longitude.toString();
    
    callback(null, data);
  });
};

module.exports = {
  //fetchMyIP,
  //fetchCoordsByIP
};