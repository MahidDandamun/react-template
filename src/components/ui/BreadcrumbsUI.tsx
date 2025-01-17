import React from "react";

interface BreadcrumbsUIProps {
  breadcrumb1?: string;
  breadcrumb2?: string;
  breadcrumb3?: string;
  currentPage?: "index" | "create"; // indicating the current page
  onBackClick?: () => void; // for for navigating the index page
}

const BreadcrumbsUI = ({
  breadcrumb1,
  breadcrumb2,
  breadcrumb3,
  currentPage,
  onBackClick,
}: BreadcrumbsUIProps) => {
  return (
    <>
      {/* if index page */}
      {currentPage === "index" && (
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md-space-x-2 rtl:space-x-reverse">
            <li className="flex items-center cursor-pointer">
              <button className="text-[0.7rem] lg:text-sm font-medium text-zinc-500 hover:text-zinc-700">
                {breadcrumb1}
              </button>
              <span className="text-gray-400 mx-2 lg:mx-3 text-zinc-500 cursor-default">
                /
              </span>
            </li>
            <li className="flex items-center cursor-pointer">
              <button className="text-[0.7rem] lg:text-sm font-medium text-zinc-500 hover:text-zinc-700">
                {breadcrumb2}
              </button>
            </li>
          </ol>
        </nav>
      )}

      {/* if create page */}
      {currentPage === "create" && (
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md-space-x-2 rtl:space-x-reverse">
            <li className="flex items-center cursor-pointer">
              <button
                onClick={onBackClick}
                className="text-[0.7rem] lg:text-sm font-medium text-zinc-500 hover:text-zinc-700"
              >
                {breadcrumb1}
              </button>
              <span className="text-gray-400 mx-2 lg:mx-3 text-zinc-500 cursor-default">
                /
              </span>
            </li>
            <li className="flex items-center cursor-pointer">
              <button
                onClick={onBackClick}
                className="text-[0.7rem] lg:text-sm font-medium text-zinc-500 hover:text-zinc-700"
              >
                {breadcrumb2}
              </button>
              <span className="text-gray-400 mx-2 lg:mx-3 text-zinc-500 cursor-default">
                /
              </span>
            </li>
            <li className="flex items-center cursor-pointer">
              <button className="text-[0.7rem] lg:text-sm font-medium text-zinc-500 hover:text-zinc-700">
                {breadcrumb3}
              </button>
            </li>
          </ol>
        </nav>
      )}
    </>
  );
};

export default BreadcrumbsUI;
