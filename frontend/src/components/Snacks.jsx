import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
import axiosInstance from "../utils/axiosIntence";
import toast from "react-hot-toast";
import { formatNumber } from "../utils/helper";
import { useUserContext } from "../context/userContext";
import { API_PATHS } from "../utils/apiPaths";

const Snacks = ({ num, selectedRoom, selectedSeats, onClose }) => {
  const [selectedSnacks, setSelectedSnacks] = useState([]);
  const [sumPrice, setSumPrice] = useState(num || 0);
  const { navigate, snacks } = useAppContext();
  const { user } = useUserContext();

  const handleSubmit = async () => {
    try {
      if (!user) return toast.error("Please login to proceed");
      const { data } = await axiosInstance.post(
        API_PATHS.BOOKINGS.CREATE_BOOKING,
        {
          showtime_id: selectedRoom.id,
          selectedSeats,
          selectedSnacks,
          total_price: sumPrice.toFixed(2),
        }
      );
      if (data.success) {
        navigate(`/payment?id=${data.booking_id}&amount=${sumPrice}`);
        scrollTo(0, 0);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="text-black border rounded border-gray-500 md:m-3 w-[300px] md:w-[600px] md:p-5">
      <h2 className="text-2xl">Combo - Bắp nước</h2>
      <div className="h-[440px] overflow-y-scroll scroll-smooth ">
        {snacks.map((item) => (
          <div
            key={item.id}
            className={`flex p-3 gap-2 md:gap-4 bg-black/10 mt-1`}
          >
            <img className="w-15 h-15 md:w-30 md:h-30" src={item.image_url} />
            <div className="flex-1/4">
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm ">{item.description}</p>
            </div>
            <span className="">{formatNumber(item.price)} vnđ</span>
            <input
              onChange={(e) => {
                setSumPrice((prev) =>
                  e.target.checked ? prev + item.price : prev - item.price
                );
                setSelectedSnacks((prev) =>
                  e.target.checked
                    ? [...prev, item]
                    : prev.filter((snack) => snack !== item)
                );
              }}
              type="checkbox"
              className="accent-red-500 w-5 h-5 items-center cursor-pointer"
            />
          </div>
        ))}
      </div>
      <div className="flex justify-end gap-3 m-3 font-semibold">
        <span>Tạm tính: </span>
        <span>{formatNumber(sumPrice)} vnđ</span>
      </div>
      <div className="flex justify-around mt-3">
        <button
          onClick={onClose}
          className="font-medium bg-primary hover:bg-primary/80 hover:text-black cursor-pointer px-5 py-1.5 rounded-full text-white"
        >
          Đóng
        </button>
        <button
          onClick={handleSubmit}
          className="font-medium bg-primary hover:bg-primary/80 hover:text-black cursor-pointer px-5 py-1.5 rounded-full text-white"
        >
          Tiếp tục
        </button>
      </div>
    </div>
  );
};

export default Snacks;
