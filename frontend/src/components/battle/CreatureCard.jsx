// src/components/battle/CreatureCard.jsx
import React from 'react';
import { getFormDescription } from '../../utils/creatureHelpers';
import { getRarityColor } from '../../utils/uiHelpers';

const CreatureCard = ({ 
  creature, 
  position, 
  isActive, 
  onClick, 
  isSelected,
  isDefending,
  activeEffects = []
}) => {
  // Get derived stats for display
  const {
    maxHealth,
    physicalAttack,
    magicalAttack,
    physicalDefense,
    magicalDefense,
    initiative
  } = creature.battleStats;
  
  // Handle defensive stance visual indicator
  const cardClasses = [
    'creature-card',
    position,
    isActive ? 'active' : '',
    isSelected ? 'selected' : '',
    isDefending ? 'defending' : '',
  ].filter(Boolean).join(' ');
  
  // Calculate health percentage for health bar
  const healthPercentage = Math.max(0, Math.min(100, (creature.currentHealth / maxHealth) * 100));
  
  // Determine which attack value to show prominently based on creature's strength
  const isPrimaryPhysical = physicalAttack >= magicalAttack;
  
  return (
    <div className={cardClasses} onClick={onClick}>
      {/* Top info bar */}
      <div className="creature-header">
        <span className="creature-name" style={{ color: getRarityColor(creature.rarity) }}>
          {creature.species_name}
        </span>
        <span className="creature-form">
          {getFormDescription(creature.form)}
        </span>
      </div>
      
      {/* Creature image */}
      <div className="creature-image-container">
        <img 
          src={creature.image_url} 
          alt={creature.species_name} 
          className="creature-image" 
        />
        
        {/* Status effects */}
        {activeEffects.length > 0 && (
          <div className="status-effects">
            {activeEffects.map(effect => (
              <div 
                key={effect.id} 
                className={`status-icon ${effect.type}`}
                title={effect.description}
              >
                {effect.icon}
              </div>
            ))}
          </div>
        )}
        
        {/* Defending indicator */}
        {isDefending && (
          <div className="defending-shield">
            🛡️
          </div>
        )}
      </div>
      
      {/* Health bar */}
      <div className="health-bar-container">
        <div className="health-bar" style={{ width: `${healthPercentage}%` }} />
        <span className="health-text">
          {creature.currentHealth}/{maxHealth}
        </span>
      </div>
      
      {/* Stat display */}
      <div className="stats-container">
        <div className="stat-row">
          <div className={`stat ${isPrimaryPhysical ? 'primary' : 'secondary'}`}>
            <span className="stat-icon">⚔️</span>
            <span className="stat-value">{physicalAttack}</span>
          </div>
          <div className={`stat ${!isPrimaryPhysical ? 'primary' : 'secondary'}`}>
            <span className="stat-icon">✨</span>
            <span className="stat-value">{magicalAttack}</span>
          </div>
        </div>
        <div className="stat-row">
          <div className="stat">
            <span className="stat-icon">🛡️</span>
            <span className="stat-value">{physicalDefense}</span>
          </div>
          <div className="stat">
            <span className="stat-icon">🔮</span>
            <span className="stat-value">{magicalDefense}</span>
          </div>
        </div>
        <div className="stat-row">
          <div className="stat">
            <span className="stat-icon">⚡</span>
            <span className="stat-value">{initiative}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatureCard;
