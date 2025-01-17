import React, { useEffect, useState } from "react";
import logo from "../assets/xurpaslogo.svg";
import notificationBell from "../assets/icons/notification-bell.svg";
import hamburgerIcon from "../assets/icons/hamburger.svg";
import LogoutButton from "./LogoutButton";
import { getDateAndTime } from "../utils/commonUtils";
import { useAppSelector } from "../hooks";

interface TopBarProps {
  onClick: () => void;
}

const Topbar = ({ onClick }: TopBarProps) => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    setIsProfileOpen(false);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsNotificationsOpen(false);
  };

  const { userData } = useAppSelector((state) => state.login);

  const [dateTime, setDateTime] = useState({
    dayOfWeek: "",
    date: "",
    time: "",
  });

  useEffect(() => {
    const updateDateTime = () => {
      setDateTime(getDateAndTime());
    };

    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="bg-white cursor-default text-black border-b border-gray-300 p-4 fixed top-0 left-0 right-0 z-20 flex justify-between items-center">
      <div className="flex items-center lg:space-x-2">
        <button className="block lg:hidden" onClick={onClick}>
          <img className="hover:opacity-50" src={hamburgerIcon} alt="" />
        </button>

        <img src={logo} alt="Logo" className="h-10 w-10" />
        <h1 className="text-xl font-semibold pr-8 hidden lg:block">
          Software Builders
        </h1>
        <div className="border px-4 py-2 rounded-lg hidden lg:block">
          <span className="text-zinc-700">{dateTime.dayOfWeek}, </span>
          <span className="font-semibold">
            {dateTime.date} | {dateTime.time}
          </span>
        </div>
      </div>
      <div className="flex gap-4 items-center justify-center">
        <div className="relative flex items-center justify-center">
          <button
            onClick={toggleNotifications}
            className="text-black hover:text-blue-600 transition-colors"
          >
            <span className="absolute bg-rose-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center -right-1 -top-1">
              2
            </span>
            <img
              src={notificationBell}
              alt="Notifications"
              title="Notifications"
              width={25}
              height={25}
            />
          </button>
          {isNotificationsOpen && (
            <div className="absolute right-0 top-9 w-48 bg-white border border-gray-300 rounded shadow-lg z-30">
              <ul className="p-2 space-y-1">
                <li className="p-2 hover:bg-gray-100 cursor-pointer rounded-md">
                  Notification 1
                </li>
                <li className="p-2 hover:bg-gray-100 cursor-pointer rounded-md">
                  Notification 2
                </li>
                <li className="p-2 hover:bg-gray-100 cursor-pointer rounded-md">
                  Notification 3
                </li>
              </ul>
            </div>
          )}
        </div>
        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={toggleProfile}
            className="flex items-center text-black hover:text-blue-600 transition-colors"
          >
            <div className="w-10 h-10 flex items-center justify-center mr-2 rounded-full bg-slate-300">
              {userData?.full_name.charAt(0) || "U"}
            </div>
            <span className="hidden lg:block">
              {userData?.full_name || "Unknown User"}
            </span>
            <svg
              className={`ml-2 w-4 h-4 transform transition-transform ${
                isProfileOpen ? "rotate-180" : "rotate-0"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg z-30">
              <ul className="p-2 space-y-1">
                <LogoutButton />
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
