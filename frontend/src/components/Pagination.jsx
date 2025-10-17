import { ChevronsLeftIcon, ChevronsRightIcon } from "lucide-react";
import React from "react";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const getPageNumbers = () => {
    const delta = 1; // số trang hiển thị quanh currentPage
    const pages = [];
    // Luôn lấy các trang quanh currentPage
    for (
      let i = Math.max(1, currentPage - delta);
      i <= Math.min(totalPages, currentPage + delta);
      i++
    ) {
      pages.push(i);
    }

    // Nếu currentPage < totalPages - 1 thì thêm ...
    if (currentPage < totalPages - 1) {
      pages.push("...");
    }

    return pages;
  };

  return (
    <div className="flex gap-3 mt-4 justify-center items-center">
      {/* Prev */}
      {currentPage !== 1 && (
        <button
          onClick={() => onPageChange(1)}
          className="px-2 py-2 rounded bg-primary cursor-pointer hover:bg-primary-dull"
        >
          <ChevronsLeftIcon className="w-4 h-4" />
        </button>
      )}

      {/* Pages */}
      {getPageNumbers().map((page, index) =>
        page === "..." ? (
          <span key={index} className="px-3 py-1">
            ...
          </span>
        ) : (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded cursor-pointer ${
              currentPage === page
                ? "bg-blue-600 px-3 py-2 text-white font-semibold"
                : "bg-primary hover:bg-primary-dull"
            }`}
          >
            {page}
          </button>
        )
      )}

      {/* Next */}
      {currentPage !== totalPages && (
        <button
          onClick={() => onPageChange(totalPages)}
          className="px-2 py-2 rounded bg-primary cursor-pointer hover:bg-primary-dull"
        >
          <ChevronsRightIcon className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

export default Pagination;
