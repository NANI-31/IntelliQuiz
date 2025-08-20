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
import { motion, AnimatePresence } from "framer-motion";
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const navItems = [
    { name: "Dashboard", icon: <FaTachometerAlt />, path: "/quiz" },
    { name: "History", icon: <FaHistory />, path: "/history" },
    { name: "Pricing", icon: <FaCreditCard />, path: "/pricing" },
    { name: "Settings", icon: <FaCog />, path: "/settings" },
    { name: "Logout", icon: <FiLogOut />, path: "/logout" },
    // { name: "Reports", icon: <FaChartLine /> },
  ];
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  console.log(user.avatar);
  const sidebarVariants = {
    open: { width: "16rem", transition: { stiffness: 300 } },
    closed: {
      width: "4.25rem",
      transition: { stiffness: 100, damping: 2 },
    },
  };

  const textVariants = {
    open: { opacity: 1, x: 0, display: "block", transition: { delay: 0.1 } },
    closed: { opacity: 0, x: 20, transitionEnd: { display: "none" } },
  };
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
      {/* <div
        className={`h-screen bg-[var(--primary-color)] text-white flex flex-col justify-between transition-all duration-300 overflow-hidden ${
          isOpen ? "md:w-64 w-50" : "w-0 md:w-17"
        }`}
      > */}
      <motion.div
        className="h-screen bg-[var(--primary-color)] text-white flex flex-col justify-between overflow-hidden"
        variants={sidebarVariants}
        animate={isOpen ? "open" : "closed"}
        initial={false}
      >
        {/* Top Section */}
        <div>
          {/* Header */}
          <div className="flex items-center justify-between p-2 pt-4 border-b border-white">
            {/* App Logo */}
            <div
              className="flex items-center w-10 h-10 ml-1 space-x-2 cursor-pointer"
              onClick={toggleSidebar}
            >
              <img
                src="/fav.png"
                // alt="Logo"
                className="rounded-full "
              />
              <motion.span
                className="text-xl font-bold"
                variants={textVariants}
                animate={isOpen ? "open" : "closed"}
              >
                IntelliQuiz
              </motion.span>
            </div>

            {/* {isOpen && ( */}
            <motion.button
              className="pr-4 text-lg"
              onClick={toggleSidebar}
              variants={textVariants}
              animate={isOpen ? "open" : "closed"}
            >
              <FaTimes />
            </motion.button>
            {/* )} */}
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
                    <motion.span
                      className="ml-3"
                      variants={textVariants}
                      animate={isOpen ? "open" : "closed"}
                    >
                      {item.name}
                    </motion.span>
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
          <img
            // src={user?.avatar}
            src="https://lh3.googleusercontent.com/a/ACg8ocIciQdI7usLB5TUrZypqBWyW-3wYBF4D8Zdl67o2JecWOtxucT2=s96-c"
            alt="User"
            onError={(e) => {
              e.target.src = "/default-avatar.png";
            }}
            loading="lazy"
            className="h-10 rounded-full "
          />
          {/* <div className="w-full h-10 border rounded-full"> */}
          {/* </div> */}
          <motion.div
            className="ml-3 text-sm"
            variants={textVariants}
            animate={isOpen ? "open" : "closed"}
          >
            <span className="inline-block font-semibold whitespace-nowrap">
              {user?.name}
            </span>
            <span className="block truncate w-45">{user?.email}</span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Sidebar;
