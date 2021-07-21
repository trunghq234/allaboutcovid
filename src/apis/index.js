import axios from "axios";

export const getGlobalReport = () =>
	axios.get("https://disease.sh/v3/covid-19/all");

export const getCountryData = (country) =>
	axios.get(`https://disease.sh/v3/covid-19/countries/${country}`);

export const getCountryHistoricalData = (country) =>
	axios.get(`https://api.covid19api.com/dayone/country/${country}`);

export const getAllCountriesData = () =>
	axios.get("https://disease.sh/v3/covid-19/countries?sort=cases");
