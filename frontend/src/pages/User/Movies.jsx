import React, { useEffect, useState } from "react";
import BlurCircle from "../../components/BlurCircle";
import MovieCard from "../../components/MovieCard";
import { useAppContext } from "../../context/appContext";
import Pagination from "../../components/Pagination";
import Filter from "../../components/Filter";

const Movies = () => {
  const { shows } = useAppContext();
  const [movies, setMovies] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // số phim mỗi trang

  // Tính toán dữ liệu phân trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = movies.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(movies.length / itemsPerPage);
  useEffect(() => {
    setMovies(shows);
  }, []);
  useEffect(() => {}, [movies]);
  const handleFilterChange = (filters) => {
    const { selected = [], selectedSort } = filters;
    let filteredMovies = [];
    if (selected.length === 0) {
      filteredMovies = shows;
    } else {
      filteredMovies = shows.filter((movie) =>
        movie.genres.some((g) => selected.some((sg) => sg.id === g.id))
      );
    }
    if (selectedSort === "az") {
      filteredMovies = [...filteredMovies].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    } else if (selectedSort === "za") {
      filteredMovies = [...filteredMovies].sort((a, b) =>
        b.title.localeCompare(a.title)
      );
    } else if (selectedSort === "rate_desc") {
      // rate cao -> thấp
      filteredMovies = [...filteredMovies].sort(
        (a, b) => b.vote_average - a.vote_average
      );
    } else if (selectedSort === "rate_asc") {
      // rate thấp -> cao
      filteredMovies = [...filteredMovies].sort(
        (a, b) => a.vote_average - b.vote_average
      );
    }

    setMovies(filteredMovies);
  };
  return (
    <div className="relative my-40 mb-60 px-6 md:px-16 lg:px-40 xl:px-44 overflow-hidden min-h-[80vh]">
      <BlurCircle top="150px" left="0" />
      <BlurCircle bottom="50px" right="50px" />

      <div className="flex justify-between">
        <h1 className="text-lg font-medium my-4">Phim đang chiếu</h1>
        <Filter onFilterChange={handleFilterChange} />
      </div>
      <div className="flex flex-wrap max-sm:justify-center gap-8">
        {currentItems.map((show, index) => (
          <MovieCard key={index} movie={show} />
        ))}
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default Movies;
