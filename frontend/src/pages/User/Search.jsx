import React, { useEffect, useState } from "react";
import BlurCircle from "../../components/BlurCircle";
import MovieCard from "../../components/MovieCard";
import { useAppContext } from "../../context/appContext";
import axiosInstance from "../../utils/axiosIntence";
import { useSearchParams } from "react-router-dom";
import Filter from "../../components/Filter";
import Pagination from "../../components/Pagination";
import { API_PATHS } from "../../utils/apiPaths";

const Search = () => {
  const [searchParams] = useSearchParams();
  const keywords = searchParams.get("keywords");
  const [results, setResults] = useState([]);
  const [resultsFilter, setResultsFilter] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // số phim mỗi trang

  // Tính toán dữ liệu phân trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = resultsFilter.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(resultsFilter.length / itemsPerPage);
  const handleFilterChange = (filters) => {
    const { selected = [], selectedSort } = filters;
    let filteredMovies = [];
    if (selected.length === 0) {
      filteredMovies = results;
    } else {
      filteredMovies = results.filter((movie) =>
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

    setResultsFilter(filteredMovies);
  };
  const fetchDataSearch = async () => {
    try {
      const { data } = await axiosInstance.get(
        API_PATHS.MOVIES.GET_DATA_SEARCH,
        {
          params: { query: keywords },
        }
      );

      if (data.success) {
        setResults(data.data.sort((a, b) => a.title.localeCompare(b.title)));
        setResultsFilter(
          data.data.sort((a, b) => a.title.localeCompare(b.title))
        );
      }
    } catch (error) {}
  };
  useEffect(() => {
    fetchDataSearch();
  }, [keywords]);
  useEffect(() => {}, [resultsFilter]);
  return (
    <div className="relative my-40 mb-60 px-6 md:px-16 lg:px-40 xl:px-44 overflow-hidden min-h-[80vh]">
      <BlurCircle top="150px" left="0" />
      <BlurCircle bottom="50px" right="50px" />

      <div className="flex justify-between">
        <h1 className="text-lg font-medium my-4">
          {resultsFilter.length > 0
            ? `Search results for keyword "`
            : `No results were found for the keyword "`}
          {keywords}"
        </h1>
        <Filter onFilterChange={handleFilterChange} />
      </div>
      <div className="flex flex-wrap max-sm:justify-center gap-8 mt-10">
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

export default Search;
