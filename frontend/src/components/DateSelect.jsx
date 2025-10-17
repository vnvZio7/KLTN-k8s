import { useEffect, useState } from "react";
import BlurCircle from "./BlurCircle";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import axiosInstance from "../utils/axiosIntence";
import SeatLayout from "../pages/User/SeatLayout";
import { API_PATHS } from "../utils/apiPaths";

const DateSelect = ({ dateTime, show, id }) => {
  const [selected, setSelected] = useState(null);
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [cinemas, setCinemas] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [datas, setData] = useState([]);
  const fetchDataCinema = async () => {
    const { data } = await axiosInstance.get(
      API_PATHS.SHOWTIMES.GET_SHOWTIMES_BY_ID_AND_DATE(id, selected)
    );
    setCinemas(data.cinemasdata);
    setData(data);
    setSelectedCinema(data.cinemasdata[0] || null);
  };
  const fetchDataRooms = async () => {
    if (!datas.rooms || !selectedCinema?.id || !show) return;

    const tmp = datas.rooms.filter(
      (room) => room.cinema_id === selectedCinema.id
    );
    const roomIds = tmp.map((i) => i._id);

    const time =
      show?.filter(
        (item) => roomIds.includes(item.room_id) && item.show_date === selected
      ) || [];
    setRooms(time);
    setSelectedRoom(time[0]);
  };

  useEffect(() => {
    if (selected !== null) {
      fetchDataCinema();
    }
  }, [selected]);
  useEffect(() => {
    fetchDataRooms();
  }, [selectedCinema]);
  useEffect(() => {}, [selectedRoom]);

  return (
    <div id="dateSelect" className="pt-30">
      <div
        className={`flex flex-col ${
          selectedRoom
            ? "md:flex-col w-full"
            : "md:flex-row items-center justify-between"
        }   gap-10 relative  p-8 bg-primary/10 border border-primary/20 rounded-lg`}
      >
        <BlurCircle top="-100px" left="-100px" />
        <BlurCircle top="100px" right="0" />
        <div>
          <p className="text-lg font-semibold">Chọn ngày</p>
          <div className="flex items-center gap-6 text-sm mt-5">
            <ChevronLeftIcon width={28} />
            <span className="grid grid-cols-3 md:flex flex-wrap md:max-w-lg gap-4">
              {dateTime.map((date) => (
                <button
                  key={date}
                  onClick={() => setSelected(date)}
                  className={`flex flex-col items-center justify-center h-14 w-14 aspect-square rounded cursor-pointer  ${
                    selected === date
                      ? "bg-primary text-white"
                      : "border border-primary/70"
                  }`}
                >
                  <span>{new Date(date).getDate()}</span>
                  <span>
                    {new Date(date).toLocaleDateString("en-US", {
                      month: "short",
                    })}
                  </span>
                </button>
              ))}
            </span>
            <ChevronRightIcon width={28} />
          </div>
          <div className="flex items-center gap-6 text-sm mt-5">
            <span className="grid grid-cols-3 md:flex flex-wrap gap-4">
              {cinemas.map((cinema) => (
                <button
                  key={cinema.id}
                  onClick={() => setSelectedCinema(cinema)}
                  className={`flex flex-col items-center justify-center h-14 w-55 aspect-square rounded cursor-pointer  ${
                    selectedCinema === cinema
                      ? "bg-primary text-white"
                      : "border border-primary/70"
                  }`}
                >
                  <span>{cinema.name}</span>
                  <span className="text-gray-500 text-xs">
                    {cinema.address}
                  </span>
                </button>
              ))}
            </span>
          </div>

          {selectedRoom && (
            <SeatLayout
              rooms={rooms}
              selectedRoom={selectedRoom}
              setSelectedRoom={setSelectedRoom}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DateSelect;
