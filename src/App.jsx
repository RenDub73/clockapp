import { useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Clock, Watch, Sun, Moon } from 'lucide-react';
import DigitalClock from './components/DigitalClock';
import AnalogClock from './components/AnalogClock';
import TimezoneSelector from './components/TimezoneSelector';
import CountdownTimer from './components/CountdownTimer';
import './App.css';

function App() {
  const [isDigital, setIsDigital] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedTimezone, setSelectedTimezone] = useState('UTC');

  const toggleClockType = () => {
    setIsDigital(!isDigital);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleTimezoneChange = (timezone) => {
    setSelectedTimezone(timezone);
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${isDarkMode ? 'dark' : ''}`}>
      <div className="min-h-screen relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-400/10 via-pink-400/10 to-blue-400/10 animate-pulse"></div>
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
          <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-3000"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-8">
          {/* Header with controls */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-6">
            <div className="text-center sm:text-left">
              <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-2 floating">
                Digital & Analog Clock
              </h1>
              <p className="text-lg opacity-80">
                Beautiful timepiece with stunning visuals
              </p>
            </div>
            
            <div className="flex gap-4">
              {/* Clock type toggle */}
              <Button
                onClick={toggleClockType}
                variant="outline"
                size="lg"
                className="glass-morphism border-0 hover:scale-105 transition-all duration-300 flex items-center gap-3 px-6 py-3"
              >
                {isDigital ? (
                  <Watch className="w-5 h-5 animate-pulse" />
                ) : (
                  <Clock className="w-5 h-5 animate-pulse" />
                )}
                <span className="font-medium">
                  {isDigital ? 'Analog View' : 'Digital View'}
                </span>
              </Button>
              
              {/* Theme toggle */}
              <Button
                onClick={toggleTheme}
                variant="outline"
                size="lg"
                className="glass-morphism border-0 hover:scale-105 transition-all duration-300 flex items-center gap-3 px-6 py-3"
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 animate-spin" style={{ animationDuration: '8s' }} />
                ) : (
                  <Moon className="w-5 h-5 animate-pulse" />
                )}
                <span className="font-medium">
                  {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </span>
              </Button>
            </div>
          </div>

          {/* Clock display */}
          <div className="flex justify-center mb-12">
            <div className="relative">
              {/* Clock transition container */}
              <div className={`transition-all duration-700 transform ${isDigital ? 'scale-100 opacity-100' : 'scale-95 opacity-0 absolute inset-0'}`}>
                {isDigital && <DigitalClock timezone={selectedTimezone} />}
              </div>
              <div className={`transition-all duration-700 transform ${!isDigital ? 'scale-100 opacity-100' : 'scale-95 opacity-0 absolute inset-0'}`}>
                {!isDigital && <AnalogClock timezone={selectedTimezone} />}
              </div>
            </div>
          </div>

          {/* Timezone selector */}
          <div className="flex justify-center mb-12">
            <TimezoneSelector 
              selectedTimezone={selectedTimezone}
              onTimezoneChange={handleTimezoneChange}
            />
          </div>

          {/* Countdown Timer */}
          <div className="mb-12">
            <CountdownTimer />
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="glass-morphism rounded-2xl p-6 text-center floating" style={{ animationDelay: '0.2s' }}>
              <div className="text-2xl mb-3">🌍</div>
              <h3 className="font-semibold mb-2">Timezone Selection</h3>
              <p className="text-sm opacity-70">Choose from worldwide timezones</p>
            </div>
            
            <div className="glass-morphism rounded-2xl p-6 text-center floating" style={{ animationDelay: '0.4s' }}>
              <div className="text-2xl mb-3">⏱️</div>
              <h3 className="font-semibold mb-2">Countdown Timer</h3>
              <p className="text-sm opacity-70">With voice countdown feature</p>
            </div>
            
            <div className="glass-morphism rounded-2xl p-6 text-center floating" style={{ animationDelay: '0.6s' }}>
              <div className="text-2xl mb-3">✨</div>
              <h3 className="font-semibold mb-2">Visual Effects</h3>
              <p className="text-sm opacity-70">Stunning animations and transitions</p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-center mt-12">
            <div className="glass-morphism rounded-xl px-4 py-2 pulse-glow">
              <div className="text-sm font-medium opacity-80">
                ✨ Stunning clock with all features complete!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

