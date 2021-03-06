import React from "react";

// Helper function
// const findAverage = (arr, oneLevelDeep, twoLevelsDeep) => {
//   const sum = arr.reduce((a, b) => a + b, 0);
//   return sum / arr.length;
// }


const findWeatherAverage = (measurementType, weatherArr) => {
  const sum = weatherArr.reduce((sum, item) => {
    return sum + item[measurementType];
  }, 0);
  const result = sum / weatherArr.length;
  // leave 2 decimal places in.
  // maybe use toFixed() ?
  return Math.round(result * 100) / 100
}

const findMax = (measurementType, weatherArr) => {
  const values = weatherArr.map(item => item[measurementType])
  return Math.max(...values)
}

const findMin = (measurementType, weatherArr) => {
  const values = weatherArr.map(item => item[measurementType])
  return Math.min(...values)
}

const convertFtoC = (f) => {
  return Math.ceil((5 / 9) * (f - 32));
}

// also works for: convert Miles Per Hour to Kilometers Per Hour

const convertMilesToKilometers = (milesPerHourNumber) => {
  const result = milesPerHourNumber * 1.609344;
  // leave 2 decimal places in. (?)
  return Math.round(result * 100) / 100;
}

// needed for pressure calculations
const convertMillibarsToKPa = (milibarNum) => {
  const result = milibarNum / 10;
  // leave 2 decimal places in. (?)
  return Math.round(result * 100) / 100
}


const formatAsPercentage = (num) => {

}

const SidebarOverview = (props) => {
  const {
    weatherData,
  } = props;

  // console.log("SIDEBAR OVERVIEW RECEIVED WEATHER DATA");
  // console.log(weatherData);

  if (!weatherData || weatherData.length === 0) {
    return <p>Loading weather...</p>;
  }

  // calculate weather values here (AVERAGES)
  // map weather array with all info to array with just 'currently' objects info
  const currentWeather = weatherData.map(weatherItem => {
    return weatherItem.currently;
  });

  return (
    <div className="SidebarOverview">
      <h2>Weather Summary</h2>
      
      <div className='weather-record'>
        <p>
          <span>Avg Temperature : </span>
          {`${convertFtoC(findWeatherAverage('temperature', currentWeather))} °C`}
        </p>
      </div>
      <div className='weather-record'>
        <p>
          <span>Feels Like: </span>
          {`${convertFtoC(findWeatherAverage('apparentTemperature', currentWeather))} °C`}
        </p>
      </div>
      <div className='weather-record'>
        <p>
          <span>Lowest temperature: </span>
          {`${convertFtoC(findMin('temperature', currentWeather))} °C`}
        </p>
      </div>
      <div className='weather-record'>
        <p>
          <span>Highest Temperature: </span>
          {`${convertFtoC(findMax('temperature', currentWeather))} °C`}
        </p>
      </div>
      
      <div className='weather-record'>
        <p>
          <span>Wind Speed Avg: </span>
          {/* check what units are these? m/s? */}
          {`${convertMilesToKilometers(findWeatherAverage('windSpeed', currentWeather))} km/h`}
        </p>
      </div>
      <div className='weather-record'>
        <p>
          <span>Visibility: </span>
          {`${convertMilesToKilometers(findWeatherAverage('visibility', currentWeather))} km` }
        </p>
      </div>
      <div className='weather-record'>
        <p>
          <span>Avg Humidity: </span>
          {`${findWeatherAverage('humidity', currentWeather)*100}%`}
        </p>
      </div>
      <div className='weather-record'>
        <p>
          <span>Avg Pressure: </span>
          {`${convertMillibarsToKPa(findWeatherAverage('pressure', currentWeather))} kPa`}
        </p>
      </div>

      <div className='weather-record'>
        <p>
          {/* is this in percentage? */}
          <span>Precip Probability Avg: </span>
          {`${findWeatherAverage('precipProbability', currentWeather)*100}%`}
        </p>
      </div>
      {/* precip intensity -> in inches of liquid water per hour */}
      {/* <div className='weather-record'>
        <p>
          <span>Precip Intensity Avg: </span>
          {`${findWeatherAverage('precipIntensity', currentWeather) * 100}%`}
        </p>
      </div> */}
      
      <div className='weather-record'>
        <p>
          <span>UV Index: </span>
          {findWeatherAverage('uvIndex', currentWeather)}
        </p>
      </div>
      
      <div className="weather-record">
        <p className="weather-special-title">Weather summary by point:</p>
        {
          currentWeather.map((item, i) => {
            return (
              <p key={item.time}>
                <span>Point {i + 1}: </span>
                {item.summary}
              </p>
            )
          })
        }
      </div>
    </div>
  )
}

export default SidebarOverview;