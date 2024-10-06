import React from 'react';

const itemEmojis = {
  springShoes: '👟', bouncyCarrot: '🥕', rocketBoots: '🚀', energyDrink: '🥤',
  trampoline: '🔵', jetpack: '🎒', antiGravityBelt: '🌠', superCarrot: '🥕',
  moonBoots: '🌙', springCoil: '🧲', hoverboard: '🛹', rocketFuel: '⛽',
  antigravityPotion: '🧪', superSpringShoes: '👟', cosmicEnergy: '⚡',
  gravitonManipulator: '🔬', quantumSpring: '🌀', wormholeGenerator: '🕳️',
  dimensionalShifter: '🌈', cosmicHopper: '🐰'
};

const ActiveItems = ({ items, shopItems }) => {
    return (
      <div className="active-items">
        <h2>Active Items</h2>
        <div className="items-grid">
          {shopItems.map((shopItem) => {
            const count = items[shopItem.id] || 0;
            return (
              <div key={shopItem.id} className="item-slot">
                {count > 0 && (
                  <>
                    <span className="item-emoji">{shopItem.emoji}</span>
                    <span className="item-count">x{count}</span>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  
  export default ActiveItems;