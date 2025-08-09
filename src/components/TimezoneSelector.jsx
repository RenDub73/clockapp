import { useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { ChevronDown, Globe } from 'lucide-react';

const TimezoneSelector = ({ selectedTimezone, onTimezoneChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const timezones = [
    { value: 'Etc/GMT+12', label: 'Line Islands (GMT-12)', offset: -12 * 60 },
    { value: 'Pacific/Midway', label: 'Midway (GMT-11)', offset: -11 * 60 },
    { value: 'America/Adak', label: 'Adak (GMT-10)', offset: -10 * 60 },
    { value: 'America/Anchorage', label: 'Anchorage (GMT-9)', offset: -9 * 60 },
    { value: 'America/Los_Angeles', label: 'Los Angeles (GMT-8)', offset: -8 * 60 },
    { value: 'America/Denver', label: 'Denver (GMT-7)', offset: -7 * 60 },
    { value: 'America/Chicago', label: 'Chicago (GMT-6)', offset: -6 * 60 },
    { value: 'America/Mexico_City', label: 'Mexico City (GMT-6)', offset: -6 * 60 },
    { value: 'America/New_York', label: 'New York (GMT-5)', offset: -5 * 60 },
    { value: 'America/Caracas', label: 'Caracas (GMT-4:30)', offset: -4.5 * 60 },
    { value: 'America/Halifax', label: 'Halifax (GMT-4)', offset: -4 * 60 },
    { value: 'America/Sao_Paulo', label: 'São Paulo (GMT-3)', offset: -3 * 60 },
    { value: 'America/Noronha', label: 'Fernando de Noronha (GMT-2)', offset: -2 * 60 },
    { value: 'Atlantic/Azores', label: 'Azores (GMT-1)', offset: -1 * 60 },
    { value: 'UTC', label: 'UTC (Coordinated Universal Time)', offset: 0 },
    { value: 'Europe/London', label: 'London (GMT+0)', offset: 0 },
    { value: 'Europe/Paris', label: 'Paris (GMT+1)', offset: 1 * 60 },
    { value: 'Africa/Cairo', label: 'Cairo (GMT+2)', offset: 2 * 60 },
    { value: 'Africa/Johannesburg', label: 'Johannesburg (GMT+2)', offset: 2 * 60 },
    { value: 'Europe/Moscow', label: 'Moscow (GMT+3)', offset: 3 * 60 },
    { value: 'Asia/Dubai', label: 'Dubai (GMT+4)', offset: 4 * 60 },
    { value: 'Asia/Kolkata', label: 'Mumbai (GMT+5:30)', offset: 5.5 * 60 },
    { value: 'Asia/Shanghai', label: 'Shanghai (GMT+8)', offset: 8 * 60 },
    { value: 'Asia/Tokyo', label: 'Tokyo (GMT+9)', offset: 9 * 60 },
    { value: 'Asia/Seoul', label: 'Seoul (GMT+9)', offset: 9 * 60 },
    { value: 'Australia/Sydney', label: 'Sydney (GMT+10)', offset: 10 * 60 },
    { value: 'Pacific/Auckland', label: 'Auckland (GMT+12)', offset: 12 * 60 },
    { value: 'Pacific/Fiji', label: 'Fiji (GMT+12)', offset: 12 * 60 },
    { value: 'Pacific/Tongatapu', label: 'Tongatapu (GMT+13)', offset: 13 * 60 },
    { value: 'Pacific/Kiritimati', label: 'Kiritimati (GMT+14)', offset: 14 * 60 },
  ].sort((a, b) => a.offset - b.offset);

  const formatOffset = (offsetMinutes) => {
    const sign = offsetMinutes >= 0 ? '+' : '-';
    const absOffsetMinutes = Math.abs(offsetMinutes);
    const hours = Math.floor(absOffsetMinutes / 60);
    const minutes = absOffsetMinutes % 60;
    return `${sign}${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  };

  const selectedTz = timezones.find(tz => tz.value === selectedTimezone) || timezones[0];

  const handleTimezoneSelect = (timezone) => {
    onTimezoneChange(timezone.value);
    setIsOpen(false);
  };

  const getTimezoneDisplayName = (label) => {
    return label.split(' (')[0];
  };

  const getTimezoneCode = (label) => {
    if (label.includes('(')) {
      return label.split('(')[1].replace(')', '');
    }
    return '';
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
            <div className="font-medium">{getTimezoneDisplayName(selectedTz.label)}</div>
            <div className="text-xs opacity-70">{formatOffset(selectedTz.offset)}</div>
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
                  <div className="font-medium">{getTimezoneDisplayName(timezone.label)}</div>
                  <div className="text-xs opacity-70 mt-1">
                    {getTimezoneCode(timezone.label)} • {formatOffset(timezone.offset)}
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

