import React from "react";
import SwipeCard from "../components/swipeCard/SwipeCard";
import "./swipeGame.css";

const SwipeGame: React.FC = () => {
  return (
    <main className="swipe-game">
      <header className="swipe-game__header">
        <h1 className="swipe-game__title">Snusboksleken</h1>
        <p className="swipe-game__subtitle">Read the card and make your choice</p>
      </header>

      <section className="swipe-game__card-area">
        <SwipeCard />
      </section>
    </main>
  );
};

export default SwipeGame;