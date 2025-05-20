// src/components/battle/Battlefield.jsx
import React from 'react';
import CreatureCard from './CreatureCard';

const Battlefield = ({ playerField, enemyField, activePlayer, onCreatureSelect }) => {
  const maxFieldSize = 3; // Max creatures in play
  
  return (
    <div className="battlefield">
      {/* Enemy field (top) */}
      <div className="battlefield-enemy">
        {enemyField.map((creature) => (
          <CreatureCard 
            key={creature.id}
            creature={creature}
            position="enemy"
            isActive={activePlayer === 'enemy'}
            onClick={() => onCreatureSelect(creature, true)}
          />
        ))}
        {/* Empty slots */}
        {Array.from({ length: maxFieldSize - enemyField.length }).map((_, index) => (
          <div key={`empty-enemy-${index}`} className="creature-slot empty" />
        ))}
      </div>
      
      {/* Center battlefield section - could contain battlefield effects */}
      <div className="battlefield-center">
        {/* Battle effects would go here */}
      </div>
      
      {/* Player field (bottom) */}
      <div className="battlefield-player">
        {playerField.map((creature) => (
          <CreatureCard 
            key={creature.id}
            creature={creature}
            position="player"
            isActive={activePlayer === 'player'}
            onClick={() => onCreatureSelect(creature, false)}
          />
        ))}
        {/* Empty slots */}
        {Array.from({ length: maxFieldSize - playerField.length }).map((_, index) => (
          <div key={`empty-player-${index}`} className="creature-slot empty" />
        ))}
      </div>
    </div>
  );
};

export default Battlefield;
