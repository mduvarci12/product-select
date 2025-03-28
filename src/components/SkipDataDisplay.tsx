import React, { useEffect, useState } from 'react';
import { useSkipData } from '../hooks/useSkipData';
import { Skip } from '../services/api';
import SkipCard from './SkipCard';
import { formatPrice, calculatePriceWithVAT, calculateTotalPrice } from '../utils/formatters';

// Default hire period if not specified
const DEFAULT_HIRE_PERIOD = 14;

const SkipDataDisplay: React.FC = () => {
  const { 
    skips, 
    loading, 
    error 
  } = useSkipData({ fetchOnMount: true });
  
  const [selectedSkipId, setSelectedSkipId] = useState<string | null>(null);
  const [bannerVisible, setBannerVisible] = useState<boolean>(false);
  const [showOnlyAvailable, setShowOnlyAvailable] = useState<boolean>(false);
  
  const [selectedSkip, setSelectedSkip] = useState<Skip | null>(null);
  
  const handleSelectSkip = (id: string) => {
    const skip = skips.find((s: Skip) => s.id.toString() === id) || null;
    
    setSelectedSkipId(id);
    setSelectedSkip(skip);
    
    if (selectedSkipId) {
      // Only animate the banner, not the card selection
      setBannerVisible(false);
      setTimeout(() => {
        setBannerVisible(true);
      }, 200); 
    } else {
      setBannerVisible(true);
    }
  };
  
  const handleContinue = () => {
    console.log('Continuing with skip ID:', selectedSkipId);
    
    // Show alert with skip ID and thank you message
    if (selectedSkipId && selectedSkip) {
      alert(`Thank you for your time! You have selected Skip ID: ${selectedSkipId} (${selectedSkip.size} Yard Skip).`);
    }
  };
  
  const handleBack = () => {
    console.log('Going back');
  };

  useEffect(() => {
    if (selectedSkipId && skips.length > 0) {
      const skip = skips.find((s: Skip) => s.id.toString() === selectedSkipId) || null;
      setSelectedSkip(skip);
    }
  }, [skips, selectedSkipId]);

  useEffect(() => {
    // Check if screen is small (phone-sized) - only on initial load
    const isMobileScreen = window.innerWidth < 640; // 640px is common breakpoint for small screens
    if (isMobileScreen) {
      setShowOnlyAvailable(true);
    }
  }, []);

  useEffect(() => {
    return () => {
      setBannerVisible(false);
    };
  }, []);

  return (
    <div className="relative pb-40 sm:pb-24">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Choose Your Skip Size</h2>
        <p className="text-gray-400">Select the skip size that best suits your needs</p>
      </div>
      
      {error && (
        <div className="bg-red-900/50 border-l-4 border-red-500 p-4 mb-6 text-white">
          <div className="flex items-center">
            <svg className="h-6 w-6 text-red-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <p className="font-bold">Error Loading Skip Data</p>
              <p className="text-sm">{error}</p>
              <p className="text-sm mt-1">Please try again or contact support if the problem persists.</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center mb-4">
        <label className="inline-flex items-center cursor-pointer">
          <input 
            type="checkbox" 
            className="sr-only peer" 
            checked={showOnlyAvailable} 
            onChange={(e) => setShowOnlyAvailable(e.target.checked)}
          />
          <div className="relative w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          <span className="ms-3 text-sm font-medium text-white">Show only available skips</span>
        </label>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center my-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-400">Loading skip data...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {skips
            .filter(skip => !showOnlyAvailable || skip.allows_heavy_waste)
            .map((skip) => {
              // Calculate price with VAT
              const weeklyPrice = calculatePriceWithVAT(skip.price_before_vat, skip.vat);
              const hirePeriod = skip.hire_period_days || DEFAULT_HIRE_PERIOD;
              // Calculate total price based on hire period
              const totalPrice = calculateTotalPrice(weeklyPrice, hirePeriod);
              // Determine properties based on API data
              const privatePropertyOnly = !skip.allowed_on_road;
              const notSuitableForHeavyWaste = !skip.allows_heavy_waste;
              
              return (
                <SkipCard
                  key={skip.id.toString()}
                  id={skip.id.toString()}
                  size={skip.size}
                  weeklyPrice={weeklyPrice}
                  totalPrice={totalPrice}
                  hirePeriod={hirePeriod}
                  privatePropertyOnly={privatePropertyOnly}
                  notSuitableForHeavyWaste={notSuitableForHeavyWaste}
                  isSelected={selectedSkipId === skip.id.toString()}
                  onSelect={handleSelectSkip}
                  disabled={notSuitableForHeavyWaste}
                  transportCost={skip.transport_cost}
                />
              );
            })}
        </div>
      )}
      
      <div className="fixed bottom-0 left-0 right-0 border-t border-gray-800 bg-gray-900 pt-3 pb-4 sm:pt-4 sm:pb-6 px-3 sm:px-4 md:px-8 transition-all duration-300 ease-in-out z-50">
        <div className="flex flex-col xs:flex-row justify-between items-center max-w-7xl mx-auto gap-3 xs:gap-0">
          {selectedSkipId && selectedSkip && (
            <div className={`text-white transition-all duration-300 ease-in-out transform ${bannerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} text-center xs:text-left`}>
              <span className="text-blue-500 text-xl xs:text-2xl font-bold">£{
                formatPrice(calculateTotalPrice(
                  calculatePriceWithVAT(selectedSkip.price_before_vat, selectedSkip.vat),
                  selectedSkip.hire_period_days || DEFAULT_HIRE_PERIOD
                ))
              }</span>
              <span className="text-gray-400 text-sm ml-2">
                {selectedSkip.hire_period_days || DEFAULT_HIRE_PERIOD} days
              </span>
              <div className="text-xs text-gray-500 mt-1">
                {selectedSkip.postcode} - {selectedSkip.size} yards
              </div>
            </div>
          )}
          {!selectedSkipId && <div className="hidden xs:block"></div>}
          
          <div className="flex flex-col xs:flex-row space-y-2 xs:space-y-0 xs:space-x-4 w-full xs:w-auto">
            <button 
              onClick={handleBack}
              className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 sm:px-6 md:px-8 rounded-md transition duration-200 text-sm sm:text-base w-full xs:w-auto"
            >
              Back
            </button>
            <button 
              onClick={handleContinue}
              disabled={!selectedSkipId || loading}
              className={`py-2 px-4 sm:px-6 md:px-8 rounded-md transition duration-200 flex items-center justify-center space-x-2 text-sm sm:text-base w-full xs:w-auto ${
                loading ? 'bg-gray-700 text-gray-500 cursor-not-allowed' :
                selectedSkipId ? 'bg-blue-600 hover:bg-blue-700 text-white' : 
                'bg-gray-700 text-gray-500 cursor-not-allowed'}`}
            >
              <span>{loading ? 'Loading...' : 'Continue'}</span>
              {!loading && selectedSkipId && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkipDataDisplay;
