import React, { useState } from 'react';
import { User, Target, Calendar } from 'lucide-react';
import { useWellness } from '../context/WellnessContext';
import { generateWellnessTips } from '../services/aiService';

const ProfileScreen: React.FC = () => {
  const { setProfile, setTips, setCurrentScreen } = useWellness();
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [goal, setGoal] = useState('');
  const [customGoal, setCustomGoal] = useState(''); // <-- Added for "Others"
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const goals = [
    'Weight Loss',
    'Stress Reduction',
    'Better Sleep',
    'Increased Energy',
    'Mental Clarity',
    'Muscle Building',
    'Flexibility',
    'Overall Wellness',
    'Others'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Use custom goal if "Others" selected
    const finalGoal = goal === 'Others' ? customGoal.trim() : goal;

    if (!age || !gender || !finalGoal) {
      setError('Please fill in all fields');
      return;
    }

    const profile = { age, gender, goal: finalGoal };
    setProfile(profile);
    setLoading(true);

    try {
      const tips = await generateWellnessTips(profile);
      setTips(tips);
      setCurrentScreen('board');
    } catch (err) {
      setError('Failed to generate tips. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-full mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Wellness Journey</h1>
          <p className="text-gray-600">Tell us about yourself to get personalized tips</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Age Field */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 mr-2 text-blue-500" />
              Age
            </label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter your age"
              min="1"
              max="120"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
            />
          </div>

          {/* Gender Field */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4 mr-2 text-blue-500" />
              Gender
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </div>

          {/* Goal Field */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Target className="w-4 h-4 mr-2 text-green-500" />
              Wellness Goal
            </label>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
            >
              <option value="">Select your goal</option>
              {goals.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>

            {/* Custom goal input appears if "Others" is selected */}
            {goal === 'Others' && (
              <input
                type="text"
                value={customGoal}
                onChange={(e) => setCustomGoal(e.target.value)}
                placeholder="Enter your custom goal"
                className="mt-3 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
              />
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-green-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Generating Tips...
              </span>
            ) : (
              'Get My Wellness Tips'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileScreen;
