import React from "react";

import { Route, Routes } from "react-router-dom";

import "./App.css";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/quiz-app/quizes" element={<Quiz />} />
        <Route path="/quiz-app" element={<Home />} />
        {/* <Route path="/quizes" element={<Quiz />} /> */}
      </Routes>
    </Layout>
  );
}

export default App;
