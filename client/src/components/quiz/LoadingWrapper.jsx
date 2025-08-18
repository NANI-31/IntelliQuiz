import React from "react";

export default function LoadingWrapper({
  loading,
  message = "Loading...",
  children,
  fullScreen = false,
}) {
  if (loading) {
    const wrapperClass = fullScreen
      ? "fixed inset-0 z-50 bg-white flex justify-center items-center"
      : "w-max max-w-[600px] mb-4 flex justify-center items-center gap-1";
    return (
      <div className="w-max max-w-[600px] mb-4 flex justify-center items-center gap-1">
        <div className="w-5 h-5 rounded-full bg-gradient-to-r from-[var(--vivid-sky-blue)] to-[var(--accent-color)] flex justify-center items-center animate-spin">
          <div className="w-3 h-3 bg-white rounded-full"></div>
        </div>
        <span className="ml-2">{message}</span>
      </div>
    );
  }

  return <>{children}</>;
}
