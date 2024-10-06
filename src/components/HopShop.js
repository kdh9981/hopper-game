import React from 'react';

// eslint-disable-next-line no-unused-vars
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

const HopShop = ({ totalHops, buyItem, activeItems, shopItems }) => {
    return (
      <div className="hop-shop">
        <h2>Hop Shop</h2>
        <div className="shop-items">
          {shopItems.map((item) => {
            const isAffordable = totalHops >= item.cost;
            const itemCount = activeItems[item.id] || 0;
            const isMaxed = itemCount >= 10;
            return (
              <div key={item.id} className={`shop-item ${isAffordable ? 'affordable' : 'not-affordable'} ${isMaxed ? 'maxed' : ''}`}>
                <span className="item-emoji">{item.emoji}</span>
                <span className="item-name">{item.name}</span>
                <span className="item-cost">Cost: {item.cost} Hops</span>
                <span className="item-boost">+{item.hopsPerJumpBoost} Hops per Jump</span>
                <span className="item-owned">Owned: {itemCount}/10</span>
                <button 
                  onClick={() => buyItem(item)} 
                  disabled={!isAffordable || isMaxed}
                >
                  {isMaxed ? 'Maxed' : 'Buy'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  
  export default HopShop;