import { WellnessProvider, useWellness } from './context/WellnessContext';
import ProfileScreen from './screens/ProfileScreen';
import TipBoard from './screens/TipBoard';
import TipDetails from './screens/TipDetails';
import SavedTips from './screens/SavedTips';

function AppContent() {
  const { currentScreen } = useWellness();

  return (
    <>
      {currentScreen === 'profile' && <ProfileScreen />}
      {currentScreen === 'board' && <TipBoard />}
      {currentScreen === 'details' && <TipDetails />}
      {currentScreen === 'saved' && <SavedTips />}
    </>
  );
}

function App() {
  return (
    <WellnessProvider>
      <AppContent />
    </WellnessProvider>
  );
}

export default App;
