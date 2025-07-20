import React from 'react'
import styles from '../../style/farmer/Weather.module.css'
import WeatherTip from '../../components/former/WeatherTips';

function Weather() {
  const currentWeather = {
    location: 'Dodoma, Tanzania',
    temperature: 28,
    condition: 'Windy',
    humidity: 45,
    windSpeed: 12,
  };

  const hourlyForecast = [
    { hour: '08:00', temp: 24, condition: 'Sunny' },
    { hour: '10:00', temp: 26, condition: 'Partly Cloudy' },
    { hour: '12:00', temp: 28, condition: 'Sunny' },
    { hour: '14:00', temp: 29, condition: 'Cloudy' },
    { hour: '16:00', temp: 27, condition: 'Rainy' },
  ];

  const weeklyForecast = [
    { day: 'Jumatatu', high: 29, low: 20, condition: 'Sunny' },
    { day: 'Jumanne', high: 28, low: 19, condition: 'Cloudy' },
    { day: 'Jumatano', high: 27, low: 18, condition: 'Rainy' },
    { day: 'Alhamisi', high: 30, low: 21, condition: 'Sunny' },
    { day: 'Ijumaa', high: 26, low: 17, condition: 'Stormy' },
  ];

  // Tips map based on weather condition
  const weatherTipsMap = {
    Sunny: 'Panda mazao yanayostahimili joto kali kama mihogo na dengu.',
    Rainy: 'Epuka mbolea ya maji; panda mpunga au mchicha kwa mazingira yenye mvua.',
    Stormy: 'Hakikisha mimea ina kinga dhidi ya upepo na mvua kubwa.',
    Windy: 'Punguza kumwagilia sana na linda mimea dhidi ya upepo.',
  };

  const currentTip = weatherTipsMap[currentWeather.condition] || 'Fuatilia hali ya hewa mara kwa mara kwa ushauri zaidi.';

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Hali ya Hewa</h2>

      <div className={styles.currentWeather}>
        <h3>{currentWeather.location}</h3>
        <p className={styles.temp}>{currentWeather.temperature}°C - {currentWeather.condition}</p>
        <p>Unyevu: {currentWeather.humidity}%</p>
        <p>Kasi ya upepo: {currentWeather.windSpeed} km/h</p>
      </div>

      <WeatherTip weather={currentWeather.condition} tip={currentTip} />

      <div className={styles.section}>
        <h4>Tabiri ya Masaa</h4>
        <div className={styles.hourlyList}>
          {hourlyForecast.map((item, index) => (
            <div key={index} className={styles.hourCard}>
              <p>{item.hour}</p>
              <p>{item.temp}°C</p>
              <p>{item.condition}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h4>Tabiri ya Wiki</h4>
        <div className={styles.weeklyList}>
          {weeklyForecast.map((item, index) => (
            <div key={index} className={styles.dayCard}>
              <p>{item.day}</p>
              <p>{item.high}° / {item.low}°</p>
              <p>{item.condition}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Weather