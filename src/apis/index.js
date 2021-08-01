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
	VIETNAM_VACCINE,
	WORLD_VACCINE,
} from "../constaints/sources";
import { axiosConfig } from "./config";

export const getGlobalReport = () => axios.get(GLOBAL_REPORT);

export const getCountryData = (country) =>
	axios.get(`${COUNTRY_DATA}${country}`);

export const getCountryHistoricalData = (country) =>
	axios.get(HISTORICAL_DATA + `${country}`, axiosConfig);

export const getAllCountriesData = () => axios.get(COUNTRIES_DATA, axiosConfig);

export const getVietNamCases = () => axios.get(VIETNAM_CASES);

export const getProvincesData = () => axios.get(PROVINCES_CASES);

export const getHCMCases = () => axios.get(HCM_CASES);

export const getVietNamVaccine = () => axios.get(VIETNAM_VACCINE);

export const getNews = () => axios.get(VNEXPRESS_NEWS);

export const getWorldVaccine = () => axios.get(WORLD_VACCINE);
