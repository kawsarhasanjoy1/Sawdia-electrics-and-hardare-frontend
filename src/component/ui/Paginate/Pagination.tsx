"use client";
import React from "react";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  onPageChange,
}) => {
  const [pageGroup, setPageGroup] = React.useState(0);

  const start = pageGroup * 10 + 1;
  const end = Math.min(start + 9, totalPages);

  const handlePrevGroup = () => {
    if (pageGroup > 0) {
      setPageGroup((prev) => prev - 1);
      onPageChange((pageGroup - 1) * 10 + 1);
    }
  };

  const handleNextGroup = () => {
    if ((pageGroup + 1) * 10 < totalPages) {
      setPageGroup((prev) => prev + 1);
      onPageChange((pageGroup + 1) * 10 + 1);
    }
  };

  return (
    <div className="flex justify-center items-center mt-8 gap-2 flex-wrap">
      <button
        onClick={handlePrevGroup}
        disabled={pageGroup === 0}
        className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
      >
        &lt;&lt;
      </button>

      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
      >
        Prev
      </button>

      {Array.from({ length: end - start + 1 }, (_, i) => start + i).map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`px-3 py-1 rounded ${
            page === p ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
      >
        Next
      </button>

      <button
        onClick={handleNextGroup}
        disabled={(pageGroup + 1) * 10 >= totalPages}
        className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
      >
        &gt;&gt;
      </button>
    </div>
  );
};

export default Pagination;
