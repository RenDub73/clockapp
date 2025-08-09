import { useState, useEffect } from 'react';

const DigitalClock = ({ timezone = 'UTC' }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(date);
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  const timeString = formatTime(time);
  const [hours, minutes, seconds] = timeString.split(':');

  return (
    <div className="flex flex-col items-center justify-center p-8">
      {/* Main clock display */}
      <div className="glass-morphism rounded-3xl p-8 mb-6">
        <div className="flex items-center justify-center space-x-2 text-6xl md:text-8xl font-mono font-bold">
          <span className="gradient-text pulse-glow">{hours}</span>
          <span className="text-foreground animate-pulse opacity-80">:</span>
          <span className="gradient-text pulse-glow">{minutes}</span>
          <span className="text-foreground animate-pulse opacity-80">:</span>
          <span className="gradient-text pulse-glow">{seconds}</span>
        </div>
      </div>

      {/* Date display */}
      <div className="glass-morphism rounded-2xl px-6 py-3 mb-4">
        <div className="text-lg md:text-xl text-center font-medium">
          {formatDate(time)}
        </div>
      </div>

      {/* Timezone display */}
      <div className="glass-morphism rounded-xl px-4 py-2">
        <div className="text-sm font-medium opacity-80">
          {timezone}
        </div>
      </div>
    </div>
  );
};

export default DigitalClock;

