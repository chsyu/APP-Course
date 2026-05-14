import axios from 'axios';

const OPEN_WEATHER_URL =
  'https://api.openweathermap.org/data/2.5/weather';

export async function fetchOpenWeatherByCoordinates(latitude, longitude) {
  const key = process.env.EXPO_PUBLIC_OPEN_WEATHER_API_KEY;
  if (!key) {
    console.warn('[openweather] EXPO_PUBLIC_OPEN_WEATHER_API_KEY is missing');
    return null;
  }

  try {
    const { data, status } = await axios.get(OPEN_WEATHER_URL, {
      params: {
        lat: String(latitude),
        lon: String(longitude),
        units: 'metric',
        lang: 'zh_tw',
        appid: key,
      },
      validateStatus: () => true,
    });

    if (!data || status < 200 || status >= 300) {
      console.warn('[openweather] HTTP', status);
      return null;
    }

    const description = data?.weather?.[0]?.description;
    const feelsLike = data?.main?.feels_like;

    return {
      condition: description,
      value: String(Math.round(feelsLike * 10) / 10),
    };
  } catch (e) {
    console.warn('[openweather] request failed', e);
    return null;
  }
}
