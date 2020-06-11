console.log("Client side application is running.");

const form = document.querySelector("form");
const input = document.querySelector("input");

const message = document.querySelector("#message");
const place = document.querySelector("#location");

message.textContent = "";
place.textContent = "";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const address = input.value;
  fetchWeatherForecastInformation(address);
});

function fetchWeatherForecastInformation(address) {
  message.textContent = "loading...";
  place.textContent = "";
  fetch("/weather?address=" + address).then((response) => {
    response
      .json()
      .then(
        ({
          error,
          feels_like,
          place_name,
          temperature,
          weather_description,
        } = {}) => {
          if (error) {
            message.textContent = `${error}`;
            place.textContent = "";
          } else {
            place.innerHTML = `<b>${place_name}</b>`;
            message.innerHTML = `${weather_description[0]}. The temperature is <b>${temperature}&deg</b> out. But It feels like <b>${feels_like}&deg</b>.`;
          }
        }
      );
  });
}
