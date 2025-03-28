import React from 'react';
import {
  MapPinIcon,
  TrashIcon,
  TruckIcon,
  ShieldIcon,
  CalendarIcon,
  CreditCardIcon
} from './icons/StepIcons';

interface ProgressStepsProps {
  currentStep: number;
}

const ProgressSteps: React.FC<ProgressStepsProps> = ({ currentStep }) => {
  const steps = [
    { 
      number: 1, 
      label: 'Postcode',
      icon: <MapPinIcon />
    },
    { 
      number: 2, 
      label: 'Waste Type',
      icon: <TrashIcon />
    },
    { 
      number: 3, 
      label: 'Select Skip',
      icon: <TruckIcon />
    },
    { 
      number: 4, 
      label: 'Permit Check',
      icon: <ShieldIcon />
    },
    { 
      number: 5, 
      label: 'Choose Date',
      icon: <CalendarIcon />
    },
    { 
      number: 6, 
      label: 'Payment',
      icon: <CreditCardIcon />
    }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8 overflow-y-visible overflow-x-auto whitespace-nowrap min-w-full pb-2">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div className="flex items-center flex-shrink-0 px-4">
              <div 
                className={`
                  flex items-center justify-center
                  ${step.number <= currentStep ? 'text-[#0037C1]' : 'text-white/60 opacity-50'}
                  ${step.number > currentStep ? 'cursor-not-allowed' : 'cursor-pointer hover:text-[#0037C1]'}
                  whitespace-nowrap transition-colors
                `}
              >
                {step.icon}
                <span 
                  className={`ml-2 text-white ${step.number === currentStep ? 'font-bold' : ''}`}
                >
                  {step.label}
                </span>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div 
                className={`w-14 h-px ${index < currentStep - 1 ? 'bg-[#0037C1]' : 'bg-[#2A2A2A]'} flex-shrink-0 mx-2`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressSteps;
