import React from "react";
import noDataIcon from "../../assets/icons/no-data.svg";

interface NoDataUIProps {
  text: string;
  subText: string;
  buttonName?: string;
  simpleLayout?: boolean;
}

const NoDataUI = ({
  text,
  subText,
  buttonName,
  simpleLayout = false,
}: NoDataUIProps) => {
  return (
    <div
      className={`border cursor-default rounded-lg flex flex-col gap-5 items-center justify-center bg-zinc-100 p-7 ${
        simpleLayout ? "py-[5rem]" : "min-h-[70vh]"
      }`}
    >
      <img src={noDataIcon} alt="" width="45" height="45" />

      <div className="flex flex-col gap-1 items-center justify-center text-center">
        <p className="text-lg font-bold">{text}</p>
        <p className="text-zinc-500">{subText}</p>
      </div>
    </div>
  );
};

export default NoDataUI;
