const request = require('request');

const fetchMyIP = function(callback) {
  let errorValue = null;
  let ipValue = null;

  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      errorValue = "❌ Invalid URL"; // If the URL doesn't work, prints a message to console.
    } else if (response.statusCode !== 200) {
      errorValue = `❌ Check your URL. Error code: ${response.statusCode}`; // if the URL only partially works, prints an error code
    } else {
      const data = JSON.parse(body);
      ipValue = data.ip;
    }
    callback(errorValue, ipValue);
  });
};

module.exports = { fetchMyIP };