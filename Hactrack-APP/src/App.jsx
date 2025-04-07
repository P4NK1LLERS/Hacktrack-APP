import { BrowserRouter, Route, Routes } from "react-router";
import Register from "./Pages/Inscription/register.jsx";
import Connexion from "./Pages/Connexion/connexion.jsx";
import Hackathons from "./Pages/Hackathons/hackathons.jsx";
import HackathonDetail from "./Pages/Details/HackathonsDetail.jsx"; // La page de détails d'un hackathon


import Home from "./Pages/Home/home.jsx";
import { UserProvider } from "./UserContext.jsx";
import './index.css'; 

function App() {
  return (
    <>
      <UserProvider> 
        <BrowserRouter> 
          <Routes>
            <Route index path="/" element={<Home />} />
            <Route path="register" element={<Register />} />
            <Route path="connexion" element={<Connexion />} />
            <Route path="hackathons" element={<Hackathons />} />
            <Route path="/hackathon/:id" element={<HackathonDetail />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  );
}

export default App;
