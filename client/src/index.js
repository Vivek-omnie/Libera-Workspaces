import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Create } from "./components/create";
import Navbar from "./components/nav";
import { Update } from "./components/update";
import { Updatefull } from "./components/workspaceupdate";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<App />}></Route>
      <Route path="/create" element={<Create />}></Route>
      <Route path="/update/:_id" element={<Update />}></Route>
      <Route path="/updated/:_id" element={<Updatefull />}></Route>
    </Routes>
  </BrowserRouter>
);
reportWebVitals();
