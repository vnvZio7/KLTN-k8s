import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import Title from "../../components/admin/Title";
import { CheckIcon, DeleteIcon, Play, StarIcon } from "lucide-react";
import { kConverter } from "../../utils/helper";
import axiosInstance from "../../utils/axiosIntence";
import { API_PATHS } from "../../utils/apiPaths";
import { toast } from "react-hot-toast";
import axios from "../../utils/axiosIntence";
import { useAppContext } from "../../context/appContext";

const AddShows = () => {
  const {
    cinemas,
    types,
    provinces,
    rooms,
    image_base_url,
    navigate,
    getToken,
  } = useAppContext();

  const [nowPlayingMovies, setNowPlayingMovie] = useState([]);
  const [dataCinemas, setDataCinemas] = useState([]);
  const [dataRooms, setDataRooms] = useState([]);
  const [dateTimeSelection, setDateTimeSelection] = useState([]);

  const [showPrice, setShowPrice] = useState("");
  const [dateTimeInput, setDateTimeInput] = useState("");

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const [selectedCinemaName, setSelectedCinemaName] = useState(null);
  const [selectedRoomName, setSelectedRoomName] = useState(null);

  const [showPopup, setShowPopup] = useState(false);

  const [addingShow, setAddingShow] = useState(false);

  const fetchNowPlayingMovies = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.MOVIES.GET_ALL_MOVIES);
      if (response.data?.length > 0) {
        setNowPlayingMovie(response.data);
      }
    } catch (error) {
      console.error("Error fetching cinemas", error);
    }
  };

  const getDataCinemas = async () => {
    try {
      const response = cinemas.filter(
        (item) =>
          item.type === selectedType && item.province_id === selectedProvince
      );
      setDataCinemas(response);
    } catch (error) {
      console.error("Error fetching cinemas", error);
    }
  };

  const getDataRooms = async () => {
    try {
      const response = rooms.filter(
        (item) => item.cinema_id === selectedCinema
      );
      setDataRooms(response);
      console.log(dataRooms);
    } catch (error) {
      console.error("Error fetching cinemas", error);
    }
  };

  const handleDateTimeAdd = () => {
    if (!dateTimeInput) return;
    const [date, time] = dateTimeInput.split("T");
    if (!date || !time) return;

    setDateTimeSelection((prev) => {
      const rooms = prev[selectedCinemaName] || {};
      const dates = rooms[selectedRoomName] || {};
      const times = dates[date] || [];
      if (!times.includes(time)) {
        return {
          ...prev,
          [selectedCinemaName]: {
            ...rooms,
            [selectedRoomName]: {
              ...dates,
              [date]: [...times, time],
            },
          },
        };
      }
      return prev;
    });
  };
  const handleRemoveTime = (date, time) => {
    setDateTimeSelection((prev) => {
      const rooms = prev[selectedCinemaName] || {};
      const dates = rooms[selectedRoomName] || {};
      const filteredTimes = dates[date].filter((t) => t !== time);
      if (filteredTimes.length === 0) {
        const { [selectedCinemaName]: cinemaData, ...restCinemas } = prev;
        const { [selectedRoomName]: roomData, ...restRooms } = cinemaData;

        // Xóa date khỏi roomData
        const { [date]: _, ...restDates } = roomData;

        // Nếu room không còn date nào nữa, xóa luôn room
        if (Object.keys(restDates).length === 0) {
          if (Object.keys(restRooms).length === 0) {
            return restCinemas;
          }
          return {
            ...prev,
            [selectedCinemaName]: restRooms,
          };
        }
        // Ngược lại, cập nhật lại room với các date còn lại
        return {
          ...prev,
          [selectedCinemaName]: {
            ...rooms,
            [selectedRoomName]: restRooms,
          },
        };
      }
      return {
        ...prev,
        [selectedCinemaName]: {
          ...rooms,
          [selectedRoomName]: { ...dates, [date]: filteredTimes },
        },
      };
    });
  };

  const handleSubmit = async () => {
    try {
      setAddingShow(true);
      if (
        !selectedMovie ||
        Object.keys(dateTimeSelection).length === 0 ||
        !showPrice
      ) {
        return toast("Missing required fields");
      }
      const shows = [];
      Object.keys(dateTimeSelection).map((item) => {
        Object.keys(dateTimeSelection[item]).map((data) => {
          const show = [];
          Object.entries(dateTimeSelection[item][data]).map(([date, time]) =>
            // payload.push({ room_id: data.split("-")[0], date, time })
            show.push({ date, time })
          );
          const room_id = data.split("-")[0];
          shows.push({ room_id, show });
        });
      });
      const payload = {
        movie_id: selectedMovie,
        showsInput: shows,
        showPrice: Number(showPrice),
      };
      const { data } = await axiosInstance.post(
        API_PATHS.SHOWTIMES.CREATE_SHOWTIMES,
        payload
      );
      if (data.success) {
        toast.success(data.message);
        navigate("/admin/dashboard");
      }
    } catch (error) {}
    setAddingShow(false);
  };

  useEffect(() => {
    getDataCinemas();
    getDataRooms();
  }, [selectedProvince, selectedType, selectedCinema]);
  useEffect(() => {
    fetchNowPlayingMovies();
  }, []);
  return nowPlayingMovies.length > 0 ? (
    <>
      <Title text1="Add" text2="Shows" />
      <p className="mt-10 text-lg font-medium">Now Playing Movies</p>
      <div className="overflow-x-auto pb-4">
        <div className="group flex flex-wrap gap-4 mt-4 w-max">
          {nowPlayingMovies.map((movie) => (
            <div
              key={movie.id}
              className={`relative max-w-40 cursor-pointer group-hover:not-hover:opacity-40 hover:-translate-y-1 transition duration-300`}
              onClick={() => setSelectedMovie(movie.id)}
            >
              <div className="relative rounded-lg overflow-hidden">
                <img
                  src={image_base_url + movie.poster_path}
                  alt=""
                  className="w-full object-cover brightness-90"
                />
                <div className="text-sm flex items-center justify-between p-2 bg-black/70 w-full absolute bottom-0 left-0">
                  <p className="flex items-center gap-1 text-gray-400">
                    <StarIcon className="w-4 h-4 text-primary fill-primary" />
                    {movie.vote_average.toFixed(1)}
                  </p>
                  <p className="text-gray-300">
                    {kConverter(movie.vote_count)} Votes
                  </p>
                </div>
              </div>
              {selectedMovie === movie.id && (
                <div className="absolute top-2 right-2 flex items-center justify-center bg-primary h-6 w-6 rounded">
                  <CheckIcon className="w-4 h-4 text-white" strokeWidth={2.5} />
                </div>
              )}
              <p className="font-medium truncate">{movie.title}</p>
              <p className="text-gray-400 text-sm">{movie.release_date}</p>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-10 text-lg font-medium">Choose cinema</p>
      <div className="flex flex-wrap gap-5 justify-center items-center border-t border-b p-5 m-5">
        {provinces.map((item, index) => (
          <div
            onClick={() => setSelectedProvince(item.id)}
            className={`${
              selectedProvince === item.id ? "bg-primary/80" : "bg-white"
            } border rounded-xs px-3 py-2 cursor-pointer hover:bg-white/80`}
            key={index}
          >
            <span className="text-black">{item.name}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-5 justify-center items-center m-5 p-5 border-b">
        {types.map((item, index) => (
          <div
            onClick={() => setSelectedType(item.id)}
            className={`${
              selectedType === item.id ? "bg-primary/90" : "bg-white"
            } border rounded-xs px-3 py-2 cursor-pointer hover:bg-white/80`}
            key={index}
          >
            <span className="text-black">{item.name}</span>
          </div>
        ))}
      </div>
      <div
        className={`flex flex-wrap gap-5 justify-center items-center m-5 p-5 ${
          dataCinemas.length > 0 && "border-b"
        }`}
      >
        {dataCinemas?.map((item, index) => (
          <div
            onClick={() => (
              setSelectedCinema(item.id),
              setSelectedCinemaName(`${item.id}-${item.name}`)
            )}
            className={`${
              selectedCinema === item.id ? "bg-primary/90" : "bg-white"
            } border rounded-xs px-3 py-2 cursor-pointer hover:bg-white/80`}
            key={index}
          >
            <span className="text-black">{item.name}</span>
            <br></br>
            <span className="text-gray-600 text-sm">{item.address}</span>
          </div>
        ))}
      </div>
      <div
        className={`flex flex-wrap gap-5 justify-center items-center m-5 p-5 ${
          dataRooms.length > 0 && "border-b"
        }`}
      >
        {dataRooms?.map((item, index) => (
          <div
            onClick={() => (
              setSelectedRoom(item._id),
              setSelectedRoomName(`${item._id}-${item.name}`)
            )}
            className={`${
              selectedRoom === item._id ? "bg-primary/90" : "bg-white"
            } border rounded-xs px-3 py-2 cursor-pointer hover:bg-white/80`}
            key={index}
          >
            <span className="text-black">{item.name}</span>
          </div>
        ))}
      </div>

      {/* Show Price Input */}
      <div className="mt-8">
        <label className="block text-sm font-medium mb-2">Show Price</label>
        <div className="relative inline-flex items-center gap-2 border border-gray-600 px-3 py-2 rounded-md">
          <span className="text-gray-400 text-sm absolute right-0 500 mr-3">
            vnđ
          </span>
          <input
            min={0}
            type="number"
            value={showPrice}
            onChange={(e) => setShowPrice(e.target.value)}
            placeholder="Enter show price"
            className="outline-none"
          />
        </div>
      </div>
      {/* Date & Time Selection */}
      <div className="mt-6">
        <label className="block text-sm font-medium mb-2">
          Select Date and Time
        </label>
        <div className="inline-flex gap-5 border border-gray-600 p-1 pl-3 rounded-lg">
          <input
            type="datetime-local"
            value={dateTimeInput}
            onChange={(e) => setDateTimeInput(e.target.value)}
            className="outline-none rounded-md"
          />
          <button
            onClick={handleDateTimeAdd}
            className="bg-primary/80 text-white px-3 py-2 text-sm rounded-lg hover:bg-primary cursor-pointer"
          >
            Add Time
          </button>
        </div>
      </div>

      {/* Display Selected Time  */}
      {Object.keys(dateTimeSelection).length > 0 &&
        dateTimeSelection[selectedCinemaName] &&
        dateTimeSelection[selectedCinemaName][selectedRoomName] && (
          <div className="mt-6">
            <h2>Selected Date-Time</h2>
            <ul className="space-y-3">
              {Object.entries(
                dateTimeSelection[selectedCinemaName][selectedRoomName]
              )
                .filter(([key, value]) => Array.isArray(value))
                .map(([date, times]) => (
                  <li key={date}>
                    <div className="font-medium">{date}</div>
                    <div className="flex flex-wrap gap-2 mt-1 text-sm">
                      {times.map((time) => (
                        <div
                          key={time}
                          className="border border-primary px-2 py-1 flex items-center rounded"
                        >
                          <span>{time}</span>
                          <DeleteIcon
                            onClick={() => handleRemoveTime(date, time)}
                            width={15}
                            className="ml-2 text-red-500 hover:text-red-700 cursor-pointer"
                          />
                        </div>
                      ))}
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        )}
      <button
        onClick={() => setShowPopup(true)}
        disabled={addingShow}
        className="bg-primary text-white px-8 py-2 mt-6 rounded hover:bg-primary/90 transition-all cursor-pointer"
      >
        Add Show
      </button>

      {showPopup && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 ">
          <div className="bg-white rounded-xl p-6 shadow-lg w-200 text-black max-h-11/12 flex flex-col">
            <h2 className="text-xl font-semibold mb-4 ">
              Xác Nhận Lại Thông Tin Trước Khi Add Show
            </h2>

            <div className="overflow-y-scroll h-full">
              {Object.entries(dateTimeSelection).map(([key, values]) => (
                <div key={key}>
                  <p className="items-center justify-center flex">
                    {key.split("-")[1]}
                  </p>
                  {Object.entries(values).map(([room, data]) => (
                    <div key={room}>
                      <p className="items-center justify-center flex underline">
                        {room.split("-")[1]}
                      </p>
                      {Object.entries(data).map(([date, times]) => (
                        <div>
                          <p>{date}</p>
                          {times.map((item) => (
                            <p>{item}</p>
                          ))}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-5 justify-around items-center">
              <button
                onClick={handleSubmit}
                className="mt-4 px-3 py-1 rounded hover:bg-primary/80 bg-primary cursor-pointer"
              >
                Xác Nhận
              </button>

              <button
                onClick={() => setShowPopup(false)}
                className="mt-4 bg-gray-300 px-3 py-1 rounded hover:bg-gray-400 cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  ) : (
    <Loading />
  );
};

export default AddShows;
