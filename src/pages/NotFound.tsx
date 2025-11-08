import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = (): void => {
    navigate("/");
  };

  const handleGoBack = (): void => {
    window.history.back();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-[-5.5rem] sm:mb-[-8rem]">
          <div className="relative">
            <h1 className="text-[8rem] sm:text-[12rem] font-bold text-[#eb7b44] opacity-20">
              404
            </h1>
          </div>
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold text-[#244463] mb-10 sm:mb-20">
          Page Not Found
        </h2>
        <p className="text-sm sm:text-lg text-onBackground/70 mb-8">
          The page you're looking for doesn't exist. Let's get you back!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="default"
            iconName="ArrowLeft"
            iconPosition="left"
            onClick={handleGoBack}
          >
            Go Back
          </Button>

          <Button
            variant="outline"
            iconName="Home"
            iconPosition="left"
            onClick={handleGoHome}
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
