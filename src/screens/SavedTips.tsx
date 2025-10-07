import React from 'react';
import { ArrowLeft, BookmarkCheck, Trash2 } from 'lucide-react';
import { useWellness } from '../context/WellnessContext';
import TipCard from '../components/TipCard';

const SavedTips: React.FC = () => {
  const { savedTips, setCurrentScreen, toggleSaveTip, isTipSaved, setSelectedTip } = useWellness();

  const handleTipClick = (tip: any) => {
    setSelectedTip(tip);
    setCurrentScreen('details');
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to remove all saved tips?')) {
      savedTips.forEach(tip => toggleSaveTip(tip));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <button
          onClick={() => setCurrentScreen('board')}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Tips</span>
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
                <BookmarkCheck className="w-8 h-8 mr-3 text-blue-500" />
                Saved Tips
              </h1>
              <p className="text-gray-600">
                {savedTips.length} {savedTips.length === 1 ? 'tip' : 'tips'} saved for later
              </p>
            </div>
            {savedTips.length > 0 && (
              <button
                onClick={handleClearAll}
                className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all"
              >
                <Trash2 className="w-4 h-4" />
                Clear All
              </button>
            )}
          </div>
        </div>

        {savedTips.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookmarkCheck className="w-10 h-10 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No Saved Tips Yet</h2>
            <p className="text-gray-600 mb-6">
              Start saving your favorite wellness tips to access them anytime
            </p>
            <button
              onClick={() => setCurrentScreen('board')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-green-600 transition-all shadow-md hover:shadow-lg"
            >
              Browse Tips
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedTips.map((tip) => (
              <TipCard
                key={tip.id}
                tip={tip}
                onClick={() => handleTipClick(tip)}
                onSave={() => toggleSaveTip(tip)}
                isSaved={isTipSaved(tip.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedTips;
