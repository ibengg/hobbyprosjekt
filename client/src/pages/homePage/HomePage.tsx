import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import { Button } from "../../components/button/Button";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <main className="home">
      <div className="home__content">
        <h1 className="home__title">Welcome</h1>
        <p className="home__description">
          Test your knowledge one card at a time. Swipe to answer and see how
          far you can go.
        </p>
        <Button onClick={() => navigate("/snusboksleken")} variant="primary" size="large">
          Snusboksleken
        </Button>
        <Button onClick={() => navigate("/jeopardy")} variant="primary" size="large">
          Jeopardy
        </Button>
      </div>
    </main>
  );
};

export default Home;