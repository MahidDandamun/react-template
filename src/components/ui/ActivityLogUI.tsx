import React from "react";
import arrowIcon from "../../assets/icons/double-arrow.svg";

interface ActivityLogProps {
  id: string;
}

const ActivityLogUI = ({ id }: ActivityLogProps) => {
  return (
    <div
      id={id}
      className="fixed left-0 top-0 z-50 items-center overflow-x-hidden overflow-y-hidden block w-full backdrop-blur-sm h-screen p-6 bg-gray-800/40"
    >
      <div className="absolute top-0 right-0">
        <div className="flex flex-col gap-8 relative bg-white rounded-s-lg shadow h-screen w-[23rem] lg:w-[28rem]">
          <div className="flex justify-between items-center border-b px-5 py-5">
            <p className="text-lg font-bold">Activity logs</p>
            <img className="cursor-pointer hover:opacity-50" src={arrowIcon} alt="" width={32} height={32} />
          </div>
          <ol className="relative border-s border-gray-200 px-5 ms-10">
            <li className="mb-10 ms-3">
              <span className="absolute flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full -start-5 ring-8 ring-white">
                MK
              </span>
              <h3 className="flex items-center mb-1 text-md lg:text-lg text-gray-900">
                Chistian De Leon submitted PUR-0RD-2024-00008
              </h3>
              <div className="flex justify-between">
                <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                  Mon, 3:30 PM
                </time>
                <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                  Jan. 13, 2022
                </time>
              </div>
            </li>
            <li className="mb-10 ms-3">
              <span className="absolute flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full -start-5 ring-8 ring-white">
                MK
              </span>
              <h3 className="flex items-center mb-1 text-md lg:text-lg text-gray-900">
                Chistian De Leon submitted PUR-0RD-2024-00008
              </h3>
              <div className="flex justify-between">
                <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                  Mon, 3:30 PM
                </time>
                <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                  Jan. 13, 2022
                </time>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default ActivityLogUI;
