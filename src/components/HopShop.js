import React from 'react';

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
