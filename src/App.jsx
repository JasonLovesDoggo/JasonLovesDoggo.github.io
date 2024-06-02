import React, { createContext, useEffect, useState } from "react";
import Preloader from "../src/components/Pre";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Footer from "./components/Footer";
import Resume from "./components/Resume/Resume";
import ProgrammingTimeline from "./components/Timeline/Timeline";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import "./style.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import PhotoGallery from "./components/Photos/photos";
import PageNotFound from "./components/404s/404";
import DynamicThemeProvider from "./components/Theme";

export const ColorContext = createContext(null);

function App() {
  const [load, updateLoad] = useState(true);
  const [color, setColor] = useState("#1351A8");

  useEffect(() => {
    const timer = setTimeout(() => {
      updateLoad(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <Preloader load={load} />
      <div className="App" id={load ? "no-scroll" : "scroll"}>
        <ColorContext.Provider value={{ color, setColor }}>
          <DynamicThemeProvider>
            <Navbar />
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/about" element={<About />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="/photos" element={<PhotoGallery />} />
              <Route path="/timeline" element={<ProgrammingTimeline />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
            <Footer />
          </DynamicThemeProvider>
        </ColorContext.Provider>
      </div>
    </Router>
  );
}

export default App;
