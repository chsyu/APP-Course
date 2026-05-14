import axios from 'axios';

const CWB_FORECAST_URL =
  'https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001';

export async function fetchTaipeiWxSnapshot() {
  const key = process.env.EXPO_PUBLIC_CWB_API_KEY;
  if (!key) {
    console.warn('[cwb] EXPO_PUBLIC_CWB_API_KEY is missing');
    return null;
  }

  const url = `${CWB_FORECAST_URL}?Authorization=${encodeURIComponent(key)}&locationName=${encodeURIComponent('臺北市')}`;

  try {
    const { data: json } = await axios.get(url);
    const loc = json?.records?.location?.[0];
    const elements = loc?.weatherElement;
    if (!Array.isArray(elements)) return null;

    const wx = elements.find((el) => el?.elementName === 'Wx');
    const minT = elements.find((el) => el?.elementName === 'MinT');
    const wxSlot = wx?.time?.[0];
    const minTSlot = minT?.time?.[0];
    if (!wxSlot || !minTSlot) return null;

    const condition = wxSlot.parameter?.parameterName;
    const value = minTSlot.parameter?.parameterName;

    return {
      condition,
      value,
    };
  } catch (e) {
    if (axios.isAxiosError(e) && e.response) {
      console.warn(
        '[cwb] HTTP',
        e.response.status,
        e.response.statusText ?? ''
      );
    } else {
      console.warn('[cwb] fetch failed', e);
    }
    return null;
  }
}
