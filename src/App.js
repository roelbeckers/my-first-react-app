import React, { useState } from 'react';
import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

// Tarot card data
const tarotCards = [
  { 
    id: 0, 
    name: "The Fool", 
    image: "/images/tarot/00-fool.jpg",
    altText: "A young person stepping off a cliff, carrying a white rose and a small bag. A small dog accompanies them."
  },
  { 
    id: 1, 
    name: "The Magician", 
    image: "/images/tarot/01-magician.jpg",
    altText: "A figure standing at a table with the four suits of the tarot displayed, one hand pointing to heaven and one to earth."
  },
  { 
    id: 2, 
    name: "The High Priestess", 
    image: "/images/tarot/02-priestess.jpg",
    altText: "A female figure seated between two pillars, with a scroll and a crescent moon at her feet."
  },
  { 
    id: 3, 
    name: "The Empress", 
    image: "/images/tarot/03-empress.jpg",
    altText: "A female figure seated on a throne in a lush garden, wearing a crown of stars."
  },
  { 
    id: 4, 
    name: "The Emperor", 
    image: "/images/tarot/04-emperor.jpg",
    altText: "A male figure seated on a stone throne, holding an ankh scepter and wearing armor."
  },
  { 
    id: 5, 
    name: "The Hierophant", 
    image: "/images/tarot/05-hierophant.jpg",
    altText: "A religious figure seated between two pillars, with two acolytes at his feet."
  },
  { 
    id: 6, 
    name: "The Lovers", 
    image: "/images/tarot/06-lovers.jpg",
    altText: "A man and woman under an angel, with a tree behind each figure."
  },
  { 
    id: 7, 
    name: "The Chariot", 
    image: "/images/tarot/07-chariot.jpg",
    altText: "A figure in armor standing in a chariot drawn by two sphinxes."
  },
  { 
    id: 8, 
    name: "Strength", 
    image: "/images/tarot/08-strength.jpg",
    altText: "A woman gently closing the mouth of a lion, showing mastery through gentleness rather than force."
  },
  { 
    id: 9, 
    name: "The Hermit", 
    image: "/images/tarot/09-hermit.jpg",
    altText: "An elderly figure in a robe holding a lantern and staff."
  },
  { 
    id: 10, 
    name: "Wheel of Fortune", 
    image: "/images/tarot/10-wheel.jpg",
    altText: "A great wheel with various symbols and creatures around its edge."
  },
  { 
    id: 11, 
    name: "Justice", 
    image: "/images/tarot/11-justice.jpg",
    altText: "A crowned figure in red robes seated between two pillars, holding balanced scales in one hand and an upright sword in the other."
  },
  { 
    id: 12, 
    name: "The Hanged Man", 
    image: "/images/tarot/12-hanged.jpg",
    altText: "A figure suspended upside-down by one foot from a wooden beam."
  },
  { 
    id: 13, 
    name: "Death", 
    image: "/images/tarot/13-death.jpg",
    altText: "A skeletal figure on horseback carrying a black flag."
  },
  { 
    id: 14, 
    name: "Temperance", 
    image: "/images/tarot/14-temperance.jpg",
    altText: "An angel pouring liquid between two cups, with one foot on land and one in water."
  },
  { 
    id: 15, 
    name: "The Devil", 
    image: "/images/tarot/15-devil.jpg",
    altText: "A horned figure on a pedestal with two chained figures below."
  },
  { 
    id: 16, 
    name: "The Tower", 
    image: "/images/tarot/16-tower.jpg",
    altText: "A tower struck by lightning with figures falling from it."
  },
  { 
    id: 17, 
    name: "The Star", 
    image: "/images/tarot/17-star.jpg",
    altText: "A woman kneeling by water under a star-filled sky, pouring water from two vessels."
  },
  { 
    id: 18, 
    name: "The Moon", 
    image: "/images/tarot/18-moon.jpg",
    altText: "A full moon over a path between two towers, with a dog and wolf howling."
  },
  { 
    id: 19, 
    name: "The Sun", 
    image: "/images/tarot/19-sun.jpg",
    altText: "A child on a white horse under a radiant sun."
  },
  { 
    id: 20, 
    name: "Judgement", 
    image: "/images/tarot/20-judgement.jpg",
    altText: "An angel blowing a trumpet while figures rise from graves below."
  },
  { 
    id: 21, 
    name: "The World", 
    image: "/images/tarot/21-world.jpg",
    altText: "A dancing figure in a wreath, surrounded by four creatures in the corners."
  }
];

