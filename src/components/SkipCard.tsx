import React from 'react';
import { formatPrice } from '../utils/formatters';

export interface SkipCardProps {
  id: string;
  size: number;
  weeklyPrice: number;
  totalPrice: number;
  hirePeriod: number;
  privatePropertyOnly?: boolean;
  notSuitableForHeavyWaste?: boolean;
  isSelected: boolean;
  onSelect: (id: string) => void;
  disabled?: boolean;
  transportCost?: number | null;
}

const SkipCard: React.FC<SkipCardProps> = ({ 
  id,
  size, 
  weeklyPrice,
  totalPrice, 
  hirePeriod, 
  privatePropertyOnly = false, 
  notSuitableForHeavyWaste = false,
  isSelected,
  onSelect,
  disabled = false,
  transportCost
}) => {
  return (
    <div className={`bg-gray-900 rounded-lg overflow-hidden shadow-lg transition-all duration-200 h-full flex flex-col relative ${isSelected ? 'border-2 border-blue-500 transform scale-[1.02]' : 'border-2 border-transparent'} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
      
      {/* Transport cost badge */}
      <div className="absolute top-1 xs:top-2 right-1 xs:right-2 z-10">
        <span className={`inline-flex items-center justify-center px-1 xs:px-2 py-0.5 xs:py-1 text-[10px] xs:text-xs font-bold leading-none rounded-full ${transportCost ? 'bg-purple-600 text-white' : 'bg-green-800 text-white'}`}>
          {transportCost ? `£${formatPrice(transportCost)} Transport Fee Included` : 'Free Transport'}
        </span>
      </div>
      
      <div className="p-2 xs:p-4 flex-none">
        <h3 className="text-lg xs:text-xl font-bold text-white">{size} Yard Skip</h3>
        <p className="text-gray-400 text-xs xs:text-sm">{hirePeriod} day hire period</p>
      </div>
      
      <div className="px-2 xs:px-4 pb-1 xs:pb-2 space-y-0.5 xs:space-y-1 flex-none min-h-[30px] xs:min-h-[40px]">
        {privatePropertyOnly && (
          <div className="flex items-center space-x-1 xs:space-x-2">
            <span className="text-yellow-500 text-xs">⚠️</span>
            <span className="text-yellow-500 text-[10px] xs:text-xs">Private Property Only</span>
          </div>
        )}
        {notSuitableForHeavyWaste && (
          <div className="flex items-center space-x-1 xs:space-x-2">
            <span className="text-red-500 text-xs">⚠️</span>
            <span className="text-red-500 text-[10px] xs:text-xs">Not Suitable for Heavy Waste</span>
          </div>
        )}
      </div>
      
      <div className="p-2 xs:p-4 mt-auto flex-grow flex flex-col justify-end">
        <div className="flex justify-end gap-1 xs:gap-2 items-center mb-2 xs:mb-4">
          <span className="text-blue-500 text-xl xs:text-2xl font-bold">£{formatPrice(weeklyPrice)}</span>
          <span className="text-gray-400 text-xs xs:text-sm">per week</span>
        </div>
        
        <button 
          onClick={() => !disabled && onSelect(id)}
          disabled={disabled}
          className={`w-full py-1.5 xs:py-2 px-3 xs:px-4 rounded-md transition duration-120 flex items-center justify-center text-sm xs:text-base ${disabled 
            ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
            : isSelected 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-800 hover:bg-gray-700 text-white'}`}
        >
          <span>{disabled ? 'Not Available' : isSelected ? 'Selected' : 'Select'}</span>
        </button>
      </div>
    </div>
  );
};

export default SkipCard;
