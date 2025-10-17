import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosIntence";
import { API_PATHS } from "../../utils/apiPaths";

const ManageCinemas = () => {
  const [allCinemas, setAllCinemas] = useState([]);
  const getAllCinemas = async () => {
    try {
      axios;
      const response = await axiosInstance.get(
        API_PATHS.CINEMAS.GET_ALL_CINEMAS
      );
      if (response.data?.length > 0) {
        setAllCinemas(response.data);
      }
    } catch (error) {
      console.error("Error fetching cinemas", error);
    }
  };
  useEffect(() => {
    getAllCinemas();
    return () => {};
  }, []);
  return (
    <>
      {allCinemas?.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </>
  );
};

export default ManageCinemas;
