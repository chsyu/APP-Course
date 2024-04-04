import axios from "axios";

export const getUbikeInfo = async () => {
  const { data } = await axios.get(
    "https://data.ntpc.gov.tw/api/datasets/71CD1490-A2DF-4198-BEF1-318479775E8A/json/preview"
  );
  return data;
};

export const getAdrsFromLatLng = async (lat, lng) => {
  const { data } = await axios.get(
    `https://geopy-server.vercel.app/lat_lng_to_city_timezone/?lat=${lat}&lng=${lng}`
  );
  return data;
}