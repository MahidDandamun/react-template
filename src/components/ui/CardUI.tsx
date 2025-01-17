import React from "react";

interface CardProps {
  title: string;
  value: string;
  status: string;
  period: string;
  percentage: string;
}

const CardUI = ({ title, value, status, period, percentage }: CardProps) => {
  return (
    <div className="border rounded-lg p-5 min-w-80 lg:w-full">
      <h2 className="text-zinc-500 text-lg mb-3">{title}</h2>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-2xl font-bold">{value}</p>
          <span className="text-zinc-500 text-base">{period}</span>
        </div>
        <div
          className={`flex items-center ${
            status === "increase"
              ? "bg-green-200 text-green-800"
              : "bg-red-200 text-red-800"
          } px-2 lg:px-4 py-1 rounded text-base font-medium`}
        >
          <svg
            className={`w-3 h-3 me-1.5 ${
              status === "increase" ? "rotate-0" : "rotate-180"
            }`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13V1m0 0L1 5m4-4 4 4"
            />
          </svg>
          <p>{percentage}%</p>
        </div>
      </div>
    </div>
  );
};

export default CardUI;
