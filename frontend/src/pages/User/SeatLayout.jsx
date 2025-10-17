import React, { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import Loading from "../../components/Loading";
import { ArrowRightIcon, ClockIcon, Square } from "lucide-react";
import BlurCircle from "../../components/BlurCircle";
import { assets } from "../../assets/assets";
import { useState } from "react";
import axiosInstance from "../../utils/axiosIntence";
import { API_PATHS } from "../../utils/apiPaths";
import Popup from "../../components/Popup";
import Snacks from "../../components/Snacks";
import { formatNumber } from "../../utils/helper";

const SeatLayout = ({ rooms, setSelectedRoom, selectedRoom }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const { shows, image_base_url } = useAppContext();

  const [show, setShow] = useState(null);
  const [isPopup, setIsPopup] = useState(false);

  const [seat_map, setSeatMap] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [seatType, setSeatType] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const getSeats = async () => {
    const { data } = await axiosInstance.get(
      API_PATHS.BOOKINGS.GET_BOOKED_SEATS(selectedRoom.id)
    );
    if (data.success) {
      setBookedSeats(data.bookedSeats);
    }
  };

  const getTypeSeat = (seat) => {
    return seat === "vip"
      ? { seat: "bg-yellow-500", price: selectedRoom.price * 1.2 }
      : seat === "couple"
      ? { seat: "bg-pink-400", price: selectedRoom.price * 1.3 }
      : { seat: "bg-green-500", price: selectedRoom.price };
  };

  const getDataSeats = async () => {
    const { data } = await axiosInstance.get(
      API_PATHS.ROOMS.GET_SEAT_MAP_BY_ID(selectedRoom.room_id)
    );
    setSeatMap(data);
    setSeatType([...new Set(data.map((item) => item.seat_type))]);
  };

  const seats = [];
  seat_map.map((data) => {
    if (!seats[data.x]) {
      seats[data.x] = [];
    }
    seats[data.x].push(data);
  });

  const handleSelect = (seat) => {
    if (selectedSeats.includes(seat.seat_code)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat.seat_code));
      setTotalPrice(totalPrice - getTypeSeat(seat.seat_type).price);
    } else {
      setSelectedSeats([...selectedSeats, seat.seat_code]);
      setTotalPrice(totalPrice + getTypeSeat(seat.seat_type).price);
    }
  };

  useEffect(() => {
    getDataSeats();
    setSelectedSeats([]);
    setTotalPrice(0);
    getSeats();
  }, [selectedRoom]);
  return !show ? (
    <div className="flex flex-col md:flex-row  py-10">
      {/* Available Timings */}
      <div>
        <div className="w-60 bg-primary/10 border border-primary/20 rounded-lg py-10 h-max  md:top-30 ">
          <p className="text-lg font-semibold px-6 pb-3">Khung giờ hiện có</p>
          <div>
            {rooms.map((room) => (
              <button
                key={room.id}
                onClick={() => setSelectedRoom(room)}
                className={`flex items-center gap-4 px-6 py-2 w-max rounded-r-md cursor-pointer transition  ${
                  selectedRoom === room
                    ? "bg-primary text-white"
                    : " border-primary/70"
                }`}
              >
                <ClockIcon className="w-4 h-4" />
                <p className="text-sm font-medium">
                  {room.start_time.slice(0, 5)}
                </p>
              </button>
            ))}
          </div>
        </div>
        <div className="w-60 bg-primary/10 border border-primary/20 rounded-lg py-5 h-max  md:top-30 mt-3">
          <p className="text-lg font-semibold px-6">Loại ghế - Giá</p>
          <div>
            {seatType.map((item) => (
              <button
                key={item}
                className={`flex items-center gap-4 px-6 py-2 w-max rounded-r-md cursor-pointer transition  
                            border-primary/70`}
              >
                <Square className={`w-4 h-4 ${getTypeSeat(item).seat} `} />
                <span className="text-sm">
                  {item} - {formatNumber(getTypeSeat(item).price)} vnđ
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="relative flex-1 flex flex-col items-center ">
        {/* Seats Layout */}
        <BlurCircle top="-100px" left="-100px" />
        <BlurCircle bottom="0" right="0" />
        <h1>Chọn chỗ ngồi của bạn</h1>
        <img src={assets.screenImage} alt="screen" />
        <p className="text-gray-400 text-sm mb-6">MÀN HÌNH</p>
        <div>
          {seats.map((seat_data, index) => {
            let tmp = 0;
            return (
              <div
                key={index}
                className="transform scale-60 sm:scale-80 md:scale-90 lg:scale-100 relative flex flex-rows items-center text-xs text-gray-300"
              >
                {seat_data.map((seat) => {
                  const isSelected = selectedSeats.includes(seat.seat_code);
                  const temp = seat.y - tmp;
                  if (seat.seat_type === "couple") {
                    tmp = seat.y + 2;
                  } else {
                    tmp = seat.y + 1;
                  }
                  return (
                    <React.Fragment key={seat._id}>
                      {Array.from({ length: temp * 2 }).map((_, index) => (
                        <div
                          key={index}
                          className="w-[12px] md:w-[25px] h-[30px] md:h-[50px]"
                        ></div>
                      ))}
                      <div
                        key={seat.seat_code}
                        className={`relative w-[30px] md:w-[50px] h-[30px] md:h-[50px] ${
                          seat.seat_type === "couple"
                            ? "mr-[30px] md:mr-[50px]"
                            : ""
                        }`}
                      >
                        <button
                          disabled={bookedSeats.includes(seat.seat_code)}
                          key={seat.seat_code}
                          onClick={() => handleSelect(seat)}
                          className={`absolute flex items-center justify-center rounded cursor-pointer text-white text-xs md:text-sm disabled:bg-gray-400 disabled:cursor-not-allowed h-[25px] md:h-[40px] ${
                            getTypeSeat(seat.seat_type).seat
                          } ${
                            seat.seat_type === "couple"
                              ? "w-[50px] md:w-[90px]"
                              : "w-[25px] md:w-[40px]"
                          } ${isSelected ? "!bg-red-500" : ""}`}
                        >
                          {seat.seat_code}
                        </button>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            );
          })}
        </div>
        <button
          onClick={() => setIsPopup(true)}
          className="flex items-center gap-1 mt-20 px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer active:scale-95"
        >
          Thanh toán:{" "}
          {Number.isInteger(totalPrice)
            ? totalPrice.toString()
            : totalPrice.toFixed(2)}{" "}
          vnđ
          <ArrowRightIcon strokeWidth={3} className="w-4 h-4" />
        </button>
        <Popup isOpen={isPopup} onClose={() => setIsPopup(false)}>
          <Snacks
            num={totalPrice}
            selectedRoom={selectedRoom}
            selectedSeats={selectedSeats}
            onClose={() => setIsPopup(false)}
          />
        </Popup>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default SeatLayout;
