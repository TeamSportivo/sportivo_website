
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import CustomButton from "@/components/ui/CustomButton";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-lg">
        <div className="mb-6 text-primary text-9xl font-bold opacity-20">404</div>
        <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
        <p className="text-xl text-gray-600 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <CustomButton to="/" icon={<ArrowLeft size={18} />}>
          Back to Home
        </CustomButton>
      </div>
    </div>
  );
};

export default NotFound;
