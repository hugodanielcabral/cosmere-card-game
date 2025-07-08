import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

interface AuthMessageProps {
  title: string;
  message: string;
  countdownStart: number;
  navigateTo: string;
  buttonText: string;
  pageName: string;
}

export const AuthMessage = ({
  title,
  message,
  countdownStart = 3,
  navigateTo,
  buttonText,
  pageName,
}: AuthMessageProps) => {
  const [seconds, setSeconds] = useState(countdownStart);
  const navigate = useNavigate();

  useEffect(() => {
    if (seconds === 0) navigate(navigateTo);

    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  return (
    <div className="hero">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-4xl md:text-5xl font-bold text-success">
            {title}
          </h1>
          <p className="py-6 text-lg md:text-2xl text-base-content font-bold">
            {message}
          </p>
          <p className="pb-2 text-base-content text-sm">
            You will be{" "}
            <span className="text-secondary font-bold">redirected</span> to the{" "}
            {pageName} page in{" "}
            <span className="font-bold text-secondary">{seconds}</span> seconds.
          </p>
          <p className="text-base-content text-lg pb-2 font-bold">or</p>
          <Link to={navigateTo} className="btn btn-info">
            {buttonText}
          </Link>
        </div>
      </div>
    </div>
  );
};
