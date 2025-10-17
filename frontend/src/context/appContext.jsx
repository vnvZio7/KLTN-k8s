import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosIntence";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { API_PATHS } from "../utils/apiPaths";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [shows, setShows] = useState([]);
  const [types, setTypes] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [cinemas, setCinemas] = useState([]);
  const [snacks, setSnacks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [upComing, setUpComing] = useState([]);
  const image_base_url = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;
  const navigate = useNavigate();

  const fetchTypes = async () => {
    try {
      const { data } = await axiosInstance.get(API_PATHS.TYPES.GET_ALL_TYPES);
      if (data.success) {
        setTypes(data.types);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUpComing = async () => {
    try {
      const { data } = await axiosInstance.get(API_PATHS.MOVIES.GET_UPCOMING);
      if (data.success) {
        setUpComing(data.movies);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const fetchGenres = async () => {
    try {
      const { data } = await axiosInstance.get(API_PATHS.SHOWTIMES.GET_GENRES);
      if (data.success) {
        setGenres(data.genres);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const fetchSnacks = async () => {
    try {
      const { data } = await axiosInstance.get(API_PATHS.SNACKS.GET_ALL_SNACKS);
      if (data.success) {
        setSnacks(data.snacks);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const fetchProvinces = async () => {
    try {
      const { data } = await axiosInstance.get(
        API_PATHS.PROVINCES.GET_ALL_PROVINCES
      );
      if (data.success) {
        setProvinces(data.provinces);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const fetchCinemas = async () => {
    try {
      const { data } = await axiosInstance.get(
        API_PATHS.CINEMAS.GET_ALL_CINEMAS
      );
      if (data.success) {
        setCinemas(data.cinemas);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const fetchRooms = async () => {
    try {
      const { data } = await axiosInstance.get(API_PATHS.ROOMS.GET_ALL_ROOMS);
      if (data.success) {
        setRooms(data.rooms);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const fetchShows = async () => {
    try {
      const { data } = await axiosInstance.get(
        API_PATHS.SHOWTIMES.GET_ALL_SHOWTIMES
      );
      if (data.success) {
        setShows(data.shows);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchShows();
    fetchTypes();
    fetchProvinces();
    fetchCinemas();
    fetchRooms();
    fetchSnacks();
    fetchGenres();
    fetchUpComing();
  }, []);

  const value = {
    axiosInstance,
    shows,
    image_base_url,
    types,
    rooms,
    cinemas,
    provinces,
    snacks,
    navigate,
    genres,
    upComing,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
