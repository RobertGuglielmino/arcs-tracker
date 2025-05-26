import { useMemo, useState } from 'react';
import './App.css'
import { cardImages } from './imageImports';
import logo from "./assets/logo.webp";

interface Card {
  id: string;
  imageSrc: string;
  suit: 'administration' | 'aggression' | 'construction' | 'mobilization';
  value: number;
}

const generateDeck = (): Card[] => {
  const suits: Card['suit'][] = ['administration', 'aggression', 'construction', 'mobilization'];
  const values = [1, 2, 3, 4, 5, 6, 7];
  const deck: Card[] = [];

  suits.forEach(suit => {
    values.forEach(value => {
      const id = `${suit}_${value}`;
      deck.push({
        id: id,
        imageSrc: cardImages[id], 
        suit,
        value
      });
    });
  });

  return deck;
};


function App() {
  const [playerCount, setPlayerCount] = useState<2 | 3 | 4>(4);
  const [playedCards, setPlayedCards] = useState<Set<Card>>(new Set());
  const [cardHistory, setCardHistory] = useState<Card[]>([]);

  const deck = useMemo(() => generateDeck(), []);

  const handleCardClick = (card: Card) => {
    setPlayedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(card)) {
        newSet.delete(card);
      } else {
        newSet.add(card);
      }
      return newSet;
    });

    setCardHistory(prev => {
      return [...prev, card];
    });
  };

  const handleNewRound = () => {
    setPlayedCards(new Set());
    setCardHistory([]);
  };

  const handleUndo = () => {
    const cards = cardHistory.slice(0, -1);
    setPlayedCards(new Set(cards));
    setCardHistory(cards);
  };

  return (<div className="bg-[url(./assets/background.jpg)] bg-contain h-screen">
    <div className='flex flex-row justify-evenly'>
      <div className="flex flex-col items-center justify-around gap-4">
        <div className="flex flex-col items-center">
          <div className="size-80 -mb-20">
            <img
              src={logo}
              className="object-contain"
            />
          </div>

          <div className="font-header text-5xl text-white rounded p-1">
            Chapter<br />Tracker
          </div>
        </div>

        <div className="flex flex-row gap-16 w-full justify-between">
          <button onClick={handleNewRound} className="font-header text-2xl bg-white hover:bg-gray-200 text-black font-xl px-4 py-2 rounded transition-colors">
            New Round
          </button>
          <button onClick={handleUndo} className="font-header bg-blue-500 hover:bg-blue-600 text-white text-2xl font-medium px-4 py-2 rounded transition-colors">
            Undo
          </button>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="players" className="font-header text-2xl font-medium text-white">
            Players:
          </label>
          <select
            id="players"
            value={playerCount}
            onChange={(e) => setPlayerCount(Number(e.target.value) as 2 | 3 | 4)}
            className="font-header border border-gray-300 bg-white rounded px-3 py-1 text-2xl">
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 max-w-1/2 m-4">
        {deck.map((card) => {
          if (!card) return null;

          const isPlayed = playedCards.has(card);
          const isDisabled = playerCount != 4 && (card.value === 1 || card.value === 7);

          return (<div
            key={card.id}
            onClick={() => handleCardClick(card)}
            className={`rounded-lg cursor-pointer transition-all duration-200 ${isDisabled ? 'cursor-not-allowed opacity-10' : isPlayed ? 'opacity-50' : 'hover:shadow-md'}`}>
            <img
              src={card.imageSrc}
              alt={`${card.suit} ${card.value}`}
              className="w-full h-auto rounded"
            />
          </div>);
        })}
      </div>
    </div>
  </div>);
}

export default App;