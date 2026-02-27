import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SwipeGame from "./pages/SwipeGame.tsx";
import HomePage from "./pages/HomePage.tsx";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/snusboksleken" element={<SwipeGame />} />
        <Route path="/game" element={<SwipeGame />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
