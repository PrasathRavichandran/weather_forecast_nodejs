const request = require("postman-request");

const WeatherStackApiKey = "f8e98d1211da5b00ae2dbdd0b2365b7a";

const forecast = (latitude, longitude, callback) => {
  request(
    {
      uri: `http://api.weatherstack.com/current?access_key=${WeatherStackApiKey}&query=${latitude},${longitude}`,
      json: true,
    },
    (error, response, body) => {
      if (error) {
        callback("Unable to connect to weather service!", undefined);
      } else if (body.error) {
        callback("Unable to find location", undefined);
      } else {
        callback(undefined, {
          weather_description: body.current.weather_descriptions,
          temperature: body.current.temperature,
          feels_like: body.current.feelslike,
        });
      }
    }
  );
};

module.exports = forecast;
