import React, { useState } from 'react';
import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";
import tarotCards from './tarotData';
import { useTranslation } from 'react-i18next';
import './i18n'; // Import the i18n configuration
import LanguageSelector from './components/LanguageSelector';

function App() {
  const { t, i18n } = useTranslation();
  const [step, setStep] = useState(1);
  const [userName, setUserName] = useState('');
  const [userThoughts, setUserThoughts] = useState('');
  const [selectedCard, setSelectedCard] = useState(null);
  const [interpretation, setInterpretation] = useState({
    initialInsight: '',
    cardMessage: '',
    guidanceReflection: '',
    lookingForward: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const selectPromptTemplate = (userThoughts, card) => {
    /*const keywords = {
      psychological: ['feel', 'think', 'anxiety', 'depression', 'worry', 'stress', 'emotion', 'mind', 'mental', 'relationship', 'family', 'personal'],
      spiritual: ['meaning', 'purpose', 'soul', 'spirit', 'divine', 'universe', 'path', 'guidance', 'meditation', 'energy', 'healing', 'inner'],
      practical: ['job', 'money', 'career', 'decision', 'relationship', 'choice', 'next steps', 'work', 'business', 'education', 'move', 'change']
    };
  
    // Count keyword matches for each category
    const matches = Object.entries(keywords).reduce((acc, [category, words]) => {
      acc[category] = words.filter(word => 
        userThoughts.toLowerCase().includes(word.toLowerCase())
      ).length;
      return acc;
    }, {});
  
    // Select template based on highest keyword matches
    const highestMatch = Object.entries(matches)
      .reduce((a, b) => b[1] > a[1] ? b : a)[0];*/
  
    // Base prompt template that ensures structured response
    const basePrompt = `Act as a professional tarot card reader with years of experience in providing insightful and compassionate guidance. You're known for your ability to blend traditional tarot wisdom with practical advice.
  
  Card Drawn: ${card.name}
  Traditional Card Meaning: ${card.description}
  Keywords: ${card.keywords.join(', ')}
  Seeker's Current Situation: "${userThoughts}"
  
  Please provide a thorough interpretation in ${i18n.language === 'nl' ? 'Dutch' : i18n.language === 'fr' ? 'French' : 'English'} that includes:
  
  1. Initial Insight (2-3 sentences):
  - Acknowledge the seeker's current situation
  - Create a bridge between their situation and the card's energy
  
  2. Card's Message (3-4 sentences):
  - Explain how this specific card relates to their situation
  - Highlight relevant aspects of the traditional meaning
  - Connect the card's symbols to their current circumstances
  
  3. Guidance & Reflection (3-4 sentences):
  - Offer practical insights and potential action steps
  - Suggest questions for self-reflection
  - Provide a positive perspective while acknowledging challenges
  
  4. Looking Forward (2-3 sentences):
  - Share potential opportunities or areas of growth
  - End with an empowering message
  
  IMPORTANT: Structure your response in exactly 4 paragraphs, with each paragraph corresponding to the numbered sections above. Do not include the numbers or section titles in your response.`;
  
    return basePrompt;
  };

  const processInterpretation = (text) => {
    // Split the response into paragraphs
    const paragraphs = text.split('\n\n').filter(p => p.trim());
  
    // Ensure we have exactly 4 paragraphs
    if (paragraphs.length !== 4) {
      console.warn('Response did not contain exactly 4 paragraphs');
    }
  
    // Return structured interpretation
    return {
      initialInsight: paragraphs[0] || '',
      cardMessage: paragraphs[1] || '',
      guidanceReflection: paragraphs[2] || '',
      lookingForward: paragraphs[3] || ''
    };
  };
  
  const getCardInterpretation = async (card, userThoughts) => {
    try {
      const client = new BedrockRuntimeClient({ 
        region: process.env.REACT_APP_AWS_REGION,
        credentials: {
          accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
        }
      });
  
      //const { i18n } = useTranslation();
      const prompt = selectPromptTemplate(userThoughts, card, i18n.language);
  
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
              content: prompt
            }
          ]
        })
      };
  
      const command = new InvokeModelCommand(input);
      const response = await client.send(command);
      
      const responseData = JSON.parse(new TextDecoder().decode(response.body));
      const interpretation = processInterpretation(responseData.content[0].text);
      return interpretation;
    } catch (error) {
      console.error('Error:', error);
      throw new Error(t('errors.interpretation'));
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
      const cardInterpretation = await getCardInterpretation(randomCard, userThoughts);
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

  const renderInterpretation = () => {
    return (
      <div className="space-y-4">
        <p className="text-lg leading-relaxed">{interpretation.initialInsight}</p>
        <p className="text-lg leading-relaxed">{interpretation.cardMessage}</p>
        <p className="text-lg leading-relaxed">{interpretation.guidanceReflection}</p>
        <p className="text-lg leading-relaxed">{interpretation.lookingForward}</p>
      </div>
    );
  };

  const renderStep = () => {
    //const { t } = useTranslation();

    switch (step) {
      case 1:
        return (
          <div className="flex flex-col items-center space-y-4">
            <h2 className="text-3xl font-bold text-purple-900">{t('welcome.title')}</h2>
            <form onSubmit={handleNameSubmit} className="flex flex-col items-center space-y-4">
              <input
                type="text"
                placeholder={t('welcome.namePlaceholder')}
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="text-xl text-center w-64 h-12 border rounded-lg px-4"
              />
              <button 
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg"
              >
                {t('welcome.continue')}
              </button>
            </form>
          </div>
        );

      case 2:
        return (
          <div className="flex flex-col items-center space-y-4">
            <h2 className="text-3xl font-bold text-purple-900">{t('thoughts.title', { name: userName })}</h2>
            <p className="text-xl text-purple-700">{t('thoughts.subtitle')}</p>
            <form onSubmit={handleThoughtsSubmit} className="flex flex-col items-center space-y-4">
              <textarea
                value={userThoughts}
                onChange={(e) => setUserThoughts(e.target.value)}
                className="w-96 h-32 text-lg p-4 border rounded-lg"
                placeholder={t('thoughts.placeholder')}
              />
              <button 
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg"
              >
                {t('thoughts.continue')}
              </button>
            </form>
          </div>
        );

      case 3:
        return (
          <div className="flex flex-col items-center space-y-4">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">{t('cardSelection.title')}</h2>
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
                      <div className="text-white text-lg">{t('cardSelection.loading')}</div>
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
                {renderInterpretation()}
              </div>
            </div>
            <button 
              onClick={() => {
                setStep(1);
                setUserName('');
                setUserThoughts('');
                setSelectedCard(null);
                setInterpretation({
                  initialInsight: '',
                  cardMessage: '',
                  guidanceReflection: '',
                  lookingForward: ''
                });
                setError('');
              }}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg mt-8"
            >
              {t('reading.startOver')}
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 p-8">
      <LanguageSelector />
      <div className="max-w-4xl w-full">
        {renderStep()}
        {error && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {t(error)}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
