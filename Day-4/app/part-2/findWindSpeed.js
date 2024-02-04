import config from "./config.json" assert { type: "json" };
export async function getWindSpeed(cityName, apiKey) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

  return fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        console.log(response);
        if (response.status === 401) {
          throw new Error(
            "Unauthorized. Please check and update your API key."
          );
        } else if (response.status === 400) {
          throw new Error("Bad Request. Please check your request parameters.");
        } else if (response.status === 404) {
          throw new Error("City not found. Please check the city name.");
        } else if (response.status >= 500 && response.status < 600) {
          throw new Error("Server error. Please try again later.");
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      }
      return response.json();
    })
    .then((data) => {
      if (data.cod === 200) {
        const windSpeed = data.wind.speed;
        return windSpeed;
      } else {
        throw new Error(`API error: ${data.message}`);
      }
    })
    .catch((error) => {
      throw new Error(
        error.message
      );
    });
}

const cityName = "London";
const apiKey = config.apiKey;

getWindSpeed(cityName, apiKey)
  .then((windSpeed) => {
    console.log(`Wind Speed in ${cityName}: ${windSpeed} m/s`);
  })
  .catch((error) => {
    console.error(error.message);
  });