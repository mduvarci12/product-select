import React from 'react';

import SkipDataDisplay from './components/SkipDataDisplay';
import ProgressSteps from './components/ProgressSteps';

const CURRENT_STEP = 3; // DEV NOTE: should be dynamic in prod env maybe store in some place

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <main className="max-w-7xl mx-auto px-4 py-8">
        <ProgressSteps currentStep={CURRENT_STEP} /> 
        <SkipDataDisplay />
      </main>
    </div>
  );
}

export default App;
