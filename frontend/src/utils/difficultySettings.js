// src/utils/difficultySettings.js

// Define settings for each difficulty level
export const getDifficultySettings = (difficulty) => {
  const settings = {
    easy: {
      enemyStatsMultiplier: 0.8, // Enemy creatures are 80% as strong
      enemyCreatureLevel: {
        min: 0, // Form 0 creatures
        max: 1  // Up to Form 1 creatures
      },
      enemyRarity: {
        common: 0.7,
        rare: 0.3,
        epic: 0,
        legendary: 0
      },
      initialHandSize: 2,
      enemyAILevel: 1, // Basic decision making
      enemyEnergyRegen: 2, // 2 energy per turn
      rewardMultiplier: 0.5
    },
    
    medium: {
      enemyStatsMultiplier: 1.0, // Equal strength
      enemyCreatureLevel: {
        min: 1, // Form 1 creatures
        max: 2  // Up to Form 2 creatures
      },
      enemyRarity: {
        common: 0.5,
        rare: 0.3,
        epic: 0.2,
        legendary: 0
      },
      initialHandSize: 3,
      enemyAILevel: 2, // Better decisions
      enemyEnergyRegen: 3,
      rewardMultiplier: 1.0
    },
    
    hard: {
      enemyStatsMultiplier: 1.2, // 20% stronger
      enemyCreatureLevel: {
        min: 1,
        max: 3  // Up to Form 3 creatures
      },
      enemyRarity: {
        common: 0.2,
        rare: 0.4,
        epic: 0.3,
        legendary: 0.1
      },
      initialHandSize: 3,
      enemyAILevel: 3, // Advanced decision making
      enemyEnergyRegen: 4,
      rewardMultiplier: 1.5
    },
    
    expert: {
      enemyStatsMultiplier: 1.5, // 50% stronger
      enemyCreatureLevel: {
        min: 2,
        max: 3
      },
      enemyRarity: {
        common: 0,
        rare: 0.3,
        epic: 0.5,
        legendary: 0.2
      },
      initialHandSize: 4,
      enemyAILevel: 4, // Expert decision making
      enemyEnergyRegen: 5,
      rewardMultiplier: 2.0
    }
  };
  
  return settings[difficulty] || settings.medium;
};

// Generate enemy creatures based on difficulty
export const generateEnemyCreatures = (difficulty, count = 5) => {
  const settings = getDifficultySettings(difficulty);
  const creatures = [];
  
  for (let i = 0; i < count; i++) {
    // Generate a creature with appropriate rarity
    const rarity = selectRarity(settings.enemyRarity);
    
    // Generate form level within allowed range
    const form = Math.floor(
      Math.random() * (settings.enemyCreatureLevel.max - settings.enemyCreatureLevel.min + 1)
    ) + settings.enemyCreatureLevel.min;
    
    // Create a creature with appropriate stats based on rarity and form
    const creature = generateCreature(rarity, form, settings.enemyStatsMultiplier);
    creatures.push(creature);
  }
  
  return creatures;
};

// Select rarity based on probability distribution
function selectRarity(rarityDistribution) {
  const rnd = Math.random();
  let cumulativeProbability = 0;
  
  for (const [rarity, probability] of Object.entries(rarityDistribution)) {
    cumulativeProbability += probability;
    if (rnd <= cumulativeProbability) {
      return rarity;
    }
  }
  
  return 'common'; // Fallback
}

// Generate a creature with given parameters
function generateCreature(rarity, form, statsMultiplier) {
  // Base stats based on rarity
  let baseStats;
  switch (rarity) {
    case 'legendary':
      baseStats = { energy: 8, strength: 8, magic: 8, stamina: 8, speed: 8 };
      break;
    case 'epic':
      baseStats = { energy: 7, strength: 7, magic: 7, stamina: 7, speed: 7 };
      break;
    case 'rare':
      baseStats = { energy: 6, strength: 6, magic: 6, stamina: 6, speed: 6 };
      break;
    default:
      baseStats = { energy: 5, strength: 5, magic: 5, stamina: 5, speed: 5 };
  }
  
  // Apply form bonus
  const formBonus = form * 1;
  
  // Randomize stats within range and apply multiplier
  const stats = {};
  for (const [stat, value] of Object.entries(baseStats)) {
    // Add random variation (-1 to +1)
    const randomizedValue = value + formBonus + (Math.floor(Math.random() * 3) - 1);
    // Apply difficulty multiplier
    stats[stat] = Math.round(randomizedValue * statsMultiplier);
  }
  
  // Select a random species for the enemy
  const speciesIndex = Math.floor(Math.random() * 20) + 1; // 1-20
  const speciesName = `Enemy Species ${speciesIndex}`;
  
  // Create the enemy creature
  return {
    id: `enemy-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    species_id: speciesIndex,
    species_name: speciesName,
    form: form,
    rarity: rarity,
    stats: stats,
    // Use a placeholder image based on form
    image_url: `/assets/enemy-form${form}.png`,
    // Add specialty stats
    specialty_stats: getRandomSpecialtyStats()
  };
}

// Generate random specialty stats (1 or 2)
function getRandomSpecialtyStats() {
  const allStats = ['energy', 'strength', 'magic', 'stamina', 'speed'];
  const shuffled = [...allStats].sort(() => 0.5 - Math.random());
  
  // 50% chance for 1 specialty, 50% chance for 2
  return Math.random() < 0.5 ? [shuffled[0]] : [shuffled[0], shuffled[1]];
}
