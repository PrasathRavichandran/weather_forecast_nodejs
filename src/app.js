const path = require("path");
const express = require("express");
const chalk = require("chalk");
const hbs = require("hbs");

const app = express();

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

const port = process.env.PORT || 3000;

app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Home",
    name: "Prasath R",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Prasath R",
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({
      error: "you must provide a location",
    });
  }

  geocode(address, (geocodeError, { latitude, longitude, place_name } = {}) => {
    if (geocodeError) {
      return res.send({ error: geocodeError });
    }
    forecast(
      latitude,
      longitude,
      (
        forecastError,
        { weather_description, temperature, feels_like } = {}
      ) => {
        if (forecastError) {
          return res.send({ error: forecastError });
        }
        res.send({ weather_description, temperature, feels_like, place_name });
      }
    );
  });
});

app.get("/help", (req, res) => {
  res.render("help", { title: "Help", name: "Prasath R" });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Prasath R",
    errorMessage: "The article is not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Prasath R",
    errorMessage: "Page not found",
  });
});

app.listen(port, () => {
  console.log(chalk.green.inverse("Server is up on the port " + port));
});
