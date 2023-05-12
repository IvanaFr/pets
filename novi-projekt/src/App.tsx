import Navbar from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Home } from "./pages/home";
import { Obavijesti } from "./pages/obavijesti";
import { Onama } from "./pages/o-nama";
import { Donacije } from "./pages/donacije";
import { Popis } from "./pages/popis";
import { Footer } from "./components/Footer";
import Unos from "./pages/unos";

function App() {
    return (
        <div>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<Onama />} />
                    <Route path="/popis" element={<Popis />} />
                    <Route path="/donacije" element={<Donacije />} />
                    <Route path="/obavijesti" element={<Obavijesti />} />
                    <Route path="/unos" element={<Unos />} />
                </Routes>
            </Router>
            <Footer />
        </div>
    );
}

export default App;
