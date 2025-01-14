import React, { useEffect, useState } from "react";

const ClockCard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-sm">
  <h3 className="text-sm text-gray-400 mb-2">Current Time</h3>
  <p className="text-2xl font-bold text-gray-200">
    {currentTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })}
  </p>
</div>
  );
};

export default ClockCard;
