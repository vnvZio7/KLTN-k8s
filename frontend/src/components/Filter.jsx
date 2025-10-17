import { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";

const sortOptions = [
  { value: "az", label: "A → Z" },
  { value: "za", label: "Z → A" },
  { value: "rate_asc", label: "Rating ↑" },
  { value: "rate_desc", label: "Rating ↓" },
];

export default function Filter({ onFilterChange }) {
  const { genres } = useAppContext();
  const [selected, setSelected] = useState([]);
  const [selectedSort, setSelectedSort] = useState("az");

  const toggleSelect = (code, data) => {
    if (code === "genre") {
      setSelected((prev) =>
        prev.includes(data) ? prev.filter((v) => v !== data) : [...prev, data]
      );
    }
    if (code === "sort") {
      setSelectedSort(data);
    }
  };
  useEffect(() => {
    onFilterChange({ selected, selectedSort });
  }, [selected, selectedSort]);
  return (
    <div className="flex justify-between m-5 gap-4">
      <div className="relative inline-block text-left group">
        {/* Nút hover */}
        <div className="px-4 py-2 w-[200px] truncate  bg-blue-600 text-white rounded-lg shadow group-hover:bg-blue-700 cursor-pointer">
          {selected.length > 0
            ? selected.map((i) => i.name).join(", ")
            : "Tất cả"}
        </div>

        {/* Nội dung dropdown (hover hiển thị) */}
        <div className="hidden group-hover:block absolute w-56 rounded-lg shadow-lg bg-white border border-gray-200 z-10">
          <ul className="max-h-60 overflow-y-auto p-2">
            {genres.map((genre) => (
              <li
                key={genre.id}
                className="flex items-center space-x-2 py-1 px-2 justify-between"
              >
                <span className="text-gray-700">{genre.name}</span>
                <input
                  type="checkbox"
                  checked={selected.includes(genre)}
                  onChange={() => toggleSelect("genre", genre)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Sắp xếp */}
      <select
        value={selectedSort}
        onChange={(e) => toggleSelect("sort", e.target.value)}
        className="px-3 py-1 rounded-lg border border-gray-300 bg-white text-gray-700 focus:ring-2 focus:ring-blue-500"
      >
        {sortOptions.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>
    </div>
  );
}
