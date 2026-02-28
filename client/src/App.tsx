import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SwipeGame from "./pages/swipeGame/SwipeGame.tsx";
import HomePage from "./pages/homePage/HomePage.tsx";
import JeopardyBoard from "./pages/jeopardyBoard/JeopardyBoard.tsx";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/snusboksleken" element={<SwipeGame />} />
        <Route path="/game" element={<SwipeGame />} />
        <Route path="/jeopardy" element={<JeopardyBoard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
