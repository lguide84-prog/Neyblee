import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white px-4">
      
      {/* 404 Text */}
      <h1 className="text-9xl font-extrabold bg-gradient-to-r from-blue-500 to-cyan-400 text-transparent bg-clip-text">
        404
      </h1>

      {/* Title */}
      <h2 className="text-2xl md:text-3xl font-semibold mt-4">
        Page Not Found
      </h2>

      {/* Description */}
      <p className="text-gray-400 mt-2 text-center max-w-md">
        Oops! The page you are looking for doesn’t exist or has been moved.
      </p>

      

    </div>
  );
};

export default NotFound;