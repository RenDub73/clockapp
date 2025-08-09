import { useState, useEffect } from 'react';

const AnalogClock = ({ timezone = 'UTC' }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getTimeInTimezone = (date) => {
    return new Date(date.toLocaleString("en-US", { timeZone: timezone }));
  };

  const currentTime = getTimeInTimezone(time);
  const hours = currentTime.getHours() % 12;
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();

  // Calculate angles for clock hands
  const secondAngle = (seconds * 6) - 90; // 6 degrees per second
  const minuteAngle = (minutes * 6) + (seconds * 0.1) - 90; // 6 degrees per minute + smooth movement
  const hourAngle = (hours * 30) + (minutes * 0.5) - 90; // 30 degrees per hour + smooth movement

  // Generate hour markers
  const hourMarkers = [];
  for (let i = 0; i < 12; i++) {
    const angle = (i * 30) * (Math.PI / 180);
    const x1 = 150 + Math.cos(angle) * 130;
    const y1 = 150 + Math.sin(angle) * 130;
    const x2 = 150 + Math.cos(angle) * 110;
    const y2 = 150 + Math.sin(angle) * 110;
    
    hourMarkers.push(
      <line
        key={i}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="currentColor"
        strokeWidth="4"
        className="text-primary"
        style={{
          filter: 'drop-shadow(0 0 3px rgba(255, 255, 255, 0.5))'
        }}
      />
    );
  }

  // Generate minute markers
  const minuteMarkers = [];
  for (let i = 0; i < 60; i++) {
    if (i % 5 !== 0) { // Skip hour markers
      const angle = (i * 6) * (Math.PI / 180);
      const x1 = 150 + Math.cos(angle) * 130;
      const y1 = 150 + Math.sin(angle) * 130;
      const x2 = 150 + Math.cos(angle) * 120;
      const y2 = 150 + Math.sin(angle) * 120;
      
      minuteMarkers.push(
        <line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="currentColor"
          strokeWidth="1"
          className="text-muted-foreground opacity-60"
        />
      );
    }
  }

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="relative floating">
        {/* Outer glow ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 opacity-20 blur-xl scale-110 animate-pulse"></div>
        
        {/* Clock container */}
        <div className="relative glass-morphism rounded-full p-4">
          <svg width="300" height="300" className="drop-shadow-2xl">
            {/* Outer ring gradient */}
            <defs>
              <linearGradient id="clockGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.3)" />
                <stop offset="50%" stopColor="rgba(255, 255, 255, 0.1)" />
                <stop offset="100%" stopColor="rgba(255, 255, 255, 0.3)" />
              </linearGradient>
              <radialGradient id="faceGradient" cx="50%" cy="30%" r="70%">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.1)" />
                <stop offset="100%" stopColor="rgba(0, 0, 0, 0.1)" />
              </radialGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Clock face with gradient */}
            <circle
              cx="150"
              cy="150"
              r="140"
              fill="url(#faceGradient)"
              stroke="url(#clockGradient)"
              strokeWidth="3"
              className="drop-shadow-lg"
            />
            
            {/* Inner decorative ring */}
            <circle
              cx="150"
              cy="150"
              r="120"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-primary opacity-30"
            />
            
            {/* Hour markers */}
            {hourMarkers}
            
            {/* Minute markers */}
            {minuteMarkers}
            
            {/* Hour numbers with glow */}
            {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num, i) => {
              const angle = (i * 30) * (Math.PI / 180);
              const x = 150 + Math.cos(angle) * 95;
              const y = 150 + Math.sin(angle) * 95;
              return (
                <text
                  key={num}
                  x={x}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-xl font-bold text-primary"
                  fill="currentColor"
                  filter="url(#glow)"
                >
                  {num}
                </text>
              );
            })}
            
            {/* Hour hand with gradient */}
            <line
              x1="150"
              y1="150"
              x2={150 + Math.cos(hourAngle * Math.PI / 180) * 60}
              y2={150 + Math.sin(hourAngle * Math.PI / 180) * 60}
              stroke="currentColor"
              strokeWidth="8"
              strokeLinecap="round"
              className="text-primary"
              filter="url(#glow)"
              style={{
                transition: 'all 0.5s ease-in-out'
              }}
            />
            
            {/* Minute hand with gradient */}
            <line
              x1="150"
              y1="150"
              x2={150 + Math.cos(minuteAngle * Math.PI / 180) * 85}
              y2={150 + Math.sin(minuteAngle * Math.PI / 180) * 85}
              stroke="currentColor"
              strokeWidth="6"
              strokeLinecap="round"
              className="text-primary"
              filter="url(#glow)"
              style={{
                transition: 'all 0.5s ease-in-out'
              }}
            />
            
            {/* Second hand with special styling */}
            <line
              x1="150"
              y1="150"
              x2={150 + Math.cos(secondAngle * Math.PI / 180) * 100}
              y2={150 + Math.sin(secondAngle * Math.PI / 180) * 100}
              stroke="#ff6b6b"
              strokeWidth="3"
              strokeLinecap="round"
              filter="url(#glow)"
              style={{
                transition: seconds === 0 ? 'none' : 'all 0.1s ease-out'
              }}
            />
            
            {/* Center dot with gradient */}
            <circle
              cx="150"
              cy="150"
              r="12"
              fill="currentColor"
              className="text-primary"
              filter="url(#glow)"
            />
            <circle
              cx="150"
              cy="150"
              r="6"
              fill="#ff6b6b"
            />
          </svg>
        </div>
      </div>
      
      {/* Date display */}
      <div className="glass-morphism rounded-2xl px-6 py-3 mb-4 mt-6">
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

      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-5 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-5 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-5 animate-pulse delay-2000"></div>
      </div>
    </div>
  );
};

export default AnalogClock;

