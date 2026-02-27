import React from "react";
import "./SwipeCard.css";

interface SwipeCardProps {
  question: string;
}

const SwipeCard: React.FC<SwipeCardProps> = ({ question }) => {
  return (
    <div className="swipe-card">
      <p className="swipe-card__text">{question}</p>
    </div>
  );
};

export default SwipeCard;
