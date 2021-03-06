const request = require("postman-request");

const MapBoxApiKey = "/* your api key */";
const MapBoxLimit = 1;

const geocode = (address, callback) => {
  request(
    {
      uri: `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${MapBoxApiKey}&limit=${MapBoxLimit}`,
      json: true,
    },
    (error, response, body) => {
      if (error) {
        callback("Unable to connect to the mapbox service!", undefined);
      } else if (response.body.features.length === 0) {
        callback("Unable to find location. Try another search!", undefined);
      } else {
        callback(undefined, {
          place_name: body.features[0].place_name,
          latitude: body.features[0].center[1],
          longitude: body.features[0].center[0],
        });
      }
    }
  );
};

module.exports = geocode;
