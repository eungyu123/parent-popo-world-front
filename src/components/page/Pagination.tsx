import React from "react";
import ArrowLeft from "../icons/ArrowLeft";
import ArrowRight from "../icons/ArrowRight";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 3;

    // 총 페이지가 보여지는 페이지보다 적으면 전부 그냥 보여주기
    if (totalPages <= maxVisiblePages) {
      // 모든 페이지 표시
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // 현재 페이지 주변의 페이지들 표시
      let startPage = Math.max(1, currentPage - 1); // 시작페이지 1
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1); // 끝페이지 3

      if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }

      if (startPage > 1) {
        // pages.push(1);
        pages.push("...");
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages) {
        pages.push("...");
        // pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex justify-center gap-x-2 mb-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="text-sm px-2 py-1 rounded-sm border border-gray-100 shadow-sm active:scale-95 transition-all duration-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ArrowLeft />
      </button>

      {renderPageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === "number" && onPageChange(page)}
          disabled={typeof page !== "number"}
          className={`text-sm px-2 py-1 rounded-sm border border-gray-100 shadow-sm active:scale-95 transition-all duration-100 ${
            page === currentPage ? "bg-gray-100" : ""
          } ${typeof page !== "number" ? "cursor-default" : ""}`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="text-sm px-2 py-1 rounded-sm border border-gray-100 shadow-sm active:scale-95 transition-all duration-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ArrowRight />
      </button>
    </div>
  );
};

export default Pagination;
