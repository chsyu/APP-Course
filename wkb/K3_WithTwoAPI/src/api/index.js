import axios from "axios";
import { WEATHER_API_KEY } from '@env';

export const getUbikeInfo = async () => {
  const { data } = await axios.get(
    "https://data.ntpc.gov.tw/api/datasets/71CD1490-A2DF-4198-BEF1-318479775E8A/json/preview"
  );
  return data;
};

export const getWeatherInfo = async () => {
  const { data } = await axios.get(
    `https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-D0047-061?Authorization=${WEATHER_API_KEY}&limit=10&format=JSON&elementName=T,WeatherDescription`
  );
  return {location: data.records.locations[0].location[0].locationName,
    time: data.records.locations[0].location[0].weatherElement[1].time[0].startTime,  
          weatherElement: data.records.locations[0].location[0].weatherElement[1].time[0].elementValue[0].value};
}
