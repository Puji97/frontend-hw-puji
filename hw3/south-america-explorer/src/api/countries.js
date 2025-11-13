import axios from "axios";

const client = axios.create({
  baseURL: "https://restcountries.com/v3.1",
  timeout: 10000,
});
export const getSouthAmerica = async () => {
  const res = await client.get(
    "/region/south america?fields=name,flags,population,capital,area,cca2"
  );
  return res.data;
};
