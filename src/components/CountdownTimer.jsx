import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Play, Pause, RotateCcw, Timer } from 'lucide-react';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [initialTime, setInitialTime] = useState(0);
  const intervalRef = useRef(null);
  const audioRefs = useRef({});

  // Preload audio files
  useEffect(() => {
    for (let i = 1; i <= 10; i++) {
      audioRefs.current[i] = new Audio(`/src/assets/countdown-${i}.wav`);
      audioRefs.current[i].preload = 'auto';
    }
  }, []);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          const newTime = prev - 1;
          
          // Play voice countdown for last 10 seconds
          if (newTime <= 10 && newTime > 0) {
            const audio = audioRefs.current[newTime];
            if (audio) {
              audio.currentTime = 0;
              audio.play().catch(e => console.log('Audio play failed:', e));
            }
          }
          
          // Stop timer when reaching 0
          if (newTime <= 0) {
            setIsRunning(false);
            return 0;
          }
          
          return newTime;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft]);

  const startTimer = (seconds) => {
    setTimeLeft(seconds);
    setInitialTime(seconds);
    setIsRunning(true);
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(initialTime);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimerClasses = () => {
    let classes = 'text-6xl md:text-8xl font-mono font-bold transition-all duration-300';
    
    if (timeLeft <= 3 && timeLeft > 0 && isRunning) {
      classes += ' flash shake text-red-400';
    } else if (timeLeft <= 10 && timeLeft > 0 && isRunning) {
      classes += ' pulse-glow text-orange-400';
    } else {
      classes += ' gradient-text';
    }
    
    return classes;
  };

  const presets = [
    { label: '60 Seconds', value: 60 },
    { label: '30 Seconds', value: 30 },
    { label: '10 Seconds', value: 10 },
  ];

  return (
    <div className="flex flex-col items-center justify-center p-8">
      {/* Timer display */}
      <div className="glass-morphism rounded-3xl p-8 mb-8 floating">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-3 mb-4">
            <Timer className="w-8 h-8 text-primary animate-pulse" />
            <h2 className="text-2xl font-bold gradient-text">Countdown Timer</h2>
          </div>
          
          <div className={getTimerClasses()}>
            {formatTime(timeLeft)}
          </div>
          
          {timeLeft <= 3 && timeLeft > 0 && isRunning && (
            <div className="text-lg font-bold text-red-400 mt-2 animate-pulse">
              GET READY!
            </div>
          )}
        </div>
      </div>

      {/* Preset buttons */}
      <div className="flex flex-wrap gap-4 mb-6 justify-center">
        {presets.map((preset) => (
          <Button
            key={preset.value}
            onClick={() => startTimer(preset.value)}
            variant="outline"
            className="glass-morphism border-0 hover:scale-105 transition-all duration-300 px-6 py-3"
            disabled={isRunning}
          >
            {preset.label}
          </Button>
        ))}
      </div>

      {/* Control buttons */}
      <div className="flex gap-4">
        <Button
          onClick={toggleTimer}
          variant="outline"
          size="lg"
          className="glass-morphism border-0 hover:scale-105 transition-all duration-300 flex items-center gap-3 px-6 py-3"
          disabled={timeLeft === 0}
        >
          {isRunning ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5" />
          )}
          {isRunning ? 'Pause' : 'Start'}
        </Button>
        
        <Button
          onClick={resetTimer}
          variant="outline"
          size="lg"
          className="glass-morphism border-0 hover:scale-105 transition-all duration-300 flex items-center gap-3 px-6 py-3"
          disabled={timeLeft === 0 && !isRunning}
        >
          <RotateCcw className="w-5 h-5" />
          Reset
        </Button>
      </div>

      {/* Progress bar */}
      {initialTime > 0 && (
        <div className="w-full max-w-md mt-6">
          <div className="glass-morphism rounded-full h-3 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 transition-all duration-1000 ease-linear"
              style={{ 
                width: `${((initialTime - timeLeft) / initialTime) * 100}%` 
              }}
            />
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="glass-morphism rounded-xl px-4 py-2 mt-6">
        <div className="text-sm opacity-80 text-center">
          🎵 Voice countdown starts at 10 seconds • ⚡ Visual effects at 3 seconds
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;

