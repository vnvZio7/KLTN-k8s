import React, { useEffect, useState } from "react";
import MovieCard from "../../components/MovieCard";
import BlurCircle from "../../components/BlurCircle";
import DateSelect from "../../components/DateSelect";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import axiosInstance from "../../utils/axiosIntence";
import { useAppContext } from "../../context/appContext";
import { timeFormat } from "../../utils/helper";
import { StarIcon } from "lucide-react";
import Popup from "../../components/Popup";
import Trailer from "../../components/Trailer";
import { API_PATHS } from "../../utils/apiPaths";

const MoviesDetails = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const { shows, image_base_url, navigate } = useAppContext();
  const [dateTime, setDateTime] = useState([]);
  const [isPopup, setIsPopup] = useState(false);
  const getShow = async () => {
    try {
      const { data } = await axiosInstance.get(
        API_PATHS.SHOWTIMES.GET_SHOWTIMES_BY_ID(id)
      );
      if (data.success) {
        setShow(data);
        const dates = [];
        data.shows.map((item) => {
          dates.push(item.show_date);
        });
        setDateTime([...new Set(dates.map((item) => item))].sort());
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getShow();
  }, [id]);
  return show ? (
    <div className="px-6 md:px-16 lg:px-40 pt-30 md:pt-50">
      <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
        <img
          alt=""
          className="max-md:mx-auto rounded-xl h-104 max-w-70 object-cover"
          src={image_base_url + show.movie.backdrop_path}
        />
        <div className="relative flex flex-col gap-3">
          <BlurCircle top="-100px" left="-100px" />
          <p className="text-primary">
            {show.movie.language} {show.movie.adult && "-18+"}
          </p>
          <h1 className="text-4xl font-semibold max-w-96 text-balance">
            {show.movie.title}
          </h1>
          <div className="flex items-center gap-2 text-gray-300">
            <StarIcon className="w-5 h-5 text-primary fill-primary" />
            {show.movie.vote_average.toFixed(1)} User Rating
          </div>
          <p className="text-gray-400 mt-2 text-sm leading-tight max-w-xl">
            {show.movie.overview}
          </p>
          <p>
            {timeFormat(show.movie.runtime)} •{" "}
            {show.movie.genres.map((genre) => genre.name).join(" ,")} •{" "}
            {show.movie.release_date.split("-")[0]}
          </p>
          <div className="flex items-center flex-wrap gap-4 mt-4">
            <button
              onClick={() => setIsPopup(true)}
              className="flex items-center gap-2 px-7 py-3 text-sm bg-gray-800 hover:bg-gray-900 transition rounded-md font-medium cursor-pointer active:scale-95"
            >
              Xem Trailer
            </button>
            <a
              href="#dateSelect"
              className="px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer active:scale-95"
            >
              Mua vé
            </a>
            {/* <button className="bg-gray-700 p-2.5 rounded-full transition cursor-pointer active:scale-95"></button> */}
          </div>
        </div>
      </div>
      <p className="text-lg font-medium mt-20">Đạo diễn & Diễn viên</p>
      <div className="overflow-x-auto no-scrollbar mt-8 pb-4">
        <div className="flex items-center gap-4 w-max px-4">
          {show.movie.casts.slice(0, 12).map(
            (cast, index) =>
              cast.profile_path && (
                <div
                  key={index}
                  className="flex flex-col items-center text-center"
                >
                  <img
                    alt=""
                    className="rounded-full h-20 md:h-20 aspect-square object-cover"
                    src={image_base_url + cast.profile_path}
                  />
                  <p className="font-medium text-xs mt-3">{cast.name}</p>
                </div>
              )
          )}
        </div>
      </div>
      <DateSelect dateTime={dateTime} show={show.shows} id={id} />
      <p className="text-lg font-medium mt-20 mb-8">Có Thể Bạn Cũng Thích</p>
      <div className="flex flex-wrap max-sm:justify-center gap-8">
        {shows.slice(0, 4).map((show, index) => (
          <MovieCard key={index} movie={show} />
        ))}
      </div>
      <div className="flex justify-center mt-10">
        <button
          onClick={() => {
            navigate("/movies");
            scrollTo(0, 0);
          }}
          className="px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer"
        >
          Xem thêm
        </button>
      </div>

      <Popup isOpen={isPopup} onClose={() => setIsPopup(false)}>
        {show.movie.trailer_url ? (
          <Trailer src={show.movie.trailer_url} />
        ) : (
          <p className="text-xl">Bộ phim này chưa có trailer</p>
        )}
      </Popup>
    </div>
  ) : (
    <Loading />
  );
};

export default MoviesDetails;
