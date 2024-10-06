import React from 'react';
import { WalletContextProvider } from './contexts/WalletContextProvider';
import HopperGame from './components/HopperGame';

function App() {
  return (
    <WalletContextProvider>
      <HopperGame />
    </WalletContextProvider>
  );
}

export default App;