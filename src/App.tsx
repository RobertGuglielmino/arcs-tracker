import { useMemo, useState } from 'react';
import './App.css'
import { cardImages } from './imageImports';
import logo from "./assets/logo.png";
import type { Card } from './Card';
// import Player from './Player';
// import event from "./assets/event_1.webp";
// import cardBack from "./assets/action-back.jpg";


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

// const eventCard: Card = {
//   id: 'event',
//   imageSrc: event,
//   suit: 'administration',
//   value: 0,
// }

// const cardBackCard: Card = {
//   id: 'cardBack',
//   imageSrc: cardBack,
//   suit: 'administration',
//   value: 0,
// }

function App() {
  const [playerCount, setPlayerCount] = useState<2 | 3 | 4>(4);
  const [playedCards, setPlayedCards] = useState<Set<Card>>(new Set());
  const [cardHistory, setCardHistory] = useState<Card[]>([]);

  // function getPlayedCardsByIndex(index: number): Card[] {
  //   return cardHistory.filter((_, i) => i % playerCount === index - 1);
  // }

  const deck = useMemo(() => generateDeck(), []);

  const handleCardClick = (card: Card) => {
    if (playedCards.has(card)) {
      handleUndo()
    } else {

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
    }
  };

  const handleNewRound = () => {
    setPlayedCards(new Set());
    setCardHistory([]);
  };

  // const handleEvent = () => {
  //   setCardHistory(prev => {
  //     return [...prev, eventCard];
  //   });
  // };

  // const handleCardBack = () => {
  //   setCardHistory(prev => {
  //     return [...prev, cardBackCard];
  //   });
  // };

  const handleUndo = () => {
    const cards = cardHistory.slice(0, -1);
    setPlayedCards(new Set(cards));
    setCardHistory(cards);
  };

  return (<div className="bg-[url(./assets/background.webp)] bg-contain h-screen text-white">
    <div className='flex flex-col xl:flex-row'>
      <div className="xl:min-w-1/3 flex flex-row xl:flex-col items-center justify-evenly gap-4">
        {/* Logo and title */}
        <div className="flex flex-col max-w-1/8 xl:max-w-none flex-wrap justify-center items-center m-2">
          <div className="shrink">
            <img
              src={logo}
              className="object-contain xl:h-auto"
            />
          </div>

          <div className="font-header text-xl xl:text-4xl text-white text-wrap text-center rounded p-1">
            Chapter Tracker
          </div>
        </div>

        {/* Buttons and such */}
        <div className="flex flex-wrap flex-col gap-2 xl:gap-4 w-auto xl:h-1/2 p-1 xl:p-2 justify-evenly font-header text-md xl:text-2xl font-medium">
          <div className="flex flex-wrap xl:flex-col items-center justify-center shrink gap-4">
            <button onClick={handleNewRound} className="w-auto bg-white hover:bg-gray-200  p-1 xl:p-2  text-black rounded transition-colors">
              New Round
            </button>
          </div>
          <div className="flex flex-wrap xl:flex-col  items-center justify-center shrink gap-4">
            <div className="flex items-center gap-2">
              <label htmlFor="players" className="font-medium text-white">
                Players:
              </label>
              <select
                id="players"
                value={playerCount}
                onChange={(e) => setPlayerCount(Number(e.target.value) as 2 | 3 | 4)}
                className="text-black border border-gray-300 bg-white rounded px-3 py-1">
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
              </select>
            </div>
          </div>
          <div className="flex flex-wrap justify-center items-centershrink gap-4">
            {/* <button onClick={handleEvent} className="bg-blue-500 hover:bg-blue-600 px-4 py-2 text-white rounded transition-colors">
              Event
            </button>
            <button onClick={handleCardBack} className=" bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors">
              Face Down
            </button> */}
            <button onClick={handleUndo} className="bg-blue-500 hover:bg-blue-600 font-medium  p-1 xl:p-2  rounded transition-colors">
              Undo
            </button>
          </div>
        </div>
      </div>

      <div className="justify-center flex overflow-x-auto">
        {/* Grid */}
        <div className="grid grid-cols-7 xl:max-w-3/4 gap-1 xl:gap-2 m-1 xl:m-4">
          {deck.map((card) => {
            if (!card) return null;

            const isPlayed = playedCards.has(card);
            const isDisabled = playerCount != 4 && (card.value === 1 || card.value === 7);

            return (<div
              key={card.id}
              onClick={() => handleCardClick(card)}
              className={`rounded-lg cursor-pointer transition-all duration-200 max-w-full lg:max-w-[80px] xl:max-w-none ${isDisabled ? 'cursor-not-allowed opacity-10' : isPlayed ? 'opacity-50' : 'hover:shadow-md'}`}>
              <img
                src={card.imageSrc}
                alt={`${card.suit} ${card.value}`}
                className="w-full h-auto rounded"
              />
            </div>);
          })}
        </div>

        {/* <div className="flex flex-col m-4 justify-center gap-4 min-w-1/5 xl:min-w-1/8">
          {Array.from({ length: playerCount }, (_, i) => (
            <Player key={i} index={i + 1} hand={getPlayedCardsByIndex(i + 1)} />
          ))}
        </div> */}
      </div>
    </div>
  </div>);
}

export default App;



