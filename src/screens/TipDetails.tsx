import React, { useState, useEffect } from 'react';
import { ArrowLeft, Heart, CheckCircle2 } from 'lucide-react';
import { useWellness } from '../context/WellnessContext';
import { generateTipDetails } from '../services/aiService';

const TipDetails: React.FC = () => {
  const { selectedTip, profile, setCurrentScreen, toggleSaveTip, isTipSaved } = useWellness();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [details, setDetails] = useState<{ explanation: string; steps: string[] } | null>(null);

  useEffect(() => {
    const loadDetails = async () => {
      if (!selectedTip) {
        setCurrentScreen('board');
        return;
      }

      setLoading(true);
      setError('');

      try {
        const tipDetails = await generateTipDetails(selectedTip, profile);
        setDetails(tipDetails);
      } catch (err) {
        setError('Failed to load tip details. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadDetails();
  }, [selectedTip, profile]);

  if (!selectedTip) return null;

  const saved = isTipSaved(selectedTip.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={() => setCurrentScreen('board')}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Tips</span>
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="text-6xl">{selectedTip.icon}</div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{selectedTip.title}</h1>
                <p className="text-gray-600">{selectedTip.short}</p>
              </div>
            </div>
            <button
              onClick={() => toggleSaveTip(selectedTip)}
              className={`p-3 rounded-full transition-all ${
                saved
                  ? 'bg-red-100 text-red-500'
                  : 'bg-gray-100 text-gray-400 hover:bg-red-50 hover:text-red-400'
              }`}
            >
              <Heart className={`w-6 h-6 ${saved ? 'fill-current' : ''}`} />
            </button>
          </div>

          {loading && (
            <div className="flex flex-col items-center justify-center py-12">
              <svg className="animate-spin h-12 w-12 text-blue-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-gray-600">Loading detailed guidance...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-6">
              {error}
            </div>
          )}

          {!loading && details && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Why This Works</h2>
                <div className="text-gray-700 leading-relaxed space-y-4">
                  {details.explanation.split('\n\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">How to Get Started</h2>
                <div className="space-y-4">
                  {details.steps.map((step, index) => (
                    <div key={index} className="flex items-start gap-4 bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-lg">
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 text-white rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <p className="text-gray-700 pt-1">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-green-900 mb-2">Pro Tip</h3>
                    <p className="text-green-800">
                      Start small and build consistency. Even 5 minutes a day can create lasting change when done regularly.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TipDetails;
