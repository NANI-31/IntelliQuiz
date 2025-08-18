import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
export default function History() {
  const user = useSelector((state) => state.user.user);
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const [searchText, setSearchText] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const filteredQuizzes = user.quizzes.filter((quiz) => {
    const quizDate = new Date(quiz.createdAt); // Assumes each quiz has createdAt

    // Search filter
    const matchesSearch = quiz.prompt
      .toLowerCase()
      .includes(searchText.toLowerCase());

    // Date filters
    const fromDateOk = dateFrom ? quizDate >= new Date(dateFrom) : true;
    const toDateOk = dateTo ? quizDate <= new Date(dateTo) : true;

    return matchesSearch && fromDateOk && toDateOk;
  });
  return (
    <div className="w-full bg-gradient-to-br from-white via-[var(--non-photo-blue-2)] to-white">
      <div className="w-full sm:w-[80%] mx-auto h-full sm:p-10 p-4">
        {/* filters */}
        <div className="flex max-sm:flex-col text-white justify-between gap-5 p-4 mb-5 shadow-lg border bg-gradient-to-r from-[var(--primary-color)] to-[var(--blue-green)]">
          <div className="flex gap-5 max-sm:flex-col">
            <div className="space-x-2">
              <label htmlFor="dateFrom">From</label>
              <input
                type="date"
                id="dateFrom"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="px-6 py-2 border border-[var(--non-photo-blue)] rounded outline:none bg-gradient-to-r  from-[var(--primary-color)] to-[var(--blue-green)]"
              />
            </div>
            <div className="space-x-2">
              <label htmlFor="dateTo">To</label>
              <input
                type="date"
                id="dateTo"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="px-6 py-2 border border-[var(--non-photo-blue)] rounded outline:none bg-gradient-to-r  from-[var(--primary-color)] to-[var(--blue-green)]"
              />
            </div>
          </div>
          <div className="flex items-center">
            <input
              name="text"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="px-6 py-2 placeholder:text-white border border-[var(--non-photo-blue)] rounded-r-none rounded outline-0 bg-gradient-to-r  from-[var(--primary-color)] to-[var(--blue-green)]"
            ></input>
            <span className="px-3 py-3 border border-l-0 rounded-l-none border-[var(--non-photo-blue)] rounded">
              <IoSearchOutline />
            </span>
          </div>
        </div>
        {/* quiz history */}
        <div className="grid w-full gap-4 md:grid-cols-2">
          {filteredQuizzes.length === 0 ? (
            <p className="text-gray-600">No results found.</p>
          ) : (
            filteredQuizzes.map((q, i) => (
              <div
                key={i}
                className="p-2 sm:p-4 shadow-lg rounded bg-[var(--vivid-sky-blue)]"
              >
                <div>{q.prompt}</div>
                <div className="mt-2 text-sm font-semibold">
                  {formatDate(q.createdAt)}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
