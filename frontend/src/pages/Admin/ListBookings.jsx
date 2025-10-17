import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import Title from "../../components/admin/Title";
import axiosInstance from "../../utils/axiosIntence";
import { dateFormat } from "../../utils/helper";
import { API_PATHS } from "../../utils/apiPaths";

const ListBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const getAllBookings = async () => {
    const { data } = await axiosInstance.get(API_PATHS.ADMIN.GET_ALL_BOOKINGS);
    if (data.success) {
      setBookings(data.allBookings);
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllBookings();
  }, []);
  return !loading ? (
    <>
      <Title text1="List" text2="Bookings" />
      <div className=" mt-6 overflow-x-auto">
        <table className="w-full border-collapse rounded-md overflow-hidden text-nowrap">
          <thead>
            <tr className="bg-primary/20 text-left text-white">
              <th className="p-2 font-medium pl-5">Email</th>
              <th className="p-2 font-medium">Movie Name</th>
              <th className="p-2 font-medium">Show Time</th>
              <th className="p-2 font-medium">Total Price</th>
              <th className="p-2 font-medium">Payment Time</th>
              <th className="p-2 font-medium"></th>
            </tr>
          </thead>
          <tbody className="text-sm font-light">
            {bookings.map((item, index) => (
              <tr
                key={index}
                className="border-b border-primary/20 bg-primary/5 even:bg-primary/10"
              >
                <td className="p-2 min-w-45 pl-5">{item.email}</td>
                <td className="p-2">{item.movie_title}</td>
                <td className="p-2">{item.show_date}</td>
                {/* <td className="p-2">
                  {Object.keys(show.bookingSeats)
                    .map((seat) => item.bookingSeats[seat])
                    .join(", ")}
                </td> */}
                <td className="p-2">{item.total_price}</td>
                <td className="p-2">{dateFormat(item.payment_time)}</td>
                <td className="p-2">
                  <button className="cursor-pointer px-2 py-1 bg-primary-dull rounded-md hover:bg-primary">
                    Details
                  </button>
                </td>
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

export default ListBookings;
