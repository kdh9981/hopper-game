import React from 'react';

const ActiveItems = ({ items, shopItems }) => {
    return (
      <div className="active-items">
        {/* Instructions added above Active Items */}
        <div className="instructions">
                  </div>
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
