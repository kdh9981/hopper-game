import React, { useState, useEffect, useRef } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { saveUserProgress, loadUserProgress, fetchLeaderboardData } from '../utils/api';
import ActiveItems from './ActiveItems';
import HopShop from './HopShop';
import './HopperGame.css';

// Import the sound file
import jumpSound from './jump.wav';

import nightImage from './images/night.png';
import buildingsImage from './images/buildings.png';
import rabbitImage from './images/rabbit.png';
import jumpImage from './images/jump.png';
import moonImage from './images/moon.png';

// Define shopItems here
const shopItems = [
  { id: 'springShoes', name: 'Spring Shoes', emoji: '👟', cost: 15, hopsPerJumpBoost: 0.1 },
  { id: 'bouncyCarrot', name: 'Bouncy Carrot', emoji: '🥕', cost: 50, hopsPerJumpBoost: 0.2 },
  { id: 'rocketBoots', name: 'Rocket Boots', emoji: '🚀', cost: 100, hopsPerJumpBoost: 0.3 },
  { id: 'energyDrink', name: 'Energy Drink', emoji: '🥤', cost: 200, hopsPerJumpBoost: 0.4 },
  { id: 'trampoline', name: 'Trampoline', emoji: '🔵', cost: 350, hopsPerJumpBoost: 0.5 },
  { id: 'jetpack', name: 'Jetpack', emoji: '🎒', cost: 500, hopsPerJumpBoost: 0.6 },
  { id: 'antiGravityBelt', name: 'Anti-Gravity Belt', emoji: '🌠', cost: 750, hopsPerJumpBoost: 0.7 },
  { id: 'superCarrot', name: 'Super Carrot', emoji: '🥕', cost: 1000, hopsPerJumpBoost: 0.8 },
  { id: 'moonBoots', name: 'Moon Boots', emoji: '🌙', cost: 1500, hopsPerJumpBoost: 0.9 },
  { id: 'springCoil', name: 'Spring Coil', emoji: '🧲', cost: 2000, hopsPerJumpBoost: 1.0 },
  { id: 'hoverboard', name: 'Hoverboard', emoji: '🛹', cost: 2500, hopsPerJumpBoost: 1.1 },
  { id: 'rocketFuel', name: 'Rocket Fuel', emoji: '⛽', cost: 3000, hopsPerJumpBoost: 1.2 },
  { id: 'antigravityPotion', name: 'Antigravity Potion', emoji: '🧪', cost: 3500, hopsPerJumpBoost: 1.3 },
  { id: 'superSpringShoes', name: 'Super Spring Shoes', emoji: '👟', cost: 4000, hopsPerJumpBoost: 1.4 },
  { id: 'cosmicEnergy', name: 'Cosmic Energy', emoji: '⚡', cost: 5000, hopsPerJumpBoost: 1.5 },
  { id: 'gravitonManipulator', name: 'Graviton Manipulator', emoji: '🔬', cost: 6000, hopsPerJumpBoost: 1.6 },
  { id: 'quantumSpring', name: 'Quantum Spring', emoji: '🌀', cost: 7000, hopsPerJumpBoost: 1.7 },
  { id: 'wormholeGenerator', name: 'Wormhole Generator', emoji: '🕳️', cost: 8000, hopsPerJumpBoost: 1.8 },
  { id: 'dimensionalShifter', name: 'Dimensional Shifter', emoji: '🌈', cost: 9000, hopsPerJumpBoost: 1.9 },
  { id: 'cosmicHopper', name: 'Cosmic Hopper', emoji: '🐰', cost: 10000, hopsPerJumpBoost: 2.0 },
];

