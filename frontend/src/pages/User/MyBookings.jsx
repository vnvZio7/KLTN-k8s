import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import BlurCircle from "../../components/BlurCircle";
import axiosInstance from "../../utils/axiosIntence";
import { formatNumber, timeFormat } from "../../utils/helper";
import { useAppContext } from "../../context/appContext";
import { Link } from "react-router-dom";
import { ArrowRightIcon, ChevronRightIcon } from "lucide-react";
import { API_PATHS } from "../../utils/apiPaths";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { image_base_url, navigate } = useAppContext();
  const getMyBookings = async () => {
    const { data } = await axiosInstance.get(
      API_PATHS.BOOKINGS.GET_ALL_BOOKINGS
    );
    if (data.success) {
      setBookings(data.bookings);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMyBookings();
  }, []);
  return !isLoading ? (
    <div className="relative px-6 md:px-16 lg:px-70 pt-30 md:pt-40 min-h-[80vh]">
      <BlurCircle top="100px" left="100px" />
      <div>
        <BlurCircle top="0px" left="600px" />
      </div>
      <h1 className="text-lg font-semibold mb-4">Vé của tôi</h1>
      {bookings.length > 0 ? (
        bookings.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row justify-between bg-primary/8 border border-primary/20 rounded-lg mt-4 p-2 max-w-3xl"
          >
            <div className="flex flex-col md:flex-row">
              <img
                src={image_base_url + item.movie.backdrop_path}
                className="md:max-w-45 aspect-video h-auto object-cover object-bottom rounded"
              />
              <div className="flex flex-col p-4">
                <p className="text-lg font-semibold">{item.movie.title}</p>
                <p className="text-gray-400 text-sm">
                  {timeFormat(item.movie.runtime)}
                </p>
                <p className="text-gray-400 text-sm mt-auto">
                  {item.showtime.show_date}
                </p>
              </div>
            </div>
            <div className="flex flex-col md:items-end md:text-right justify-between p-4">
              <div className="flex items-center gap-4">
                <p className="text-xl font-semibold mb-3">
                  {formatNumber(item.total_price)} vnd
                </p>
                {item.status === "Pending" && (
                  <button
                    onClick={() => {
                      navigate(
                        `/payment?id=${item._id}&amount=${item.total_price}`
                      );
                      scrollTo(0, 0);
                    }}
                    className="bg-primary px-4 py-1.5 mb-3 text-sm rounded-full font-medium cursor-pointer"
                  >
                    Thanh toan
                  </button>
                )}
              </div>
              <div className="text-sm">
                <p>
                  <span className="text-gray-400">
                    Tổng số vé: {item.booking_seats.length}
                  </span>
                </p>
                <p>
                  <span className="text-gray-400">
                    Số ghế: {item.booking_seats.join(" ,")}
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>
          Bạn chưa mua vé nào.
          <br />
          <Link
            to={"/movies"}
            className="bg-primary mt-1 px-3 py-1 inline-flex items-center rounded-full font-semibold"
          >
            Đặt vé ngay <ArrowRightIcon className="w-5 h-5" />
          </Link>
        </p>
      )}
    </div>
  ) : (
    <Loading />
  );
};

export default MyBookings;
