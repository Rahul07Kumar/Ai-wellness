import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface UserProfile {
  age: string;
  gender: string;
  goal: string;
}

export interface WellnessTip {
  id: number;
  title: string;
  short: string;
  icon: string;
}

interface WellnessContextType {
  profile: UserProfile | null;
  setProfile: (profile: UserProfile) => void;
  tips: WellnessTip[];
  setTips: (tips: WellnessTip[]) => void;
  savedTips: WellnessTip[];
  toggleSaveTip: (tip: WellnessTip) => void;
  isTipSaved: (id: number) => boolean;
  currentScreen: string;
  setCurrentScreen: (screen: string) => void;
  selectedTip: WellnessTip | null;
  setSelectedTip: (tip: WellnessTip | null) => void;
}

const WellnessContext = createContext<WellnessContextType | undefined>(undefined);

export const useWellness = () => {
  const context = useContext(WellnessContext);
  if (!context) {
    throw new Error('useWellness must be used within WellnessProvider');
  }
  return context;
};

export const WellnessProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [tips, setTips] = useState<WellnessTip[]>([]);
  const [savedTips, setSavedTips] = useState<WellnessTip[]>(() => {
    const saved = localStorage.getItem('savedTips');
    return saved ? JSON.parse(saved) : [];
  });
  const [currentScreen, setCurrentScreen] = useState('profile');
  const [selectedTip, setSelectedTip] = useState<WellnessTip | null>(null);

  const toggleSaveTip = (tip: WellnessTip) => {
    setSavedTips(prev => {
      const exists = prev.find(t => t.id === tip.id);
      let newSaved;
      if (exists) {
        newSaved = prev.filter(t => t.id !== tip.id);
      } else {
        newSaved = [...prev, tip];
      }
      localStorage.setItem('savedTips', JSON.stringify(newSaved));
      return newSaved;
    });
  };

  const isTipSaved = (id: number) => {
    return savedTips.some(tip => tip.id === id);
  };

  return (
    <WellnessContext.Provider
      value={{
        profile,
        setProfile,
        tips,
        setTips,
        savedTips,
        toggleSaveTip,
        isTipSaved,
        currentScreen,
        setCurrentScreen,
        selectedTip,
        setSelectedTip,
      }}
    >
      {children}
    </WellnessContext.Provider>
  );
};
