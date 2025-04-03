import React from "react";
import './index.css'
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";

function App() {
  return (
    <BrowserRouter>
    <AppRouter />
    </BrowserRouter>
  );
}

export default App;
