import axios from "axios";
import {
	HCM_CASES,
	PROVINCES_CASES,
	VIETNAM_CASES,
	VNEXPRESS_NEWS,
	GLOBAL_REPORT,
	COUNTRY_DATA,
	HISTORICAL_DATA,
	COUNTRIES_DATA,
} from "../constaints/sources";

export const getGlobalReport = () => axios.get(GLOBAL_REPORT);

export const getCountryData = (country) =>
	axios.get(`${COUNTRY_DATA}${country}`);

export const getCountryHistoricalData = (country) =>
	axios.get(`${HISTORICAL_DATA}${country}`);

export const getAllCountriesData = () => axios.get(COUNTRIES_DATA);

export const getVietNamCases = () => axios.get(VIETNAM_CASES);

export const getProvincesData = () => axios.get(PROVINCES_CASES);

export const getHCMCases = () => axios.get(HCM_CASES);

export const getNews = () => axios.get(VNEXPRESS_NEWS);
