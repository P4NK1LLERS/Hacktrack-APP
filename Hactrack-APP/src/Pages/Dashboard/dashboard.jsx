import Navbar from "../../components/NavBar.jsx";
import { useUserContext } from "../../UserContext.jsx";
import React, { useState, useEffect } from "react";
import "./dashboard.css";

function Dashboard() {
  const { user } = useUserContext();
  const [events, setEvents] = useState([]); // Utilisation d'un tableau pour stocker tous les événements
  const token = localStorage.getItem("token");
  const options = {hour:"2-digit",minute:"2-digit"};

  useEffect(() => {
    fetch("http://localhost:3002/hackathons", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        const json = await res.json();
        if (res.status === 200) {
          console.log("Données reçues :", json);
          setEvents(json); // Stocke tous les événements dans le state
        } else {
          console.error("Erreur API :", json);
        }
      })
      .catch((error) => console.error("Erreur de requête :", error));
  }, [token]);

  return (
    <div>
      <Navbar />
      <p>Accès de la page se fait avec la connexion de l'utilisateur </p>
      <p>Quand on appuie sur s'inscrire quand on rentre rien comme information cela va quand meme sur la page proteger</p>

  </div>
)}
        
export default Dashboard;
