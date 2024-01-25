const request = require('request');

const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) { // if non-200 status, assume server error
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const data = JSON.parse(body).ip;
    
    callback(null, data);
  });
};

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

const fetchISSFlyOverTimes = function(coords, callback) {
  request(`https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) { // if non-200 status, assume server error
      const msg = `Status Code ${response.statusCode} when fetching ISS fly over times: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const data = JSON.parse(body).response;

    callback(null, data);
  });
};

const nextISSTimesForMyLocation = function(callback) { // function calls fetch functions one after the other to output fly over times
  fetchMyIP((error, ip) => {
    if (error) {
      callback(error, null);
      return;
    }
  
    fetchCoordsByIP(ip, (error, geoLocation) => {
      if (error) {
        callback(error, null);
        return;
      }
        
      fetchISSFlyOverTimes(geoLocation, (error, flyOverTimes) => {
        if (error) {
          callback(error, null);
          return;
        }
          
        callback(null, flyOverTimes);
      });
    });
  });
};

module.exports = {
  nextISSTimesForMyLocation
};