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

  const getTileKey = (categoryId: string, questionIndex: number) =>
    `${categoryId}-${questionIndex}`;

  const isTileUsed = (key: string) => usedTiles.has(key);

  const openTile = (
    categoryId: string,
    questionIndex: number,
    question: Question
  ) => {
    const key = getTileKey(categoryId, questionIndex);
    if (isTileUsed(key)) return;

    setActiveTile({ categoryId, questionIndex, question });
    setShowAnswer(false);
  };

  const closeModal = () => {
    if (activeTile) {
      const key = getTileKey(
        activeTile.categoryId,
        activeTile.questionIndex
      );
      setUsedTiles((prev) => new Set(prev).add(key));
    }
    setActiveTile(null);
    setShowAnswer(false);
  };

  const totalTiles =
    data.categories.length * data.categories[0].questions.length;

  const allUsed = usedTiles.size === totalTiles;

  return (
    <div className="jeopardy-page">
      {/* Board */}
      <div className="jeopardy-board">
        {/* Category headers */}
        <div className="jeopardy-board__headers">
          {data.categories.map((category) => (
            <div
              key={category.id}
              className="jeopardy-board__category"
            >
              {category.title}
            </div>
          ))}
        </div>

        {/* Question rows */}
        {data.categories[0].questions.map((_, rowIndex) => (
          <div key={rowIndex} className="jeopardy-board__row">
            {data.categories.map((category) => {
              const question = category.questions[rowIndex];
              const key = getTileKey(category.id, rowIndex);
              const used = isTileUsed(key);

              return (
                <button
                  key={key}
                  className={`jeopardy-tile ${
                    used ? "jeopardy-tile--used" : ""
                  }`}
                  onClick={() =>
                    openTile(category.id, rowIndex, question)
                  }
                  disabled={used}
                  aria-label={`${category.title} for ${question.value}`}
                >
                  {used ? (
                    <span className="jeopardy-tile__check">✓</span>
                  ) : (
                    <span className="jeopardy-tile__value">
                      {question.value}
                    </span>
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
          >
            Play Again
          </Button>
        </div>
      )}

      {/* Modal (keeps your exact styling: jeopardy-modal) */}
      <Modal
        isOpen={!!activeTile}
        onClose={closeModal}
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
              <div className="jeopardy-modal__answer">
                {activeTile.question.answer}
              </div>
            ) : (
              <Button
                variant="primary"
                size="medium"
                className="jeopardy-modal__reveal"
                onClick={() => setShowAnswer(true)}
              >
                Reveal Answer
              </Button>
            )}
          </>
        )}
      </Modal>
    </div>
  );
};

export default JeopardyBoard;