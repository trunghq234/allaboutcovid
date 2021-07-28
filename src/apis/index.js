import axios from "axios";
import { PROVINCES_CASES, VIETNAM_CASES } from "../constaints/sources";

export const getGlobalReport = () =>
	axios.get("https://disease.sh/v3/covid-19/all");

export const getCountryData = (country) =>
	axios.get(`https://disease.sh/v3/covid-19/countries/${country}`);

export const getCountryHistoricalData = (country) =>
	axios.get(`https://api.covid19api.com/dayone/country/${country}`);

export const getAllCountriesData = () =>
	axios.get("https://disease.sh/v3/covid-19/countries?sort=cases");

export const getVietNamCases = () => axios.get(VIETNAM_CASES);

export const getProvincesData = () => axios.get(PROVINCES_CASES);
