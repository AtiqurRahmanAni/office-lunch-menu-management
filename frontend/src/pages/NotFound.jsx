import React from "react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="text-center">
        <h1 className="text-2xl text-red-600">404 - Page Not Found</h1>
        <p className="mt-2 text-lg">
          The page you are looking for does not exist.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
