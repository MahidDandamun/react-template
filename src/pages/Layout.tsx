import React, { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const outsideClickRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        outsideClickRef.current &&
        !outsideClickRef.current.contains(event.target as Node)
      ) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [outsideClickRef]);

  useEffect(() => {
    const body = document.body;
    if (sidebarOpen) {
      body.classList.add("overflow-hidden");
    } else {
      body.classList.remove("overflow-hidden");
    }
  }, [sidebarOpen]);

  return (
    <div className="flex flex-col h-screen">
      <ToastContainer />
      <Topbar onClick={toggleSidebar} />
      <div className="flex flex-1">
        <div ref={outsideClickRef}>
          <Sidebar onClick={toggleSidebar} toggleSidebar={sidebarOpen} />
        </div>
        <div
          className={`fixed w-full h-screen backdrop-blur-sm bg-gray-800/40 z-40 lg:hidden ${
            !sidebarOpen && "hidden"
          }`}
        ></div>
        <div className="flex-1 ml-0 mt-[75px] lg:ml-64">
          {" "}
          {/* Adjust margin-top to account for the top bar */}
          <div className="p-5 pb-10 lg:p-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