function App() {
  const [step, setStep] = useState(1);
  const [userName, setUserName] = useState('');
  const [userThoughts, setUserThoughts] = useState('');
  const [selectedCard, setSelectedCard] = useState(null);
  const [interpretation, setInterpretation] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getCardInterpretation = async (cardName, userThoughts) => {
    try {
      const client = new BedrockRuntimeClient({ 
        region: process.env.REACT_APP_AWS_REGION,
        credentials: {
          accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
        }
      });

      const input = {
        modelId: "anthropic.claude-3-haiku-20240307-v1:0",
        contentType: "application/json",
        accept: "application/json",
        body: JSON.stringify({
          anthropic_version: "bedrock-2023-05-31",
          max_tokens: 1000,
          messages: [
            {
              role: "user",
              content: `Based on the thought "${userThoughts}", provide an interpretation for the Tarot card "${cardName}". Include both the traditional meaning of the card and how it relates to the specific situation.`
            }
          ]
        })
      };

      const command = new InvokeModelCommand(input);
      const response = await client.send(command);
      
      const responseData = JSON.parse(new TextDecoder().decode(response.body));
      return responseData.content[0].text;
    } catch (error) {
      console.error('Error:', error);
      throw new Error('Failed to get card interpretation');
    }
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (userName.trim()) {
      setStep(2);
      setError('');
    } else {
      setError('Please enter your name');
    }
  };

  const handleThoughtsSubmit = (e) => {
    e.preventDefault();
    if (userThoughts.trim()) {
      setStep(3);
      setError('');
    } else {
      setError('Please share your thoughts');
    }
  };

  const handleCardSelect = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    setError('');
  
    try {
      // First select the card
      const randomCard = tarotCards[Math.floor(Math.random() * tarotCards.length)];
      setSelectedCard(randomCard);
  
      // Get the interpretation
      const cardInterpretation = await getCardInterpretation(randomCard.name, userThoughts);
      setInterpretation(cardInterpretation);
  
      // Wait for a moment to show the loading state
      await new Promise(resolve => setTimeout(resolve, 1000));
  
      // Complete the flip and show interpretation
      setIsLoading(false);
      
      // Wait for flip animation to complete before changing step
      setTimeout(() => {
        setStep(4);
      }, 700); // Match this with the duration in the CSS transition
  
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      setSelectedCard(null);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="flex flex-col items-center space-y-4">
            <h2 className="text-3xl font-bold text-purple-900">Welcome to Tarot Guidance</h2>
            <form onSubmit={handleNameSubmit} className="flex flex-col items-center space-y-4">
              <input
                type="text"
                placeholder="Enter your name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="text-xl text-center w-64 h-12 border rounded-lg px-4"
              />
              <button 
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg"
              >
                Continue
              </button>
            </form>
          </div>
        );

      case 2:
        return (
          <div className="flex flex-col items-center space-y-4">
            <h2 className="text-3xl font-bold text-purple-900">Hello, {userName}</h2>
            <p className="text-xl text-purple-700">Tell me what's in your mind right now</p>
            <form onSubmit={handleThoughtsSubmit} className="flex flex-col items-center space-y-4">
              <textarea
                value={userThoughts}
                onChange={(e) => setUserThoughts(e.target.value)}
                className="w-96 h-32 text-lg p-4 border rounded-lg"
                placeholder="Share your thoughts..."
              />
              <button 
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg"
              >
                Continue
              </button>
            </form>
          </div>
        );

        case 3:
          return (
            <div className="flex flex-col items-center space-y-4">
              <h2 className="text-2xl font-bold text-purple-900 mb-4">Click to receive your guidance card</h2>
              <div 
                onClick={!isLoading ? handleCardSelect : undefined}
                className="relative w-[300px] h-[450px] perspective-1000 cursor-pointer"
              >
                <div 
                  className={`
                    relative w-full h-full preserve-3d
                    transition-all duration-700 ease-in-out
                    ${selectedCard && !isLoading ? 'rotate-y-180' : ''}
                    ${isLoading ? 'cursor-wait' : 'cursor-pointer'}
                  `}
                >
                  {/* Card Back */}
                  <div className="absolute w-full h-full backface-hidden">
                    <img
                      src="/images/tarot/card-back.jpg"
                      alt="Tarot card back"
                      className="w-full h-full object-cover rounded-lg shadow-lg"
                    />
                    {isLoading && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 rounded-lg gap-4">
                        <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                        <div className="text-white text-lg">Receiving guidance...</div>
                      </div>
                    )}
                  </div>
                  
                  {/* Card Front */}
                  <div 
                    className="absolute w-full h-full backface-hidden rotate-y-180"
                    style={{ transform: 'rotateY(180deg)' }}
                  >
                    {selectedCard && (
                      <img
                        src={selectedCard.image}
                        alt={selectedCard.altText}
                        className="w-full h-full object-cover rounded-lg shadow-lg"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          );

      case 4:
        return (
          <div className="flex flex-col items-center space-y-6 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-purple-900">{selectedCard.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <img
                src={selectedCard.image}
                alt={selectedCard.altText}
                className="w-[300px] h-[450px] object-cover rounded-lg shadow-lg mx-auto"
              />
              <div className="bg-white/90 backdrop-blur p-6 rounded-lg shadow">
                <p className="text-lg leading-relaxed">{interpretation}</p>
              </div>
            </div>
            <button 
              onClick={() => {
                setStep(1);
                setUserName('');
                setUserThoughts('');
                setSelectedCard(null);
                setInterpretation('');
                setError('');
              }}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg mt-8"
            >
              Start Over
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 p-8">
      <div className="max-w-4xl w-full">
        {renderStep()}
        {error && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
