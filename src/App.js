import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateProduct from "./pages/CreateProduct";
import ListProduct from "./pages/ListProduct";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Router>
        <Routes>
          <Route exact path="/" element={<ListProduct />} />
          <Route exact path="/createproduct" element={<CreateProduct />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
