import { useState } from "react";
import { useEffect } from "react";
import BlurCircle from "../../components/BlurCircle";
import MovieCard from "../../components/MovieCard";
import { useAppContext } from "../../context/appContext";
import Loading from "../../components/Loading";

const Release = () => {
  const { upComing } = useAppContext();
  const [shows, setShows] = useState([]);

  useEffect(() => {
    setShows(upComing);
  }, []);
  return shows ? (
    <div className="relative my-40 mb-60 px-6 md:px-16 lg:px-40 xl:px-44 overflow-hidden min-h-[80vh]">
      <BlurCircle top="150px" left="0" />
      <BlurCircle bottom="50px" right="50px" />

      <h1 className="text-lg font-medium my-4">Sắp công chiếu</h1>
      <div className="flex flex-wrap max-sm:justify-center gap-8">
        {shows.map(
          (show, index) =>
            show.backdrop_path && (
              <MovieCard key={index} movie={show} release={true} />
            )
        )}
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Release;
