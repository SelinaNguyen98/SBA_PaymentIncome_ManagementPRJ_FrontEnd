// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";

/**
 * Component Pagination:
 * - Range -2 áp dụng cho khoảng cách đầu và cuối
 * - Hiển thị trang như sau:
 *   [1] 2 3 ... 20
 *   1 [2] 3 ... 20
 *   1 2 [3] 4 ... 20
 *   ...
 *   1 ... 17 [18] 19 20
 *   1 ... 18 [19] 20
 *   1 ... 18 19 [20]
 */

const RANGE = 1;

// eslint-disable-next-line react/prop-types
export default function Pagination({ changePage, page = 5, totalPage = 0 }) {
  // Hàm render phân trang
  const renderPagination = () => {
    let dotAfter = false;
    let dotBefore = false;

    // Hàm hiển thị dấu chấm '...' trước trang
    const renderDotBefore = (index) => {
      if (!dotBefore) {
        dotBefore = true;
        return (
          <span key={index}>
            ...
          </span>
        );
      }
      return null;
    };

    // Hàm hiển thị dấu chấm '...' sau trang
    const renderDotAfter = (index) => {
      if (!dotAfter) {
        dotAfter = true;
        return (
          <span key={index}>
            ...
          </span>
        );
      }
      return null;
    };

    // Nếu số trang không hợp lệ thì không hiển thị
    if (totalPage <= 0 || isNaN(totalPage)) {
      return null;
    }

    return Array(totalPage)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1;

        // Điều kiện hiển thị dấu chấm '...'
        if (
          page <= RANGE + 1 &&
          pageNumber > 3 &&
          pageNumber < totalPage - RANGE + 1
        ) {
          return renderDotAfter(index);
        } else if (page > RANGE + 1 && page < totalPage - RANGE) {
          if (pageNumber < page - RANGE && pageNumber > RANGE) {
            return renderDotBefore(index);
          } else if (
            pageNumber > page + RANGE &&
            pageNumber < totalPage - RANGE + 1
          ) {
            return renderDotAfter(index);
          }
        } else if (
          pageNumber > RANGE &&
          pageNumber <= totalPage - 3 &&
          page >= totalPage - RANGE
        ) {
          return renderDotBefore(index);
        }

        // Hiển thị số trang hoặc dấu chấm '...' tùy vào điều kiện
        if (page === pageNumber) {
          return (
            <span key={index} className="m-2 cursor-pointer">
              <div className="rounded-full w-6 h-6 text-center items-center justify-center bg-[#8798D4]">
                {pageNumber}
              </div>
            </span>
          );
        } else {
          return (
            <button
              key={index}
              onClick={() => changePage(pageNumber)}
              className="m-2 cursor-pointer"
            >
              {pageNumber}
            </button>
          );
        }
      });
  };

  // Render component Pagination
  return (
    <div className="flex items-center justify-end rounded-full shadow-md bg-[#F7F9FF] text-[16px] max-2xl-plus:text-[20px] font-[500]">
      {page === 1 ? (
        // Nút Previous không hoạt động nếu đang ở trang đầu tiên
        <span className="bg-gray/60 cursor-not-allowed">
          {/* Icon mũi tên Previous */}
          <svg
            className="w-10 h-6"
            viewBox="0 0 7 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.97896 0.462286C6.06704 0.607873 6.13693 0.780802 6.18461 0.971174C6.23229 1.16155 6.25684 1.36563 6.25684 1.57173C6.25684 1.77783 6.23229 1.98191 6.18461 2.17228C6.13693 2.36265 6.06704 2.53558 5.97896 2.68117L2.29223 8.78703L5.97896 14.8929C6.15662 15.1871 6.25643 15.5862 6.25643 16.0023C6.25643 16.4184 6.15662 16.8175 5.97896 17.1118C5.8013 17.406 5.56033 17.5713 5.30908 17.5713C5.05782 17.5713 4.81686 17.406 4.63919 17.1118L0.277832 9.8886C0.189746 9.74301 0.119862 9.57008 0.0721798 9.37971C0.024498 9.18934 -4.48227e-05 8.98526 -4.48227e-05 8.77916C-4.48227e-05 8.57306 0.024498 8.36898 0.0721798 8.17861C0.119862 7.98823 0.189746 7.8153 0.277832 7.66972L4.63919 0.446549C5.00027 -0.151447 5.60839 -0.151447 5.97896 0.462286Z"
              fill="#A9A9A9"
              fillOpacity="0.73"
            />
          </svg>
        </span>
      ) : (
        // Nút Previous hoạt động khi không ở trang đầu tiên
        <button onClick={() => changePage(page - 1)}>
          {/* Icon mũi tên Previous */}
          <svg
            className="w-10 h-6"
            viewBox="0 0 7 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.97896 0.462286C6.06704 0.607873 6.13693 0.780802 6.18461 0.971174C6.23229 1.16155 6.25684 1.36563 6.25684 1.57173C6.25684 1.77783 6.23229 1.98191 6.18461 2.17228C6.13693 2.36265 6.06704 2.53558 5.97896 2.68117L2.29223 8.78703L5.97896 14.8929C6.15662 15.1871 6.25643 15.5862 6.25643 16.0023C6.25643 16.4184 6.15662 16.8175 5.97896 17.1118C5.8013 17.406 5.56033 17.5713 5.30908 17.5713C5.05782 17.5713 4.81686 17.406 4.63919 17.1118L0.277832 9.8886C0.189746 9.74301 0.119862 9.57008 0.0721798 9.37971C0.024498 9.18934 -4.48227e-05 8.98526 -4.48227e-05 8.77916C-4.48227e-05 8.57306 0.024498 8.36898 0.0721798 8.17861C0.119862 7.98823 0.189746 7.8153 0.277832 7.66972L4.63919 0.446549C5.00027 -0.151447 5.60839 -0.151447 5.97896 0.462286Z"
              fill="#A9A9A9"
              fillOpacity="0.73"
            />
          </svg>
        </button>
      )}

      {/* Hiển thị các nút trang hoặc dấu chấm '...' */}
      {renderPagination()}

      {page === totalPage ? (
        // Nút Next không hoạt động nếu đang ở trang cuối cùng
        <span className="bg-gray/60 cursor-not-allowed">
          {/* Icon mũi tên Next */}
          <svg
            className="w-10 h-6"
            viewBox="0 0 7 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.277877 0.462286C0.189791 0.607873 0.119907 0.780802 0.0722254 0.971175C0.0245435 1.16155 0 1.36563 0 1.57173C0 1.77783 0.0245435 1.98191 0.0722254 2.17228C0.119907 2.36265 0.189791 2.53558 0.277877 2.68117L3.96461 8.78703L0.277877 14.8929C0.100213 15.1871 0.000402339 15.5862 0.000402339 16.0023C0.000402339 16.4184 0.100213 16.8175 0.277877 17.1118C0.455541 17.406 0.696505 17.5713 0.947759 17.5713C1.19901 17.5713 1.43998 17.406 1.61764 17.1118L5.979 9.8886C6.06709 9.74301 6.13697 9.57008 6.18466 9.37971C6.23234 9.18934 6.25688 8.98526 6.25688 8.77916C6.25688 8.57306 6.23234 8.36898 6.18466 8.17861C6.13697 7.98823 6.06709 7.8153 5.979 7.66972L1.61764 0.446549C1.25657 -0.151447 0.64845 -0.151447 0.277877 0.462286Z"
              fill="#A9A9A9"
              fillOpacity="0.73"
            />
          </svg>
        </span>
      ) : (
        // Nút Next hoạt động khi không ở trang cuối cùng
        <button onClick={() => changePage(page + 1)}>
          {/* Icon mũi tên Next */}
          <svg
            className="w-10 h-6"
            viewBox="0 0 7 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.277877 0.462286C0.189791 0.607873 0.119907 0.780802 0.0722254 0.971175C0.0245435 1.16155 0 1.36563 0 1.57173C0 1.77783 0.0245435 1.98191 0.0722254 2.17228C0.119907 2.36265 0.189791 2.53558 0.277877 2.68117L3.96461 8.78703L0.277877 14.8929C0.100213 15.1871 0.000402339 15.5862 0.000402339 16.0023C0.000402339 16.4184 0.100213 16.8175 0.277877 17.1118C0.455541 17.406 0.696505 17.5713 0.947759 17.5713C1.19901 17.5713 1.43998 17.406 1.61764 17.1118L5.979 9.8886C6.06709 9.74301 6.13697 9.57008 6.18466 9.37971C6.23234 9.18934 6.25688 8.98526 6.25688 8.77916C6.25688 8.57306 6.23234 8.36898 6.18466 8.17861C6.13697 7.98823 6.06709 7.8153 5.979 7.66972L1.61764 0.446549C1.25657 -0.151447 0.64845 -0.151447 0.277877 0.462286Z"
              fill="#A9A9A9"
              fillOpacity="0.73"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
