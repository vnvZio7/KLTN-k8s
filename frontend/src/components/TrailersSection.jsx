import React, { useEffect, useState } from "react";
import BlurCircle from "./BlurCircle";
import { PlayCircleIcon, Search, SearchIcon } from "lucide-react";
import axiosInstance from "../utils/axiosIntence";
import { API_PATHS } from "../utils/apiPaths";
import { useAppContext } from "../context/appContext";
import ReactPlayer from "react-player";
import Trailer from "./Trailer";

const TrailersSection = () => {
  const [currentTrailer, setCurrentTrailer] = useState([]);
  const { image_base_url } = useAppContext();
  const [trailers, setTrailers] = useState([]);
  const fetchTrailers = async () => {
    const { data } = await axiosInstance.get(API_PATHS.MOVIES.GET_TRAILERS);
    if (data.success) {
      setTrailers(data.trailers);
      setCurrentTrailer(data.trailers[0]);
    }
  };
  useEffect(() => {
    fetchTrailers();
  }, []);
  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-44 py-20 overflow-hidden">
      <p className="text-gray-300 font-medium text-lg max-w-[960px] mx-auto">
        Trailers
      </p>
      <div className="relative mt-6">
        <BlurCircle top="-100px" right="-100px" />
        <Trailer src={currentTrailer.trailer_url} />
      </div>
      <div className="group grid grid-cols-4 gap-4 md:gap-8 mt-8 max-w-3xl mx-auto">
        {trailers.map(
          (trailer) =>
            trailer && (
              <div
                key={trailer.image}
                className="relative group-hover:not-hover:opacity-50 hover:-translate-y-1 duration-300 transition max:md:h-60 md:max-h-60 cursor-pointer"
                onClick={() => setCurrentTrailer(trailer)}
              >
                <img
                  src={image_base_url + trailer.image}
                  alt="trailer"
                  className="rounded-lg w-full h-full object-cover brightness-75"
                />
                <PlayCircleIcon
                  strokeWidth={1.6}
                  className="absolute top-1/2 left-1/2 w-5 md:w-8 h-5 md:h-12 transform -translate-x-1/2 -translate-y-1/2"
                />
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default TrailersSection;
