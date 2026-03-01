import React, { useState } from "react";
import data from "../../data/jeopardy.json";
import Button from "../../components/button/Button";
import Modal from "../../components/modal/Modal";
import "./JeopardyBoard.css";

interface Question {
  value: number;
  question: string;
  answer: string;
}

interface ActiveTile {
  categoryId: string;
  questionIndex: number;
  question: Question;
}

const JeopardyBoard: React.FC = () => {
  const [usedTiles, setUsedTiles] = useState<Set<string>>(new Set());
  const [activeTile, setActiveTile] = useState<ActiveTile | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const tileKey = (categoryId: string, questionIndex: number) =>
    `${categoryId}-${questionIndex}`;

  const handleTileClick = (
    categoryId: string,
    questionIndex: number,
    question: Question
  ) => {
    const key = tileKey(categoryId, questionIndex);
    if (usedTiles.has(key)) return;
    setActiveTile({ categoryId, questionIndex, question });
    setShowAnswer(false);
  };

  const handleClose = () => {
    if (activeTile) {
      const key = tileKey(activeTile.categoryId, activeTile.questionIndex);
      setUsedTiles((prev) => new Set(prev).add(key));
    }
    setActiveTile(null);
    setShowAnswer(false);
  };

  const allUsed =
    usedTiles.size ===
    data.categories.length * data.categories[0].questions.length;

  return (
    <div className="jeopardy-page">
      {/* Board */}
      <div className="jeopardy-board">
        <div className="jeopardy-board__headers">
          {data.categories.map((cat) => (
            <div key={cat.id} className="jeopardy-board__category">
              {cat.title}
            </div>
          ))}
        </div>

        {data.categories[0].questions.map((_, rowIndex) => (
          <div key={rowIndex} className="jeopardy-board__row">
            {data.categories.map((cat) => {
              const q = cat.questions[rowIndex];
              const key = tileKey(cat.id, rowIndex);
              const used = usedTiles.has(key);
              return (
                <button
                  key={cat.id}
                  className={`jeopardy-tile ${used ? "jeopardy-tile--used" : ""}`}
                  onClick={() => handleTileClick(cat.id, rowIndex, q)}
                  disabled={used}
                  aria-label={`${cat.title} for ${q.value}`}
                >
                  {used ? (
                    <span className="jeopardy-tile__check">✓</span>
                  ) : (
                    <span className="jeopardy-tile__value">${q.value}</span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Completion banner */}
      {allUsed && (
        <div className="jeopardy-complete">
          All questions answered!
          <Button
            variant="secondary"
            size="small"
            className="jeopardy-complete__reset"
            onClick={() => setUsedTiles(new Set())}
            label="Play again"
          >
            Play Again
          </Button>
        </div>
      )}

      {/* Question modal */}
      <Modal
        isOpen={!!activeTile}
        onClose={handleClose}
        className="jeopardy-modal"
      >
        {activeTile && (
          <>
            <div className="jeopardy-modal__value">
              ${activeTile.question.value}
            </div>

            <p className="jeopardy-modal__question">
              {activeTile.question.question}
            </p>

            {showAnswer ? (
              <>
                <div className="jeopardy-modal__answer">
                  {activeTile.question.answer}
                </div>
              </>
            ) : (
              <>
                <Button
                  variant="primary"
                  size="medium"
                  className="jeopardy-modal__reveal"
                  onClick={() => setShowAnswer(true)}
                  label="Reveal answer"
                >
                  Reveal Answer
                </Button>
              </>
            )}
          </>
        )}
      </Modal>
    </div>
  );
};

export default JeopardyBoard;