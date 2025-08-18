import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  FaTimes,
  FaTachometerAlt,
  FaCog,
  FaChartLine,
  FaBars,
  FaCreditCard,
  FaHistory,
} from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const navItems = [
    { name: "Dashboard", icon: <FaTachometerAlt />, path: "/quiz" },
    { name: "History", icon: <FaHistory />, path: "/history" },
    { name: "Billing", icon: <FaCreditCard />, path: "/payment" },
    { name: "Settings", icon: <FaCog />, path: "/settings" },
    { name: "Logout", icon: <FiLogOut />, path: "/logout" },
    // { name: "Reports", icon: <FaChartLine /> },
  ];
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  return (
    <div className="sticky top-0 flex h-full max-sm:fixed z-100">
      {!isOpen && (
        <button
          onClick={toggleSidebar}
          className="absolute z-50 p-2 text-white bg-gray-800 rounded top-4 left-4 md:hidden"
        >
          <FaBars /> {/* From react-icons/fa */}
        </button>
      )}
      {/* Sidebar */}
      <div
        className={`h-screen bg-[var(--primary-color)] text-white flex flex-col justify-between transition-all duration-300 overflow-hidden ${
          isOpen ? "md:w-64 w-50" : "w-0 md:w-17"
        }`}
      >
        {/* Top Section */}
        <div>
          {/* Header */}
          <div className="flex items-center justify-between p-2 pt-4 border-b border-white">
            {/* App Logo */}
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={toggleSidebar}
            >
              <img
                src="https://i.pravatar.cc/40"
                // alt="Logo"
                className="rounded-full"
              />
              <span
                className={`text-xl font-bold ${
                  isOpen
                    ? "translate-y-0 transistion-all duration-300"
                    : "opacity-0 -translate-y-4 transition-all duration-300"
                }`}
              >
                MyApp
              </span>
            </div>

            {isOpen && (
              <button className="pr-4 text-lg" onClick={toggleSidebar}>
                <FaTimes />
              </button>
            )}
          </div>

          {/* Navigation */}
          <nav className="px-2 mt-6 space-y-2">
            {navItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <div key={index} className="relative group">
                  <button
                    key={index}
                    className={`flex items-center w-full px-1 text-left rounded ${
                      isActive
                        ? "bg-[var(--accent-color)]"
                        : " hover:bg-[var(--blue-green)]"
                    }`}
                    onClick={() => {
                      navigate(item.path);
                    }}
                  >
                    <span className={`text-xl w-fit h-fit p-3 rounded `}>
                      {item.icon}
                    </span>
                    <span
                      className={`ml-3 ${
                        isOpen
                          ? "translate-x-0 transition-all duration-300"
                          : "opacity-0	translate-x-4 transition-all duration-300"
                      }`}
                    >
                      {item.name}
                    </span>
                  </button>
                  {!isOpen && (
                    <span className="absolute z-50 px-2 py-1 ml-2 text-xs text-white transition-opacity duration-200 delay-100 -translate-y-1/2 bg-gray-900 rounded shadow-lg opacity-0 left-full top-1/2 group-hover:opacity-100 whitespace-nowrap">
                      {item.name}
                    </span>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* User Info */}
        <div className="flex items-center p-2 pb-4 border-t border-white">
          <img src={user?.avatar} alt="User" className="h-10 rounded-full " />
          {/* <div className="w-full h-10 border rounded-full"> */}
          {/* </div> */}
          <span
            className={`ml-3 text-sm ${
              isOpen
                ? "translate-x-0 transition-all duration-300"
                : "opacity-0	translate-x-4 transition-all duration-300"
            }`}
          >
            <span className="inline-block font-semibold whitespace-nowrap ">
              {user?.name}
            </span>
            <span className="block truncate w-45">{user?.email}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
