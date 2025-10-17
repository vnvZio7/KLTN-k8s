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
import { API_PATHS } from "../../utils/apiPaths";

const ReleaseDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const { shows, image_base_url } = useAppContext();
  const getMovie = async () => {
    try {
      const { data } = await axiosInstance.get(
        API_PATHS.MOVIES.GET_RELEASE_BY_ID(id)
      );
      if (data.success) {
        setMovie(data.movie);
        console.log(data.movie);
      }
    } catch (error) {
      console.error(error);
    }
  };
  // console.log(dateTime);
  useEffect(() => {
    getMovie();
  }, [id]);
  return movie ? (
    <div className="px-6 md:px-16 lg:px-40 pt-30 md:pt-50">
      <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
        <img
          alt=""
          className="max-md:mx-auto rounded-xl h-104 max-w-70 object-cover"
          src={image_base_url + movie.backdrop_path}
        />
        <div className="relative flex flex-col gap-3">
          <BlurCircle top="-100px" left="-100px" />
          <p className="text-primary">{movie.original_language}</p>
          <h1 className="text-4xl font-semibold max-w-96 text-balance">
            {movie.title}
          </h1>
          <div className="flex items-center gap-2 text-gray-300">
            <StarIcon className="w-5 h-5 text-primary fill-primary" />
            {movie.vote_average.toFixed(1)} User Rating
          </div>
          <p className="text-gray-400 mt-2 text-sm leading-tight max-w-xl">
            {movie.overview}
          </p>
          <p>
            {timeFormat(movie.runtime)} •{" "}
            {movie.genres.map((genre) => genre.name).join(" ,")} •{" "}
            {movie.release_date.split("-")[0]}
          </p>
          <div className="flex items-center flex-wrap gap-4 mt-4">
            <button className="px-10 py-3 text-sm bg-gray-500 transition rounded-md font-medium cursor-pointer active:scale-95">
              Sắp công chiếu
            </button>
            {/* <button className="bg-gray-700 p-2.5 rounded-full transition cursor-pointer active:scale-95"></button> */}
          </div>
        </div>
      </div>

      <p className="text-lg font-medium mt-20 mb-8">You May Also Like</p>
      <div className="flex flex-wrap max-sm:justify-center gap-8">
        {shows.slice(0, 4).map((show, index) => (
          <MovieCard key={index} movie={show} />
        ))}
      </div>
      <div className="flex justify-center mt-20">
        <button className="px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer">
          Show more
        </button>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default ReleaseDetails;
