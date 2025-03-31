import { useNavigate } from "react-router";
import React, { useState } from "react";
import Navbar from "../../components/NavBar.jsx";
import { useUserContext } from "../../UserContext.jsx";
import "./connexion.css";

function Connexion() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const userContext = useUserContext();
  const token = localStorage.getItem("token"); // Récupérer le token dans le local storage

  
  // Fonction pour se connecter avec les informations de connexion
  const handleSignUp = async () => {
    try {
      const res = await fetch("http://localhost:3002/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) { // Si la requête est ok alors on récupère le token et on redirige vers le dashboard
        const data = await res.json();
        localStorage.setItem("token", data.token);
        const user = { email: email, isAuthentified: true }; // Mettre le contexte à true si l'utilisateur est authentifié
        userContext.setUser(user);
        navigate("/dashboard"); // Rediriger vers le dashboard
      } else {
        setError("Email ou mot de passe incorrect.");
      }
    } catch (error) {
      console.error("Erreur réseau:", error);
      setError("Une erreur réseau est survenue. Veuillez réessayer.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="signup-form">
        <h2>Connexion</h2>
      </div>
      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} /* Mettre à jour l'email */
          required
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}   /* Mettre à jour le mot de passe*/
          required
        />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}  {/* Afficher l'erreur si il y en a une*/} 
      <div>
        <button onClick={handleSignUp}>Se connecter</button>
      </div>
    </div>
  );
}

export default Connexion;
