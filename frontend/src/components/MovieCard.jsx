import { StarIcon } from "lucide-react";
import React from "react";
import { timeFormat } from "../utils/helper";
import { useAppContext } from "../context/appContext";

const MovieCard = ({ movie, release }) => {
  const { image_base_url, navigate } = useAppContext();
  return (
    <>
      <div className="flex flex-col justify-between p-3 bg-gray-800 rounded-2xl hover:-translate-y-1 transition duration-300 w-66">
        <img
          onClick={() => {
            release
              ? navigate(`/release/${movie.id}`)
              : navigate(`/movies/${movie._id}`);
            scrollTo(0, 0);
          }}
          alt=""
          className="rounded-lg h-52 w-full object-cover object-right-bottom cursor-pointer"
          src={image_base_url + movie.backdrop_path}
        />
        <p className="font-semibold mt-2 truncate">{movie.title}</p>
        <p className="text-sm text-gray-400 mt-2">
          {new Date(movie.release_date).getFullYear()} •{" "}
          {release
            ? movie.genre_ids
                .slice(0, 2)
                .map((genre) => genre.name)
                .join(" | ")
            : movie.genres
                .slice(0, 2)
                .map((genre) => genre.name)
                .join(" | ")}{" "}
          • {!release && timeFormat(movie.runtime)}
        </p>
        <div className="flex items-center justify-between mt-4 pb-3">
          <button
            onClick={() => {
              release
                ? navigate(`/release/${movie.id}`)
                : navigate(`/movies/${movie._id}`);
              scrollTo(0, 0);
            }}
            className="px-4 py-2 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer"
          >
            {release ? "Xem chi tiết" : "Mua vé"}
          </button>
          <p className="flex items-center gap-1 text-sm text-gray-400 mt-1 pr-1">
            <StarIcon className="w-4 h-4 text-primary fill-primary" />
            {movie.vote_average.toFixed(1)}
          </p>
        </div>
      </div>
    </>
  );
};

export default MovieCard;
