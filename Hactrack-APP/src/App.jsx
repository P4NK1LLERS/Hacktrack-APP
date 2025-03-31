import { BrowserRouter, Route, Routes } from "react-router";
import Register from "./Pages/Inscription/register.jsx";
import Connexion from "./Pages/Connexion/connexion.jsx";
import Dashboard from "./Pages/Dashboard/dashboard.jsx";
import Hackathons from "./Pages/Hackathons/hackathons.jsx";
import Home from "./Pages/Home/home.jsx";
import "./App.css";
import { UserProvider } from "./UserContext.jsx";
import ProtectedRoute from "./Pages/ProtectedRoute/ProtectedRoute.jsx";

function App() {
  return (
    <>
      <UserProvider> {/*Utiliser le contexte pour gérer l'authentification*/}
        <BrowserRouter> {/*Utiliser le router pour gérer les routes*/}
          <Routes>
            <Route index path="/" element={<Home />} />
            <Route path="register" element={<Register />} />
            <Route path="connexion" element={<Connexion />} />
            <Route path="hackathons" element={<Hackathons />} />
            <Route
              path="dashboard"
              element={
                <>
                  <ProtectedRoute />
                  <Dashboard />
                  <ProtectedRoute />

                </>
              }
            />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  );
}

export default App;