const HopperGame = () => {
  const { publicKey } = useWallet();
  const [totalHops, setTotalHops] = useState(0);
  const [hopsPerJump, setHopsPerJump] = useState(1);
  const [activeItems, setActiveItems] = useState({});
  const [leaderboardData, setLeaderboardData] = useState([]);
  const walletAddress = publicKey ? publicKey.toBase58() : null;

  // Create a ref for the audio
  const jumpSoundRef = useRef(null);

  // Initialize the audio in a useEffect
  useEffect(() => {
    jumpSoundRef.current = new Audio(jumpSound);
  }, []);
  
  useEffect(() => {
    if (walletAddress) {
      loadUserProgress(walletAddress).then(progress => {
        if (progress) {
          setTotalHops(progress.totalHops || 0);
          setHopsPerJump(progress.hopsPerJump || 1);
          setActiveItems(progress.activeItems || {});
        }
      }).catch(console.error);
    } else {
      setTotalHops(0);
      setHopsPerJump(1);
      setActiveItems({});
    }
  }, [walletAddress]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        console.log('Fetching leaderboard data...');
        const data = await fetchLeaderboardData();
        console.log('Raw leaderboard data:', data);
        if (Array.isArray(data) && data.length > 0) {
          console.log('Setting leaderboard data:', data);
          setLeaderboardData(data);
        } else {
          console.error('Leaderboard data is not in the expected format:', data);
        }
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      }
    };
  
    fetchLeaderboard();
    const intervalId = setInterval(fetchLeaderboard, 30000);
    return () => clearInterval(intervalId);
  }, []);

  const handleJump = (event) => {
    // Ensure only the rabbit element is the target of the click
    if (event.target.classList.contains('hopper')) {
      const newTotalHops = totalHops + hopsPerJump;
      setTotalHops(newTotalHops);
  
      if (walletAddress) {
        saveUserProgress(walletAddress, {
          totalHops: newTotalHops,
          hopsPerJump,
          activeItems,
        }).catch(console.error);
      }
  
      // Play the jump sound
      if (jumpSoundRef.current) {
        jumpSoundRef.current.play().catch(error => console.error("Error playing sound:", error));
      }
  
      const rabbit = document.querySelector('.hopper');
      rabbit.style.backgroundImage = `url(${jumpImage})`;
      rabbit.classList.add('jump');
  
      setTimeout(() => {
        rabbit.style.backgroundImage = `url(${rabbitImage})`;
        rabbit.classList.remove('jump');
      }, 500); // Adjust duration for the jump animation
    }
  };
  

  const buyItem = (item) => {
    if (totalHops >= item.cost && (activeItems[item.id] || 0) < 10) {
      const newTotalHops = totalHops - item.cost;
      const newHopsPerJump = hopsPerJump + item.hopsPerJumpBoost;
      setTotalHops(newTotalHops);
      setHopsPerJump(newHopsPerJump);
      setActiveItems({
        ...activeItems,
        [item.id]: (activeItems[item.id] || 0) + 1
      });
      
      if (walletAddress) {
        saveUserProgress(walletAddress, {
          totalHops: newTotalHops,
          hopsPerJump: newHopsPerJump,
          activeItems: {
            ...activeItems,
            [item.id]: (activeItems[item.id] || 0) + 1
          },
        }).catch(console.error);
      }
    }
  };

  return (
    <div className="hopper-game">
      <div className="game-section left" style={{backgroundImage: `url(${nightImage})`}}>
        <h1>Hop into the Future!</h1>
        <div className="game-stats">
          <p>Total Hops: <span className="stat-value">{totalHops.toFixed(1)}</span></p>
          <p>Hops per Jump: <span className="stat-value">{hopsPerJump.toFixed(1)}</span></p>
        </div>
        <div className="game-area">
          <img src={moonImage} alt="Moon" className="moon" />
          <div 
  className="hopper" 
  onClick={(event) => handleJump(event)} 
  style={{backgroundImage: `url(${rabbitImage})`}}
/>
</div>
        </div>
      </div>
      <div className="section-divider"></div>
      <div className="game-section middle" style={{backgroundImage: `url(${buildingsImage})`}}>
        <ActiveItems items={activeItems} shopItems={shopItems} />
        <HopShop 
          totalHops={totalHops}
          buyItem={buyItem}
          activeItems={activeItems}
          shopItems={shopItems}
        />
      </div>
      <div className="section-divider"></div>
      <div className="game-section right" style={{backgroundImage: `url(${buildingsImage})`}}>
        <WalletMultiButton />
        <div className="leaderboard">
  <h2>Top 10 Hoppers</h2>
  {leaderboardData.length > 0 ? (
    <table>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Wallet</th>
          <th>Total Hops</th>
        </tr>
      </thead>
      <tbody>
        {leaderboardData.map((entry, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{entry.walletAddress ? `${entry.walletAddress.slice(0, 4)}...${entry.walletAddress.slice(-4)}` : 'Unknown'}</td>
            <td>{entry.totalHops !== undefined ? entry.totalHops.toFixed(1) : 'N/A'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p>No leaderboard data available</p>
  )}
</div>
      </div>
    </div>
  );
};

export default HopperGame;