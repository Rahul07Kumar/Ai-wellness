import React from 'react';
import { Heart, ChevronRight } from 'lucide-react';
import { WellnessTip } from '../context/WellnessContext';

interface TipCardProps {
  tip: WellnessTip;
  onClick: () => void;
  onSave: () => void;
  isSaved: boolean;
}

const TipCard: React.FC<TipCardProps> = ({ tip, onClick, onSave, isSaved }) => {
  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSave();
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 cursor-pointer transform hover:-translate-y-1 border border-gray-100"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="text-4xl">{tip.icon}</div>
        <button
          onClick={handleSaveClick}
          className={`p-2 rounded-full transition-all ${
            isSaved
              ? 'bg-red-100 text-red-500'
              : 'bg-gray-100 text-gray-400 hover:bg-red-50 hover:text-red-400'
          }`}
        >
          <Heart
            className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`}
          />
        </button>
      </div>

      <h3 className="text-xl font-bold text-gray-800 mb-2">{tip.title}</h3>
      <p className="text-gray-600 text-sm mb-4">{tip.short}</p>

      <div className="flex items-center text-blue-500 text-sm font-medium">
        <span>Learn more</span>
        <ChevronRight className="w-4 h-4 ml-1" />
      </div>
    </div>
  );
};

export default TipCard;
