const tarotCards = [
    { 
      id: 0, 
      name: "The Fool", 
      image: "/images/tarot/00-fool.jpg",
      altText: "A young person stepping off a cliff, carrying a white rose and a small bag. A small dog accompanies them.",
      description: "The Fool represents new beginnings, spontaneity, and innocence. It symbolizes stepping into the unknown with faith and trust, embracing life's adventures without fear. The card suggests taking risks and being open to new experiences.",
      keywords: ["new beginnings", "innocence", "spontaneity", "adventure", "potential", "faith", "risk-taking", "freedom"]
    },
    { 
      id: 1, 
      name: "The Magician", 
      image: "/images/tarot/01-magician.jpg",
      altText: "A figure standing at a table with the four suits of the tarot displayed, one hand pointing to heaven and one to earth.",
      description: "The Magician represents manifestation, resourcefulness, and power. It symbolizes the ability to harness universal energies and transform thoughts into reality. The card suggests taking action with the tools at your disposal.",
      keywords: ["manifestation", "power", "skill", "action", "capability", "resourcefulness", "concentration", "willpower"]
    },
    { 
      id: 2, 
      name: "The High Priestess", 
      image: "/images/tarot/02-priestess.jpg",
      altText: "A female figure seated between two pillars, with a scroll and a crescent moon at her feet.",
      description: "The High Priestess represents intuition, mystery, and inner knowledge. She symbolizes the connection to the subconscious mind and hidden wisdom. The card suggests listening to your inner voice and trusting your instincts.",
      keywords: ["intuition", "mystery", "spirituality", "inner voice", "wisdom", "secrets", "subconscious", "divine feminine"]
    },
    { 
      id: 3, 
      name: "The Empress", 
      image: "/images/tarot/03-empress.jpg",
      altText: "A female figure seated on a throne in a lush garden, wearing a crown of stars.",
      description: "The Empress represents fertility, nurturing, and abundance. She symbolizes the mother figure, creativity, and connection to nature. The card suggests embracing growth, nurturing yourself and others, and enjoying life's pleasures.",
      keywords: ["abundance", "fertility", "nurturing", "creativity", "nature", "growth", "comfort", "luxury"]
    },
    { 
      id: 4, 
      name: "The Emperor", 
      image: "/images/tarot/04-emperor.jpg",
      altText: "A male figure seated on a stone throne, holding an ankh scepter and wearing armor.",
      description: "The Emperor represents authority, structure, and leadership. He symbolizes worldly power, rational thinking, and establishing order. The card suggests taking control, setting boundaries, and creating stable foundations.",
      keywords: ["authority", "structure", "leadership", "stability", "power", "protection", "reason", "discipline"]
    },
    { 
      id: 5, 
      name: "The Hierophant", 
      image: "/images/tarot/05-hierophant.jpg",
      altText: "A religious figure seated between two pillars, with two acolytes at his feet.",
      description: "The Hierophant represents tradition, conformity, and spiritual guidance. He symbolizes conventional approaches, education, and established beliefs. The card suggests seeking wisdom from traditional sources and respecting established systems.",
      keywords: ["tradition", "conformity", "education", "guidance", "spirituality", "beliefs", "convention", "mentorship"]
    },
    { 
      id: 6, 
      name: "The Lovers", 
      image: "/images/tarot/06-lovers.jpg",
      altText: "A man and woman under an angel, with a tree behind each figure.",
      description: "The Lovers represents relationships, choices, and harmony. It symbolizes partnerships, personal values, and important decisions. The card suggests following your heart while maintaining balance between different aspects of life.",
      keywords: ["love", "choice", "relationships", "harmony", "values", "balance", "attraction", "alignment"]
    },
    { 
      id: 7, 
      name: "The Chariot", 
      image: "/images/tarot/07-chariot.jpg",
      altText: "A figure in armor standing in a chariot drawn by two sphinxes.",
      description: "The Chariot represents determination, willpower, and victory. It symbolizes overcoming obstacles through confidence and control. The card suggests moving forward with purpose and maintaining focus on your goals.",
      keywords: ["victory", "willpower", "determination", "control", "success", "momentum", "direction", "focus"]
    },
    { 
      id: 8, 
      name: "Strength", 
      image: "/images/tarot/08-strength.jpg",
      altText: "A woman gently closing the mouth of a lion, showing mastery through gentleness rather than force.",
      description: "Strength represents inner power, patience, and gentle control. It symbolizes mastering emotions and instincts through compassion rather than force. The card suggests facing challenges with courage and maintaining inner calm.",
      keywords: ["strength", "patience", "compassion", "courage", "influence", "inner power", "resilience", "gentle control"]
    },
    { 
      id: 9, 
      name: "The Hermit", 
      image: "/images/tarot/09-hermit.jpg",
      altText: "An elderly figure in a robe holding a lantern and staff.",
      description: "The Hermit represents introspection, solitude, and inner guidance. It symbolizes the search for inner truth and wisdom through contemplation. The card suggests taking time for self-reflection and seeking deeper understanding.",
      keywords: ["introspection", "solitude", "guidance", "wisdom", "contemplation", "inner search", "reflection", "spirituality"]
    },
    { 
      id: 10, 
      name: "Wheel of Fortune", 
      image: "/images/tarot/10-wheel.jpg",
      altText: "A great wheel with various symbols and creatures around its edge.",
      description: "The Wheel of Fortune represents cycles, fate, and turning points. It symbolizes the natural ups and downs of life and inevitable change. The card suggests adapting to life's cycles and recognizing opportunities in change.",
      keywords: ["change", "cycles", "fate", "turning point", "opportunity", "destiny", "fortune", "movement"]
    },
    { 
      id: 11, 
      name: "Justice", 
      image: "/images/tarot/11-justice.jpg",
      altText: "A crowned figure in red robes seated between two pillars, holding balanced scales in one hand and an upright sword in the other.",
      description: "Justice represents fairness, truth, and cause and effect. It symbolizes decision-making based on careful consideration and ethical principles. The card suggests seeking balance and taking responsibility for your actions.",
      keywords: ["justice", "fairness", "truth", "cause and effect", "balance", "accountability", "decisions", "karma"]
    },
    { 
      id: 12, 
      name: "The Hanged Man", 
      image: "/images/tarot/12-hanged.jpg",
      altText: "A figure suspended upside-down by one foot from a wooden beam.",
      description: "The Hanged Man represents surrender, letting go, and new perspectives. It symbolizes voluntary sacrifice and seeing things from a different angle. The card suggests pausing to gain new insights and accepting what cannot be changed.",
      keywords: ["surrender", "letting go", "sacrifice", "perspective", "suspension", "acceptance", "wisdom", "paradox"]
    },
    { 
      id: 13, 
      name: "Death", 
      image: "/images/tarot/13-death.jpg",
      altText: "A skeletal figure on horseback carrying a black flag.",
      description: "Death represents transformation, endings, and renewal. It symbolizes the natural end of cycles and the beginning of new ones. The card suggests embracing necessary endings and the transformation they bring.",
      keywords: ["transformation", "endings", "change", "renewal", "transition", "letting go", "rebirth", "metamorphosis"]
    },
    { 
      id: 14, 
      name: "Temperance", 
      image: "/images/tarot/14-temperance.jpg",
      altText: "An angel pouring liquid between two cups, with one foot on land and one in water.",
      description: "Temperance represents balance, moderation, and harmony. It symbolizes finding the middle path and combining different elements. The card suggests practicing patience and finding equilibrium in all things.",
      keywords: ["balance", "moderation", "patience", "harmony", "integration", "synthesis", "purpose", "coordination"]
    },
    { 
      id: 15, 
      name: "The Devil", 
      image: "/images/tarot/15-devil.jpg",
      altText: "A horned figure on a pedestal with two chained figures below.",
      description: "The Devil represents bondage, materialism, and shadow self. It symbolizes attachments, limitations, and facing our darker aspects. The card suggests examining what holds you back and breaking free from self-imposed constraints.",
      keywords: ["bondage", "materialism", "shadows", "attachment", "temptation", "fear", "liberation", "awareness"]
    },
    { 
      id: 16, 
      name: "The Tower", 
      image: "/images/tarot/16-tower.jpg",
      altText: "A tower struck by lightning with figures falling from it.",
      description: "The Tower represents sudden change, upheaval, and revelation. It symbolizes the collapse of false structures and breakthrough moments. The card suggests embracing necessary destruction for future rebuilding.",
      keywords: ["upheaval", "revelation", "breakdown", "breakthrough", "chaos", "awakening", "liberation", "truth"]
    },
    { 
      id: 17, 
      name: "The Star", 
      image: "/images/tarot/17-star.jpg",
      altText: "A woman kneeling by water under a star-filled sky, pouring water from two vessels.",
      description: "The Star represents hope, inspiration, and serenity. It symbolizes renewal, spiritual connection, and faith in the future. The card suggests maintaining hope and trust in the universal flow of life.",
      keywords: ["hope", "inspiration", "faith", "serenity", "renewal", "healing", "optimism", "connection"]
    },
    { 
      id: 18, 
      name: "The Moon", 
      image: "/images/tarot/18-moon.jpg",
      altText: "A full moon over a path between two towers, with a dog and wolf howling.",
      description: "The Moon represents illusion, intuition, and the subconscious. It symbolizes facing fears and navigating through uncertainty. The card suggests trusting your intuition while being aware of deception.",
      keywords: ["intuition", "illusion", "fear", "subconscious", "uncertainty", "dreams", "mystery", "emotions"]
    },
    { 
      id: 19, 
      name: "The Sun", 
      image: "/images/tarot/19-sun.jpg",
      altText: "A child on a white horse under a radiant sun.",
      description: "The Sun represents joy, success, and vitality. It symbolizes clarity, warmth, and positive energy. The card suggests embracing life with confidence and celebrating achievements.",
      keywords: ["joy", "success", "positivity", "vitality", "confidence", "clarity", "achievement", "happiness"]
    },
    { 
      id: 20, 
      name: "Judgement", 
      image: "/images/tarot/20-judgement.jpg",
      altText: "An angel blowing a trumpet while figures rise from graves below.",
      description: "Judgement represents awakening, renewal, and inner calling. It symbolizes answering a higher call and making life-changing decisions. The card suggests embracing personal transformation and accepting your true purpose.",
      keywords: ["awakening", "renewal", "calling", "reckoning", "rebirth", "evaluation", "purpose", "transformation"]
    },
    { 
      id: 21, 
      name: "The World", 
      image: "/images/tarot/21-world.jpg",
      altText: "A dancing figure in a wreath, surrounded by four creatures in the corners.",
      description: "The World represents completion, integration, and accomplishment. It symbolizes the successful conclusion of a cycle and wholeness. The card suggests celebrating achievements and preparing for new beginnings.",
      keywords: ["completion", "accomplishment", "integration", "wholeness", "success", "travel", "harmony", "fulfillment"]
    }
  ];
  
  export default tarotCards;