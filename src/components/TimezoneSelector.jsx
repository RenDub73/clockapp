import { useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { ChevronDown, Globe } from 'lucide-react';

const TimezoneSelector = ({ selectedTimezone, onTimezoneChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const timezones = [
    { value: 'UTC', label: 'UTC (Coordinated Universal Time)', offset: '+00:00' },
    { value: 'America/New_York', label: 'New York (EST/EDT)', offset: '-05:00/-04:00' },
    { value: 'America/Los_Angeles', label: 'Los Angeles (PST/PDT)', offset: '-08:00/-07:00' },
    { value: 'America/Chicago', label: 'Chicago (CST/CDT)', offset: '-06:00/-05:00' },
    { value: 'America/Denver', label: 'Denver (MST/MDT)', offset: '-07:00/-06:00' },
    { value: 'Europe/London', label: 'London (GMT/BST)', offset: '+00:00/+01:00' },
    { value: 'Europe/Paris', label: 'Paris (CET/CEST)', offset: '+01:00/+02:00' },
    { value: 'Europe/Berlin', label: 'Berlin (CET/CEST)', offset: '+01:00/+02:00' },
    { value: 'Europe/Moscow', label: 'Moscow (MSK)', offset: '+03:00' },
    { value: 'Asia/Tokyo', label: 'Tokyo (JST)', offset: '+09:00' },
    { value: 'Asia/Shanghai', label: 'Shanghai (CST)', offset: '+08:00' },
    { value: 'Asia/Kolkata', label: 'Mumbai (IST)', offset: '+05:30' },
    { value: 'Asia/Dubai', label: 'Dubai (GST)', offset: '+04:00' },
    { value: 'Australia/Sydney', label: 'Sydney (AEST/AEDT)', offset: '+10:00/+11:00' },
    { value: 'Pacific/Auckland', label: 'Auckland (NZST/NZDT)', offset: '+12:00/+13:00' },
    { value: 'America/Sao_Paulo', label: 'São Paulo (BRT)', offset: '-03:00' },
    { value: 'America/Mexico_City', label: 'Mexico City (CST)', offset: '-06:00' },
    { value: 'Africa/Cairo', label: 'Cairo (EET)', offset: '+02:00' },
    { value: 'Africa/Johannesburg', label: 'Johannesburg (SAST)', offset: '+02:00' },
    { value: 'Asia/Seoul', label: 'Seoul (KST)', offset: '+09:00' },
  ];

  const selectedTz = timezones.find(tz => tz.value === selectedTimezone) || timezones[0];

  const handleTimezoneSelect = (timezone) => {
    onTimezoneChange(timezone.value);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        className="glass-morphism border-0 hover:scale-105 transition-all duration-300 flex items-center gap-3 px-6 py-3 min-w-[280px] justify-between"
      >
        <div className="flex items-center gap-3">
          <Globe className="w-5 h-5 animate-pulse" />
          <div className="text-left">
            <div className="font-medium">{selectedTz.label.split(' (')[0]}</div>
            <div className="text-xs opacity-70">{selectedTz.offset}</div>
          </div>
        </div>
        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50">
          <div className="glass-morphism rounded-2xl border-0 max-h-80 overflow-y-auto">
            <div className="p-2">
              {timezones.map((timezone) => (
                <button
                  key={timezone.value}
                  onClick={() => handleTimezoneSelect(timezone)}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 hover:bg-white/10 ${
                    selectedTimezone === timezone.value ? 'bg-white/20' : ''
                  }`}
                >
                  <div className="font-medium">{timezone.label.split(' (')[0]}</div>
                  <div className="text-xs opacity-70 mt-1">
                    {timezone.label.includes('(') ? timezone.label.split('(')[1].replace(')', '') : ''} • {timezone.offset}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Backdrop to close dropdown */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default TimezoneSelector;

