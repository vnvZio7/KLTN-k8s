import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import Title from "../../components/admin/Title";
import { dateFormat, formatNumber } from "../../utils/helper";
import axiosInstance from "../../utils/axiosIntence";
import { API_PATHS } from "../../utils/apiPaths";

const ListShows = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const getAllShows = async () => {
    try {
      const { data } = await axiosInstance.get(API_PATHS.ADMIN.GET_ALL_SHOWS);
      if (data.success) {
        setShows(data.allShows);
        setLoading(false);
        console.log(data.allShows);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getAllShows();
  }, []);
  return !loading ? (
    <>
      <Title text1="List" text2="Shows" />
      <div className="max-w-5xl mt-6 overflow-x-auto">
        <table className="w-full border-collapse rounded-md overflow-hidden text-nowrap">
          <thead>
            <tr className="bg-primary/20 text-left text-white">
              <th className="p-2 font-medium pl-5">Movie Name</th>
              <th className="p-2 font-medium">Cinema</th>
              <th className="p-2 font-medium">Show Time</th>
              <th className="p-2 font-medium">Total Bookings</th>
              <th className="p-2 font-medium">Earnings</th>
            </tr>
          </thead>
          <tbody className="text-sm font-light">
            {shows.map((show, index) => (
              <tr
                key={index}
                className="border-b border-primary/10 bg-primary/5 even:bg-primary/10"
              >
                <td className="p-2 min-w-45 pl-5">{show.movie}</td>
                <td className="p-2 ">{show.cinema}</td>
                <td className="p-2">{show.showtime}</td>
                <td className="p-2">{show.booking}</td>
                <td className="p-2">{formatNumber(show.total_price)} vnd</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default ListShows;
