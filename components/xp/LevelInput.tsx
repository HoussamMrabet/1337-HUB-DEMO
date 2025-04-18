"use client";
import { Gauge } from 'lucide-react';

interface LevelInputProps {
  setDefaultLevel: React.Dispatch<React.SetStateAction<number>>;
  level: number;
  onChange: (level: number) => void;
  isReadonly: boolean;
}

export function LevelInput({ setDefaultLevel, level, onChange, isReadonly }: LevelInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value.trim().replace(/^0+/, '');
  
    if (newValue.includes('.')) {
      newValue = newValue.slice(0, newValue.indexOf('.') + 3);
    }
  
    let numericValue = Math.max(0, parseFloat(newValue) || 0);
  
    if (numericValue > 30)
      numericValue = 30;
    onChange(numericValue);
    if (!isReadonly) {
      setDefaultLevel(numericValue);
    }
  };
  

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Gauge className="h-5 w-5 text-blue-400" />
      </div>
      <input
        type="number"
        value={level}
        max={30}
        onChange={handleChange}
        onFocus={handleFocus}
        readOnly={isReadonly}
        className={`pl-10 w-full h-12 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${isReadonly ? 'cursor-not-allowed focus:outline-none' : ''}`}
        placeholder="Enter your level..."
      />
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400 text-sm">
        LVL
      </div>
    </div>
  );
}
