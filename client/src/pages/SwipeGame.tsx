import React, { useState } from "react";
import SwipeCard from "../components/swipeCard/SwipeCard";
import "./swipeGame.css";

const QUESTIONS = [
  "Hvem i rommet er mest sannsynlig å snuse på do?",
  "Hvem har tatt flest bokser på én uke?",
  "Hvem gjemmer snusen sin for foreldrene?",
  "Hvem ville klart seg lengst uten snus på ferie?",
  "Hvem introduserte flest venner til snus?",
  "Hvem er mest sannsynlig å ha snus på bryllupsdagen sin?",
  "Hvem bytter smak oftest?",
  "Hvem er mest defensiv når noen kritiserer snusvanene deres?",
  "Hvem har den mest kreative unnskyldningen for å snuse på jobb?",
];

const SwipeGame: React.FC = () => {
  const [index, setIndex] = useState(0);

  const isFirst = index === 0;
  const isLast = index === QUESTIONS.length - 1;

  return (
    <main className="swipe-game">
      <header className="swipe-game__header">
        <h1 className="swipe-game__title">Snusboksleken</h1>
        <p className="swipe-game__subtitle">Read the card and make your choice</p>
      </header>

      <section className="swipe-game__card-area">
        <button
          className="swipe-game__arrow swipe-game__arrow--left"
          onClick={() => setIndex((i) => i - 1)}
          disabled={isFirst}
          aria-label="Previous question"
        >
          &#8592;
        </button>

        <SwipeCard question={QUESTIONS[index]} />

        <button
          className="swipe-game__arrow swipe-game__arrow--right"
          onClick={() => setIndex((i) => i + 1)}
          disabled={isLast}
          aria-label="Next question"
        >
          &#8594;
        </button>
      </section>

      <p className="swipe-game__counter">
        {index + 1} / {QUESTIONS.length}
      </p>
    </main>
  );
};

export default SwipeGame;