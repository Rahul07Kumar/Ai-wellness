import React, { useState } from 'react';
import { RefreshCw, Home, BookmarkCheck, Sparkles } from 'lucide-react';
import { useWellness } from '../context/WellnessContext';
import { generateWellnessTips } from '../services/aiService';
import TipCard from '../components/TipCard';

const TipBoard: React.FC = () => {
  const {
    profile,
    tips,
    setTips,
    toggleSaveTip,
    isTipSaved,
    setCurrentScreen,
    setSelectedTip,
  } = useWellness();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegenerate = async () => {
    if (!profile) return;

    setError('');
    setLoading(true);

    try {
      const newTips = await generateWellnessTips(profile);
      setTips(newTips);
    } catch (err) {
      setError('Failed to generate new tips. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleTipClick = (tip: any) => {
    setSelectedTip(tip);
    setCurrentScreen('details');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
                <Sparkles className="w-8 h-8 mr-3 text-yellow-500" />
                Your Wellness Tips
              </h1>
              <p className="text-gray-600">
                Personalized recommendations for {profile?.goal || 'your goals'}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setCurrentScreen('saved')}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all shadow-md hover:shadow-lg"
              >
                <BookmarkCheck className="w-5 h-5" />
                <span className="hidden sm:inline">Saved</span>
              </button>
              <button
                onClick={() => setCurrentScreen('profile')}
                className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
              >
                <Home className="w-5 h-5" />
                <span className="hidden sm:inline">Home</span>
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {tips.map((tip) => (
            <TipCard
              key={tip.id}
              tip={tip}
              onClick={() => handleTipClick(tip)}
              onSave={() => toggleSaveTip(tip)}
              isSaved={isTipSaved(tip.id)}
            />
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={handleRegenerate}
            disabled={loading}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-xl font-medium hover:from-blue-600 hover:to-green-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Generating New Tips...' : 'Regenerate Tips'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TipBoard;
